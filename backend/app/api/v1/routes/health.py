from fastapi import APIRouter
from datetime import datetime

router = APIRouter()


@router.get("")
async def health_check():
    """
    Health check endpoint.
    Returns service status and basic info.
    """
    return {
        "status": "healthy",
        "service": "agrisahayak-backend",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat(),
    }


@router.get("/detailed")
async def health_check_detailed():
    """
    Detailed health check including dependency status.
    """
    from app.core.config import settings

    return {
        "status": "healthy",
        "service": "agrisahayak-backend",
        "version": "1.0.0",
        "environment": settings.environment,
        "timestamp": datetime.utcnow().isoformat(),
        "dependencies": {
            "database": "not_configured" if not settings.database_url else "pending_check",
            "llm": "not_configured" if not settings.llm_api_key else "configured",
            "voice_ai": "not_configured" if not settings.sarvam_api_key else "configured",
        },
    }
