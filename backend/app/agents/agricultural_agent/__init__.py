"""
Agricultural Agent — Placeholder
==================================
Main farmer advisory agent (Phase 5).

Will use LangGraph for multi-step reasoning:
1. Parse farmer intent
2. Select relevant tools
3. Execute tool calls in parallel
4. Synthesize recommendation
5. Generate multilingual response
"""

class AgriculturalAgent:
    """
    Placeholder for the main agricultural advisory agent.
    Phase 5: Implement with LangGraph StateGraph.
    """

    def __init__(self):
        self.name = "agricultural_agent"
        self.version = "placeholder"

    async def process(self, query: str, language: str = "en") -> dict:
        """
        Process a farmer query.
        Phase 5: Replace with real LangGraph agent.
        """
        raise NotImplementedError(
            "AgriculturalAgent not implemented yet. "
            "Use the voice route placeholder until Phase 5."
        )
