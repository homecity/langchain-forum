# How to access data injected by HTTP middleware in Graph execution

**Topic ID:** 2210
**Created:** 2025-11-14 16:45:49
**URL:** https://forum.langchain.com/t/2210

---

## Post #1 by @michael6
*Posted on 2025-11-14 16:45:49*

I added an HTTP middleware that gets an object from our ORM, and injects it to the request. I want to access this in the graph execution, ideally pass it in RuntimeContext. Whats the best way to do this?

---

## Post #2 by @pawel-twardziak
*Posted on 2025-11-14 19:42:49*

hi [/u/michael6](@michael6)

do I understand you correctly - you are seeking a way to propagate a request data info into graph runs?

And you want to inject it from Langsmith?

If I am mistaken, could you provide some pseudo-code and clarify?

---

## Post #3 by @michael6
*Posted on 2025-11-14 20:21:25*

I am using langsmith with deploy. Previously I was instrumenting my own `/threads/{thread_id}/runs/stream` endpoint, that had this logic:


```
`context = {"db": db}

return await agent.ainvoke(initial_state, config=config, context=context)
`
```

Then I would access the context / db using `runtime.context.db` in nodes / tools where I inject a runtime.

But now I let langsmith handle that endpoint, and I am instead adding an [https://docs.langchain.com/langsmith/custom-middleware](HTTP middleware) that can inject data into the request, or call other functions. Given I am letting langsmith call the invoke / stream function, what is the best way to set the context for that downstream call.

---

## Post #4 by @michael6
*Posted on 2025-11-16 23:14:03*

I’ve come to the conclusion that I should just pull any static identifiers via configurable. Using LangSmith deployment there doesnt seem to be a good way to setup the context since Im not making that initial call into the graph.

---
