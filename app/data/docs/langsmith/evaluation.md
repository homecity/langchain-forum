---
title: "LangSmith Evaluation"
url: "https://docs.langchain.com/langsmith/evaluation"
section: "langsmith"
last_modified: "2025-12-16T22:07:24.314Z"
---
LangSmith supports two types of evaluations based on when and where they run:

## Offline Evaluation

**Test before you ship**Run evaluations on curated datasets during development to compare versions, benchmark performance, and catch regressions.

## Online Evaluation

**Monitor in production**Evaluate real user interactions in real-time to detect issues and measure quality on live traffic.

## 

[​

](#evaluation-workflow)

Evaluation workflow

-   Offline evaluation flow
    
-   Online evaluation flow
    

1

Create a dataset

Create a [dataset](/langsmith/manage-datasets) with [examples](/langsmith/evaluation-concepts#examples) from manually curated test cases, historical production traces, or synthetic data generation.

2

Define evaluators

Create [evaluators](/langsmith/evaluation-concepts#evaluators) to score performance:

-   [Human](/langsmith/evaluation-concepts#human) review
-   [Code](/langsmith/evaluation-concepts#code) rules
-   [LLM-as-judge](/langsmith/llm-as-judge)
-   [Pairwise](/langsmith/evaluate-pairwise) comparison

3

Run an experiment

Execute your application on the dataset to create an [experiment](/langsmith/evaluation-concepts#experiment). Configure [repetitions, concurrency, and caching](/langsmith/experiment-configuration) to optimize runs.

4

Analyze results

Compare experiments for [benchmarking](/langsmith/evaluation-types#benchmarking), [unit tests](/langsmith/evaluation-types#unit-tests), [regression tests](/langsmith/evaluation-types#regression-tests), or [backtesting](/langsmith/evaluation-types#backtesting).

1

Deploy your application

Each interaction creates a [run](/langsmith/evaluation-concepts#runs) without reference outputs.

2

Configure online evaluators

Set up [evaluators](/langsmith/online-evaluations) to run automatically on production traces: safety checks, format validation, quality heuristics, and reference-free LLM-as-judge. Apply [filters and sampling rates](/langsmith/online-evaluations#4-optional-configure-a-sampling-rate) to control costs.

3

Monitor in real-time

Evaluators run automatically on [runs](/langsmith/evaluation-concepts#runs) or [threads](/langsmith/online-evaluations#configure-multi-turn-online-evaluators), providing real-time monitoring, anomaly detection, and alerting.

4

Establish a feedback loop

Add failing production traces to your [dataset](/langsmith/manage-datasets), create targeted evaluators, validate fixes with offline experiments, and redeploy.

For more on the differences between offline and online evaluation, refer to the [Evaluation concepts](/langsmith/evaluation-concepts#quick-reference-offline-vs-online-evaluation) page.

## 

[​

](#get-started)

Get started

[

## Evaluation quickstart

Get started with offline evaluation.





](/langsmith/evaluation-quickstart)[

## Manage datasets

Create and manage datasets for evaluation through the UI or SDK.





](/langsmith/manage-datasets)[

## Run offline evaluations

Explore evaluation types, techniques, and frameworks for comprehensive testing.





](/langsmith/evaluate-llm-application)[

## Analyze results

View and analyze evaluation results, compare experiments, filter data, and export findings.





](/langsmith/analyze-an-experiment)[

## Run online evaluations

Monitor production quality in real-time from the Observability tab.





](/langsmith/online-evaluations)[

## Follow tutorials

Learn by following step-by-step tutorials, from simple chatbots to complex agent evaluations.





](/langsmith/evaluate-chatbot-tutorial)

To set up a LangSmith instance, visit the [Platform setup section](/langsmith/platform-setup) to choose between cloud, hybrid, or self-hosted. All options include observability, evaluation, prompt engineering, and deployment.

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/evaluation.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.