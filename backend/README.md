# AgriSahayak FastAPI Backend

Production-ready backend API service for **AgriSahayak**, an AI-Powered Agricultural Intelligence Platform for Indian farmers.

---

## 🏗️ Architecture

```
agrisahayak/backend/
├── app/
│   ├── main.py              # FastAPI app initialization, CORS, lifespan, exception handlers
│   ├── api/v1/              # Versioned API routes (/api/v1/health, farmers, marketplace, voice, etc.)
│   ├── core/                # Configuration, logging, custom exceptions
│   ├── models/              # SQLAlchemy database models (Phase 2)
│   ├── schemas/             # Pydantic schemas for request/response validation
│   ├── services/            # Business logic and coordination layer
│   ├── repositories/        # Data access abstraction
│   ├── agents/              # AI agent workflows (Agricultural, Market, Voice)
│   ├── tools/               # Agent tool calling modules (Weather, Market, Schemes, Buyers)
│   ├── rag/                 # Retrieval Augmented Generation pipeline
│   └── db/                  # Database session and base model
├── tests/                   # Pytest test suite
├── Dockerfile               # Production container definition
├── requirements.txt         # Python dependencies
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- virtualenv

### 1. Setup Virtual Environment

```bash
cd backend
python -m venv venv

# Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# Linux / macOS:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Copy the example configuration:

```bash
cp .env.example .env
```

Default settings enable in-memory mock data (no PostgreSQL needed for Phase 1).

### 4. Run Development Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- API Base URL: `http://localhost:8000/api/v1`
- Swagger UI Documentation: `http://localhost:8000/docs`
- ReDoc Documentation: `http://localhost:8000/redoc`

---

## 📡 API Endpoints (Phase 1)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Service health status |
| `GET` | `/api/v1/health/detailed` | Component health breakdown |
| `GET` | `/api/v1/farmers` | List registered farmers |
| `POST` | `/api/v1/farmers` | Register/create farmer |
| `GET` | `/api/v1/farmers/{id}` | Get specific farmer |
| `GET` | `/api/v1/marketplace/buyers` | Fetch verified agricultural buyers |
| `POST` | `/api/v1/marketplace/match` | Deterministic buyer match scoring algorithm |
| `POST` | `/api/v1/voice/process` | Multilingual farmer voice query processing |
| `GET` | `/api/v1/voice/languages` | Supported Indian languages (Kannada, Hindi, etc.) |
| `GET` | `/api/v1/crops` | Crop catalog & real-time APMC price benchmarks |
| `GET` | `/api/v1/schemes` | Government agricultural schemes & subsidies |

---

## 🧪 Running Tests

```bash
pytest tests/ -v
```
