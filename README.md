# 🌾 AgriSahayak
### AI-Powered Agricultural Intelligence Platform

AgriSahayak connects Indian farmers with AI-driven insights, market intelligence, voice-first advisory, and government scheme navigation — all through a simple, accessible mobile application.

---

## 🏗️ Technology Stack

### 📱 Mobile App
| Technology | Purpose |
|---|---|
| React Native | Cross-platform mobile framework |
| Expo | Development toolchain & native APIs |
| TypeScript | Type-safe development |
| Expo Router | File-based navigation |
| React Query (TanStack) | Server state, caching, loading states |
| Zustand | Lightweight global client state |

### 🖥️ Backend
| Technology | Purpose |
|---|---|
| Python 3.11+ | Primary language |
| FastAPI | Async REST API framework |
| Pydantic v2 | Data validation and settings |
| SQLAlchemy 2.0 | ORM for PostgreSQL |
| PostgreSQL | Primary database |
| Uvicorn | ASGI server |

### 🤖 Future AI Stack (Planned)
| Technology | Purpose |
|---|---|
| LangGraph | Multi-step AI agent orchestration |
| LangChain | LLM integration and tool calling |
| OpenAI / Gemini / Sarvam AI | LLM providers |
| pgvector | Vector similarity search for RAG |
| Bhashini / Sarvam | Multilingual speech (Indic languages) |
| Computer Vision (CV) | Crop quality image analysis |

---

## 📁 Project Structure

```
agrisahayak/
├── mobile/          ← React Native + Expo Mobile App
├── backend/         ← Python + FastAPI Backend
├── docs/            ← Architecture & Technical Docs
├── docker/          ← Docker configuration files
├── docker-compose.yml
├── .env.example     ← Root env reference
├── .gitignore
└── README.md
```

### `/mobile` — React Native + Expo App
The mobile application is the primary interface for Indian farmers.
- Feature-based architecture with Expo Router
- Preserves AgriSahayak Stitch design language
- Bottom tab navigation: Home, Marketplace, Assistant, Profile
- Connects to backend via API service layer

### `/backend` — FastAPI Backend
The backend powers all data, business logic, and AI services.
- Clean layered architecture: Routes → Services → Repositories → DB
- AI-ready: placeholder agents, tools, and RAG modules
- Deterministic matching algorithm for marketplace
- Voice processing API (placeholder for LLM integration)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your Android/iOS device

---

## 📱 Running the Mobile App

```bash
cd mobile
npm install
npx expo start
```

This opens the Expo Developer Tools in your browser.

**To run on Android Emulator:**
```bash
npx expo start --android
```

**To run on Expo Go (physical device):**
1. Install Expo Go from the Play Store / App Store
2. Run `npx expo start`
3. Scan the QR code with Expo Go

---

## 🖥️ Running the Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment config
cp .env.example .env

# Start the backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**API Documentation:** `http://localhost:8000/docs` (Swagger UI)

---

## ⚙️ Environment Configuration

### Mobile (`mobile/.env`)
```
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:8000/api/v1
```

### Backend (`backend/.env`)
```
APP_NAME=AgriSahayak
ENVIRONMENT=development
DEBUG=true
DATABASE_URL=postgresql://user:pass@localhost:5432/agrisahayak
```

---

## ⚠️ Important: Physical Device Configuration

> **Mobile devices cannot use `localhost` to reach your backend.**

When running Expo Go on a **physical Android/iOS device**, you must use your computer's **local network IP address**.

**Find your IP:**
- Windows: `ipconfig` → look for "IPv4 Address"
- macOS/Linux: `ifconfig` or `ip addr`

**Set in `mobile/.env`:**
```
EXPO_PUBLIC_API_URL=http://192.168.1.100:8000/api/v1
```

| Environment | API URL |
|---|---|
| Android Emulator | `http://10.0.2.2:8000/api/v1` |
| Expo Go (Physical Device) | `http://YOUR_LOCAL_IP:8000/api/v1` |
| Production | `https://api.agrisahayak.com/api/v1` |

---

## 🔌 Currently Connected APIs

| Mobile Feature | Backend Endpoint | Status |
|---|---|---|
| Marketplace Buyers | `GET /api/v1/marketplace/buyers` | ✅ Connected |
| Marketplace Matching | `POST /api/v1/marketplace/match` | ✅ Connected |
| Voice Processing | `POST /api/v1/voice/process` | ✅ Mock Connected |
| Farmer Profile | `GET/POST /api/v1/farmers` | ✅ Connected |
| Health Check | `GET /api/v1/health` | ✅ Connected |

All other screens use local mock data and will be connected incrementally.

---

## 🐳 Docker (Optional)

Docker is provided for backend + database only. The Expo development server runs locally.

```bash
docker-compose up
```

This starts:
- `agrisahayak-backend` on port 8000
- `agrisahayak-db` (PostgreSQL) on port 5432

---

## 📚 Documentation

- [System Architecture](docs/architecture/system-architecture.md)
- [Backend Roadmap](docs/architecture/backend-roadmap.md)

---

## 🤝 Contributing

This is a monorepo. Mobile and backend are independently runnable and independently deployable. Keep them strictly separated — all communication goes through the API layer.

---

*AgriSahayak — AI for Every Farmer 🌾*
