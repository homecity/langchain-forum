# wrapOpenAI does not support OpenAI response API?

**Topic ID:** 97
**Created:** 2025-07-01 00:22:11
**URL:** https://forum.langchain.com/t/97

---

## Post #1 by @zhlmmc
*Posted on 2025-07-01 00:22:11*

I got error when using latest OpenAI client 5.8.2.

const client = wrapOpenAI(new OpenAI());

The above code reports type error.

---

## Post #2 by @jacoblee93
*Posted on 2025-07-01 00:24:45*

Hey [/u/zhlmmc](@zhlmmc), yes this is currently unsupported. If you can open a GitHub issue so that we can track things that will also be helpful!

In the meantime, you can use `traceable` as documented here:


  
      

      [https://docs.smith.langchain.com/observability/how_to_guides/log_llm_trace](docs.smith.langchain.com)
  

  
    

[https://docs.smith.langchain.com/observability/how_to_guides/log_llm_trace](Log custom LLM traces | 🦜️🛠️ LangSmith)

  Nothing will break if you don't log LLM traces in the correct format - data will still be logged. However, the data will not be processed or rendered in a way that is specific to LLMs.

---
