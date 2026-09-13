"""
AgriSahayak AI Agents Package
==============================
This package will contain multi-step AI agents powered by LangGraph.

PLANNED AGENTS (Phase 5):
  - agricultural_agent: Main farmer advisory agent
    - Interprets farmer queries in multiple languages
    - Orchestrates tool calls (weather, market, schemes)
    - Returns actionable recommendations

  - market_agent: Market intelligence agent
    - Monitors mandi prices
    - Predicts price trends
    - Identifies arbitrage opportunities

  - voice_agent: Voice interaction agent
    - Manages turn-by-turn conversation
    - Handles multilingual voice sessions
    - Connects STT → LLM → TTS pipeline

ARCHITECTURE (Future):
  FARMER INPUT (voice/text)
      ↓
  SPEECH-TO-TEXT (Bhashini / Sarvam AI)
      ↓
  LANGUAGE DETECTION
      ↓
  AGRICULTURAL AGENT (LangGraph)
      ├── weather_tool
      ├── market_price_tool
      ├── scheme_eligibility_tool
      ├── crop_diagnosis_tool
      └── buyer_matching_tool
      ↓
  RESPONSE GENERATION (LLM)
      ↓
  TEXT-TO-SPEECH (Sarvam AI)
      ↓
  FARMER HEARS RESPONSE

NOTE: Do NOT implement AI here until Phase 4/5.
Keep the route layer calling service layer calling these agents.
"""
