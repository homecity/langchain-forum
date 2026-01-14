# About RunTree usage

**Topic ID:** 269
**Created:** 2025-07-06 06:15:33
**URL:** https://forum.langchain.com/t/269

---

## Post #1 by @zhlmmc
*Posted on 2025-07-06 06:15:33*

Is there any detailed doc about how to use RunTree? For example, how to create a new RunTree, how to append children, how to find a RunTree by ID, how to end a RunTree. Thanks!

---

## Post #2 by @zhlmmc
*Posted on 2025-07-06 06:29:29*

I couldn’t find a way to get RunTree by ID, I can only get Run through client.readRun. How to convert this run to runtree?

---

## Post #3 by @jacoblee93
*Posted on 2025-07-07 20:29:54*

Hey [/u/zhlmmc](@zhlmmc), have you checked out this section of the docs?


  
      

      [https://docs.smith.langchain.com/observability/how_to_guides/annotate_code#use-the-runtree-api](docs.smith.langchain.com)
  

  
    

[https://docs.smith.langchain.com/observability/how_to_guides/annotate_code#use-the-runtree-api](Annotate code for tracing | 🦜️🛠️ LangSmith)

  If you've decided you no longer want to trace your runs, you can remove the LANGSMITH_TRACING environment variable.



  

  
    
    
  

  


You can also checkout our API refs for a full list of available methods:


  
      

      [https://docs.smith.langchain.com/reference/python/run_trees/langsmith.run_trees.RunTree#langsmith.run_trees.RunTree](docs.smith.langchain.com)
  

  
    

[https://docs.smith.langchain.com/reference/python/run_trees/langsmith.run_trees.RunTree#langsmith.run_trees.RunTree](RunTree — 🦜️🛠️ LangSmith  documentation)



  

  
    
    
  

  


As for your last question, can you go into more detail around what you’re trying to do?

---

## Post #4 by @zhlmmc
*Posted on 2025-07-08 01:58:13*

these docs does not help. The reason that I need to get RunTree by ID is that I’m trying to manually construct the tracing tree. And I found that when you postRun you need to set parent_run not just parent_run_id, otherwise the child run will not be appended to the parent run.

---

## Post #5 by @marco
*Posted on 2025-07-08 14:01:06*

Hi [/u/zhlmmc](@zhlmmc) are you trying to manually construct the tracing tree to perform distributed tracing? If so, you would need the whole tracing context, only the ID will not be enough since the RunTree is stored in-memory. Let us know your use case!


  
      

      [https://docs.smith.langchain.com/observability/how_to_guides/distributed_tracing](docs.smith.langchain.com)
  

  
    

[https://docs.smith.langchain.com/observability/how_to_guides/distributed_tracing](Implement distributed tracing | 🦜️🛠️ LangSmith)

  Sometimes, you need to trace a request across multiple services.

---

## Post #6 by @zhlmmc
*Posted on 2025-07-09 20:13:07*

Let me try to put it simple, the agent job may take a lot of task and steps. Steps belongs to tasks. We have the runId of each task and step in database. Sometimes, the job get interrupted and resumed. The runTree object in memory is gone, we have to construct the runTree based on the runIDs saved in database. Now, the problem is we can’t find a way to construct a runTree from the saved id. [/u/marco](@Marco) I’m in SF, in case you are in town I can come by and explain that in person. It’s blocking us currently.

---

## Post #7 by @zhlmmc
*Posted on 2025-07-12 20:29:18*

marco:

[https://docs.smith.langchain.com/observability/how_to_guides/distributed_tracing](Implement distributed tracing | 🦜️🛠️ LangSmith)



[/u/marco](@Marco) just to let you know that toHears and fromHeaders works.

---
