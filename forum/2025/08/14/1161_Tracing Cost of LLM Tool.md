# Tracing Cost of LLM Tool

**Topic ID:** 1161
**Created:** 2025-08-14 18:56:17
**URL:** https://forum.langchain.com/t/1161

---

## Post #1 by @daniel
*Posted on 2025-08-14 18:56:17*

I am using the following code for tracing.

It shows the trace in the langsmith UI but it doesnt show the token usage, not the cost - how to fix that.


```
`@traceable(run_type="llm", name='daniel1', metadata={"ls_provider": "openai", "ls_model_name": "gpt-4.1-2025-04-14"})
def sample_tool()
`
```

[/uploads/short-url/oTHKWOHZURlyz2ybNZkg6920UOB.png?dl=1](image2320×778 46.2 KB)

---

## Post #2 by @daniel
*Posted on 2025-08-17 15:20:03*

Any help?

---

## Post #3 by @niilooy
*Posted on 2025-08-18 22:06:19*

Hey [/u/daniel](@daniel)! Seems like this will be resolved if you try wrapping your client using `wrap_openai`. You can check this guide here:


  
      

      [https://docs.smith.langchain.com/observability/how_to_guides/annotate_code#wrap-the-openai-client](docs.smith.langchain.com)
  

  
    

[https://docs.smith.langchain.com/observability/how_to_guides/annotate_code#wrap-the-openai-client](Annotate code for tracing | 🦜️🛠️ LangSmith)

  If you've decided you no longer want to trace your runs, you can remove the LANGSMITH_TRACING environment variable.



  

  
    
    
  

  


Once done, you can use [https://smith.langchain.com/settings/workspaces/models?_gl=1*1rkle9l*_gcl_au*MTQ1NDA0NDAzMS4xNzQ5MzEwNTI1*_ga*MjA4MjIzODc4MS4xNzU0NjY4MjI5*_ga_47WX3HKKY2*czE3NTU1NTMxMzUkbzM2JGcxJHQxNzU1NTU0MzAwJGozNiRsMCRoMA..](this) model pricing table to calculate token cost as well!


  
      

      [https://docs.smith.langchain.com/observability/how_to_guides/calculate_token_based_costs](docs.smith.langchain.com)
  

  
    

[https://docs.smith.langchain.com/observability/how_to_guides/calculate_token_based_costs](Calculate token-based costs for traces | 🦜️🛠️ LangSmith)

  - Providing token counts for LLM runs (spans)

---
