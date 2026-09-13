from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()


class GovernmentScheme(BaseModel):
    id: str
    name: str
    local_name: str
    ministry: str
    benefit_amount: Optional[str]
    eligibility: List[str]
    documents_required: List[str]
    application_url: Optional[str]
    status: str  # active, upcoming, closed


MOCK_SCHEMES: List[dict] = [
    {
        "id": "scheme-pmfby",
        "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "local_name": "ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ",
        "ministry": "Ministry of Agriculture",
        "benefit_amount": "Crop insurance up to full crop value",
        "eligibility": [
            "All farmers growing notified crops",
            "Loanee and non-loanee farmers",
            "Sharecroppers and tenant farmers",
        ],
        "documents_required": ["Aadhaar Card", "Bank Passbook", "Land Records", "Sowing Certificate"],
        "application_url": "https://pmfby.gov.in",
        "status": "active",
    },
    {
        "id": "scheme-pmkisan",
        "name": "PM-KISAN Samman Nidhi",
        "local_name": "PM-ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ",
        "ministry": "Ministry of Agriculture",
        "benefit_amount": "₹6,000 per year (₹2,000 per installment)",
        "eligibility": [
            "All landholding farmer families",
            "Land holding up to 2 hectares (relaxed in 2019)",
            "Valid Aadhaar required",
        ],
        "documents_required": ["Aadhaar Card", "Bank Account", "Land Records"],
        "application_url": "https://pmkisan.gov.in",
        "status": "active",
    },
    {
        "id": "scheme-kcc",
        "name": "Kisan Credit Card (KCC)",
        "local_name": "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್",
        "ministry": "Ministry of Finance / NABARD",
        "benefit_amount": "Credit up to ₹3 lakh at 7% interest (4% with subsidy)",
        "eligibility": [
            "All farmers, tenant farmers, sharecroppers",
            "Self-Help Groups of farmers",
            "Joint Liability Groups",
        ],
        "documents_required": ["Aadhaar Card", "Land Records", "Passport Photo", "Bank Account"],
        "application_url": "https://nabard.org/kcc",
        "status": "active",
    },
    {
        "id": "scheme-soil-health",
        "name": "Soil Health Card Scheme",
        "local_name": "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಯೋಜನೆ",
        "ministry": "Ministry of Agriculture",
        "benefit_amount": "Free soil testing + crop-wise nutrient recommendations",
        "eligibility": ["All farmers with agricultural land"],
        "documents_required": ["Aadhaar Card", "Land Location Details"],
        "application_url": "https://soilhealth.dac.gov.in",
        "status": "active",
    },
    {
        "id": "scheme-enam",
        "name": "National Agriculture Market (e-NAM)",
        "local_name": "ರಾಷ್ಟ್ರೀಯ ಕೃಷಿ ಮಾರ್ಕೆಟ್",
        "ministry": "Ministry of Agriculture",
        "benefit_amount": "Online APMC trading, transparent pricing",
        "eligibility": [
            "Farmers registered in any APMC",
            "Valid mobile number required",
        ],
        "documents_required": ["Aadhaar Card", "Bank Account", "APMC Registration"],
        "application_url": "https://enam.gov.in",
        "status": "active",
    },
    {
        "id": "scheme-rkvy",
        "name": "Rashtriya Krishi Vikas Yojana (RKVY)",
        "local_name": "ರಾಷ್ಟ್ರೀಯ ಕೃಷಿ ವಿಕಾಸ ಯೋಜನೆ",
        "ministry": "Ministry of Agriculture",
        "benefit_amount": "Project-based funding for agricultural infrastructure",
        "eligibility": [
            "State government projects",
            "FPOs and cooperatives",
            "Individual farmers through state schemes",
        ],
        "documents_required": ["Aadhaar Card", "Land Records", "Project Proposal"],
        "application_url": "https://rkvy.nic.in",
        "status": "active",
    },
]


@router.get("", response_model=List[GovernmentScheme])
async def get_schemes():
    """Get all available government schemes for farmers."""
    return MOCK_SCHEMES


@router.get("/{scheme_id}", response_model=GovernmentScheme)
async def get_scheme(scheme_id: str):
    """Get details for a specific government scheme."""
    from fastapi import HTTPException
    scheme = next((s for s in MOCK_SCHEMES if s["id"] == scheme_id), None)
    if not scheme:
        raise HTTPException(status_code=404, detail=f"Scheme '{scheme_id}' not found.")
    return scheme
