# LangChain finishes incomplete status on LangSmith

**Topic ID:** 940
**Created:** 2025-08-04 19:06:45
**URL:** https://forum.langchain.com/t/940

---

## Post #1 by @chris910512
*Posted on 2025-08-04 19:06:45*

Hi, I created LangChain and connected to LangSmith.

Honestly, I’ve done with the vibe coding, don’t know much about the deep structure.

If I try to analyze using LangChain and send it to LangSmith, it gathers well on LangSmith. However, it never finishes, and fall into incomplete status at the end.

There are not useful logs that I can have a look into for this errors.

What can be general issues which can cause this problem?

[/uploads/short-url/kuOxYnACQToWKNgM0mQGAu1yWzJ.png?dl=1](image1976×1320 346 KB)

Here’s the code snippet when I send it to LangSmith

langsmith_manager.log_llm_call(

model=self.chat_model,

prompt=f"프롬프트: {system_prompt[:100]}…",

response=result_text,

metadata={

“function”: “refine_memo”,

“memo_length”: len(memo),

“response_length”: len(result_text),

“response_time_ms”: response_time_ms,

“use_dynamic_prompts”: self.use_dynamic_prompts

}

)

Can anybody give me any comments to fix this issue?

---

## Post #2 by @Maya
*Posted on 2025-09-29 11:19:32*

Facing same issue occasionally.

---

## Post #3 by @YannLex
*Posted on 2025-11-05 03:39:12*

Same issue, anyone can help?

---

## Post #4 by @Jameskanyiri
*Posted on 2025-11-05 04:17:52*

chris910512:

Here’s the code snippet when I send it to LangSmith

langsmith_manager.log_llm_call(

model=self.chat_model,

prompt=f"프롬프트: {system_prompt[:100]}…",

response=result_text,

metadata={

“function”: “refine_memo”,

“memo_length”: len(memo),

“response_length”: len(result_text),

“response_time_ms”: response_time_ms,

“use_dynamic_prompts”: self.use_dynamic_prompts

}

)

Can anybody give me any comments to fix this issue?



The issue could be because you are not properly closing traces.

You can try do the following. Set end_time on runs or call client.flush() before app exits.

Another option could be using another tracing method since there are several ways to logs traces to langsmith for example decorating your function

Kinldy check the docs for more:

  
      

      [https://docs.langchain.com/langsmith/annotate-code](Docs by LangChain)
  

  
    

[https://docs.langchain.com/langsmith/annotate-code](Custom instrumentation - Docs by LangChain)

---
