# Qdrantvectorstore: Support for Multiple Dense Vectors in Qdrant

**Topic ID:** 1648
**Created:** 2025-09-25 14:56:53
**URL:** https://forum.langchain.com/t/1648

---

## Post #1 by @David
*Posted on 2025-09-25 14:56:53*

Hi everyone,

I’ve been working with [https://github.com/langchain-ai/langchain/blob/master/libs/partners/qdrant/langchain_qdrant/qdrant.py](`QdrantVectorStore`) in LangChain and ran into a limitation: the current integration only supports **one (default) dense vector field** (plus optionally one sparse vector for hybrid).

However, Qdrant collections can be configured with **multiple dense vector fields**. Right now, LangChain’s `QdrantVectorStore` can’t handle this setup — `vector_name` is a single string, so you can’t index or search across multiple dense fields.

[#p-2853-what-id-like-to-propose-1]()What I’d like to propose


Replace `self.vector_name` with `self.vector_names` (a list).



When adding documents, generate embeddings for each field in the list.



For retrieval allow queries across all dense vector fields. Get result for each field and then merge results using  fusion strategy (e.g., RRF). For Hybrid Search we would there would be 2 steps of fusion.



This would make the integration consistent with Qdrant’s actual capabilities and unlock more powerful retrieval strategies directly from LangChain.

Would love to hear your thoughts — I already have a draft implementation, would it be a good idea if I put together a PR with these changes ?

---
