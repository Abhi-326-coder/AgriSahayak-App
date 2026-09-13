# TASK: SET UP THE AGRISAHAYAK MOBILE APP + BACKEND DEVELOPMENT WORKSPACE

I already have a complete **AgriSahayak AI Platform Prototype 1 UI prototype** generated in Stitch.

Stitch is connected to this environment through MCP.

My goal is to build **AgriSahayak as a real mobile application**, not as a web application.

Your primary task is to create a clean, production-style full-stack development workspace for the AgriSahayak project while preserving and reusing the existing Stitch-generated design.

---

# PROJECT NAME

# AgriSahayak

### Tagline

AI-Powered Agricultural Intelligence Platform

---

# PRIMARY ARCHITECTURAL REQUIREMENT

Create a monorepo-style project structure with completely separate mobile frontend and backend folders.

Use:

* Mobile App → React Native + Expo
* Backend → Python + FastAPI

The structure should look like:

```text
agrisahayak/

├── mobile/
├── backend/
├── docs/
├── docker/
├── README.md
├── .gitignore
├── docker-compose.yml
└── .env.example
```

The mobile application and backend must be independently runnable.

---

# IMPORTANT: THIS IS A MOBILE APP

Do NOT create:

* Next.js
* React web application
* HTML pages
* Web-only components
* Browser-specific architecture

Create a proper:

# React Native + Expo Mobile Application

The application should work on:

* Android
* iOS

Primary development target:

# Android

The application should also be testable using:

# Expo Go

---

# MOBILE FRONTEND TECHNOLOGY

Use:

* React Native
* Expo
* TypeScript
* Expo Router
* NativeWind only if it helps preserve the Stitch visual design
* React Query / TanStack Query for API state management
* Zustand only if lightweight global state is required

Use Expo-compatible libraries wherever possible.

Avoid unnecessary dependencies.

---

# IMPORTANT STITCH MCP REQUIREMENT

Before changing or generating the mobile UI:

1. Inspect the existing Stitch-generated AgriSahayak design through the available Stitch MCP connection.
2. Identify all existing screens, navigation patterns, components and visual elements.
3. Use the Stitch prototype as the visual source of truth.
4. Preserve the design language.
5. Convert the Stitch design into proper React Native mobile UI.
6. Do not create a generic mobile template.
7. Do not redesign the project unnecessarily.

IMPORTANT:

Stitch may provide web-oriented UI designs.

Do NOT directly copy web HTML or CSS.

Instead:

Convert the visual design into React Native equivalents.

Example:

```text
Web Card
↓
React Native View
```

```text
HTML Button
↓
React Native Pressable
```

```text
HTML Input
↓
React Native TextInput
```

```text
Web Navigation
↓
Expo Router Navigation
```

```text
Web Image
↓
React Native Image
```

The final mobile app should visually feel as close as possible to the Stitch prototype while following proper mobile UX principles.

---

# DESIGN REQUIREMENTS

Preserve the existing AgriSahayak visual identity from Stitch.

Preserve:

* Color palette
* Typography
* Agricultural theme
* AI theme
* Cards
* Icons
* Layout hierarchy
* Dashboard design
* Voice AI visuals
* Marketplace visuals
* Crop Analysis visuals
* Government Benefits visuals
* Market Intelligence visuals

The application should feel:

🌾 Agricultural

🤖 AI-Powered

🇮🇳 Indian Farmer Focused

📱 Mobile-First

🎙️ Voice-Friendly

💡 Modern

❤️ Simple and Accessible

---

# MOBILE UX REQUIREMENTS

The users may have limited technical knowledge.

Therefore:

* Large buttons
* Clear icons
* Large touch targets
* Minimal typing
* Voice-first interactions
* Simple navigation
* Clear language
* Avoid clutter
* Important actions should be easy to find

Use:

* Bottom tab navigation for primary features
* Stack navigation for details
* Modal or bottom sheet where appropriate

Do not simply shrink a desktop dashboard into a mobile screen.

Adapt the Stitch UI intelligently for mobile.

