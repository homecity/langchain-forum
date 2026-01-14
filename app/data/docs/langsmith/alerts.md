---
title: "Alerts in LangSmith"
url: "https://docs.langchain.com/langsmith/alerts"
section: "langsmith"
last_modified: "2025-12-26T05:10:12.915Z"
---
**Self-hosted Version Requirement**Access to alerts requires Helm chart version **0.10.3** or later.

## 

[​

](#overview)

Overview

Effective observability in LLM applications requires proactive detection of failures, performance degradations, and regressions. LangSmith’s alerts feature helps identify critical issues such as:

-   API rate limit violations from model providers
-   Latency increases for your application
-   Application changes that affect feedback scores reflecting end-user experience

Alerts in LangSmith are project-scoped, requiring separate configuration for each monitored project.

## 

[​

](#configuring-an-alert)

Configuring an alert

### 

[​

](#step-1:-navigate-to-create-alert)

Step 1: Navigate to create alert

First navigate to the Tracing project that you would like to configure alerts for. Click the Alerts icon on the top right hand corner of the page to view existing alerts for that project and set up a new alert.

### 

[​

](#step-2:-select-metric-type)

Step 2: Select metric type

  

![Alert metrics](https://mintcdn.com/langchain-5e9cc07a/E8FdemkcQxROovD9/langsmith/images/alert-metric.png?fit=max&auto=format&n=E8FdemkcQxROovD9&q=85&s=932f55b512d866906160e3ebe9a78ad7)

LangSmith offers threshold-based alerting on three core metrics:

Metric Type

Description

Use Case

**Errored Runs**

Track runs with an error status

Monitors for failures in an application.

**Feedback Score**

Measures the average feedback score

Track [feedback from end users](/langsmith/attach-user-feedback) or [online evaluation results](/langsmith/online-evaluations) to alert on regressions.

**Latency**

Measures average run execution time

Tracks the latency of your application to alert on spikes and performance bottlenecks.

Additionally, for **Errored Runs** and **Run Latency**, you can define filters to narrow down the runs that trigger alerts. For example, you might create an error alert filter for all `llm` runs tagged with `support_agent` that encounter a `RateLimitExceeded` error.

![Alert Metrics](https://mintcdn.com/langchain-5e9cc07a/E8FdemkcQxROovD9/langsmith/images/alerts-filter.png?fit=max&auto=format&n=E8FdemkcQxROovD9&q=85&s=b2dd48ba21e857c8a99a26a0d896f950)

### 

[​

](#step-2:-define-alert-conditions)

Step 2: Define alert conditions

Alert conditions consist of several components:

-   **Aggregation Method**: Average, Percentage, or Count
-   **Comparison Operator**: `>=`, `<=`, or exceeds threshold
-   **Threshold Value**: Numerical value triggering the alert
-   **Aggregation Window**: Time period for metric calculation (currently choose between 5 or 15 minutes)
-   **Feedback Key** (Feedback Score alerts only): Specific feedback metric to monitor

  

![Alert Condition Configuration](https://mintcdn.com/langchain-5e9cc07a/aKRoUGXX6ygp4DlC/langsmith/images/define-conditions.png?fit=max&auto=format&n=aKRoUGXX6ygp4DlC&q=85&s=d92406d84dec4f1b827b82a989df30b9)

**Example:** The configuration shown above would generate an alert when more than 5% of runs within the past 5 minutes result in errors. You can preview alert behavior over a historical time window to understand how many datapoints—and which ones—would have triggered an alert at a chosen threshold (indicated in red). For example, setting an average latency threshold of 60 seconds for a project lets you visualize potential alerts, as shown in the image below.

![Alert Metrics](https://mintcdn.com/langchain-5e9cc07a/E8FdemkcQxROovD9/langsmith/images/alert-preview.png?fit=max&auto=format&n=E8FdemkcQxROovD9&q=85&s=d7f26bce1113c50bec8f5853c6448415)

### 

[​

](#step-3:-configure-notification-channel)

Step 3: Configure notification channel

LangSmith supports the following notification channels:

1.  [PagerDuty integration](/langsmith/alerts-pagerduty)
2.  [Webhook notifications](/langsmith/alerts-webhook)

Select the appropriate channel to ensure notifications reach the responsible team members.

## 

[​

](#best-practices)

Best practices

-   Adjust sensitivity based on application criticality
-   Start with broader thresholds and refine based on observed patterns
-   Ensure alert routing reaches appropriate on-call personnel

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/alerts.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.