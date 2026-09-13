"""
AgriSahayak Database Session
==============================
Phase 2: Enable PostgreSQL by uncommenting SQLAlchemy setup.
"""

# ------------------------------------
# Phase 2: PostgreSQL + SQLAlchemy
# ------------------------------------
# Uncomment when DATABASE_URL is configured:
#
# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
# from app.core.config import settings
#
# engine = create_async_engine(
#     settings.database_url.replace("postgresql://", "postgresql+asyncpg://"),
#     echo=settings.debug,
#     pool_pre_ping=True,
# )
#
# AsyncSessionLocal = async_sessionmaker(
#     engine,
#     class_=AsyncSession,
#     expire_on_commit=False,
# )
#
# async def get_db():
#     async with AsyncSessionLocal() as session:
#         try:
#             yield session
#         finally:
#             await session.close()