---

# MOBILE APP REQUIREMENTS

Create the mobile application inside:

```text
mobile/
```

Use:

```text
React Native
Expo
TypeScript
Expo Router
```

---

# MOBILE PROJECT STRUCTURE

Use a clean feature-based architecture.

```text
mobile/

├── app/
│
│   ├── _layout.tsx
│   │
│   ├── index.tsx
│   │
│   ├── onboarding/
│   │   └── index.tsx
│   │
│   ├── auth/
│   │   ├── login.tsx
│   │   └── register.tsx
│   │
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── marketplace.tsx
│   │   ├── assistant.tsx
│   │   └── profile.tsx
│   │
│   ├── voice-ai/
│   │   └── index.tsx
│   │
│   ├── crop-analysis/
│   │   └── index.tsx
│   │
│   ├── government-benefits/
│   │   └── index.tsx
│   │
│   ├── market-intelligence/
│   │   └── index.tsx
│   │
│   ├── buyer/
│   │   └── [id].tsx
│   │
│   ├── smart-storage/
│   │   └── index.tsx
│   │
│   ├── weather/
│   │   └── index.tsx
│   │
│   ├── harvest/
│   │   └── index.tsx
│   │
│   ├── knowledge-center/
│   │   └── index.tsx
│   │
│   ├── recommendations/
│   │   └── index.tsx
│   │
│   └── impact/
│       └── index.tsx
│
├── src/
│
│   ├── components/
│   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Loading.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Screen.tsx
│   │   │   ├── Header.tsx
│   │   │   └── BottomNavigation.tsx
│   │   │
│   │   └── shared/
│   │       ├── FarmerGreeting.tsx
│   │       ├── RecommendationCard.tsx
│   │       └── LanguageSelector.tsx
│   │
│   ├── features/
│   │
│   │   ├── dashboard/
│   │   ├── marketplace/
│   │   ├── voice-ai/
│   │   ├── crop-analysis/
│   │   ├── government-benefits/
│   │   ├── market-intelligence/
│   │   ├── weather/
│   │   └── farmer-profile/
│   │
│   ├── services/
│   │
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── marketplace.ts
│   │   │   ├── farmers.ts
│   │   │   └── voice.ts
│   │   │
│   │   └── storage/
│   │       └── storage.ts
│   │
│   ├── hooks/
│   │
│   ├── store/
│   │
│   ├── types/
│   │
│   ├── constants/
│   │
│   └── utils/
│
├── assets/
│
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── app.json
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

# NAVIGATION ARCHITECTURE

Use Expo Router.

Recommended primary navigation:

```text
HOME
│
├── Marketplace
│
├── AI Assistant
│
├── Profile
│
└── More Features
```

Use bottom tabs for:

### 🌾 Home

Dashboard and recommendations.

### 🏪 Marketplace

Buyers and market opportunities.

### 🎙️ AI Assistant

Voice AI agricultural advisor.

### 👤 Profile

Farmer profile and settings.

Other features can be opened from:

* Dashboard cards
* More menu
* Recommendations
* AI Assistant actions

---

# EXISTING STITCH PROTOTYPE SCREENS

The existing Stitch prototype includes screens such as:

* Dashboard
* Government Benefits
* AI Voice Assistant
* AI Call Center
* Crop Analysis
* Marketplace
* Market Intelligence
* Buyer Details
* Smart Storage
* Weather Intelligence
* My Harvest
* Knowledge Center
* AI Recommendations
* Impact Dashboard

Preserve these screens and their navigation structure where practical.

Adapt them properly for mobile.

---

# IMPORTANT MOBILE UI PRINCIPLE

Do NOT try to put every feature on the bottom navigation.

Use a clean mobile architecture.

Example:

```text
BOTTOM NAVIGATION

🌾 Home

🏪 Marketplace

🎙️ Assistant

👤 Profile
```

From Home and Assistant, users can navigate to:

```text
Government Benefits

Crop Analysis

Market Intelligence

Weather

Smart Storage

Knowledge Center

Recommendations

