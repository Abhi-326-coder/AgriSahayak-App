from fastapi import APIRouter, Query
from pydantic import BaseModel, Field
from typing import List, Optional

router = APIRouter()

# ------------------------------------
# Schemas
# ------------------------------------

class BuyerResponse(BaseModel):
    id: int
    name: str
    type: str
    crop: str
    price: float
    distance: float
    match_score: int
    verified: bool
    location: str
    min_quantity: int
    max_quantity: int
    payment_terms: str
    description: str


class MatchRequest(BaseModel):
    crop: str = Field(..., example="Tomato")
    quantity: int = Field(..., gt=0, example=2000)
    quality: str = Field(..., example="Good")  # Excellent, Good, Fair
    location: str = Field(..., example="Bengaluru")


class MatchedBuyer(BaseModel):
    id: int
    name: str
    type: str
    crop: str
    price: float
    distance: float
    match_score: int
    verified: bool
    location: str
    min_quantity: int
    max_quantity: int
    payment_terms: str
    description: str
    match_reasons: List[str]
    estimated_revenue: float


class MatchResponse(BaseModel):
    crop: str
    quantity: int
    quality: str
    location: str
    total_matches: int
    buyers: List[MatchedBuyer]


# ------------------------------------
# Mock Buyer Data (Stitch-consistent)
# ------------------------------------

MOCK_BUYERS: List[dict] = [
    {
        "id": 1,
        "name": "GreenHarvest Foods",
        "type": "Food Processor",
        "crop": "Tomato",
        "price": 31.0,
        "distance": 25.0,
        "match_score": 94,
        "verified": True,
        "location": "Bengaluru Industrial Area, Karnataka",
        "min_quantity": 1000,
        "max_quantity": 10000,
        "payment_terms": "3-day payment",
        "description": "Leading food processing company specializing in tomato puree, ketchup, and canned goods. Accepts Grade A and Grade B produce.",
    },
    {
        "id": 2,
        "name": "Bengaluru Fresh Market (APMC)",
        "type": "Wholesale Buyer",
        "crop": "Tomato",
        "price": 29.0,
        "distance": 12.0,
        "match_score": 91,
        "verified": True,
        "location": "Yeshwanthpur APMC, Bengaluru",
        "min_quantity": 500,
        "max_quantity": 50000,
        "payment_terms": "Same-day payment",
        "description": "Government regulated APMC mandi. Highest price transparency, spot payment. Best for Grade A produce.",
    },
    {
        "id": 3,
        "name": "FreshMart Direct",
        "type": "Retail Chain",
        "crop": "Tomato",
        "price": 33.0,
        "distance": 18.0,
        "match_score": 87,
        "verified": True,
        "location": "Koramangala, Bengaluru",
        "min_quantity": 200,
        "max_quantity": 2000,
        "payment_terms": "7-day payment",
        "description": "Modern retail chain sourcing directly from farmers. Premium price for top-grade produce with strict quality requirements.",
    },
    {
        "id": 4,
        "name": "Kolar Cooperative FPO",
        "type": "Cooperative",
        "crop": "Tomato",
        "price": 27.0,
        "distance": 45.0,
        "match_score": 78,
        "verified": True,
        "location": "Kolar, Karnataka",
        "min_quantity": 2000,
        "max_quantity": 20000,
        "payment_terms": "5-day payment",
        "description": "Farmer Producer Organization aggregating produce from Kolar district. Collective bargaining power, fair prices.",
    },
    {
        "id": 5,
        "name": "Mumbai Wholesale Hub",
        "type": "Wholesale Buyer",
        "crop": "Tomato",
        "price": 35.0,
        "distance": 980.0,
        "match_score": 72,
        "verified": True,
        "location": "Vashi APMC, Mumbai",
        "min_quantity": 5000,
        "max_quantity": 100000,
        "payment_terms": "10-day payment",
        "description": "Large-scale wholesale buyer in Mumbai. High prices but transport costs significant. Best for large lots only.",
    },
]


# ------------------------------------
# Deterministic Matching Algorithm
# ------------------------------------

