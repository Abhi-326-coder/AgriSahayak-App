const videoElement = document.getElementById('local-video');
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');
const connectBtn = document.getElementById('connect-btn');
const micBtn = document.getElementById('mic-btn');
const camBtn = document.getElementById('cam-btn');

let ws = null;
let localStream = null;
let isConnected = false;
let isMicMuted = true;
let isCamMuted = true;
let currentFacingMode = 'user';

// Audio capturing
let audioContext = null;
let scriptNode = null;
let mediaStreamSource = null;

// Video capturing
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;
let videoInterval = null;

// Audio playback & Visualizer
let playbackContext = null;
let playbackAnalyser = null;
let nextPlaybackTime = 0;
let visualizerCanvas = null;
let visCtx = null;
let animationId = null;

// No subtitles or speech recognition anymore



function updateStatus(status) {
    const loadingBar = document.getElementById('loading-bar');
    if (loadingBar) loadingBar.classList.add('hidden');

    if (status === 'connected') {
        statusIndicator.className = 'status online';
        statusText.innerText = 'Connected';
        connectBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg> Disconnect';
        connectBtn.classList.add('connected');
        connectBtn.disabled = false;
        micBtn.disabled = false;
        camBtn.disabled = false;
        isConnected = true;
    } else {
        statusIndicator.className = 'status offline';
        statusText.innerText = 'Disconnected';
        connectBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"></path><rect x="3" y="6" width="12" height="12" rx="2" ry="2"></rect></svg> Connect';
        connectBtn.classList.remove('connected');
        connectBtn.disabled = false;
        micBtn.disabled = true;
        camBtn.disabled = true;
        isConnected = false;
    }
}

async function startMedia() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480, facingMode: currentFacingMode },
            audio: {
                sampleRate: 16000,
                channelCount: 1,
                echoCancellation: true,
                noiseSuppression: true
            }
        });
        
        // Video off by default
        if (isCamMuted) {
            localStream.getVideoTracks().forEach(track => track.enabled = false);
            videoElement.style.opacity = '0';
        } else {
            videoElement.style.opacity = '1';
        }
        
        videoElement.srcObject = localStream;
    } catch (err) {
        console.error("Error accessing media devices", err);
        alert("Failed to access camera/microphone. Please allow permissions.");
    }
}

function stopMedia() {
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
}

function float32ToInt16Base64(float32Array) {
    let int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
        let s = Math.max(-1, Math.min(1, float32Array[i]));
        int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    let uint8Array = new Uint8Array(int16Array.buffer);
    let binary = '';
    // Process in chunks to avoid max call stack size exceeded
    const chunkSize = 8192;
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
        binary += String.fromCharCode.apply(null, uint8Array.subarray(i, i + chunkSize));
    }
    return btoa(binary);
}

function setupAudioCapture() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
    mediaStreamSource = audioContext.createMediaStreamSource(localStream);
    scriptNode = audioContext.createScriptProcessor(2048, 1, 1);
    
    scriptNode.onaudioprocess = function(audioProcessingEvent) {
        if (!isConnected || isMicMuted) return;
        
        const inputBuffer = audioProcessingEvent.inputBuffer;
        const inputData = inputBuffer.getChannelData(0);
        
        const base64Audio = float32ToInt16Base64(inputData);
        
        ws.send(JSON.stringify({
            "realtimeInput": {
                "audio": {
                    "mimeType": "audio/pcm;rate=16000",
                    "data": base64Audio
                }
            }
        }));
    };
    
    mediaStreamSource.connect(scriptNode);
    scriptNode.connect(audioContext.destination);
}

function setupVideoCapture() {
    videoInterval = setInterval(() => {
        if (!isConnected || isCamMuted || !localStream) return;
        
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
        const base64Image = dataUrl.split(',')[1];
        
        ws.send(JSON.stringify({
            "realtimeInput": {
                "video": {
                    "mimeType": "image/jpeg",
                    "data": base64Image
                }
            }
        }));
    }, 1000); // 1 frame per second
}

