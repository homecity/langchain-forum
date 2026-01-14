---
title: "Templates"
url: "https://docs.langchain.com/langsmith/agent-builder-templates"
section: "langsmith"
last_modified: "2026-01-13T04:01:47.602Z"
---
Agent Builder includes [starter templates](https://www.langchain.com/templates) to help you create agents quickly. Templates include predefined instructions, [tools](/langsmith/agent-builder-tools), and [triggers](/langsmith/agent-builder-essentials#triggers) (if applicable) for common use cases. You can use templates as-is, or as a baseline to customize.

If you’re new to Agent Builder, start with the step-by-step [quickstart](/langsmith/agent-builder-quickstart) to build your first agent using a template.

## 

[​

](#features)

Features

Templates are pre-configured agents designed for specific use cases. Each template includes the following components:

### 

[​

](#pre-configured-tools)

Pre-configured tools

Templates come with a curated set of [tools](/langsmith/agent-builder-essentials#tools) that enable the agent to perform specific actions. For example, an email assistant template includes tools for reading, sending, and organizing emails. Tools connect to external services through OAuth authentication, allowing your agent to interact with apps like Gmail, Slack, or Linear. For a complete list, refer to [Supported tools](/langsmith/agent-builder-tools).

### 

[​

](#system-instructions)

System instructions

Each template includes a _system prompt_ (also called _instructions_) that defines the agent’s behavior, personality, and capabilities. The system prompt guides how the agent interprets user requests and uses its available tools. You can customize these instructions to match your specific needs.

### 

[​

](#triggers-optional)

Triggers (optional)

Some templates include [triggers](/langsmith/agent-builder-essentials#triggers) that allow agents to respond to external events automatically. For example, a Slack bot template might include a trigger that activates when someone mentions the agent in a channel. Triggers enable proactive agent behavior beyond chat-based interactions.

### 

[​

](#cloning-and-customization)

Cloning and customization

Templates serve as starting points that you clone to create your own agent. When you clone a template, you create an independent copy that you can customize without affecting the original. You can modify prompts, add or remove tools, attach different triggers, and switch models to tailor the agent to your requirements.

## 

[​

](#available-templates)

Available templates

## Daily calendar brief

A daily agent that scans your calendar and delivers a concise briefing with meeting details and important context.

## Email assistant

Automate email triage with an agent that flags important emails, drafts and sends replies, and schedules meetings.

## LinkedIn recruiter

Automate recruiting with an agent that digests candidate requirements, adapts to feedback, and outputs a candidate list.

## Social media AI monitor

An agent that tracks top AI discussions from X lists and Hacker News, and delivers a daily Slack message with important updates.

For more information, see [Templates](https://www.langchain.com/templates).

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/agent-builder-templates.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.