"""
AgriSahayak FastAPI Application
================================
Main entry point for the backend API server.

Architecture:
    MOBILE APP
        ↓
    FastAPI (this file)
        ↓
    API Routes (app/api/v1/routes/)
        ↓
    Services (app/services/)
        ↓
    Repositories (app/repositories/)
        ↓
    Database / External APIs
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.logging import logger
from app.core.exceptions import (
    AgriSahayakException,
    agrisahayak_exception_handler,
    http_exception_handler,
    generic_exception_handler,
)
from app.api.v1.router import api_router


# ------------------------------------
# Lifespan Events
# ------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events."""
    # Startup
    logger.info("=" * 50)
    logger.info(f"🌾 {settings.app_name} Backend Starting")
    logger.info(f"   Environment : {settings.environment}")
    logger.info(f"   Debug Mode  : {settings.debug}")
    logger.info(f"   Database    : {'Configured' if settings.database_configured else 'Using mock data'}")
    logger.info(f"   Docs URL    : http://localhost:8000/docs")
    logger.info("=" * 50)

    yield

    # Shutdown
    logger.info(f"🌾 {settings.app_name} Backend Shutting Down")


# ------------------------------------
# FastAPI App
# ------------------------------------

app = FastAPI(
    title=f"{settings.app_name} API",
    description="""
## 🌾 AgriSahayak — AI-Powered Agricultural Intelligence Platform

This API powers the AgriSahayak mobile application, connecting Indian farmers
with AI-driven insights, market intelligence, voice advisory, and government schemes.

### Current Capabilities (Phase 1)
- ✅ Farmer registration and profile management
- ✅ Marketplace buyer listing
- ✅ Deterministic buyer matching algorithm
- ✅ Voice intent processing (rule-based placeholder)
- ✅ Government schemes listing
- ✅ Crop information

### Future Capabilities (Roadmap)
- 🔜 PostgreSQL persistence (Phase 2)
- 🔜 LLM-powered voice AI (Phase 4)
- 🔜 LangGraph agent orchestration (Phase 5)
- 🔜 RAG for agricultural knowledge (Phase 6)
- 🔜 Multilingual voice with Bhashini/Sarvam AI (Phase 7)
- 🔜 Crop vision analysis (Phase 8)
    """,
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)


# ------------------------------------
# CORS Middleware
# ------------------------------------
# React Native / Expo does not use browser CORS in the same way,
# but we configure CORS for web-based testing and future web support.

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list + ["*"] if settings.is_development else settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


# ------------------------------------
# Exception Handlers
# ------------------------------------

app.add_exception_handler(AgriSahayakException, agrisahayak_exception_handler)
app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)


# ------------------------------------
# Routes
# ------------------------------------

# Include all API v1 routes
app.include_router(api_router, prefix=settings.api_v1_prefix)


# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    """Root endpoint — confirms API is running."""
    return {
        "service": settings.app_name,
        "tagline": "AI for Every Farmer 🌾",
        "version": "1.0.0",
        "environment": settings.environment,
        "docs": "/docs",
        "health": f"{settings.api_v1_prefix}/health",
    }
