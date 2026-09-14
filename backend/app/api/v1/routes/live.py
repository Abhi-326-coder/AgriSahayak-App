import os
import json
import asyncio
import websockets
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.core.config import settings

router = APIRouter()

# Get GEMINI_API_KEY from settings (or os.getenv as fallback)
GEMINI_API_KEY = getattr(settings, "gemini_api_key", os.getenv("GEMINI_API_KEY"))

if not GEMINI_API_KEY:
    # Just a warning during startup, but we'll raise an error during connection if it's missing
    print("Warning: GEMINI_API_KEY not found in environment", flush=True)

GEMINI_WS_URL = f"wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key={GEMINI_API_KEY}"

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("Client connected to FastAPI WebSocket (Live API)", flush=True)

    if not GEMINI_API_KEY:
        print("GEMINI_API_KEY missing, cannot connect to Gemini.", flush=True)
        await websocket.close()
        return

    try:
        # Connect to Gemini Multimodal Live API
        print(f"Connecting to Gemini at: {GEMINI_WS_URL[:100]}...", flush=True)
        async with websockets.connect(GEMINI_WS_URL) as gemini_ws:
            print("Connected to Gemini Multimodal Live API", flush=True)

            # Initial setup message required by Gemini
            setup_message = {
                "setup": {
                    "model": "models/gemini-3.1-flash-live-preview",
                    "systemInstruction": {
                        "parts": [{"text": "You are AgriSahayak, a helpful agricultural advisor. When the conversation starts, first briefly introduce yourself, and then ask the user which language they prefer to converse in. Once they answer, switch to that language and never ask again. Keep answers concise."}]
                    },
                    "generationConfig": {
                        "responseModalities": ["AUDIO"],
                        "speechConfig": {
                            "voiceConfig": {
                                "prebuiltVoiceConfig": {"voiceName": "Kore"}
                            }
                        }
                    },
                    "outputAudioTranscription": {}
                }
            }
            await gemini_ws.send(json.dumps(setup_message))
            
            # Task to receive from Frontend and send to Gemini
            async def receive_from_client():
                try:
                    while True:
                        data = await websocket.receive_text()
                        await gemini_ws.send(data)
                except WebSocketDisconnect:
                    print("Client disconnected", flush=True)
                except Exception as e:
                    print(f"Error receiving from client: {e}", flush=True)

            # Task to receive from Gemini and send to Frontend
            async def receive_from_gemini():
                try:
                    while True:
                        response = await gemini_ws.recv()
                        if isinstance(response, bytes):
                            response = response.decode('utf-8')
                        await websocket.send_text(response)
                except websockets.exceptions.ConnectionClosed:
                    print("Gemini connection closed", flush=True)
                except Exception as e:
                    print(f"Error receiving from Gemini: {e}", flush=True)

            # Run both tasks concurrently
            await asyncio.gather(
                receive_from_client(),
                receive_from_gemini()
            )

    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"WebSocket bridging error: {e}", flush=True)
        try:
            await websocket.close()
        except:
            pass
