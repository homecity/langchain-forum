# Latency Issue in Supervisor Agentic System

**Topic ID:** 471
**Created:** 2025-07-15 09:48:52
**URL:** https://forum.langchain.com/t/471

**Tags:** cloud

---

## Post #1 by @Ahmed021
*Posted on 2025-07-15 09:48:52*

**Latency Issue in Supervisor Agentic System**

Hey, the major problem we are facing right now in our supervisor agentic system with multiple sub-agents is **latency**. The sub-agents are connected to external tools such as Email, Calendar, and Slack. We’ve deployed the system on **LangGraph Cloud (Production Tier)**, but during execution, these agents are taking a lot of time to respond.

Is there any better solution or guide available to help improve this?

[/uploads/short-url/c914qMTbjDmt6u0v9X86FWQhsud.png?dl=1](Screenshot 2025-07-15 at 2.47.25 PM1024×974 73.7 KB)

---

## Post #2 by @junedotkim
*Posted on 2025-07-15 16:37:32*

The first step would be to see a breakdown of the latency so that it can be attributed. There’s no magic wand (yet) that makes latency go down. If you are depending on third party services, it would help to see which ones are slow. If your prompts are causing it, you can ask a LLM to rewrite the prompt with your evals. If it’s making too many round trips or failed tool calls, you can add a timeout condition to fail sooner than later.

What I’m seeing here is a large variance, so I’d attribute that to some kind of loop, so I’d look there first.

---

## Post #3 by @Ahmed021
*Posted on 2025-07-20 19:35:47*

yes basically the sub agents are connected with mcps so they are taking more time.

---
