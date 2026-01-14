# Graph randomly freezes without error

**Topic ID:** 267
**Created:** 2025-07-05 22:20:35
**URL:** https://forum.langchain.com/t/267

---

## Post #1 by @YOSS-Jarrett
*Posted on 2025-07-05 22:20:35*

I have a graph that contains a node `node_perform_research` and in this node I manually bind an llm with tools and invoke it then append the response to the state messages list and command goto the node again creating a loop until the llm calls a finish actions tool.

My graph is running synchronously and it’s running inside of a Flask application.

This works great when it does. Very often the graph just stops for seemingly no reason. I have all of my packages updated, I have remove any custom callbacks, I have done a lot of things and already discussed this with ChatGPT relentlessly to attempt to resolve it on my own and I can’t.

When I enabled `set_debug` I can see that when it freezes it’s always on the llm start (when I invoke my llm).

Any tips on getting this resolved or something? My other agents work great and I’ve never had this issue before.

---

## Post #3 by @YOSS-Jarrett
*Posted on 2025-07-07 16:38:11*

Turns out the request is timing out. The default timeout time is 10 minutes and sometimes the o3 / o3-pro models hit this limit causing my agent to fail.

I “fixed” this by lowering the timeout value and making it properly retry when the agent times out.


```
`    import httpx, openai
    timeout = httpx.Timeout(connect=20, read=180, write=180, pool=30)
    
    llm_o3_high = ChatOpenAI(
        model="o3",
        timeout=timeout,
        max_retries=2,
        output_version="responses/v1",
        reasoning={"effort": "high", "summary": "auto"},
    )
`
```

---

## Post #4 by @scrowder
*Posted on 2025-08-06 18:40:53*

Hi Jarrett, this sounds more like a LangChain than a LangGraph Platform question. You may have more luck in that category. Thanks!

---

## Post #5 by @YOSS-Jarrett
*Posted on 2025-08-06 18:54:18*

Thank you!

I solved this and I thought I posted an update I guess I didn’t. The issue was my tool suite, something was causing it to constantly get rejected I did a redesign on the toolkit available to my agent and now it’s working with no issues.

---
