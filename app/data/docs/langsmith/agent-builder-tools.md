---
title: "Built-in tools"
url: "https://docs.langchain.com/langsmith/agent-builder-tools"
section: "langsmith"
last_modified: "2026-01-13T03:55:01.231Z"
---
You can access a variety of tools in Agent Builder. Use built-in tools to give your agents access to email, calendars, chat, project management, code hosting, spreadsheets/BI, search, social, and general web utilities.

Google, Slack, Linear, GitHub, and LinkedIn use OAuth. Exa, Tavily, Pylon, and Twitter/X use workspace secrets (API keys).

## Gmail

Read and send email

-   Read emails (optionally include body, filter with search)
-   Send email or reply to an existing message
-   Create draft emails
-   Mark messages as read
-   Get a conversation thread
-   Apply or create labels
-   List mailbox labels

## Google Calendar

Manage events

-   List events for a date
-   Get event details
-   Create new events

## Google Sheets

Spreadsheets

-   Create spreadsheets
-   Read ranges

## BigQuery

Analytics

-   Execute SQL queries

## Slack

Send and read messages

-   Send a direct message to a user
-   Post a message to a channel
-   Reply in a thread
-   Read channel history
-   Read thread messages

## LinkedIn

Post to profile

-   Publish a post with optional image or link

## Twitter/X

-   Read a tweet by ID
-   Read recent posts from a list

## GitHub

PRs, issues, and content

-   List pull requests
-   Get pull request details
-   Create issues and pull requests
-   Comment on issues and pull requests
-   Read repository files and list directories

## Linear

Manage issues and teams

-   List teams and team members
-   List issues with filters
-   Get issue details
-   Create, update, or delete issues

## Pylon

Issue management

-   List issues
-   Get issue details
-   Update issues

## Search

-   Exa web search (optionally fetch page contents)
-   Exa LinkedIn profile search
-   Tavily web search

## Web utilities

-   Read webpage text content
-   Extract image URLs and metadata
-   Notify user (for confirmations/updates)

You can also connect to remote MCP servers to give your agents access to additional tools. See [Remote MCP servers](/langsmith/agent-builder-remote-mcp-servers) for more information.

## 

[​

](#disconnect-a-tool)

Disconnect a tool

To remove a tool from your agent:

1

Open Agent settings

In the [LangSmith UI](https://smith.langchain.com), hover over **My Agents** in the left sidebar and click the settings icon.

2

Find the integration

In the integrations section, locate the connected app you want to remove.

3

Disconnect

Click **Disconnect** for that integration.

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/agent-builder-tools.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.