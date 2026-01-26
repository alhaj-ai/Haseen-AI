"""Runtime registry - selects the appropriate runtime for a run."""

from __future__ import annotations

from haseen.runtime.docker_runtime import (
    DockerRuntime,
    check_docker_available,
    check_image_available,
    get_docker_version,
)
from haseen.runtime.local_runtime import LocalRuntime
from haseen.runtime.sandbox_base import RuntimeBase


def get_runtime(mode: str = "local", run_id: str = "default", repo_path: str = "") -> RuntimeBase:
    if mode == "docker":
        return DockerRuntime(run_id=run_id, repo_path=repo_path)
    return LocalRuntime()


def get_runtime_status() -> dict:
    docker_available = check_docker_available()
    docker_version = get_docker_version() if docker_available else None
    image_available = check_image_available() if docker_available else False

    error = None
    if not docker_available:
        error = "Docker is not installed or the daemon is not running."
    elif not image_available:
        error = "Docker image 'haseen-sandbox:latest' not found. Build with: docker build -t haseen-sandbox:latest docker/sandbox"

    return {
        "local": {"available": True},
        "docker": {
            "available": docker_available,
            "version": docker_version,
            "image": "haseen-sandbox:latest",
            "image_available": image_available,
            "error": error,
        },
        "default_runtime": "local",
    }
