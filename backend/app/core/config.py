from pydantic_settings import BaseSettings
from pydantic import Field
from typing import List
import os


class Settings(BaseSettings):
    """
    AgriSahayak Backend Configuration
    All settings are loaded from environment variables or .env file.
    """

    # Application
    app_name: str = Field(default="AgriSahayak", alias="APP_NAME")
    environment: str = Field(default="development", alias="ENVIRONMENT")
    debug: bool = Field(default=True, alias="DEBUG")

    # API
    api_v1_prefix: str = Field(default="/api/v1", alias="API_V1_PREFIX")

    # Security
    secret_key: str = Field(
        default="dev-secret-key-change-in-production", alias="SECRET_KEY"
    )

    # Database (optional for Phase 1)
    database_url: str = Field(default="", alias="DATABASE_URL")

    # CORS
    cors_origins: str = Field(
        default="http://localhost:8081,http://localhost:19006,http://10.0.2.2:8081",
        alias="CORS_ORIGINS",
    )

    # AI / LLM (Phase 4+)
    llm_provider: str = Field(default="", alias="LLM_PROVIDER")
    llm_api_key: str = Field(default="", alias="LLM_API_KEY")
    llm_model: str = Field(default="", alias="LLM_MODEL")

    # Voice AI (Phase 7)
    gemini_api_key: str = Field(default="", alias="GEMINI_API_KEY")
    sarvam_api_key: str = Field(default="", alias="SARVAM_API_KEY")
    bhashini_api_key: str = Field(default="", alias="BHASHINI_API_KEY")

    # Weather
    weather_api_key: str = Field(default="", alias="WEATHER_API_KEY")

    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins from comma-separated string."""
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def is_development(self) -> bool:
        return self.environment == "development"

    @property
    def is_production(self) -> bool:
        return self.environment == "production"

    @property
    def database_configured(self) -> bool:
        return bool(self.database_url)

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": False,
        "populate_by_name": True,
    }


# Singleton settings instance
settings = Settings()
