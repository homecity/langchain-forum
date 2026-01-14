# "Error: No assistants found." in LangGraph Studio platform when LG Server authorization is enabled in langgraph.json

**Topic ID:** 977
**Created:** 2025-08-06 07:01:38
**URL:** https://forum.langchain.com/t/977

**Tags:** langsmith-studio

---

## Post #1 by @kapraf
*Posted on 2025-08-06 07:01:38*

Hey,

When I enable authorization in langgraph.json in the following way:

“auth”: {

“path”: “src/security/auth.py:auth”

},

where the security script simply checks “Authorization: Bearer ” (token must be equal to some env var)

I can’t access LangGraph Studio. Following message is displayed:

**Error: No assistants found.**

When I hit a  “Deloyment Settings” cog-wheel next to the “Studio” button and set up an Authorization header with a value “Bearer ” the above message changes to:

**Error: Failed to fetch assistants: . Forbidden**

The token is 100% correct – the deployment works with curl commands

---

## Post #2 by @kapraf
*Posted on 2025-08-06 09:35:24*

I found a solution – you need to add special handling for a Studio user:


  
      

      [https://docs.langchain.com/langgraph-platform/custom-auth#authorizing-a-studio-user](Docs by LangChain)
  

  
    

[https://docs.langchain.com/langgraph-platform/custom-auth#authorizing-a-studio-user](Add custom authentication - Docs by LangChain)

---
