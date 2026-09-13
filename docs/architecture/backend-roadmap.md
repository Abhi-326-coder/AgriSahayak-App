# AgriSahayak Backend Phased Roadmap

A structured evolution from Phase 1 mock foundation to an autonomous, multimodal agricultural intelligence backend.

---

## 🗺️ Implementation Phases

### Phase 1: Core Foundation & Mock Architecture (Completed ✅)
- FastAPI application scaffolding with CORS, lifespan, and custom exception handling.
- Deterministic marketplace matching endpoint (`/api/v1/marketplace/match`).
- Mock buyer repository and farmer CRUD.
- Multilingual voice intent routing placeholder (`/api/v1/voice/process`).
- Pydantic v2 schemas and modular service layer.
- Pytest integration tests.

### Phase 2: PostgreSQL & SQLAlchemy ORM
- Activate `app/db/session.py` and `app/db/base.py`.
- Alembic database migrations.
- Migrate in-memory entities (`FarmerModel`, `BuyerModel`, `ListingModel`) to relational tables.
- Add indexing on geo-coordinates and crop identifiers.

### Phase 3: Advanced Marketplace Matching & Geospatial Routing
- PostGIS integration for exact road-distance calculations between farm gate and buyer logistics hubs.
- Dynamic bid-ask price clearing with commission-free direct booking.

### Phase 4: Large Language Model (LLM) Integration
- Integration of Gemini 1.5 Pro / Flash or open-source Indic LLMs.
- Strict Pydantic structured output parsing for farmer agricultural queries.
- Prompt templates for agronomy diagnosis and mandi timing advice.

### Phase 5: LangGraph Multi-Agent Orchestration
- Implement state graph in `app/agents/`:
  - **Supervisor Agent**: Routes intent between agronomy, market, and welfare.
  - **Agricultural Specialist Agent**: Disease diagnosis and fertigation schedule.
  - **Market Intelligence Agent**: Mandi price trends and buyer deal negotiation.
  - **Scheme Navigator Agent**: Form filling and subsidy verification.

### Phase 6: Agricultural RAG (Retrieval-Augmented Generation)
- Activate `app/rag/`:
  - Embeddings via BGE-M3 or IndicBERT.
  - Vector database (pgvector or Qdrant).
  - Knowledge corpus: ICAR package of practices, State Agricultural University (UAS) handbooks, APMC price archives, PM-KISAN guidelines.

### Phase 7: Multilingual Voice Subsystem (Bhashini & Sarvam AI)
- Integration of Bhashini / Sarvam AI Speech-to-Text (STT) for Kannada, Hindi, Telugu, Tamil, and Marathi dialects.
- Real-time streaming audio processing.
- Text-to-Speech (TTS) natural farmer voice synthesis.

### Phase 8: Computer Vision for Crop Disease
- Mobile image upload pipeline to backend.
- MobileNet / EfficientNet or Gemini multimodal vision for crop leaf spot, blight, and pest detection.
- Severity grading and automated chemical/organic spray prescriptions.
