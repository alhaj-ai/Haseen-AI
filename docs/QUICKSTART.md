# Quickstart

Three ways in, from least to most setup. Everything runs on a laptop; no GPU is needed for any of it.

## 1. See it work (two minutes, no API keys)

```bash
cd backend && python3 -m venv .venv && . .venv/bin/activate && pip install -e '.[dev]'
cd ../frontend && npm ci && npm run build && cd ../backend     # the UI is optional
haseen demo                 # http://127.0.0.1:8765 - seeded runs, a waiting approval, a workflow, simulated GitHub/Slack
haseen demo trigger         # in another terminal: a signed GitHub webhook starts a real agent run (see docs/demo.md)
haseen demo crash           # kill a worker with SIGKILL mid-run and watch another finish it
```
The demo uses its own directory (`~/.haseen/demo`), scripted models and simulated services; `haseen demo reset` wipes only that.

## 2. Use it on your repository (local mode)

```bash
haseen doctor                                   # what works on this machine, and what to fix
haseen run --repo . --task "Fix add() so it returns the sum" --provider ollama --model qwen2.5-coder:7b
haseen serve                                    # API + UI on 127.0.0.1; SQLite in ~/.haseen
```
Provider setup (Ollama, vLLM, SGLang, llama.cpp, LM Studio, OpenAI-compatible, hosted APIs): [providers](providers.md). Runs are validated in a
shadow workspace and only promoted after your repository's own tests pass; risky commands and patches that did not validate wait for your approval.
`haseen resume|replay|fork|inspect|events|metrics|explain RUN` work on any run.

## 3. Run it for a team (server mode)

```bash
pip install -e 'backend[server]'        # PostgreSQL driver + encryption
export HASEEN_DATABASE_URL=postgresql://haseen:...@db:5432/haseen
export HASEEN_SECRET_KEY=$(haseen secrets keygen)
haseen admin init --org Acme --workspace main --owner you      # prints a token once
haseen serve --host 0.0.0.0 &  haseen worker               # any number of workers, on any hosts that reach the database
```
or `docker compose -f docker-compose.server.yml up -d --scale worker=3`. Then register repositories, connect integrations, set policy:
[deployment](deployment.md), [tenancy](tenancy.md), [integrations](integrations.md), [policy](policy.md).

## Where to go next

[architecture](ARCHITECTURE.md) - [runtime and recovery](runtime.md) - [evaluation](evaluation.md) - [security](security.md) - [operations](operations.md) - [benchmarks](benchmarks.md)
