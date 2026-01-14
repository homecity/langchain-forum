---
title: "Configure webhook notifications for LangSmith alerts"
url: "https://docs.langchain.com/langsmith/alerts-webhook"
section: "langsmith"
last_modified: "2026-01-08T16:42:32.121Z"
---
## 

[​

](#overview)

Overview

This guide details the process for setting up webhook notifications for [LangSmith alerts](/langsmith/alerts). Before proceeding, make sure you have followed the steps leading up to the notification step of creating the alert by following [this guide](./alerts). Webhooks enable integration with custom services and third-party platforms by sending HTTP POST requests when alert conditions are triggered. Use webhooks to forward alert data to ticketing systems, chat applications, or custom monitoring solutions.

## 

[​

](#prerequisites)

Prerequisites

-   An endpoint that can receive HTTP POST requests
-   Appropriate authentication credentials for your receiving service (if required)

## 

[​

](#integration-configuration)

Integration configuration

### 

[​

](#step-1:-prepare-your-receiving-endpoint)

Step 1: Prepare your receiving endpoint

Before configuring the webhook in LangSmith, ensure your receiving endpoint:

-   Accepts HTTP POST requests
-   Can process JSON payloads
-   Is accessible from external services
-   Has appropriate authentication mechanisms (if required)

Additionally, if on a custom deployment of LangSmith, make sure there are no firewall settings blocking egress traffic from LangSmith services.

### 

[​

](#step-2:-configure-webhook-parameters)

Step 2: Configure webhook parameters

![Webhook Setup](https://mintcdn.com/langchain-5e9cc07a/1RIJxfRpkszanJLL/langsmith/images/webhook-setup.png?fit=max&auto=format&n=1RIJxfRpkszanJLL&q=85&s=fecb6275ad3d576a864d1c6a2771c847) In the notification section of your alert complete the webhook configuration with the following parameters: **Required Fields**

-   **URL**: The complete URL of your receiving endpoint
    -   Example: `https://api.example.com/incident-webhook`

**Optional Fields**

-   **Headers**: JSON Key-value pairs sent with the webhook request
    -   Common headers include:
        -   `Authorization`: For authentication tokens
        -   `Content-Type`: Usually set to `application/json` (default)
        -   `X-Source`: To identify the source as LangSmith
    -   If no headers, then simply use `{}`
-   **Request Body Template**: Customize the JSON payload sent to your endpoint
    -   Default: LangSmith sends the payload defined and the following additonal key-value pairs appended to the payload:
        -   `project_name`: Name of the triggered alert
        -   `alert_rule_id`: A UUID to identify the LangSmith alert. This can be used as a de-duplication key in the webhook service.
        -   `alert_rule_name`: The name of the alert rule.
        -   `alert_rule_type`: The type of alert (as of 04/01/2025 all alerts are of type `threshold`).
        -   `alert_rule_attribute`: The attribute associated with the alert rule - `error_count`, `feedback_score` or `latency`.
        -   `triggered_metric_value`: The value of the metric at the time the threshold was triggered.
        -   `triggered_threshold`: The threshold that triggered the alert.
        -   `timestamp`: The timestamp that triggered the alert.

### 

[​

](#step-3:-test-the-webhook)

Step 3: Test the webhook

Click **Send Test Alert** to send the webhook notification to ensure the notification works as intended.

## 

[​

](#troubleshooting)

Troubleshooting

If webhook notifications aren’t being delivered:

-   Verify the webhook URL is correct and accessible
-   Ensure any authentication headers are properly formatted
-   Check that your receiving endpoint accepts POST requests
-   Examine your endpoint’s logs for received but rejected requests
-   Verify your custom payload template is valid JSON format

## 

[​

](#security-considerations)

Security considerations

-   Use HTTPS for your webhook endpoints
-   Implement authentication for your webhook endpoint
-   Consider adding a shared secret in your headers to verify webhook sources
-   Validate incoming webhook requests before processing them

## 

[​

](#sending-alerts-to-slack-using-a-webhook)

Sending alerts to Slack using a webhook

Here is an example for configuring LangSmith alerts to send notifications to Slack channels using the [`chat.postMessage`](https://api.slack.com/methods/chat.postMessage) API.

### 

[​

](#prerequisites-2)

Prerequisites

-   Access to a Slack workspace
-   A LangSmith project to set up alerts
-   Permissions to create Slack applications

### 

[​

](#step-1:-create-a-slack-app)

Step 1: Create a Slack app

1.  Visit the [Slack API Applications page](https://api.slack.com/apps)
2.  Click **Create New App**
3.  Select **From scratch**
4.  Provide an **App Name** (e.g., “LangSmith Alerts”)
5.  Select the workspace where you want to install the app
6.  Click **Create App**

### 

[​

](#step-2:-configure-bot-permissions)

Step 2: Configure bot permissions

1.  In the left sidebar of your Slack app configuration, click **OAuth & Permissions**
2.  Scroll down to **Bot Token Scopes** under **Scopes** and click **Add an OAuth Scope**
3.  Add the following scopes:
    -   `chat:write` (Send messages as the app)
    -   `chat:write.public` (Send messages to channels the app isn’t in)
    -   `channels:read` (View basic channel information)

### 

[​

](#step-3:-install-the-app-to-your-workspace)

Step 3: Install the app to your workspace

1.  Scroll up to the top of the **OAuth & Permissions** page
2.  Click **Install to Workspace**
3.  Review the permissions and click **Allow**
4.  Copy the **Bot User OAuth Token** that appears (begins with `xoxb-`)

### 

[​

](#step-4:-add-the-bot-to-a-slack-channel)

Step 4: Add the bot to a Slack channel

Add the bot to the specific channel you want to receive alerts in. You can add a bot to a Slack channel by mentioning it in the message field (e.g., `@botname`). You also need the channel ID to configure the webhook alert in LangSmith. You can find the channel ID by opening channel details > About

### 

[​

](#step-5:-configure-the-webhook-alert-in-langsmith)

Step 5: Configure the webhook alert in LangSmith

1.  In LangSmith, navigate to your project
2.  Select **Alerts → Create Alert**
3.  Define your alert metrics and conditions
4.  In the notification section, select **Webhook**
5.  Configure the webhook with the following settings:

**Webhook URL**

Copy

```
https://slack.com/api/chat.postMessage
```

**Headers**

Replace `xoxb-your-token-here` with your Bot’s User OAuth Token

Copy

```
{
  "Content-Type": "application/json",
  "Authorization": "Bearer xoxb-your-token-here"
}
```

**Request Body Template**

It is required to fill in the `{channel_id}` from the value found in Step 4.  
  
The remaining fields: `alert_name`, `project_name` and `project_url` optionally add additional context to the alert message. You can find your `project_url` in the browser’s URL bar. Copy the portion up to but not including any query parameters.

Copy

```
{
  "channel": "{channel_id}",
  "text": "{alert_name} triggered for {project_name}",
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "🚨{alert_name} has been triggered"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Please check the following link for more information:"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "<{project-url}|View in LangSmith>"
      }
    }
  ]
}
```

6.  Click **Save** to activate the webhook configuration

### 

[​

](#step-6:-test-the-integration)

Step 6: Test the integration

1.  In the LangSmith alert configuration, click **Test Alert**
2.  Check your specified Slack channel for the test notification
3.  Verify that the message contains the expected alert information

### 

[​

](#optional-step-7:-link-to-the-alert-preview-in-the-request-body)

(Optional) Step 7: Link to the alert preview in the request body

After creating an alert, you can optionally link to its preview in the webhook’s request body. ![Alert Preview Pane](https://mintcdn.com/langchain-5e9cc07a/E8FdemkcQxROovD9/langsmith/images/alert-preview-pane.png?fit=max&auto=format&n=E8FdemkcQxROovD9&q=85&s=286ebb8f90bafbdcacf9a0602aaf749c) To configure this:

1.  Save your alert
2.  Find your saved alert in the alerts table and click it
3.  Copy the displayed URL
4.  Click “Edit Alert”
5.  Replace the existing project URL with the copied alert preview URL

## 

[​

](#additional-resources)

Additional resources

-   [LangSmith Alerts Documentation](/langsmith/alerts)
-   [Slack chat.postMessage API Documentation](https://api.slack.com/methods/chat.postMessage)
-   [Slack Block Kit Builder](https://app.slack.com/block-kit-builder/)

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/alerts-webhook.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.