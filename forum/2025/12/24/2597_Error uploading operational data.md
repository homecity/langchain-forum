# Error uploading operational data

**Topic ID:** 2597
**Created:** 2025-12-24 13:25:37
**URL:** https://forum.langchain.com/t/2597

---

## Post #1 by @leon
*Posted on 2025-12-24 13:25:38*

The studio connected to the agent service I started locally, and when executing a dataset query, the following error was received:

[warning] Failed to send compressed multipart ingest: langsmith.utils.LangSmithError: Failed to POST [https://api.smith.langchain.com/runs/multipart](https://api.smith.langchain.com/runs/multipart) in LangSmith API. HTTPError(‘422 Client Error: unknown for url: [https://api.smith.langchain.com/runs/multipart](https://api.smith.langchain.com/runs/multipart)’, ‘{“error”:“Unprocessable entity: error reading multipart data: multipart: NextPart: failed to decompress: Unknown frame descriptor”}n’) [langsmith.client] api_variant=local_dev langgraph_api_version=0.5.39 thread_name=ThreadPoolExecutor-0_2

**This error has occurred many times recently when running, and I hope you can help me solve this problem.**

---
