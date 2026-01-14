---
title: "Self-hosted LangSmith changelog"
url: "https://docs.langchain.com/langsmith/self-hosted-changelog"
section: "langsmith"
last_modified: "2026-01-13T00:15:16.580Z"
---
**Subscribe**: Our changelog includes an [RSS feed](https://docs.langchain.com/langsmith/self-hosted-changelog/rss.xml) that can integrate with [Slack](https://slack.com/help/articles/218688467-Add-RSS-feeds-to-Slack), [email](https://zapier.com/apps/email/integrations/rss/1441/send-new-rss-feed-entries-via-email), Discord bots like [Readybot](https://readybot.io/) or [RSS Feeds to Discord Bot](https://rss.app/en/bots/rssfeeds-discord-bot), and other subscription tools.

[Self-hosted LangSmith](/langsmith/self-hosted) is an add-on to the Enterprise plan designed for our largest, most security-conscious customers. For more details, refer to [Pricing](https://www.langchain.com/pricing). [Contact our sales team](https://www.langchain.com/contact-sales) if you want to get a license key to trial LangSmith in your environment.

[​

](#2026-01-09)

2026-01-09

## 

[​

](#langsmith-0-12-36)

langsmith-0.12.36

-   Added support for custom MCP servers with OAuth in Agent Builder
-   Added ability to view and edit memory files in Agent Builder
-   Added support for attachments in the frontend
-   Improved streaming tree performance in trace viewer
-   Fixed scroll behavior in trace tree
-   Fixed unicode truncation issues in trace display
-   Fixed onboarding screen showing incorrectly when runs exist
-   Increased maximum automation rules per workspace to 200

**Download the Helm chart:** [`langsmith-0.12.36.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.36/langsmith-0.12.36.tgz)

[​

](#2026-01-08)

2026-01-08

## 

[​

](#langsmith-0-12-35)

langsmith-0.12.35

-   Added per-bar highlighting for feedback charts in experiments
-   Added Agent Builder activity feed
-   Changed experiment chip to hover card for better usability
-   Fixed agents appearing in random sidebar positions
-   Fixed tool modal nesting issue in playground
-   Fixed diff mode fallback on comparison page
-   Fixed race condition in OAuth authentication requests
-   Added new Granular Usage tab for reporting billable usage by workspace, project, user, and API key (enable with `DEFAULT_ORG_FEATURE_ENABLE_GRANULAR_USAGE_REPORTING=true` and `GRANULAR_USAGE_TABLE_ENABLED=true` environment variables in `commonEnv`)

**Download the Helm chart:** [`langsmith-0.12.35.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.35/langsmith-0.12.35.tgz)

[​

](#2026-12-26)

2026-12-26

## 

[​

](#langsmith-0-12-34)

langsmith-0.12.34

-   Added Redis IAM authentication support for GCP and Azure
-   Added self-serve audit logs in OCSF format
-   Added hide column option to experiment outputs header
-   Added message\_user tool to the tool server
-   Improved trace tree loading speed
-   Allowed basic auth installations to disable invites via API
-   Fixed tenant ID handling in navigation
-   Fixed scrolling in Agent Builder templates view
-   Fixed Gmail account connection limit tooltip
-   Fixed user view preference persistence on page load
-   Fixed tab wrapping in UI
-   Made feedback charts visible by default
-   Made SCIM group name matching case-insensitive

**Download the Helm chart:** [`langsmith-0.12.34.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.34/langsmith-0.12.34.tgz)

[​

](#2025-12-20)

2025-12-20

## 

[​

](#langsmith-0-12-33)

langsmith-0.12.33

-   Security fix: fixed Studio vulnerability to malicious `baseUrl` param by requiring user-defined allowed origins
-   Allow enabling invites alongside JIT provisioning for SSO (OAuth with Client Secret mode only)
-   Added self-serve audit logs for administrative actions (Private Preview)

**Download the Helm chart:** [`langsmith-0.12.33.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.33/langsmith-0.12.33.tgz)

[​

](#2025-12-12)

2025-12-12

## 

[​

](#langsmith-0-12-32)

langsmith-0.12.32

-   Added IAM connection support for PostgreSQL (AWS only).
-   Added GPT-5.2 model support to the playground.
-   Added support for setting memory limits on executor pods.

**Download the Helm chart:** [`langsmith-0.12.32.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.32/langsmith-0.12.32.tgz)

[​

](#2025-12-11)

2025-12-11

## 

[​

](#langsmith-0-12-31)

langsmith-0.12.31

-   Improved error messages for basic authentication misconfiguration.
-   Added organization operator role support.
-   Fixed issues with streaming datasets endpoint.

**Download the Helm chart:** [`langsmith-0.12.31.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.31/langsmith-0.12.31.tgz)

[​

](#2025-12-09)

2025-12-09

## 

[​

](#langsmith-0-12-30)

langsmith-0.12.30

-   Fixed API Docs button not redirecting to the correct URL when using a sub path.
-   Performance improvements and bug fixes.

**Download the Helm chart:** [`langsmith-0.12.30.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.30/langsmith-0.12.30.tgz)

[​

](#2025-12-08)

2025-12-08

## 

[​

](#langsmith-0-12-29)

langsmith-0.12.29

-   Added mTLS (mutual TLS) support for ClickHouse connections to enhance security for database communication.

**Download the Helm chart:** [`langsmith-0.12.29.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.29/langsmith-0.12.29.tgz)

[​

](#2025-12-05)

2025-12-05

## 

[​

](#langsmith-0-12-28)

langsmith-0.12.28

-   Added mTLS (mutual TLS) support for PostgreSQL connections to enhance security for database communication.
-   Added mTLS support for ClickHouse clients.
-   Fixed Agent Builder onboarding and side navigation visibility when disabled in self-hosted deployments.

**Download the Helm chart:** [`langsmith-0.12.28.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.28/langsmith-0.12.28.tgz)

[​

](#2025-12-04)

2025-12-04

## 

[​

](#langsmith-0-12-27)

langsmith-0.12.27

-   Added mTLS (mutual TLS) support for Redis connections to enhance security.
-   Added support for empty trigger server configuration in self-hosted deployments.
-   Improved incident banner styling and content.

**Download the Helm chart:** [`langsmith-0.12.27.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.27/langsmith-0.12.27.tgz)

[​

](#2025-12-01)

2025-12-01

## 

[​

](#langsmith-0-12-25)

langsmith-0.12.25

-   Enabled Agent Builder UI feature flag for self-hosted deployments.
-   Added Redis Cluster support for improved scalability and high availability.

**Download the Helm chart:** [`langsmith-0.12.25.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.25/langsmith-0.12.25.tgz)

[​

](#2025-11-27)

2025-11-27

## 

[​

](#langsmith-0-12-24)

langsmith-0.12.24

-   Added dequeue timeouts to all SAQ (Simple Async Queue) queues to improve reliability.
-   Performance improvements and bug fixes.

**Download the Helm chart:** [`langsmith-0.12.24.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.24/langsmith-0.12.24.tgz)

[​

](#2025-11-26)

2025-11-26

## 

[​

](#langsmith-0-12-22)

langsmith-0.12.22

-   Added Claude Opus 4.5 model support to the playground.
-   Updated dataplane operator version.
-   Added `LANGCHAIN_ENDPOINT` environment variable when basePath is configured.

**Download the Helm chart:** [`langsmith-0.12.22.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.22/langsmith-0.12.22.tgz)

[​

](#2025-11-26-2)

2025-11-26

## 

[​

](#langsmith-0-12-21)

langsmith-0.12.21

-   Added explicit `revisionHistoryLimit` configuration for operator deployment template.

**Download the Helm chart:** [`langsmith-0.12.21.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.21/langsmith-0.12.21.tgz)

[​

](#2025-11-24)

2025-11-24

## 

[​

](#langsmith-0-12-20)

langsmith-0.12.20

-   Added support for self-hosted customers to opt into the pairwise annotation queue feature.
-   Updated operator to version 0.1.21 in LangSmith and data plane charts.

**Download the Helm chart:** [`langsmith-0.12.20.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.20/langsmith-0.12.20.tgz)

[​

](#2025-11-24-2)

2025-11-24

## 

[​

](#langsmith-0-12-19)

langsmith-0.12.19

-   Fixed playground environment configuration to use correct default settings.

**Download the Helm chart:** [`langsmith-0.12.19.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.19/langsmith-0.12.19.tgz)

[​

](#2025-11-20)

2025-11-20

## 

[​

](#langsmith-0-12-18)

langsmith-0.12.18

-   Internal updates and maintenance.

**Download the Helm chart:** [`langsmith-0.12.18.tgz`](https://github.com/langchain-ai/helm/releases/download/langsmith-0.12.18/langsmith-0.12.18.tgz)

Additional Helm chart releases are available in the [`langchain-ai/helm` GitHub repository](https://github.com/langchain-ai/helm/releases).

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/self-hosted-changelog.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.