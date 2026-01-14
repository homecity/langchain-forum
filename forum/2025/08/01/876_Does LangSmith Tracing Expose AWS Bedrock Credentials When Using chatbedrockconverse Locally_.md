# Does LangSmith Tracing Expose AWS Bedrock Credentials When Using chatbedrockconverse Locally?

**Topic ID:** 876
**Created:** 2025-08-01 14:49:28
**URL:** https://forum.langchain.com/t/876

---

## Post #1 by @Yellowflash2791
*Posted on 2025-08-01 14:49:28*

I’m currently using the chatbedrockconverse module locally in my LangGraph project. When I enable LangSmith tracing and execute the graph, will any of my Bedrock-related credentials or AWS configuration (e.g., access keys, region, secret keys) be sent to the LangSmith cloud during the tracing process?

I’m specifically concerned about whether any part of the Bedrock authentication setup used in the local LLM calls is logged, transmitted, or exposed in the trace payloads sent to LangSmith

---