Impact
```

---

# MOBILE FRONTEND IMPLEMENTATION RULES

Initially:

1. Preserve the Stitch visual design.
2. Keep prototype screens functional.
3. Keep existing mock data temporarily.
4. Create a clean API service layer.
5. Do not tightly couple UI components to backend URLs.
6. Store backend base URL in environment variables.
7. Make the app mobile responsive.
8. Support Android screen sizes.
9. Prepare the app for future iOS compatibility.

---

# API SERVICE ARCHITECTURE

Do NOT directly call backend APIs inside screen components.

Use:

```text
SCREEN

↓

FEATURE HOOK / FEATURE SERVICE

↓

API SERVICE

↓

API CLIENT

↓

BACKEND
```

Example:

```text
Voice AI Screen

↓

useVoiceAssistant()

↓

voiceService

↓

apiClient

↓

FastAPI
```

---

# CREATE API CLIENT

Create:

```text
mobile/src/services/api/client.ts
```

All mobile-to-backend communication should go through this API client.

Use:

```text
EXPO_PUBLIC_API_URL
```

Example:

```text
http://YOUR_LOCAL_IP:8000/api/v1
```

IMPORTANT:

Do NOT assume:

```text
localhost
```

will work from a physical mobile device.

The API configuration must support:

* Android Emulator
* Expo Go on physical device
* Local development
* Future production deployment

Document how to configure each environment.

---

# MOBILE ENVIRONMENT VARIABLES

Create:

```text
mobile/.env.example
```

Include:

```text
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:8000/api/v1
```

Do not hardcode backend URLs.

---

# BACKEND REQUIREMENTS

Create a completely separate backend inside:

```text
backend/
```

Use:

* Python
* FastAPI
* Pydantic
* SQLAlchemy
* PostgreSQL

The backend should be designed to support future:

* AI Agents
* LLMs
* LangGraph
* Voice AI
* RAG
* Computer Vision
* Government Schemes
* Market Intelligence

IMPORTANT:

Do not over-engineer.

Do not implement every feature now.

Create a clean and maintainable foundation.

---

# BACKEND STRUCTURE

Use:

```text
backend/

├── app/
│
│   ├── main.py
│
│   ├── api/
│   │
│   │   └── v1/
│   │
│   │       ├── routes/
│   │       │
│   │       │   ├── health.py
│   │       │   ├── farmers.py
│   │       │   ├── marketplace.py
│   │       │   ├── crops.py
│   │       │   ├── voice.py
│   │       │   └── schemes.py
│   │       │
│   │       └── router.py
│
│   ├── core/
│   │
│   │   ├── config.py
│   │   ├── logging.py
│   │   └── exceptions.py
│
│   ├── models/
│   │
│   │   ├── farmer.py
│   │   ├── crop.py
│   │   ├── buyer.py
│   │   └── listing.py
│
│   ├── schemas/
│   │
│   │   ├── farmer.py
│   │   ├── crop.py
│   │   ├── buyer.py
│   │   └── marketplace.py
│
│   ├── services/
│   │
│   │   ├── farmer_service.py
│   │   ├── marketplace_service.py
│   │   └── crop_service.py
│
│   ├── repositories/
│   │
│   │   ├── farmer_repository.py
│   │   ├── buyer_repository.py
│   │   └── listing_repository.py
│
│   ├── agents/
│   │
│   │   ├── README.md
│   │   │
│   │   ├── agricultural_agent/
│   │   │   └── __init__.py
│   │   │
│   │   ├── market_agent/
│   │   │   └── __init__.py
│   │   │
│   │   └── voice_agent/
│   │       └── __init__.py
│
│   ├── tools/
│   │
│   │   ├── README.md
│   │   │
│   │   ├── market/
│   │   │   └── __init__.py
│   │   │
│   │   ├── weather/
│   │   │   └── __init__.py
│   │   │
│   │   ├── schemes/
│   │   │   └── __init__.py
│   │   │
│   │   └── buyers/
│   │       └── __init__.py
│
│   ├── rag/
│   │
│   │   ├── README.md
│   │   │
│   │   ├── ingestion/
│   │   ├── retrieval/
│   │   └── embeddings/
│
│   └── db/
│
│       ├── base.py
│       └── session.py
│
├── tests/
│
├── requirements.txt
├── .env.example
└── README.md
```

---

# API VERSIONING

All APIs should use:

```text
/api/v1/
```

Examples:

```text
GET /api/v1/health

