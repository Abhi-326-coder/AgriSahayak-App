from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_voice_process_sell():
    payload = {
        "text": "I have 2000 kg tomatoes. Where should I sell?",
        "language": "en"
    }
    response = client.post("/api/v1/voice/process", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["intent"] == "SELL_PRODUCE"
    assert data["next_action"] == "MARKETPLACE"

def test_voice_languages():
    response = client.get("/api/v1/voice/languages")
    assert response.status_code == 200
    langs = response.json()
    assert any(l["code"] == "kn" for l in langs)
    assert any(l["code"] == "en" for l in langs)
