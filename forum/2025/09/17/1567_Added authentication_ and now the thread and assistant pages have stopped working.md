# Added authentication, and now the thread and assistant pages have stopped working

**Topic ID:** 1567
**Created:** 2025-09-17 19:00:14
**URL:** https://forum.langchain.com/t/1567

---

## Post #1 by @mikerad-1989
*Posted on 2025-09-17 19:00:14*

Hi,

We started using the LangGraph Platform for our chatbot, and I’ve added authentication as you defined here:


  
      

      [https://blog.langchain.com/custom-authentication-and-access-control-in-langgraph/](LangChain Blog – 19 Dec 24)
  

  
    

[https://blog.langchain.com/custom-authentication-and-access-control-in-langgraph/](Custom Authentication and Access Control for LangGraph Platform)

  Today we're introducing custom authentication and resource-level access control for Python deployments in LangGraph Cloud and self-hosted environments. This feature lets you integrate your own auth providers and implement granular access patterns...



  

  
    
    
  

  


For some reason, after doing so, it worked perfectly but, the Assistants and Threads page in the deployment section of LangGraph Cloud dashboard started showing empty results.

Once I remove the auth definition in the langgraph.json file, it starts working again.

Is this a bug on your side? I thought the authentication definition was only for API management.

Thanks!

---
