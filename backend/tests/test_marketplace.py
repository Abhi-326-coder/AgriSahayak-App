from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_buyers():
    response = client.get("/api/v1/marketplace/buyers")
    assert response.status_code == 200
    buyers = response.json()
    assert isinstance(buyers, list)
    assert len(buyers) > 0
    assert "name" in buyers[0]
    assert "price_offered_per_quintal" in buyers[0]

def test_marketplace_matching():
    payload = {
        "crop": "Tomato",
        "quantity": 2000,
        "quality": "Good",
        "location": "Bengaluru"
    }
    response = client.post("/api/v1/marketplace/match", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "buyers" in data
    assert len(data["buyers"]) > 0
    # Ranked by score descending
    scores = [b["match_score"] for b in data["buyers"]]
    assert scores == sorted(scores, reverse=True)
