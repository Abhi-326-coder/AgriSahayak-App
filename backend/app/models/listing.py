"""Listing database model placeholder for Phase 2."""
from typing import Optional

class ListingModel:
    id: int
    farmer_id: int
    crop: str
    quantity_quintals: float
    asking_price: float
    harvest_date: str
    quality_grade: str
    status: str
    created_at: Optional[str]
