---
title: "Troubleshooting for self-hosted deployments"
url: "https://docs.langchain.com/langsmith/diagnostics-self-hosted"
section: "langsmith"
last_modified: "2026-01-14"
---
This page provides diagnostic steps to help you troubleshoot issues with self-hosted [LangSmith Deployment](/langsmith/deployments) before reaching out to support. Follow these steps systematically to identify and resolve common deployment issues.

If you complete these diagnostic steps and still need assistance, refer to [Support](#support) at the end of this guide for information on what to gather before reaching out.

## 

[​

](#prerequisites)

Prerequisites

Before beginning the diagnostic steps, ensure you have:

-   `kubectl` access to your Kubernetes cluster.
-   Appropriate permissions to view pods, deployments, services, etc.
-   Familiarity with your [Helm chart configuration](/langsmith/kubernetes#configure-your-helm-charts:).

## 

[​

](#step-1-understand-your-deployment)

Step 1. Understand your deployment

Verify what was deployed and understand the baseline state of your system. This helps you recognize what normal operation looks like and identify deviations when issues occur. Run the following commands to view all deployed Kubernetes resources.

Ensure that you’re in the correct namespace when you run the commands in this section. Or, specify the namespace explictly with the `-n` flag. For example: `kubectl get deployments -n langsmith`.

List all deployments:

Copy

```
kubectl get deployments
```

List all pods:

Copy

```
kubectl get pods
```

List all services:

Copy

```
kubectl get services
```

List all `lgps` resources (only present after creating an [Agent Server](/langsmith/agent-server)):

Copy

```
kubectl get lgps
```

### 

[​

](#key-deployed-components)

Key deployed components

Your deployment includes the following core components:

-   **`langsmith-frontend`**: The LangSmith frontend UI where you create Agent Server deployments. This app makes API calls to `langsmith-host-backend`. Part of the [control plane](/langsmith/control-plane).
-   **`langsmith-host-backend`**: The LangSmith Deployment [control plane](/langsmith/control-plane) that receives requests from `langsmith-frontend` and persists deployment requests to the control plane Postgres database.
-   **`langsmith-listener`**: Part of the LangSmith Deployment [data plane](/langsmith/data-plane). Polls `langsmith-host-backend` via HTTP API for deployments to create, update, or delete. Enqueues tasks for worker processes to handle.
-   **`langsmith-redis`**: The [Redis](/langsmith/data-plane#redis) instance serving as the task queue for `langsmith-listener`. The listener enqueues tasks here and workers pull tasks from this queue.
-   **`langsmith-operator`**: The `lgps` Kubernetes operator that reconciles underlying Kubernetes resources for `lgps` resources. Part of the data plane infrastructure.

Additional components may be present in your deployment depending on your configuration. For an overview, refer to [LangSmith Deployment components](/langsmith/components).

## 

[​

](#step-2-enable-debug-logging)

Step 2. Enable debug logging

When troubleshooting issues, the first step is typically to enable debug-level logging to gather more detailed information about what’s happening in your system.

### 

[​

](#for-control-plane-or-data-plane-deployments)

For control plane or data plane deployments

If you are experiencing issues with a control plane deployment (for example, `langsmith-host-backend`) or a data plane deployment (for example, `langsmith-listener`), reinstall the Helm chart with the `LOG_LEVEL=DEBUG` environment variable. Add the following to your `values.yaml` file:

Copy

```
extraEnv:
  - name: LOG_LEVEL
    value: DEBUG
```

### 

[​

](#for-agent-server-deployments)

For Agent Server deployments

If the issue is with an individual Agent Server deployment:

1.  Navigate to the **Deployments** tab in the [LangSmith UI](https://smith.langchain.com).
2.  On a deployment’s view, select **\+ New Revision**.
3.  Add a new environment variable `LOG_LEVEL` and set it to `DEBUG`.

You can also find debug logs in the UI on a deployment’s view, click on **Server Logs** and select **Debug** for the **Log level: Info** dropdown.

### 

[​

](#for-widespread-issues)

For widespread issues

If you are unsure where the issue originates, enable `DEBUG` logging everywhere (control plane, data plane, and all Agent Server deployments).

### 

[​

](#review-application-logs)

Review application logs

Tail the logs of each pod to understand baseline behavior:

Copy

```
kubectl logs -f <pod_name>
```

Then look for these log lines:

-   **`langsmith-listener`**: `Reconciling projects...` (appears every 10 seconds)
-   **`langsmith-operator`**: `Starting reconciliation` (appears periodically)

In a healthy deployment, you should not see any errors. All logs should appear normal and routine.

### 

[​

](#interpret-debug-logs)

Interpret debug logs

Look for the following problem indicators:

-   Exceptions or stack traces.
-   Error messages (the word `"ERROR"`).
-   Unusual patterns that differ from normal operation.

Based on the errors you find:

-   **Configuration issue**: If you suspect a configuration problem, raise the issue with the person who ran [`helm install`](/langsmith/kubernetes).
-   **User code bug**: If you suspect a bug in user code (for example, the LangGraph OSS graph implementation), raise the issue with the owner of the Agent Server application who created the [`langgraph.json`](/langsmith/application-structure#configuration-file) file.

## 

[​

](#step-3-describe-deployments-and-pods)

Step 3. Describe deployments and pods

Describing Kubernetes resources reveals error events and statuses that may not appear in application logs. These errors are typically caused by configuration or infrastructure issues rather than application code bugs. Describing resources also shows their configuration (such as environment variables), which is helpful for debugging. Run the following commands to describe your resources. Describe a Kubernetes deployment:

Copy

```
kubectl describe deployment <deployment_name>
```

Describe a Kubernetes pod:

Copy

```
kubectl describe pod <pod_name>
```

Describe an `lgps` resource (only relevant after creating an Agent Server):

Copy

```
kubectl describe lgps <lgps_name>
```

### 

[​

](#interpret-results)

Interpret results

Review the `Events:` section of the output and verify that everything is normal. Common issues that appear include:

-   Failed liveness or readiness probes
-   Image pull errors
-   Resource constraints (CPU, memory)
-   Volume mount issues
-   Configuration errors

Make sure there are no error events and that all events indicate healthy operation.

## 

[​

](#additional-resources)

Additional resources

For more troubleshooting information, refer to:

-   [Troubleshooting](/langsmith/troubleshooting): General troubleshooting guide with solutions to common issues.
-   [Architectural overview](/langsmith/architectural-overview): Details on system architecture and component interactions.
-   [Self-hosted documentation](/langsmith/self-hosted)

## 

[​

](#support)

Support

If you have followed these diagnostic steps and still need assistance, gather the following information before contacting support:

-   Output from the [diagnostic steps](#step-1-understand-your-deployment).
-   Your Helm chart configuration.
-   Relevant error messages and logs.
-   Description of what you were trying to do when the issue occurred.

Having this information ready will help the [support](/cdn-cgi/l/email-protection#b2c1c7c2c2ddc0c6f2ded3dcd5d1dad3dbdc9cd6d7c4) team diagnose and resolve your issue more quickly.

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/diagnostics-self-hosted.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.