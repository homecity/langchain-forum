---
title: "Essentials"
url: "https://docs.langchain.com/langsmith/agent-builder-essentials"
section: "langsmith"
last_modified: "2026-01-13T03:55:01.181Z"
---
Agent Builder essentials are the core features that make up the foundation of your agents. They include tools, triggers, memory, sub-agents, and approvals.

## 

[​

](#tools)

Tools

Tools let your agents interact with your apps and services. Your agents can send emails, create calendar events, post messages, search the web, and more. Choose from built-in tools for Gmail, Slack, Google Calendar, GitHub, and many others. See [Supported tools](/langsmith/agent-builder-tools) for a complete list.

## 

[​

](#triggers)

Triggers

Triggers define when your agent should start running. You can connect your agent to external tools or time-based schedules, letting it respond automatically to messages, emails, or recurring events. Here are some popular ways to trigger your agent:

## Slack

Activate your agent when messages are received in specific Slack channels.

## Gmail

Trigger your agent when emails are received.

## Cron schedules

Run your agent on a time-based schedule for recurring tasks.

## 

[​

](#memory-and-updates)

Memory and updates

Agents remember important information from previous conversations and can update themselves to work better.

-   Memory: Agents remember relevant details from past interactions, so they can make better decisions in future conversations.
-   Self-updates: Agents can add new tools, remove ones they don’t need, or adjust their instructions to improve how they work.
-   What stays the same: Agents can’t change their name, description, or the triggers that start them.

## 

[​

](#custom-models)

Custom models

Agent Builder supports custom models. You can override the default Anthropic or OpenAI model for a specific agent by editing the agent’s settings:

1.  In the [LangSmith UI](https://smith.langchain.com), navigate to the agent you want to edit.
2.  Click on the settings icon in the top right corner.
3.  In the **Model** section, select **\+ Add custom model**.
4.  Enter the model ID, display name, base URL, and API key name and value.
5.  Click **Save**.

Custom models may not perform as well as built-in models. Test your custom model before using it in production.

Bring your own model (BYO)-i.e., using models hosted on your own infrastructure-is not supported. Custom models must be accessible via a public API endpoint.

## 

[​

](#sub-agents)

Sub-agents

Build complex agents by breaking big tasks into smaller, specialized helpers. Think of sub-agents as a team of specialists—each one handles a specific part of the job while working together with your main agent. This approach makes it easier to build sophisticated systems. Instead of one agent trying to do everything, you can have specialized helpers that each excel at their part of the task. Here are some ways you might use sub-agents:

-   Split into sub-tasks: Have one agent fetch data, another summarize it, and a third format the results.
-   Specialized tools: Give different agents access to different tools based on what they need to do.
-   Independent work: Let sub-agents work on their own, then bring their results back to the main agent.

## 

[​

](#human-in-the-loop)

Human-in-the-loop

Stay in control of important decisions. You can set up your agent to pause and ask for your approval before taking certain actions. This ensures your agent handles most tasks automatically, while you retain oversight.

### 

[​

](#setting-up-approval-steps)

Setting up approval steps

1

Select a tool

When setting up your agent, choose the tool or action you want to review before it runs.

2

Turn on approval

Find the approval option for that tool and switch it on.

3

Agent waits for you

When your agent reaches that step, it will pause and wait for your approval before continuing.

### 

[​

](#what-you-can-do-when-your-agent-pauses)

What you can do when your agent pauses

When your agent stops to ask for approval, you have three options:

## Accept

Give the green light and let your agent proceed with its plan.

## Edit

Modify the agent’s message or parameters before allowing it to continue.

## Send feedback

Share feedback to help your agent learn and improve.

## 

[​

](#next-steps)

Next steps

-   [Set up your workspace](/langsmith/agent-builder-setup)
-   [Connect apps and services](/langsmith/agent-builder-tools)
-   [Use remote servers for tools](/langsmith/agent-builder-remote-mcp-servers)
-   [Choose between workspace and private agents](/langsmith/agent-builder-workspace-vs-private)
-   [Call agents from your app](/langsmith/agent-builder-code)

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/agent-builder-essentials.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.