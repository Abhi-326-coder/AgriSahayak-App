from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse


class AgriSahayakException(Exception):
    """Base exception for AgriSahayak backend."""

    def __init__(self, message: str, code: str = "AGRISAHAYAK_ERROR"):
        self.message = message
        self.code = code
        super().__init__(message)


class NotFoundException(AgriSahayakException):
    """Raised when a resource is not found."""

    def __init__(self, resource: str, id: str):
        super().__init__(
            message=f"{resource} with id '{id}' not found.",
            code="NOT_FOUND",
        )


class ValidationException(AgriSahayakException):
    """Raised when input validation fails."""

    def __init__(self, message: str):
        super().__init__(message=message, code="VALIDATION_ERROR")


class ServiceException(AgriSahayakException):
    """Raised when a service layer operation fails."""

    def __init__(self, message: str):
        super().__init__(message=message, code="SERVICE_ERROR")


# ------------------------------------
# FastAPI Exception Handlers
# ------------------------------------

async def agrisahayak_exception_handler(
    request: Request, exc: AgriSahayakException
) -> JSONResponse:
    """Handle AgriSahayak-specific exceptions."""
    status_code = 404 if isinstance(exc, NotFoundException) else 400
    return JSONResponse(
        status_code=status_code,
        content={
            "error": exc.code,
            "message": exc.message,
        },
    )


async def http_exception_handler(
    request: Request, exc: HTTPException
) -> JSONResponse:
    """Handle FastAPI HTTP exceptions."""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": "HTTP_ERROR",
            "message": exc.detail,
        },
    )


async def generic_exception_handler(
    request: Request, exc: Exception
) -> JSONResponse:
    """Handle unexpected exceptions."""
    return JSONResponse(
        status_code=500,
        content={
            "error": "INTERNAL_SERVER_ERROR",
            "message": "An unexpected error occurred. Please try again.",
        },
    )
