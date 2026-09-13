from pydantic import BaseModel, Field
from typing import List, Optional
from app.schemas.buyer import BuyerResponse

class MatchRequest(BaseModel):
    crop: str = Field(..., example="Tomato")
    quantity_quintals: float = Field(..., example=20.0)
    quality_grade: str = Field(default="Grade A", example="Grade A")
    location: str = Field(default="Bengaluru Rural", example="Bengaluru Rural")

class MatchResponse(BaseModel):
    crop: str
    quantity_quintals: float
    matched_count: int
    buyers: List[BuyerResponse]
