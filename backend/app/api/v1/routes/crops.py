from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()


class CropInfo(BaseModel):
    id: str
    name: str
    local_name: str
    season: str
    avg_yield_kg_per_acre: float
    avg_market_price: float
    common_diseases: List[str]


MOCK_CROPS: List[dict] = [
    {
        "id": "crop-tomato",
        "name": "Tomato",
        "local_name": "ಟೊಮ್ಯಾಟೊ",
        "season": "Rabi (Oct-Feb), Kharif (Jun-Sep)",
        "avg_yield_kg_per_acre": 8000,
        "avg_market_price": 25.0,
        "common_diseases": ["Early Blight", "Late Blight", "Leaf Curl Virus", "Fusarium Wilt"],
    },
    {
        "id": "crop-onion",
        "name": "Onion",
        "local_name": "ಈರುಳ್ಳಿ",
        "season": "Rabi (Nov-Apr)",
        "avg_yield_kg_per_acre": 6000,
        "avg_market_price": 18.0,
        "common_diseases": ["Purple Blotch", "Stemphylium Blight", "Downy Mildew"],
    },
    {
        "id": "crop-potato",
        "name": "Potato",
        "local_name": "ಆಲೂಗೆಡ್ಡೆ",
        "season": "Rabi (Oct-Jan)",
        "avg_yield_kg_per_acre": 7000,
        "avg_market_price": 15.0,
        "common_diseases": ["Late Blight", "Early Blight", "Bacterial Wilt"],
    },
]


@router.get("", response_model=List[CropInfo])
async def get_crops():
    """Get list of supported crops."""
    return MOCK_CROPS


@router.get("/{crop_id}", response_model=CropInfo)
async def get_crop(crop_id: str):
    """Get details for a specific crop."""
    from fastapi import HTTPException
    crop = next((c for c in MOCK_CROPS if c["id"] == crop_id), None)
    if not crop:
        raise HTTPException(status_code=404, detail=f"Crop '{crop_id}' not found.")
    return crop