GET /api/v1/farmers

GET /api/v1/marketplace/buyers
```

---

# INITIAL BACKEND IMPLEMENTATION

Only implement the following endpoints now.

---

# HEALTH CHECK

```text
GET /api/v1/health
```

Response:

```json
{
  "status": "healthy",
  "service": "agrisahayak-backend"
}
```

---

# FARMER API

Create:

```text
GET /api/v1/farmers
```

and:

```text
POST /api/v1/farmers
```

Use temporary in-memory mock data initially.

Do not require PostgreSQL for the application to start.

---

# MARKETPLACE API

Create:

```text
GET /api/v1/marketplace/buyers
```

Return mock buyers.

Example:

```json
[
  {
    "id": 1,
    "name": "GreenHarvest Foods",
    "type": "Food Processor",
    "crop": "Tomato",
    "price": 31,
    "distance": 25,
    "match_score": 94
  },
  {
    "id": 2,
    "name": "Bengaluru Fresh Market",
    "type": "Wholesale Buyer",
    "crop": "Tomato",
    "price": 29,
    "distance": 12,
    "match_score": 91
  }
]
```

---

# MARKETPLACE MATCHING API

Create:

```text
POST /api/v1/marketplace/match
```

Request:

```json
{
  "crop": "Tomato",
  "quantity": 2000,
  "quality": "Good",
  "location": "Bengaluru"
}
```

Initially use a simple deterministic scoring algorithm.

Score based on:

* Crop Match
* Quantity Match
* Quality Match
* Distance
* Price

Return ranked buyers.

DO NOT use AI here.

This should remain deterministic and explainable.

---

# VOICE AI PLACEHOLDER

Create:

```text
POST /api/v1/voice/process
```

Input:

```json
{
  "text": "I have 2000 kg tomatoes. Where should I sell?",
  "language": "en"
}
```

Return:

```json
{
  "intent": "SELL_PRODUCE",
  "crop": "Tomato",
  "quantity": 2000,
  "language": "en",
  "next_action": "MARKETPLACE"
}
```

IMPORTANT:

This is only a placeholder.

Do not integrate a real LLM yet.

Create the architecture so that this can later be replaced with:

```text
LLM

↓

LangGraph

↓

Tool Calling

↓

Multilingual AI
```

---

# VOICE AI MOBILE PREPARATION

Prepare the mobile architecture for future voice integration.

Future flow:

```text
FARMER SPEAKS

↓

MICROPHONE

↓

SPEECH TO TEXT

↓

LANGUAGE DETECTION

↓

FASTAPI

↓

AI AGENT

↓

TOOLS

↓

RECOMMENDATION

↓

TEXT TO SPEECH

↓

FARMER HEARS RESPONSE
```

Do NOT implement a real voice provider yet.

For now:

* Create voice UI.
* Create microphone button.
* Use text-based mock flow.
* Connect the text to `/voice/process`.
* Show AI processing state.
* Show recommendation.

Keep the architecture ready for future:

* Bhashini
* Sarvam AI
* Speech-to-Text
* Text-to-Speech
* Real-time Voice AI

---

# DATABASE

Prepare database configuration for:

# PostgreSQL

Use:

# SQLAlchemy

But PostgreSQL must NOT be required for the initial app to run.

The application should initially work with mock data.

Later add:

```text
PostgreSQL
```

and:

```text
pgvector
```

---

# BACKEND ENVIRONMENT VARIABLES

Create:

```text
backend/.env.example
```

Include:

```text
APP_NAME=AgriSahayak

ENVIRONMENT=development

DEBUG=true

DATABASE_URL=

LLM_API_KEY=

