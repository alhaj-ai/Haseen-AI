"""Haseen backend - FastAPI application."""

from __future__ import annotations

import asyncio
import os
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.trustedhost import TrustedHostMiddleware

from haseen import demo
from haseen.api.auth import authenticate_request, local_scope, require
from haseen.api.routes_calendar import router as calendar_router
from haseen.api.routes_hooks import router as hooks_router
from haseen.api.routes_integrations import router as integrations_router
from haseen.api.routes_knowledge import router as knowledge_router
from haseen.api.routes_memory import router as memory_router
from haseen.api.routes_metrics import router as metrics_router
from haseen.api.routes_policies import router as policies_router
from haseen.api.routes_providers import router as providers_router
from haseen.api.routes_repo import router as repo_router
from haseen.api.routes_reports import router as reports_router
from haseen.api.routes_runs import router as runs_router
from haseen.api.routes_runtime import router as runtime_router
from haseen.api.routes_scheduler import router as scheduler_router
from haseen.api.routes_search import router as search_router
from haseen.api.routes_settings import router as settings_router
from haseen.api.routes_tenancy import router as tenancy_router
from haseen.api.routes_workflows import router as workflows_router
from haseen.api.schemas import HealthResponse
from haseen.config import get_config
from haseen.database import init_db
from haseen.domain.identity import Permission
from haseen.logging_config import setup_logging
from haseen.recovery import recover_interrupted_runs
from haseen.security import allowed_hosts, check_startup_policy


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging()
    init_db()
    check_startup_policy(get_config().host)  # after init: database-held tokens count as authentication
    recover_interrupted_runs()

    from haseen.scheduler.scheduler_loop import start_scheduler_loop, stop_scheduler_loop
    await start_scheduler_loop(poll_interval=30)
    from haseen.workflows.runtime import start_loop as start_workflows
    from haseen.workflows.runtime import stop_loop as stop_workflows
    await start_workflows()
    if demo.is_demo():
        from haseen.demo import routes as demo_routes
        from haseen.demo import seed as demo_seed
        from haseen.demo import simulators as demo_simulators

        demo_routes.STATE["sims"] = demo_simulators.Simulators()
        demo_routes.STATE["seed"] = await demo_seed.seed(demo.demo_dir(), demo_routes.STATE["sims"])

    yield

    await stop_workflows()
    await stop_scheduler_loop()


app = FastAPI(
    title="Haseen",
    description="Local-first coding-agent harness for tiny/SLM models",
    version="0.1.0",
    lifespan=lifespan,
    dependencies=[Depends(authenticate_request)],
)

app.add_middleware(TrustedHostMiddleware, allowed_hosts=allowed_hosts())

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(runs_router)
app.include_router(reports_router)
app.include_router(metrics_router)
app.include_router(workflows_router)
app.include_router(policies_router)
app.include_router(knowledge_router)
app.include_router(tenancy_router)
app.include_router(integrations_router)
app.include_router(hooks_router)
if demo.is_demo():
    from haseen.demo.routes import router as demo_router

    app.include_router(demo_router)
# The provider catalogue and health are global and read-only; the outbound test needs a write permission.
app.include_router(providers_router, dependencies=[Depends(require(Permission.RUN_READ))])
# These features keep global (not per-workspace) data. Until they are tenant-scoped they work only while a
# single workspace exists, and then by permission.
for _router, _read, _write in (
    (settings_router, Permission.SETTINGS_READ, Permission.SETTINGS_WRITE),
    (memory_router, Permission.RUN_READ, Permission.SETTINGS_WRITE),
    (repo_router, Permission.RUN_READ, Permission.SETTINGS_WRITE),
    (runtime_router, Permission.RUN_READ, Permission.SETTINGS_WRITE),
    (scheduler_router, Permission.RUN_READ, Permission.RUN_CREATE),
    (search_router, Permission.RUN_READ, Permission.SETTINGS_WRITE),
    (calendar_router, Permission.RUN_READ, Permission.RUN_CREATE),
):
    app.include_router(_router, dependencies=[Depends(local_scope(_read, _write))])


def _mount_ui(application: FastAPI) -> None:
    """Serve the built frontend when ``HASEEN_STATIC_DIR`` points at it (the container does). Unknown non-API
    paths return the app shell so client-side routes survive a refresh; unknown /api paths stay 404."""
    static = os.environ.get("HASEEN_STATIC_DIR")
    if not static or not (Path(static) / "index.html").is_file():
        return
    root = Path(static).resolve()
    if (root / "assets").is_dir():
        application.mount("/assets", StaticFiles(directory=root / "assets"), name="assets")

    @application.get("/{path:path}", include_in_schema=False)
    async def spa(path: str) -> FileResponse:
        if path.startswith("api/"):
            raise HTTPException(404, "Not found")
        candidate = (root / path).resolve()
        if path and candidate.is_file() and candidate.is_relative_to(root):  # never serve outside the static root
            return FileResponse(candidate)
        return FileResponse(root / "index.html")


@app.get("/live", include_in_schema=False)
async def live() -> dict[str, str]:
    """The process is up. Says nothing about whether it can do useful work (see /ready)."""
    return {"status": "live"}


@app.get("/ready")
async def ready() -> JSONResponse:
    """Can this instance do its job? Checks what it actually depends on; 503 with the failing checks otherwise."""
    from haseen.runtime.health import readiness

    checks = await asyncio.to_thread(readiness)
    ok = all(c["ok"] for c in checks.values())
    return JSONResponse({"status": "ready" if ok else "not_ready", "checks": checks}, status_code=200 if ok else 503)


@app.get("/api/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    return HealthResponse(status="ok", version="0.1.0")


_mount_ui(app)


if __name__ == "__main__":
    import uvicorn
    cfg = get_config()
    check_startup_policy(cfg.host)
    uvicorn.run("haseen.main:app", host=cfg.host, port=cfg.port)
