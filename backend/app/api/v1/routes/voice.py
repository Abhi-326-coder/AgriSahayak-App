from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Optional, List

router = APIRouter()

# ------------------------------------
# Schemas
# ------------------------------------

class VoiceProcessRequest(BaseModel):
    text: str = Field(..., min_length=1, example="I have 2000 kg tomatoes. Where should I sell?")
    language: str = Field(default="en", example="en")  # en, kn, hi, te, ta
    farmer_id: Optional[str] = Field(default=None, example="farmer-001")


class VoiceProcessResponse(BaseModel):
    intent: str
    crop: Optional[str]
    quantity: Optional[int]
    location: Optional[str]
    language: str
    confidence: float
    next_action: str
    message: str
    suggested_queries: List[str]


# ------------------------------------
# Intent Detection (Placeholder)
# ------------------------------------
#
# ARCHITECTURE NOTE:
# This is a deterministic rule-based placeholder.
# Future implementation will follow this flow:
#
#   TEXT INPUT
#       ↓
#   LANGUAGE DETECTION (Bhashini / Sarvam)
#       ↓
#   TRANSLATION TO ENGLISH (if needed)
#       ↓
#   LLM INTENT UNDERSTANDING (Gemini / OpenAI)
#       ↓
#   LANGGRAPH AGENT ORCHESTRATION
#       ↓
#   TOOL CALLING (marketplace, weather, schemes)
#       ↓
#   RESPONSE GENERATION
#       ↓
#   TRANSLATION BACK TO FARMER LANGUAGE
#       ↓
#   TEXT-TO-SPEECH (Sarvam AI / Bhashini)
#
# ------------------------------------

INTENT_RULES = [
    {
        "keywords": ["sell", "buyer", "market", "price", "where to sell", "बेचना", "ಮಾರಾಟ"],
        "intent": "SELL_PRODUCE",
        "next_action": "MARKETPLACE",
        "message": "I can help you find the best buyers for your produce.",
    },
    {
        "keywords": ["crop", "disease", "problem", "quality", "scan", "photo", "ರೋಗ", "बीमारी"],
        "intent": "CROP_DIAGNOSIS",
        "next_action": "CROP_ANALYSIS",
        "message": "Let me help you analyze your crop quality and health.",
    },
    {
        "keywords": ["weather", "rain", "temperature", "forecast", "ಮಳೆ", "बारिश"],
        "intent": "WEATHER_QUERY",
        "next_action": "WEATHER",
        "message": "I will check the weather forecast for your area.",
    },
    {
        "keywords": ["scheme", "subsidy", "government", "benefit", "yojana", "ಯೋಜನೆ", "सरकार"],
        "intent": "GOVERNMENT_SCHEMES",
        "next_action": "GOVERNMENT_BENEFITS",
        "message": "Let me show you government schemes you are eligible for.",
    },
    {
        "keywords": ["loan", "credit", "money", "finance", "ಸಾಲ", "कर्ज"],
        "intent": "FINANCE_QUERY",
        "next_action": "GOVERNMENT_BENEFITS",
        "message": "I can help you find agricultural loans and credit options.",
    },
    {
        "keywords": ["store", "storage", "cold", "warehouse", "ಶೇಖರಣೆ"],
        "intent": "STORAGE_QUERY",
        "next_action": "SMART_STORAGE",
        "message": "Let me help you find the best storage options for your produce.",
    },
]


def extract_crop(text: str) -> Optional[str]:
    """Extract crop name from text."""
    crops = {
        "tomato": ["tomato", "tomatoes", "ಟೊಮ್ಯಾಟೊ", "टमाटर"],
        "onion": ["onion", "onions", "ಈರುಳ್ಳಿ", "प्याज"],
        "potato": ["potato", "potatoes", "ಆಲೂ", "आलू"],
        "rice": ["rice", "paddy", "ಅಕ್ಕಿ", "चावल"],
        "wheat": ["wheat", "ಗೋಧಿ", "गेहूं"],
        "cotton": ["cotton", "ಹತ್ತಿ", "कपास"],
        "sugarcane": ["sugarcane", "ಕಬ್ಬು", "गन्ना"],
    }
    text_lower = text.lower()
    for crop, keywords in crops.items():
        if any(kw in text_lower for kw in keywords):
            return crop.capitalize()
    return None


def extract_quantity(text: str) -> Optional[int]:
    """Extract quantity in kg from text."""
    import re
    # Match patterns like "2000 kg", "2,000 kg", "2000kg", "2 tonnes"
    patterns = [
        r"(\d[\d,]*)\s*(?:kg|kgs|kilogram|kilograms)",
        r"(\d[\d,]*)\s*(?:tonne|tonnes|ton|tons)",
        r"(\d[\d,]*)\s*(?:quintal|quintals)",
    ]
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            num_str = match.group(1).replace(",", "")
            qty = int(num_str)
            if "tonne" in text.lower() or "ton" in text.lower():
                qty *= 1000
            elif "quintal" in text.lower():
                qty *= 100
            return qty
    return None


def detect_intent(text: str) -> dict:
    """Simple rule-based intent detection (Phase 1 placeholder)."""
    text_lower = text.lower()

    for rule in INTENT_RULES:
        if any(kw.lower() in text_lower for kw in rule["keywords"]):
            return rule

    return {
        "intent": "GENERAL_QUERY",
        "next_action": "DASHBOARD",
        "message": "I am here to help you. What would you like to know about farming?",
    }


# ------------------------------------
# Routes
# ------------------------------------

@router.post("/process", response_model=VoiceProcessResponse)
async def process_voice_input(request: VoiceProcessRequest):
    """
    Process voice/text input from farmer and return structured intent.

    Phase 1: Rule-based placeholder. Returns structured mock response.
    Phase 4+: Will use LLM + LangGraph agent for true understanding.

    Architecture for future:
    - Language detection → Bhashini
    - STT → Sarvam AI / Whisper
    - Intent + Entity extraction → Gemini / GPT-4
    - Tool calling → LangGraph
    - TTS → Sarvam AI
    """
    intent_data = detect_intent(request.text)
    crop = extract_crop(request.text)
    quantity = extract_quantity(request.text)

    suggested_queries = [
        "Where can I sell my tomatoes?",
        "What is the best price for tomatoes today?",
        "Show me government schemes for farmers",
        "Check weather for my area",
    ]

    return VoiceProcessResponse(
        intent=intent_data["intent"],
        crop=crop,
        quantity=quantity,
        location=None,  # Future: extract from farmer profile or text
        language=request.language,
        confidence=0.85,  # Placeholder confidence score
        next_action=intent_data["next_action"],
        message=intent_data["message"],
        suggested_queries=suggested_queries,
    )


@router.get("/languages")
async def get_supported_languages():
    """
    Get list of supported languages for voice input.
    Phase 7: Will be powered by Bhashini/Sarvam AI.
    """
    return {
        "supported_languages": [
            {"code": "en", "name": "English", "native": "English", "status": "active"},
            {"code": "kn", "name": "Kannada", "native": "ಕನ್ನಡ", "status": "active"},
            {"code": "hi", "name": "Hindi", "native": "हिंदी", "status": "active"},
            {"code": "te", "name": "Telugu", "native": "తెలుగు", "status": "planned"},
            {"code": "ta", "name": "Tamil", "native": "தமிழ்", "status": "planned"},
            {"code": "mr", "name": "Marathi", "native": "मराठी", "status": "planned"},
        ]
    }
