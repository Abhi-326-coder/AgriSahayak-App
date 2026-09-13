"""Crop database model placeholder for Phase 2."""
from typing import Optional

class CropModel:
    id: int
    farmer_id: int
    name: str
    variety: str
    acreage: float
    sowing_date: Optional[str]
    expected_harvest_date: Optional[str]
    estimated_yield_quintals: float
    current_stage: str
