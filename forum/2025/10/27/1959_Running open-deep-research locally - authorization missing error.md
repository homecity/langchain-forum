# Running open-deep-research locally - authorization missing error

**Topic ID:** 1959
**Created:** 2025-10-27 07:26:54
**URL:** https://forum.langchain.com/t/1959

**Tags:** intro-to-langgraph, self-hosted

---

## Post #1 by @akambarish
*Posted on 2025-10-27 07:26:54*

Hi Team, I am trying to run open deep research agent locally, but I am getting below error.  Not able to figure out, what should be sent as bearer token. Is it Tavily or open AI key or something else that needs to be sent.

[/uploads/short-url/ceRBMVrP4aX2Xk4Q1Pln2YPJRAy.png?dl=1](image1075×234 12.9 KB)

---

## Post #2 by @pawel-twardziak
*Posted on 2025-10-27 10:54:49*

Hi [/u/akambarish](@akambarish)

there is an `.env.example` file [https://github.com/langchain-ai/open_deep_research/blob/main/.env.example](open_deep_research/.env.example at main · langchain-ai/open_deep_research · GitHub) you should copy to `.env` file and populate some of the values.

See this [https://github.com/langchain-ai/open_deep_research?tab=readme-ov-file#-quickstart](GitHub - langchain-ai/open_deep_research)

---
