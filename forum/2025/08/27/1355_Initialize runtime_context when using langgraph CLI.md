# Initialize runtime.context when using langgraph CLI

**Topic ID:** 1355
**Created:** 2025-08-27 09:59:58
**URL:** https://forum.langchain.com/t/1355

---

## Post #1 by @eric-burel
*Posted on 2025-08-27 09:59:58*

Hi, I am playing around with LangGraph templates, and I’ve noticed some issues with  `runtime.context`. As a default since langgraph>0.6.1, this context is `None` so it can’t be accessed without being set (in version 0.6.0 which introduced this feature, it seems that it was initialized to an empty dictionary but not in later versions.

This will lead the basic template to fail with an error, I’ve documented the issue here: [https://github.com/langchain-ai/new-langgraph-project/issues/14](Runtime context is not initialized as a default · Issue #14 · langchain-ai/new-langgraph-project · GitHub)


  
      

      [https://langchain-ai.github.io/langgraph/reference/runtime/](langchain-ai.github.io)
  

  
    

[https://langchain-ai.github.io/langgraph/reference/runtime/](Runtime)

  Build reliable, stateful AI systems, without giving up control



  

  
    
    
  

  


My problem is that setting context seems to be done at invokation time: however, when using `langgraph dev`, I don’t have control on the `invoke` call.

Documentation about context showing the `invoke` call with a `context` param : [https://docs.langchain.com/oss/python/context](Context overview - Docs by LangChain) and [https://langchain-ai.github.io/langgraph/reference/runtime/](Runtime).

How can I initialize the context when using LangGraph CLI?

---
