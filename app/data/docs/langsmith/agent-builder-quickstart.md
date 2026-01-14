---
title: "Quickstart"
url: "https://docs.langchain.com/langsmith/agent-builder-quickstart"
section: "langsmith"
last_modified: "2026-01-13T04:19:04.975Z"
---
In this quickstart, you’ll use the pre-defined **Email Assistant** [template](/langsmith/agent-builder-templates) that organizes and manages your inbox for you.

-   Select a different template.

You’ll interact with your agent through chat, just like texting a helpful assistant.

## 

[​

](#before-you-start)

Before you start

You’ll need:

-   A LangSmith account ([sign up here](https://smith.langchain.com/agents?skipOnboarding=true)).
-   A Gmail account.
-   A Google calendar.
-   An OpenAI or Anthropic API key (Step 1 will show you how to get one).

## 

[​

](#1-get-your-model-api-key)

1\. Get your model API key

Your agent needs an API key to connect to an AI model. The AI model is what allows your agent to understand and respond to your requests.

-   OpenAI (ChatGPT)
    
-   Anthropic (Claude)
    

1.  Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys).
2.  Click **Create new secret key**.
3.  Give it a name like “Agent Builder”.
4.  Copy the key (it starts with `sk-`).
5.  Save it somewhere safe, you’ll need it in Step 2.

1.  Go to [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys).
2.  Click **Create Key**.
3.  Give it a name like “Agent Builder”.
4.  Copy the key (it starts with `sk-ant-`).
5.  Save it somewhere safe, you’ll need it in Step 2.

Both services charge based on usage.

## 

[​

](#2-add-your-api-key-to-langsmith)

2\. Add your API key to LangSmith

Now you’ll add your API key to LangSmith so your agents can use it:

1

Open Settings

1.  Go to [smith.langchain.com](https://smith.langchain.com).
2.  Click the **Settings** icon in the bottom left.

2

Go to Secrets

Click the **Secrets** tab at the top.

3

Add your key

1.  Click **Add secret**.
2.  For **Key**, enter:
    -   `OPENAI_API_KEY` (if using OpenAI)
    -   `ANTHROPIC_API_KEY` (if using Anthropic)
3.  For **Value**, paste the API key you copied in Step 1.
4.  Click **Save secret**.

Your agent now has access to an AI model to understand and respond to your requests. Next, you’ll create your agent.

## 

[​

](#3-create-your-agent)

3\. Create your agent

1

Navigate to Agent Builder

1.  In the [LangSmith UI](https://smith.langchain.com), click **Switch to Agent Builder** at the top of the left-hand navigation.

2

Choose a template

1.  Select **Templates** in the left-hand navigation.
2.  Select **Email Assistant** template.
3.  Click **Use this template**.

If you don’t want to start with a template, you have two other options. From the **\+ New Agent** page:

-   **Chat**: Use the chat interface to describe your agent, and it will help you create it step-by-step.
-   **Manually**: Select **Create manually instead** to build your agent without any pre-filled responses on the configuration page.

3

Authorize accounts

Your agent will ask you to connect your Google accounts:

1.  Click **Connect**.
2.  Sign in with your Google account.
3.  Review permissions and click **Allow**.
4.  You’ll be redirected back to LangSmith where your agent will be created.

Your agent only accesses your accounts when working on tasks you give it. You can revoke access anytime in your Google account settings.

## 

[​

](#4-view-the-agent-template)

4\. View the agent template

1

View and customize the template

At this point, you can review the template instructions for the email assistant. If needed, you can make adjustments to the instructions.If you made any changes, click **Save changes**.

2

Start a test chat

1.  In the right-hand panel of the configuration page, select the **Test Chat** tab.
2.  Try out the email assistant in the chat interface, for example:
    
    > _Apply a “Review” label to emails that I receive, which require some kind of review from me_
    

3

Agent starts working

Your agent will start work and provide a **Continue** option for each step that requires your approval.![Test chat output view with response including approvals for Gmail tool.](https://mintcdn.com/langchain-5e9cc07a/GV0X68p3yf3J2iDU/langsmith/images/agent-builder-response.png?fit=max&auto=format&n=GV0X68p3yf3J2iDU&q=85&s=7a96f9f6c7d7a5e78b0bf5e32b56103b)![Test chat output view with response including approvals for Gmail tool.](https://mintcdn.com/langchain-5e9cc07a/GV0X68p3yf3J2iDU/langsmith/images/agent-builder-response-dark.png?fit=max&auto=format&n=GV0X68p3yf3J2iDU&q=85&s=8c1a454a5437353a03e5a50304309a1b)

3.  As you test out the agent, you can make edits to the instructions, or add tools that you may need. Click **Save changes** when you’re happy with the results.

## 

[​

](#edit-your-agent)

Edit your agent

You may want to update your agent’s instructions or include more tools. You can directly chat with your agent to ask for updates, or you can:

1.  From **My Agents** in the left-hand navigation, select the agent you want to edit.
2.  Select **Edit Agent**.

From the agent’s edit page, you can:

-   Add tools with **\+ Add tool** to connect more apps and services like Slack, GitHub, or Linear.
-   Add further helpers with **\+ Add sub-agent** to break complex tasks into specialized sub-tasks.
-   Request pauses for reviews on existing tools.
-   Modify existing tools.
-   Explore features that can trigger your agent to start a task.

## 

[​

](#next-steps)

Next steps

Now that you’ve created your first agent, here’s what to explore:

[

## Try more templates

Explore pre-built agents for common tasks





](/langsmith/agent-builder-templates)[

## Add automation

Run your agent automatically with triggers (Slack, email, schedules)





](/langsmith/agent-builder-essentials#triggers)[

## Connect more tools

Add Slack, GitHub, Linear, and more





](/langsmith/agent-builder-tools)[

## Build complex agents

Use sub-agents to break down big tasks





](/langsmith/agent-builder-essentials#sub-agents)

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/agent-builder-quickstart.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.