function drawVisualizer() {
    if (!visCtx || !playbackAnalyser) return;
    
    animationId = requestAnimationFrame(drawVisualizer);
    
    const container = visualizerCanvas.parentElement;
    if (visualizerCanvas.width !== container.clientWidth || visualizerCanvas.height !== container.clientHeight) {
        visualizerCanvas.width = container.clientWidth;
        visualizerCanvas.height = container.clientHeight;
    }
    
    const bufferLength = playbackAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    playbackAnalyser.getByteFrequencyData(dataArray);
    
    visCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
    
    // Draw talking lines (bars) at the bottom right
    const numBars = 12;
    const barWidth = 6;
    const gap = 4;
    const totalWidth = (barWidth + gap) * numBars;
    
    const startX = visualizerCanvas.width - totalWidth - 20; // 20px from right edge
    const startY = visualizerCanvas.height - 20; // 20px from bottom edge
    const maxHeight = 60; // Max height for bars
    
    for(let i = 0; i < numBars; i++) {
        const dataIndex = Math.floor(i * (bufferLength / numBars));
        const value = dataArray[dataIndex];
        
        // Idle animation to show it's active
        const idlePulse = Math.sin((Date.now() / 150) + (i * 0.5)) * 4 + 6; 
        
        const barHeight = Math.max(idlePulse, (value / 255) * maxHeight);
        
        visCtx.fillStyle = 'rgba(16, 185, 129, 0.9)'; // Green theme
        visCtx.beginPath();
        // Use rect instead of roundRect for better browser compatibility just in case
        visCtx.rect(startX + i * (barWidth + gap), startY - barHeight, barWidth, barHeight);
        visCtx.fill();
    }
}

function playAudioData(base64Data) {
    if (!playbackContext) {
        playbackContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
        playbackAnalyser = playbackContext.createAnalyser();
        playbackAnalyser.fftSize = 256;
        playbackAnalyser.connect(playbackContext.destination);
        
        visualizerCanvas = document.getElementById('ai-visualizer');
        if (visualizerCanvas) {
            visCtx = visualizerCanvas.getContext('2d');
            drawVisualizer();
        }
    }
    
    const binary = atob(base64Data);
    const int16Array = new Int16Array(binary.length / 2);
    for (let i = 0; i < int16Array.length; i++) {
        let byte1 = binary.charCodeAt(i * 2);
        let byte2 = binary.charCodeAt(i * 2 + 1);
        int16Array[i] = (byte2 << 8) | byte1;
    }
    
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
    }
    
    const buffer = playbackContext.createBuffer(1, float32Array.length, 24000);
    buffer.getChannelData(0).set(float32Array);
    
    const source = playbackContext.createBufferSource();
    source.buffer = buffer;
    source.connect(playbackAnalyser); // connect to analyser instead of destination
    
    if (nextPlaybackTime < playbackContext.currentTime) {
        nextPlaybackTime = playbackContext.currentTime;
    }
    source.start(nextPlaybackTime);
    nextPlaybackTime += buffer.duration;

    if (!window.activeAudioSources) window.activeAudioSources = [];
    window.activeAudioSources.push(source);
    source.onended = () => {
        const idx = window.activeAudioSources.indexOf(source);
        if (idx > -1) window.activeAudioSources.splice(idx, 1);
    };
}

function connectWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    ws = new WebSocket(`${protocol}//${window.location.host}/api/v1/live/ws`);
    
    ws.onopen = () => {
        console.log("WebSocket connected to backend");
        updateStatus('connected');
        setupAudioCapture();
        setupVideoCapture();
    };
    
    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            if (data.serverContent && data.serverContent.modelTurn) {
                const parts = data.serverContent.modelTurn.parts;
                for (let part of parts) {
                    if (part.inlineData && part.inlineData.mimeType.startsWith('audio/pcm')) {
                        playAudioData(part.inlineData.data);
                    }
                }
            }
            if (data.serverContent && data.serverContent.interrupted) {
                console.log("Interrupted by user");
                if (window.activeAudioSources) {
                    window.activeAudioSources.forEach(s => {
                        try { s.onended = null; s.stop(); } catch(e) {}
                    });
                    window.activeAudioSources = [];
                }
                nextPlaybackTime = 0;
            }
        } catch (e) {
            console.error("Error processing message", e);
        }
    };
    
    ws.onclose = () => {
        console.log("WebSocket disconnected");
        disconnect();
    };
}

