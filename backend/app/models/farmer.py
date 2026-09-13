"""Farmer database model placeholder for Phase 2."""
from typing import Optional

class FarmerModel:
    """Represents a registered farmer profile in PostgreSQL."""
    id: int
    name: str
    phone: str
    language: str
    location: str
    district: str
    state: str
    total_acres: float
    primary_crop: str
    created_at: Optional[str]
