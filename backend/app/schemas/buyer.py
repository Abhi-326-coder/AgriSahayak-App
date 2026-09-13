from pydantic import BaseModel
from typing import Optional

class BuyerResponse(BaseModel):
    id: int
    name: str
    company_type: str
    location: str
    distance_km: float
    crop_interested: str
    price_offered_per_quintal: float
    min_quantity_quintals: float
    max_quantity_quintals: float
    payment_terms: str
    verified: bool
    rating: float
    match_score: Optional[int] = None