VOICE_API_KEY=
```

---

# CORS

Configure FastAPI CORS for mobile development.

Allow development origins where required.

IMPORTANT:

React Native applications do not behave exactly like browser-based frontend applications.

Do not rely only on:

```text
http://localhost:3000
```

Configure CORS appropriately for:

* Expo development
* Android emulator
* Future web support if added

Keep the configuration environment-based and restrictive enough for production later.

---

# MOBILE TO BACKEND COMMUNICATION

The architecture must be:

```text
REACT NATIVE MOBILE APP

↓

API CLIENT

↓

FASTAPI

↓

SERVICES

↓

BUSINESS LOGIC

↓

DATA / AI / TOOLS
```

Do not mix backend logic into the mobile app.

---

# INITIAL MOBILE INTEGRATION

Connect only these mobile features to backend mock APIs initially.

---

## MARKETPLACE

Mobile App

↓

GET buyers

↓

FastAPI Backend

Display backend data in the existing Stitch-based Marketplace UI.

---

## MARKETPLACE MATCHING

Farmer crop details

↓

POST marketplace/match

↓

Backend deterministic algorithm

↓

Ranked buyers

↓

Display recommendation

---

## VOICE AI DEMO

Mobile Voice AI UI

↓

POST voice/process

↓

Backend mock processing

↓

Structured result

↓

Display recommendation

---

## FARMER PROFILE

Mobile App

↓

GET / POST farmer

↓

Backend

---

Everything else can continue using mock data.

---

# MOBILE STATE MANAGEMENT

Keep state management simple.

Use:

# React Query

for:

* API requests
* Server state
* Loading state
* Error state
* Caching

Use:

# Zustand

only if lightweight global client state is genuinely needed.

Do not introduce Redux unless absolutely necessary.

---

# API STATES

Every backend-connected mobile screen should properly handle:

```text
LOADING
```

```text
SUCCESS
```

```text
ERROR
```

```text
EMPTY STATE
```

Do not leave blank screens.

---

# OFFLINE-FIRST PREPARATION

Farmers may have unreliable internet.

Do not implement full offline synchronization yet, but prepare the architecture for future offline support.

Use:

* Clear network error handling
* Retry option
* Cached data where practical
* API service abstraction

Future possibilities:

```text
Offline Cache

↓

Queued Actions

↓

Sync When Connected
```

---

# MOBILE ACCESSIBILITY

Keep the application accessible for farmers.

Use:

* Large text
* Large buttons
* High contrast
* Clear icons
* Minimal typing
* Voice-first flows
* Simple language
* Native language support preparation

---

# DOCUMENTATION

Create:

```text
docs/
```

Inside:

```text
docs/architecture/
```

Create:

```text
system-architecture.md
```

Explain:

```text
FARMER

↓

MOBILE APP

↓

FASTAPI

↓

SERVICES

↓

DATA / AI / TOOLS

↓

RECOMMENDATION
```

---

Create:

```text
docs/architecture/backend-roadmap.md
```

Include future modules:

```text
PHASE 1

Core Backend APIs

↓

PHASE 2

PostgreSQL

↓

PHASE 3

Marketplace Matching

↓

PHASE 4

LLM Integration

↓

PHASE 5

LangGraph Agent

↓

PHASE 6

RAG

↓

PHASE 7

Multilingual Voice

↓

PHASE 8

