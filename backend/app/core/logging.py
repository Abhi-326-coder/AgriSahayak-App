import logging
import sys
from app.core.config import settings


def setup_logging() -> logging.Logger:
    """
    Configure structured logging for AgriSahayak backend.
    """
    log_level = logging.DEBUG if settings.debug else logging.INFO

    # Configure root logger
    logging.basicConfig(
        level=log_level,
        format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        handlers=[
            logging.StreamHandler(sys.stdout),
        ],
    )

    # Suppress noisy third-party loggers
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("httpx").setLevel(logging.WARNING)

    logger = logging.getLogger("agrisahayak")
    logger.info(
        f"AgriSahayak Backend starting | env={settings.environment} | debug={settings.debug}"
    )
    return logger


logger = setup_logging()
