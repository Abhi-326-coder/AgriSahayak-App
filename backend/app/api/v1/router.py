from fastapi import APIRouter
from app.api.v1.routes import health, farmers, marketplace, voice, crops, schemes, live

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["Health"])
api_router.include_router(farmers.router, prefix="/farmers", tags=["Farmers"])
api_router.include_router(marketplace.router, prefix="/marketplace", tags=["Marketplace"])
api_router.include_router(voice.router, prefix="/voice", tags=["Voice AI"])
api_router.include_router(crops.router, prefix="/crops", tags=["Crops"])
api_router.include_router(schemes.router, prefix="/schemes", tags=["Government Schemes"])
api_router.include_router(live.router, prefix="/live", tags=["Live AI"])
