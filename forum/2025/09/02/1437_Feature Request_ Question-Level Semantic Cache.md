# Feature Request: Question-Level Semantic Cache

**Topic ID:** 1437
**Created:** 2025-09-02 18:09:53
**URL:** https://forum.langchain.com/t/1437

---

## Post #1 by @bharatht19
*Posted on 2025-09-02 18:09:53*

Currently, RedisSemanticCache and other cache integrations in LangChain operate at the LLM layer — caching on the rendered prompt (question + retrieved context).

For many RAG use cases, it would be very useful to cache before retrieval, i.e., at the question level, so that repeated or semantically similar questions can bypass vector DB retrieval entirely.

**Why it matters:**

•	Saves cost and latency (skip retrieval + LLM if cached).

•	Supports both exact-match and semantic caching of questions.

•	Fits common enterprise use cases where the same queries recur frequently.

**What I’m asking:**

Could LangChain provide a QuestionCache or extend RedisSemanticCache (and similar backends) with an option to store & lookup only on the raw user question (optionally semantic), before retrieval?

This would complement the existing LLM-level cache and make caching more flexible in RAG pipelines.

---
