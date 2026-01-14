# Tracing Google GenAI client

**Topic ID:** 1445
**Created:** 2025-09-03 15:26:00
**URL:** https://forum.langchain.com/t/1445

**Tags:** python-help

---

## Post #1 by @gocampo
*Posted on 2025-09-03 15:26:00*

Hi!

I’m trying to trace calls using GenAI client instead of OpenAI.

Is that possible using @traceable decorator?This is an extract of my code (env variables LANGSMITH_TRACING, LANGSMITH_TRACING_V2 and LANGSMITH_API_KEY are assigned):


```
`@traceable(run_type=‘llm’) 
async def call_llm():   
  client = genai.Client(vertexai=True,project=os.environ.get(“GEMINI_PROJECT_ID”),location=“global”,)   
  response = client.models.generate_content(model=model,contents=contents,config=generate_content_config,)
`
```


```
`
`
```

---
