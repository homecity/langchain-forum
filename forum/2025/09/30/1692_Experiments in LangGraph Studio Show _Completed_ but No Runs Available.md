# Experiments in LangGraph Studio Show “Completed” but No Runs Available

**Topic ID:** 1692
**Created:** 2025-09-30 11:37:25
**URL:** https://forum.langchain.com/t/1692

---

## Post #1 by @SujayPrabhu
*Posted on 2025-09-30 11:37:25*

I am running experiments in LangGraph Studio through LangSmith. I have added datasets with examples and configured an LLM as the judge for correctness evaluation. The setup is for a RAG application.

When I execute the experiment against the staging environment via LangGraph Studio, the status shows “Experiments completed”, but no runs are displayed. That said, I can still see the traces under “Tracing Projects” as well as in “Evaluators”.

[#p-2951-experiment-details-1]()Experiment details
[/uploads/short-url/ksXT2u5PyICm3nz3lDRgBs8SLgD.png?dl=1](Screenshot 2025-09-30 at 14.14.122362×468 41.8 KB)

[#p-2951-packages-installed-2]()Packages installed

```
`"@langchain/community": "^0.3.55",
"@langchain/core": "^0.3.68",
"@langchain/langgraph": "^0.4.9",
"@langchain/langgraph-checkpoint-postgres": "^0.1.1",
"@langchain/langgraph-sdk": "^0.0.107",
"@langchain/openai": "^0.6.7"
`
```

---

## Post #2 by @arjun
*Posted on 2025-09-30 18:35:29*

HI [/u/sujayprabhu](@SujayPrabhu) thanks for reporting.

Do you see any errors in your deployment logs? The traces are showing up under the deployment’s tracing project, correct? Additionally, do you have any custom tracing setup in your project?

---

## Post #3 by @SujayPrabhu
*Posted on 2025-10-01 01:55:40*

Hi [/u/arjun](@arjun)


I do not see any errors in deployment logs. All APIs are returning 200
Yes, traces are showing up under the deployed project
No, we do not have any custom tracing setup

I had restriction of uploading only one image for this question. I have the detailed explanation with screenshots here: [https://github.com/langchain-ai/langgraph/discussions/6225](Experiments in LangGraph Studio Show “Completed” but No Runs Available · langchain-ai/langgraph · Discussion #6225 · GitHub)

---

## Post #4 by @SujayPrabhu
*Posted on 2025-10-03 04:20:59*

Any updates on this [/u/arjun](@arjun) ?

---

## Post #5 by @arjun
*Posted on 2025-11-12 22:22:35*

Hi [/u/sujayprabhu](@SujayPrabhu) apologies for the delay here. I wanted to confirm – is this for a local server? If so, do you have `LANGSMITH_API_KEY` correctly defined in your projects `.env` file?

---
