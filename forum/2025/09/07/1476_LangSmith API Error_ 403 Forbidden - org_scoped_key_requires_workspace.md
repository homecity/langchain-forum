# LangSmith API Error: 403 Forbidden - org_scoped_key_requires_workspace

**Topic ID:** 1476
**Created:** 2025-09-07 02:41:07
**URL:** https://forum.langchain.com/t/1476

---

## Post #1 by @MrCoder
*Posted on 2025-09-07 02:41:07*

Hi everyone,

I’m having trouble connecting to the LangSmith API and I’m hoping someone

can help.

The Problem:

I’m on the Plus tier and I’m consistently getting a 403 Forbidden error

with the message {“error”:“org_scoped_key_requires_workspace”}.

My Setup:

I’m using the following environment variables in my .env.local file:

LANGCHAIN_TRACING_V2=true

LANGCHAIN_ENDPOINT=[https://api.smith.langchain.com](https://api.smith.langchain.com)

LANGCHAIN_PROJECT=diagramly-ai

LANGCHAIN_API_KEY=lsv2_sk_…_5f473ab36e (redacted)

LANGSMITH_API_KEY=lsv2_sk_…_5f473ab36e (redacted)

LANGSMITH_WORKSPACE_ID=99e02d98-……cb15d

What I’ve Tried:


I’ve confirmed that I’m using LANGCHAIN_WORKSPACE_ID for the workspace ID.
I’ve created a minimal test script to isolate the issue, and it still

fails.
I’ve tried explicitly passing the API key to the Client constructor.

Despite all this, the error persists. It seems like my environment

variables are correct, but the LangSmith server is still rejecting the

request.

Has anyone encountered this issue before? Any ideas on what I might be

missing?

Thanks in advance for your help!

---