function disconnect() {
    if (ws) {
        ws.close();
        ws = null;
    }
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
    if (playbackContext) {
        if (animationId) cancelAnimationFrame(animationId);
        playbackContext.close();
        playbackContext = null;
        playbackAnalyser = null;
    }
    nextPlaybackTime = 0; // Fixes the delay issue on reconnect
    if (visCtx && visualizerCanvas) {
        visCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
    }
    clearInterval(videoInterval);
    
    stopMedia(); // Turn off camera and mic
    isMicMuted = true; // Reset to muted
    isCamMuted = true; // Reset to muted
    if (videoElement) {
        videoElement.srcObject = null;
        videoElement.style.opacity = '0';
    }
    // Reset buttons
    micBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6"></path><path d="M17 16.95A7 7 0 015 12v-2m14 0v2a7 7 0 01-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg> Unmute Mic';
    micBtn.classList.add('muted');
    camBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect><line x1="1" y1="1" x2="23" y2="23"></line></svg> Open Video';
    camBtn.classList.add('muted');
    
    updateStatus('disconnected');
}

const flipCamBtn = document.getElementById('flip-cam-btn');
if (flipCamBtn) {
    flipCamBtn.addEventListener('click', async () => {
        currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
        
        // If we are currently streaming, we need to swap the video track
        if (localStream) {
            const oldVideoTracks = localStream.getVideoTracks();
            oldVideoTracks.forEach(track => track.stop());
            
            try {
                const newStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: currentFacingMode }
                });
                const newVideoTrack = newStream.getVideoTracks()[0];
                
                if (oldVideoTracks.length > 0) {
                    localStream.removeTrack(oldVideoTracks[0]);
                }
                localStream.addTrack(newVideoTrack);
                
                if (videoElement) {
                    videoElement.srcObject = localStream;
                }
            } catch (err) {
                console.warn("Could not flip camera:", err);
            }
        }
    });
}

connectBtn.addEventListener('click', async () => {
    if (isConnected) {
        disconnect();
    } else {
        const loadingBar = document.getElementById('loading-bar');
        if (loadingBar) loadingBar.classList.remove('hidden');
        connectBtn.innerHTML = 'Connecting...';
        connectBtn.disabled = true;

        // Auto-unmute mic when connecting
        isMicMuted = false;
        micBtn.classList.remove('muted');
        micBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"></path><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"></path></svg> Mute Mic';

        if (!localStream) {
            await startMedia();
        }
        connectWebSocket();
    }
});

micBtn.addEventListener('click', () => {
    isMicMuted = !isMicMuted;
    if (isMicMuted) {
        micBtn.classList.add('muted');
        micBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6"></path><path d="M17 16.95A7 7 0 015 12v-2m14 0v2a7 7 0 01-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg> Unmute Mic';
    } else {
        micBtn.classList.remove('muted');
        micBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"></path><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"></path></svg> Mute Mic';
    }
});

camBtn.addEventListener('click', () => {
    isCamMuted = !isCamMuted;
    
    if (localStream) {
        localStream.getVideoTracks().forEach(track => {
            track.enabled = !isCamMuted;
        });
    }

    if (isCamMuted) {
        camBtn.classList.add('muted');
        camBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect><line x1="1" y1="1" x2="23" y2="23"></line></svg> Open Video';
        videoElement.style.opacity = '0';
    } else {
        camBtn.classList.remove('muted');
        camBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg> Close Video';
        videoElement.style.opacity = '1';
    }
});

// Note: user must click Connect to start the camera/mic explicitly or click the button.
// If they want to just start right away:
// startMedia();
