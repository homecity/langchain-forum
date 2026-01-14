---
title: "How to evaluate an existing experiment (Python only)"
url: "https://docs.langchain.com/langsmith/evaluate-existing-experiment"
section: "langsmith"
last_modified: "2025-12-16T22:07:24.263Z"
---
Evaluation of existing experiments is currently only supported in the Python SDK. If you have already run an experiment and want to add additional evaluation metrics, you can apply any evaluators to the experiment using the `evaluate()` / `aevaluate()` methods as before. Just pass in the experiment name / ID instead of a target function:

Copy

```
from langsmith import evaluate

def always_half(inputs: dict, outputs: dict) -> float:
    return 0.5

experiment_name = "my-experiment:abc"  # Replace with an actual experiment name or ID

evaluate(experiment_name, evaluators=[always_half])
```

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/evaluate-existing-experiment.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.