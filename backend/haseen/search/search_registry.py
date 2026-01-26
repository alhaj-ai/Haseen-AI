"""Search provider registry."""

from __future__ import annotations

import logging

from haseen.search.search_provider_base import SearchProvider

logger = logging.getLogger(__name__)

_providers: dict[str, type[SearchProvider]] = {}


def register_search_provider(name: str, cls: type[SearchProvider]) -> None:
    _providers[name] = cls


def get_search_provider(name: str, **kwargs) -> SearchProvider:
    cls = _providers.get(name)
    if cls is None:
        raise ValueError(f"Unknown search provider: {name}. Available: {list(_providers.keys())}")
    return cls(**kwargs)


def list_search_providers() -> list[str]:
    return list(_providers.keys())


def get_provider_status() -> list[dict]:
    statuses = []
    for name, cls in _providers.items():
        try:
            instance = cls()
            ok, msg = instance.validate_config()
            statuses.append({"name": name, "available": ok, "message": msg, "requires_api_key": cls.requires_api_key})
        except Exception as e:
            statuses.append({"name": name, "available": False, "message": str(e), "requires_api_key": cls.requires_api_key})
    return statuses


def _auto_register() -> None:
    from haseen.search.providers.brave_search import BraveSearchProvider
    from haseen.search.providers.custom_search import CustomSearchProvider
    from haseen.search.providers.duckduckgo_search import DuckDuckGoSearchProvider
    from haseen.search.providers.google_programmable_search import GoogleProgrammableSearchProvider
    from haseen.search.providers.serpapi_search import SerpApiSearchProvider
    from haseen.search.providers.serper_search import SerperSearchProvider
    from haseen.search.providers.tavily_search import TavilySearchProvider

    register_search_provider("brave", BraveSearchProvider)
    register_search_provider("tavily", TavilySearchProvider)
    register_search_provider("serper", SerperSearchProvider)
    register_search_provider("serpapi", SerpApiSearchProvider)
    register_search_provider("google_programmable", GoogleProgrammableSearchProvider)
    register_search_provider("duckduckgo", DuckDuckGoSearchProvider)
    register_search_provider("custom", CustomSearchProvider)


_auto_register()
