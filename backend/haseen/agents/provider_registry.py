"""Provider registry - maps provider names to implementations."""

from __future__ import annotations

from haseen.agents.provider_base import ProviderBase
from haseen.agents.providers_anthropic import AnthropicProvider
from haseen.agents.providers_groq import GroqProvider
from haseen.agents.providers_mock import MockProvider
from haseen.agents.providers_nvidia import NvidiaProvider
from haseen.agents.providers_ollama import OllamaProvider
from haseen.agents.providers_openai import OpenAIProvider
from haseen.agents.providers_openai_compatible import (
    LlamaCppProvider,
    LMStudioProvider,
    OpenAICompatibleProvider,
    SGLangProvider,
    VLLMProvider,
)
from haseen.agents.providers_openrouter import OpenRouterProvider
from haseen.agents.providers_recorded import RecordedProvider
from haseen.agents.providers_scripted import ScriptedProvider

PROVIDERS: dict[str, type[ProviderBase]] = {
    "mock": MockProvider,
    "openai": OpenAIProvider,
    "anthropic": AnthropicProvider,
    "ollama": OllamaProvider,
    "groq": GroqProvider,
    "nvidia": NvidiaProvider,
    "openrouter": OpenRouterProvider,
    "openai_compatible": OpenAICompatibleProvider,
    "vllm": VLLMProvider,
    "sglang": SGLangProvider,
    "llamacpp": LlamaCppProvider,
    "lmstudio": LMStudioProvider,
    "scripted": ScriptedProvider,  # deterministic replay for tests, evaluation and demos
    "recorded": RecordedProvider,  # internal: serves a past run's stored responses (run replay)
}


def get_provider(name: str) -> ProviderBase:
    cls = PROVIDERS.get(name)
    if cls is None:
        raise ValueError(
            f"Unknown LLM provider '{name}'. "
            f"Available providers: {', '.join(PROVIDERS.keys())}"
        )
    return cls()