def calculate_match_score(
    buyer: dict,
    crop: str,
    quantity: int,
    quality: str,
    location: str,
) -> tuple[int, List[str]]:
    """
    Deterministic buyer matching algorithm.

    Scores based on:
    1. Crop match (40 pts)
    2. Quantity compatibility (20 pts)
    3. Quality match (20 pts)
    4. Distance proximity (20 pts)

    NOTE: This is intentionally algorithmic/deterministic.
    AI should understand farmer intent, NOT replace this calculation.
    """
    score = 0
    reasons = []

    # 1. Crop Match (40 pts max)
    if buyer["crop"].lower() == crop.lower():
        score += 40
        reasons.append(f"Buys {crop}")

    # 2. Quantity Compatibility (20 pts max)
    if buyer["min_quantity"] <= quantity <= buyer["max_quantity"]:
        score += 20
        reasons.append(f"Accepts {quantity} kg lot")
    elif quantity > buyer["max_quantity"]:
        score += 5
        reasons.append(f"Lot exceeds max ({buyer['max_quantity']} kg)")
    elif quantity < buyer["min_quantity"]:
        score += 10
        reasons.append(f"Lot below min ({buyer['min_quantity']} kg)")

    # 3. Quality Match (20 pts max)
    quality_score_map = {
        "Excellent": {"Food Processor": 15, "Retail Chain": 20, "Wholesale Buyer": 18, "Cooperative": 12},
        "Good": {"Food Processor": 20, "Retail Chain": 12, "Wholesale Buyer": 18, "Cooperative": 15},
        "Fair": {"Food Processor": 20, "Retail Chain": 5, "Wholesale Buyer": 12, "Cooperative": 18},
    }
    q_score = quality_score_map.get(quality, {}).get(buyer["type"], 10)
    score += q_score
    if q_score >= 18:
        reasons.append(f"Ideal quality match for {buyer['type']}")
    elif q_score >= 12:
        reasons.append(f"Acceptable quality for {buyer['type']}")

    # 4. Distance Proximity (20 pts max)
    if buyer["distance"] <= 20:
        score += 20
        reasons.append(f"Very close ({buyer['distance']} km)")
    elif buyer["distance"] <= 50:
        score += 15
        reasons.append(f"Nearby ({buyer['distance']} km)")
    elif buyer["distance"] <= 100:
        score += 8
        reasons.append(f"Moderate distance ({buyer['distance']} km)")
    else:
        score += 2
        reasons.append(f"Far ({buyer['distance']} km, transport costs apply)")

    # Verified bonus
    if buyer["verified"]:
        score = min(score + 2, 100)
        reasons.append("Verified buyer")

    return min(score, 100), reasons


# ------------------------------------
# Routes
# ------------------------------------

@router.get("/buyers", response_model=List[BuyerResponse])
async def get_buyers(
    crop: Optional[str] = Query(None, description="Filter by crop type"),
    buyer_type: Optional[str] = Query(None, description="Filter by buyer type"),
):
    """
    Get all available buyers.
    Optionally filter by crop or buyer type.
    """
    buyers = MOCK_BUYERS

    if crop:
        buyers = [b for b in buyers if b["crop"].lower() == crop.lower()]

    if buyer_type:
        buyers = [b for b in buyers if b["type"].lower() == buyer_type.lower()]

    return buyers


@router.get("/buyers/{buyer_id}", response_model=BuyerResponse)
async def get_buyer(buyer_id: int):
    """Get a specific buyer by ID."""
    from fastapi import HTTPException
    buyer = next((b for b in MOCK_BUYERS if b["id"] == buyer_id), None)
    if not buyer:
        raise HTTPException(status_code=404, detail=f"Buyer {buyer_id} not found.")
    return buyer


@router.post("/match", response_model=MatchResponse)
async def match_buyers(request: MatchRequest):
    """
    Match buyers to farmer's produce using a deterministic scoring algorithm.

    Scores based on:
    - Crop compatibility
    - Quantity match
    - Quality match
    - Distance proximity

    This is intentionally algorithmic (not AI).
    AI layer will interpret intent → this algorithm finds best match.
    """
    matched_buyers = []

    for buyer in MOCK_BUYERS:
        score, reasons = calculate_match_score(
            buyer=buyer,
            crop=request.crop,
            quantity=request.quantity,
            quality=request.quality,
            location=request.location,
        )

        estimated_revenue = request.quantity * buyer["price"]

        matched_buyers.append(
            MatchedBuyer(
                **buyer,
                match_score=score,
                match_reasons=reasons,
                estimated_revenue=estimated_revenue,
            )
        )

    # Sort by match score descending
    matched_buyers.sort(key=lambda b: b.match_score, reverse=True)

    return MatchResponse(
        crop=request.crop,
        quantity=request.quantity,
        quality=request.quality,
        location=request.location,
        total_matches=len(matched_buyers),
        buyers=matched_buyers,
    )
