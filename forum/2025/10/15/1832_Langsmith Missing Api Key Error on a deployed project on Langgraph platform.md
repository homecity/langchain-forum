# Langsmith Missing Api Key Error on a deployed project on Langgraph platform

**Topic ID:** 1832
**Created:** 2025-10-15 16:27:00
**URL:** https://forum.langchain.com/t/1832

---

## Post #1 by @winstonkaranja
*Posted on 2025-10-15 16:27:00*

Hi, i got this weird error on my deployed project on langgraph platform, and cannot see any traces of any run.

Any help would be appreciated

[ERROR]   warnings.warn(

10/15/2025, 7:08:16 PM

[ERROR] /usr/lib/python3.11/site-packages/langsmith/client.py:290: LangSmithMissingAPIKeyWarning: API key must be provided when using hosted LangSmith API

The same deployment shows traces just fine when running langgraph dev on my machine, but for some reason, the deployed version cannot trace properly after runs….see logs below on what happens during a run

[INFO] Background run succeeded

10/15/2025, 7:08:25 PM

[INFO] HTTP Request: POST [https://api.openai.com/v1/chat/completions](https://api.openai.com/v1/chat/completions) “HTTP/1.1 200 OK”

10/15/2025, 7:08:16 PM

[WARNING] Failed to multipart ingest runs: langsmith.utils.LangSmithAuthError: Authentication failed for [https://api.smith.langchain.com/runs/multipart](https://api.smith.langchain.com/runs/multipart). HTTPError(‘401 Client Error: Unauthorized for url: [https://api.smith.langchain.com/runs/multipart](https://api.smith.langchain.com/runs/multipart)’, ‘{“error”:“Unauthorized”}\n’)trace=0199e8a1-1b38-744f-900d-82bf31cf46d0,id=0199e8a1-1b38-744f-900d-82bf31cf46d0; trace=0199e8a1-1b38-744f-900d-82bf31cf46d0,id=3ba69ace-47c1-4e6d-8bac-66499173f6c9; trace=0199e8a1-1b38-744f-900d-82bf31cf46d0,id=b47e0159-54e1-4b28-97fd-005f2601b9a6; trace=0199e8a1-1b38-744f-900d-82bf31cf46d0,id=0fe98fbb-6bbc-4f78-b40c-56a1ed1e556d; trace=0199e8a1-1b38-744f-900d-82bf31cf46d0,id=134bc4a4-979b-4c9e-a46a-50c1381eb0b8; trace=0199e8a1-1b38-744f-900d-82bf31cf46d0,id=f10c2b90-d74e-44cb-9882-80094b5920e7; trace=0199e8a1-1b38-744f-900d-82bf31cf46d0,id=16693f6d-6112-4347-be47-cd5fb8d3520d

10/15/2025, 7:08:16 PM

[ERROR]   warnings.warn(

10/15/2025, 7:08:16 PM

[ERROR] /usr/lib/python3.11/site-packages/langsmith/client.py:290: LangSmithMissingAPIKeyWarning: API key must be provided when using hosted LangSmith API

10/15/2025, 7:08:16 PM

[INFO] Listening for cancellation

10/15/2025, 7:08:16 PM

[INFO] Starting background run

10/15/2025, 7:08:16 PM

[INFO] POST /threads/d4cebe22-7db5-4068-a215-b9bdde56a318/runs 200 35ms

10/15/2025, 7:08:16 PM

[INFO] Created run

---
