from pydantic import BaseModel
from typing import Optional

class CropBase(BaseModel):
    name: str
    variety: Optional[str] = None
    acreage: float
    current_stage: str
    estimated_yield_quintals: float

class CropResponse(CropBase):
    id: int

    class Config:
        from_attributes = True
