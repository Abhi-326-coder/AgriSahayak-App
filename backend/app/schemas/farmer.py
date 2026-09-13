from pydantic import BaseModel
from typing import Optional, List

class FarmerBase(BaseModel):
    name: str
    phone: str
    language: str = "kn"
    location: str
    district: str
    state: str = "Karnataka"
    total_acres: float
    primary_crop: str

class FarmerCreate(FarmerBase):
    pass

class FarmerResponse(FarmerBase):
    id: int

    class Config:
        from_attributes = True
