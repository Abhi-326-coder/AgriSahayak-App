"""Service layer for business logic.
Decouples API routes from data storage and future AI agent workflows.
"""
from typing import List, Optional, Dict, Any

class FarmerService:
    @staticmethod
    def get_farmer(farmer_id: int) -> Optional[Dict[str, Any]]:
        # In-memory mock
        from app.api.v1.routes.farmers import MOCK_FARMERS
        for f in MOCK_FARMERS:
            if f.get("id") == farmer_id:
                return f
        return None

class MarketplaceService:
    @staticmethod
    def match_buyers(crop: str, quantity: float, quality: str, location: str) -> List[Dict[str, Any]]:
        from app.api.v1.routes.marketplace import MOCK_BUYERS, _calculate_match_score
        scored = []
        for b in MOCK_BUYERS:
            b_copy = dict(b)
            score = _calculate_match_score(b_copy, crop, quantity, quality, location)
            b_copy["match_score"] = score
            scored.append(b_copy)
        scored.sort(key=lambda x: x["match_score"], reverse=True)
        return scored

class CropService:
    @staticmethod
    def get_crops() -> List[Dict[str, Any]]:
        from app.api.v1.routes.crops import MOCK_CROPS
        return MOCK_CROPS
