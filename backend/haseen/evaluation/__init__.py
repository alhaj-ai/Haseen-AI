"""Evaluation platform: measure Haseen itself against a versioned corpus with hidden oracles."""

from haseen.evaluation.metrics import TaskResult, compare, summarize
from haseen.evaluation.runner import run_eval
from haseen.evaluation.tasks import EvalTask, corpus_digest, load_corpus

__all__ = ["EvalTask", "TaskResult", "compare", "corpus_digest", "load_corpus", "run_eval", "summarize"]
