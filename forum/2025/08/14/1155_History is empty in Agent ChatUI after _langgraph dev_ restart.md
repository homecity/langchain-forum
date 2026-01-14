# History is empty in Agent ChatUI after `langgraph dev` restart

**Topic ID:** 1155
**Created:** 2025-08-14 10:48:46
**URL:** https://forum.langchain.com/t/1155

---

## Post #1 by @beepsoft
*Posted on 2025-08-14 10:48:46*

Hi,

I am running my agent with `langgraph dev` and using [https://github.com/langchain-ai/agent-chat-ui](GitHub - langchain-ai/agent-chat-ui: 🦜💬 Web app for interacting with any LangGraph agent (PY & TS) via a chat interface.) as my chat frontend.

LangGraph seems to keep track of the chat history as it is listed in the agent chat ui in the sidebar and I can navigate/load the threads as long as the agent is not restarted. In this case of an agent restart the thread history still lists all the threads but clicking on them doesn’t load the thread.

I see from the Chrome dev console that it first runs a search


```
`POST /threads/search HTTP/1.1
Content-Type: application/json
Host: localhost:2024
Referer: http://localhost:3000/
`
```

which loads all previous threads complete with all their messages. The `Thread History` view of Agent Chat UI is loaded from this. Then, when I click a thread it loads:


```
`POST /threads/c2506f79-71ff-4357-8374-8d02c791cc80/history HTTP/1.1
Content-Type: application/json
Host: localhost:2024
Referer: http://localhost:3000/
`
```

but this returns just an empty array (`[]`) and the chat is not loaded.

So, it seems that the thread history is actually available, as it can be listed using “search“ but the direct thread history access doesn’t work.

Is it something to do with the langgraph platform or the Agent Chat UI?

---

## Post #2 by @rahul-langchain
*Posted on 2025-08-19 17:41:02*

Hi! `langgraph dev` stores everything in memory. When you deploy to LangGraph platform, you will have persistent storage in Postgres for the threads.

---