Crop Vision
```

---

# ROOT README

Create a comprehensive README.md.

Include:

# AgriSahayak

AI-Powered Agricultural Intelligence Platform

---

# Technology Stack

## Mobile

React Native

Expo

TypeScript

Expo Router

React Query

---

## Backend

Python

FastAPI

Pydantic

SQLAlchemy

PostgreSQL

---

## Future AI

LLM

LangGraph

RAG

Tool Calling

Multilingual Voice

Computer Vision

---

# PROJECT STRUCTURE

Explain:

```text
/mobile
```

Contains:

React Native and Expo mobile application.

---

```text
/backend
```

Contains:

APIs, business logic, AI services and data services.

---

# RUNNING MOBILE APP

Provide exact commands.

Expected setup:

```bash
cd mobile
npm install
npx expo start
```

Explain how to run:

* Expo Go
* Android Emulator

---

# RUNNING BACKEND

Provide exact commands.

Expected setup:

```bash
cd backend
python -m venv venv
```

Activate virtual environment.

Install:

```bash
pip install -r requirements.txt
```

Run:

```bash
uvicorn app.main:app --reload
```

---

# ENVIRONMENT SETUP

Explain:

Mobile environment variables.

Backend environment variables.

IMPORTANT:

Explain that physical mobile devices cannot use backend `localhost` directly.

Document the correct use of local network IP or an accessible development tunnel.

---

# DOCKER

Create:

```text
docker-compose.yml
```

But keep Docker optional.

The project must be runnable locally without Docker.

Prepare Docker configuration primarily for backend and database future use.

Do not containerize the Expo development workflow unnecessarily.

---

# IMPORTANT DEVELOPMENT RULES

Follow these principles.

---

## RULE 1

Mobile frontend and backend must remain completely separate.

Mobile:

```text
/mobile
```

Backend:

```text
/backend
```

---

## RULE 2

Do not move backend code into the mobile application.

Do not move mobile UI code into backend.

---

## RULE 3

Mobile communicates with backend only through APIs.

---

## RULE 4

Use environment variables.

Never hardcode:

* API URLs
* Secrets
* API Keys
* Database URLs

---

## RULE 5

Do not tightly couple AI logic with API routes.

Future architecture:

```text
API ROUTE

↓

SERVICE

↓

AGENT

↓

TOOLS

↓

EXTERNAL APIs
```

---

## RULE 6

AI should not perform deterministic calculations.

Example:

```text
AI

↓

Understands farmer request
```

```text
ALGORITHM

↓

Calculates best match
```

---

## RULE 7

Keep modules independent.

Future AI modules should be pluggable.

---

## RULE 8

The Stitch prototype is the visual source of truth.

Do not replace it with a generic Expo starter UI.

---

## RULE 9

Adapt Stitch designs to mobile intelligently.

Do not simply compress desktop UI into a phone screen.

---

# SUCCESS CRITERIA

After completing the setup, the project should:

✓ Use React Native.

✓ Use Expo.

✓ Use TypeScript.

✓ Use Expo Router.

✓ Preserve the Stitch design language.

✓ Adapt Stitch screens properly for mobile.

✓ Have separate `/mobile` and `/backend` folders.

✓ Run the mobile app independently.

✓ Run the backend independently.

✓ Mobile app communicates with backend.

✓ Health endpoint works.

✓ Marketplace mock API works.

✓ Marketplace matching works.

✓ Voice processing mock API works.

✓ Farmer API works.

✓ Environment variables work.

✓ Project is documented.

✓ Backend is ready for AI integration.

✓ Mobile app is ready for real voice integration.

✓ Existing Stitch design is preserved as closely as possible.

---

# DO NOT DO YET

Do NOT:

* Integrate a real LLM
* Integrate LangGraph
* Integrate a vector database
* Build RAG
* Integrate payment
* Build complete authentication
* Build real telephony
* Integrate crop ML models
* Connect government APIs
* Build production voice calling

We will implement these features incrementally.

---

# FINAL TASK

After creating the project:

1. Show the complete folder structure.
2. Explain how to start the Expo mobile application.
3. Explain how to run the app using Expo Go.
4. Explain how to start the FastAPI backend.
5. Explain how to configure the mobile app to reach the backend.
6. Explain which mobile features are currently connected to APIs.
7. Explain which backend modules are placeholders for future development.
8. Identify any assumptions made while converting the Stitch UI into React Native mobile components.
9. Confirm that the Stitch design was preserved and adapted rather than redesigned.

Do not stop halfway.

Create a clean, maintainable foundation for building the complete AgriSahayak mobile platform feature by feature.

The architecture should allow me to independently focus on backend development while preserving a separate, reusable React Native + Expo mobile frontend.
