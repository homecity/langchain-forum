# Deployed graph can't find prompt

**Topic ID:** 1631
**Created:** 2025-09-24 13:42:36
**URL:** https://forum.langchain.com/t/1631

---

## Post #1 by @ericness
*Posted on 2025-09-24 13:42:36*

I’ve deployed a graph into LGP that relies on prompts in the same LangSmith namespace. When I run the graph locally with a Personal Access Token from the workspace it’s able to find the prompt without an issue. However when I deploy the graph to LGP and run it in Studio, the node that tries to pull the prompt errors out saying that it doesn’t know the prompt owner.

`requests.exceptions.HTTPError: 400 Client Error: Bad Request for url: ``https://api.smith.langchain.com/commits/-/summarize-ai-daily-brief/latest`` {"error":"No prompt owner specified"}`

The deployment is using a service token that it generated. The prompt is in the same workspace as the deployed graph. The code that pulls the prompt is:


```
`ls_client = LangSmithClient(api_key=settings.langsmith_api_key)
prompt = ls_client.pull_prompt(prompt_identifier=settings.summarize_ai_daily_brief_prompt_name)
`
```

The prompt name is simply the name of the prompt without tags, etc. Any ideas on what’s going on?

If anyone from LangChain is taking a look here are the ids:

workspace: 0e133b68-dee3-4e1c-8460-82f585f46927

graph: 3c9b2056-9b7a-4e4b-811d-c9cf8c27421d

prompt and commit: summarize-ai-daily-brief 10933ab3

---
