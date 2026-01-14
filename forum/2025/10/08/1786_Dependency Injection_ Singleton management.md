# Dependency Injection/ Singleton management

**Topic ID:** 1786
**Created:** 2025-10-08 22:33:11
**URL:** https://forum.langchain.com/t/1786

**Tags:** python-help, cloud

---

## Post #1 by @sameer
*Posted on 2025-10-08 22:33:12*

Hi,

I’m a longtime software engineer but new to python and backend. I’m wondering how developers are currently handling singletons (examples: database connection, rag index connection) in Langgraph, specifically Langgraph Platform.

I am trying to follow SOLID principles and have some sort of dependency injection, which I see is possible in python for example with FastAPI Depends().

If it’s not some dependency management system, how can I safely and in a production-friendly way, avoid global singletons? Are global singletons safe? Not sure what the implications if the langgraph platform instance is horizontally scaled.

Thanks

---

## Post #2 by @SpyMachine
*Posted on 2025-10-29 20:33:36*

Hi [/u/sameer](@sameer), did you come up with a good solution? I feel like I must be missing something because LangGraph just does not seem to have a good solution for this…

---

## Post #3 by @wfh
*Posted on 2025-10-31 19:56:00*

Ya lifespan events that you set on entry and never modify outside of the lifespan

---

## Post #4 by @sameer
*Posted on 2025-10-31 20:45:26*

Hi [/u/spymachine](@SpyMachine) unfortunately no not really.  I did see your thread on reddit and that LangChain Team [/u/sydney-runkle](@sydney-runkle)  posted [https://www.reddit.com/r/LangChain/comments/1ojhfqb/comment/nmcoji0/](Reddit - The heart of the internet)

However my experience with Runtime Context has been very poor so far, I halted my migration from RunnableConfig until they iron out the kinks. And like you, I’m not clear on if we can have non serializable objects in there, and how in LangGraph Platform, how we can initialize things that would go into RuntimeContext from a FastAPI lifecycle event for example.

I don’t find the documentation sufficient or complete here

---

## Post #5 by @michael6
*Posted on 2025-11-14 20:33:50*

[/u/sameer](@sameer) I’m trying to figure out this exact same thing at the moment. Please share if you have a solution. I looked through the `langgraph_api` code to see how I might be able to instrument the middleware but I didn’t see anything that could help.


  
    
    
    
      [https://forum.langchain.com/t/how-to-access-data-injected-by-http-middleware-in-graph-execution/2210](How to access data injected by HTTP middleware in Graph execution) [/c/help/langsmith-deployment/6](Deployment)
    
  
  
    I added an HTTP middleware that gets an object from our ORM, and injects it to the request. I want to access this in the graph execution, ideally pass it in RuntimeContext. Whats the best way to do this?

---

## Post #6 by @sameer
*Posted on 2025-11-15 06:27:30*

Hi there, I think it might be possible from another thread that I had fired up.


  
    
    
    
      [https://forum.langchain.com/t/how-to-store-db-connection-inside-runtime-contextschema/1412](How to store db_connection inside Runtime[ContextSchema]?) [/c/oss-product-help-lc-and-lg/langgraph/13](LangGraph)
    
  
  
    Hello, from the [https://langchain-ai.github.io/langgraph/agents/context/#static-runtime-context](Documentation) we see that 

Static runtime context represents immutable data like user metadata, tools, and database connections that are passed to an application at the start of a run via the context argument to invoke/stream 

Up until now I’ve been using RunnableConfig to define a schema to provide an Assistant (Langgraph Platform) configuration for prompts, but I’m interested to understand how I can use the Runtime to continue to do this but also potentially provide additiona…
  


Last time I played with RuntimeContext it was a mess so I’ve been staying away. I can’t personally vouch for this solution but you might find the information useful. Please do report back if you do

---
