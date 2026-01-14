# Pull_prompt is making a blocking http request

**Topic ID:** 495
**Created:** 2025-07-16 12:18:16
**URL:** https://forum.langchain.com/t/495

**Tags:** python-help

---

## Post #1 by @asleroid
*Posted on 2025-07-16 12:18:16*

Hi, I am building a Langgraph agent and using Langsmith Client to pull my prompts from the hub.  I am getting the following error/warning from Langgraph regarding the blocking nature of the way pull_prompt is making the http request:

LangSmithError(“Failed to GET /commits/-/****/latest?include_model=true in LangSmith API. Blocking call to socket.socket.connect\n\nHeads up! LangGraph dev identified a synchronous blocking call in your code. When running in an ASGI web server, blocking calls can degrade performance for everyone since they tie up the event loop.\n\nHere are your options to fix this:\n\n1. Best approach: Convert any blocking code to use async/await patterns\n   For example, use ‘await aiohttp.get()’ instead of ‘requests.get()’\n\n2. Quick fix: Move blocking operations to a separate thread\n   Example: ‘await asyncio.to_thread(your_blocking_function)’\n\n3. Override (if you can’t change the code):\n   - For development: Run ‘langgraph dev --allow-blocking’\n   - For deployment: Set ‘BG_JOB_ISOLATED_LOOPS=true’ environment variable\n\nThese blocking operations can prevent health checks and slow down other runs in your deployment. Following these recommendations will help keep your LangGraph application running smoothly!\n”)

---

## Post #2 by @madams0013
*Posted on 2025-07-16 18:02:24*

Thanks for flagging! To fix this, I’d recommend switching to the **async version of the LangSmith client**. [https://docs.smith.langchain.com/reference/python/async_client/langsmith.async_client.AsyncClient#langsmith.async_client.AsyncClient.pull_prompt](Here are some docs). This should prevent this error.

Let me know if this helps!

---
