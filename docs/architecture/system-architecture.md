# AgriSahayak System Architecture

High-level architecture documentation for **AgriSahayak: AI-Powered Agricultural Intelligence Platform**.

---

## 🏛️ End-to-End System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    INDIAN FARMER (ಬಳಕೆದಾರ)                   │
└──────────────────────────────┬──────────────────────────────┘
                               │ Voice (Kannada/Hindi/English)
                               │ Touch UI & Photo Scans
                               ▼
┌─────────────────────────────────────────────────────────────┐
│              MOBILE FRONTEND (React Native + Expo)          │
│                                                             │
│  • Expo Router (File-based Navigation)                      │
│  • 4-Tab Core: Home 🌾 | Market 🏪 | Advisor 🎙️ | Profile 👤│
│  • Modular Sub-screens (Crop Scan, Weather, Storage, Gov)   │
│  • React Query (Server State, Offline-ready Cache)          │
│  • Zustand (Farmer Profile Store)                           │
│  • Stitch Design System (Forest Green #173F35, Gold #D9A441)│
└──────────────────────────────┬──────────────────────────────┘
                               │ REST / JSON via HTTP
                               │ Base URL: EXPO_PUBLIC_API_URL
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 FASTAPI BACKEND (Python 3.11)               │
│                                                             │
│  [API Gateway & Router] (/api/v1)                           │
│  ├── /health & /health/detailed                             │
│  ├── /farmers (CRUD & Profile Management)                   │
│  ├── /marketplace/buyers & /marketplace/match               │
│  ├── /voice/process & /voice/languages                      │
│  ├── /crops & /schemes                                      │
│                                                             │
│  [Service Layer]                                            │
│  ├── FarmerService                                          │
│  ├── MarketplaceService (Deterministic Matching Algorithm)  │
│  └── CropService                                            │
│                                                             │
│  [Extensible AI Agent & Tool Subsystem]                     │
│  ├── app/agents/ (Agricultural, Market, Voice Agents)       │
│  ├── app/tools/ (Weather, Mandi, Schemes, Buyers)           │
│  └── app/rag/ (Ingestion, Retrieval, Embeddings)            │
│                                                             │
│  [Data Access Layer]                                        │
│  ├── Repositories (Farmer, Buyer, Listing)                  │
│  └── SQLAlchemy Models (PostgreSQL + pgvector ready)        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔒 Architectural Guardrails

1. **Separation of Concerns**: Mobile and backend are strictly separated in `/mobile` and `/backend`.
2. **Zero Leaked Logic**: UI screens do not calculate pricing or scoring; they invoke backend endpoints.
3. **Deterministic Core**: Matching buyers, distance calculations, and financial eligibility are purely deterministic (rule-based algorithm), while AI/LLMs are reserved for understanding intent and natural language.
4. **Resilient Connectivity**: Mobile handles loading, network errors, and retries gracefully for rural environments with intermittent connectivity.
