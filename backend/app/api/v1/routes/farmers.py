from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

router = APIRouter()

# ------------------------------------
# Pydantic Schemas (inline for Phase 1)
# ------------------------------------

class FarmerCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, example="Ravi Kumar")
    phone: str = Field(..., example="+91-9876543210")
    location: str = Field(..., example="Bengaluru Rural, Karnataka")
    total_acres: float = Field(..., gt=0, example=3.0)
    primary_crop: str = Field(..., example="Tomato")
    language: str = Field(default="kn", example="kn")  # kn=Kannada, hi=Hindi, en=English


class FarmerResponse(BaseModel):
    id: str
    name: str
    phone: str
    location: str
    total_acres: float
    primary_crop: str
    language: str
    created_at: str


class FarmerUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    total_acres: Optional[float] = None
    primary_crop: Optional[str] = None
    language: Optional[str] = None


# ------------------------------------
# In-Memory Mock Data (Phase 1)
# Replace with repository pattern in Phase 2
# ------------------------------------

MOCK_FARMERS: List[dict] = [
    {
        "id": "farmer-001",
        "name": "Ravi Kumar",
        "phone": "+91-9876543210",
        "location": "Bengaluru Rural, Karnataka",
        "total_acres": 3.0,
        "primary_crop": "Tomato",
        "language": "kn",
        "created_at": "2024-01-15T10:00:00",
    },
    {
        "id": "farmer-002",
        "name": "Sunita Devi",
        "phone": "+91-9123456789",
        "location": "Kolar, Karnataka",
        "total_acres": 2.5,
        "primary_crop": "Tomato",
        "language": "kn",
        "created_at": "2024-02-20T08:30:00",
    },
]


# ------------------------------------
# Routes
# ------------------------------------

@router.get("", response_model=List[FarmerResponse])
async def get_farmers():
    """
    Get all registered farmers.
    Phase 1: Returns mock data.
    Phase 2: Queries PostgreSQL database.
    """
    return MOCK_FARMERS


@router.get("/{farmer_id}", response_model=FarmerResponse)
async def get_farmer(farmer_id: str):
    """Get a specific farmer by ID."""
    farmer = next((f for f in MOCK_FARMERS if f["id"] == farmer_id), None)
    if not farmer:
        raise HTTPException(status_code=404, detail=f"Farmer '{farmer_id}' not found.")
    return farmer


@router.post("", response_model=FarmerResponse, status_code=201)
async def create_farmer(farmer: FarmerCreate):
    """
    Register a new farmer.
    Phase 1: Stores in memory (resets on restart).
    Phase 2: Persists to PostgreSQL.
    """
    new_farmer = {
        "id": f"farmer-{str(uuid.uuid4())[:8]}",
        "name": farmer.name,
        "phone": farmer.phone,
        "location": farmer.location,
        "total_acres": farmer.total_acres,
        "primary_crop": farmer.primary_crop,
        "language": farmer.language,
        "created_at": datetime.utcnow().isoformat(),
    }
    MOCK_FARMERS.append(new_farmer)
    return new_farmer


@router.patch("/{farmer_id}", response_model=FarmerResponse)
async def update_farmer(farmer_id: str, updates: FarmerUpdate):
    """Update farmer profile."""
    farmer = next((f for f in MOCK_FARMERS if f["id"] == farmer_id), None)
    if not farmer:
        raise HTTPException(status_code=404, detail=f"Farmer '{farmer_id}' not found.")

    update_data = updates.model_dump(exclude_none=True)
    farmer.update(update_data)
    return farmer
