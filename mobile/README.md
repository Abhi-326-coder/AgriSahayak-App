# AgriSahayak Mobile App (React Native + Expo)

Mobile frontend application for **AgriSahayak** — AI-Powered Agricultural Intelligence Platform.

---

## 🌾 Overview

AgriSahayak is built specifically for Indian farmers with:
- **Mobile-first, voice-friendly UX** with high contrast and touch targets
- **Multilingual support** (Kannada `kn`, English `en`, Hindi `hi`)
- **Stitch Design System preservation**: Deep forest green (`#173F35`), Harvest gold (`#D9A441`), Warm ivory (`#F7F5EF`)
- **API service layer** decoupled with React Query (`@tanstack/react-query`) and Zustand

---

## 📁 Architecture

```
mobile/
├── app/                        # Expo Router screen routes
│   ├── _layout.tsx             # Root layout with QueryClientProvider
│   ├── index.tsx               # Entry redirect
│   ├── (tabs)/                 # Bottom navigation tabs
│   │   ├── _layout.tsx         # 4 Tabs: Home 🌾, Marketplace 🏪, Assistant 🎙️, Profile 👤
│   │   ├── index.tsx           # Farmer Dashboard
│   │   ├── marketplace.tsx     # Smart Marketplace & Buyer matching
│   │   ├── assistant.tsx       # AI Voice Advisor
│   │   └── profile.tsx         # Farmer account & settings
│   ├── crop-analysis/          # Crop Quality Intelligence & Disease Diagnosis
│   ├── government-benefits/    # Schemes & Direct Subsidies (PM-KISAN, PM-KUSUM)
│   ├── market-intelligence/    # APMC Mandi benchmarks
│   ├── buyer/[id].tsx          # Buyer details & Direct Deal locking
│   ├── smart-storage/          # Cold storage & Warehouse locator
│   ├── weather/                # Microclimate forecast & spraying advisory
│   ├── harvest/                # Harvest logs & Batch yield tracker
│   ├── knowledge-center/       # KVK & ICAR agricultural guides
│   ├── recommendations/        # Tailored AI recommendations
│   ├── impact/                 # Farmer income growth metrics
│   ├── onboarding/             # First-time user onboarding
│   └── auth/                   # Mobile number OTP login/registration
├── src/
│   ├── components/
│   │   ├── ui/                 # Button, Card, Badge, Loading
│   │   ├── layout/             # Screen, Header, BottomNavigation
│   │   └── shared/             # FarmerGreeting, BuyerCard, AIInsightBanner, QuickActionGrid, LanguageSelector, RecommendationCard
│   ├── features/               # Domain feature hooks (marketplace, voice-ai, dashboard)
│   ├── services/
│   │   ├── api/                # client.ts, marketplace.ts, farmers.ts, voice.ts
│   │   └── storage/            # AsyncStorage abstraction
│   ├── store/                  # Zustand store (farmer profile state)
│   ├── constants/              # colors.ts, typography.ts, spacing.ts, theme.ts
│   └── types/                  # TypeScript domain models
├── assets/images/              # App icon, splash, adaptive icon
├── app.json                    # Expo configuration
├── package.json                # Dependencies
└── tsconfig.json               # TypeScript configuration
```

---

## 🚀 Running the Mobile App

### 1. Install Dependencies

```bash
cd mobile
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set `EXPO_PUBLIC_API_URL` depending on your environment:

- **Android Emulator**: `http://10.0.2.2:8000/api/v1`
- **Physical Device (Expo Go)**: `http://<YOUR_COMPUTER_LAN_IP>:8000/api/v1` (e.g. `http://192.168.1.15:8000/api/v1`)
- **iOS Simulator**: `http://localhost:8000/api/v1`

> ⚠️ **Note for Physical Devices:** Physical smartphones cannot access `localhost` or `127.0.0.1`. Your phone and development PC must be on the same Wi-Fi network.

### 3. Start Expo

```bash
npx expo start
```

- Press `a` to open in Android Emulator
- Scan the displayed QR code using the **Expo Go** app on your physical Android or iPhone
