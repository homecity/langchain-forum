# LangGraph Cloud – Using the Built-in PostgreSQL Store for Long-Term Memory (LTM) and Vector Similarity Search

**Topic ID:** 245
**Created:** 2025-07-04 09:34:42
**URL:** https://forum.langchain.com/t/245

**Tags:** python-help, cloud

---

## Post #1 by @Petar
*Posted on 2025-07-04 09:34:42*

Can someone explain to me how to use the vector database through Langgraph Store, which is already integrated into Langgraph Cloud, **without using third-party vector databases**, such as **Qdrant** or **Pinecone**?

I’m interested in what capabilities are available, because we’ve already uploaded some data into Langgraph  Store and we’re very satisfied with it, but I’d like to understand what options exist for **Vector Search Similarity** using Store.Is it same as pgvectore in PostgreSQL or?

Here is some code example for retrieving


```
`    store = get_store()
    if "." in form_name:
        form_name = form_name.replace(".", "_")
    doc_name_store = f"rag_docs_{form_name}"
    items = await store.asearch((user_id, doc_name_store), query=query, limit=2)
`
```

[#p-378-specifically-what-im-interested-in-1]()**Specifically, what I’m interested in:**

**Does LangGraph Store internally use PostgreSQL with pgvector for similarity search?**
If yes, **can we rely on it as a persistent memory store** — for example, for long-term knowledge retention or contextual memory across sessions in RAG applications?
Is there any way to interact with it **more transparently as a vector store**:


Manually insert and manage raw vectors?
Update or delete embeddings?
Create and manage namespaces or collections?


Lastly, we are currently on the **Startup Plan** in LangGraph Cloud — what are the **current capacity limits** for vector storage (e.g., max number of vectors, storage size, or namespace limits)?

---

## Post #2 by @andrew
*Posted on 2025-07-04 15:40:42*

**Does LangGraph Store internally use PostgreSQL with pgvector for similarity search?**


Yes.



If yes, **can we rely on it as a persistent memory store** — for example, for long-term knowledge retention or contextual memory across sessions in RAG applications?


Yes, you can rely on it.



Is there any way to interact with it **more transparently as a vector store**:


Manually insert and manage raw vectors?
Update or delete embeddings?
Create and manage namespaces or collections?


`Manually insert and manage raw vectors?` ← Not directly

`Update or delete embeddings?` ← Not directly

`Create and manage namespaces or collections?` ← Yes

Generally speaking, vector embeddings are generated/deleted based on the Store configuration and Store API interactions.

Reference documentation:


[https://langchain-ai.github.io/langgraph/cloud/deployment/semantic_search/](How to add semantic search to your LangGraph deployment)
[https://langchain-ai.github.io/langgraph/cloud/reference/api/api_ref.html#tag/store](Store API)
[https://langchain-ai.github.io/langgraph/cloud/reference/cli/#adding-semantic-search-to-the-store](Adding semantic search to the store)



Lastly, we are currently on the **Startup Plan** in LangGraph Cloud — what are the **current capacity limits** for vector storage (e.g., max number of vectors, storage size, or namespace limits)?


There are no capacity limits with respect to the **Startup Plan**. An individual LangGraph Server deployment’s disk capacity is configured based on the [https://langchain-ai.github.io/langgraph/concepts/langgraph_control_plane/#deployment-types](Deployment Type).


`Development` type deployments have a 10 GB disk size.
`Production` type deployments have an auto-increasing disk size.

---

## Post #3 by @Petar
*Posted on 2025-07-05 19:23:30*

**“Thank you very much!**

So we can use it instead of Pinecone, Milvus, or Qdrant—I suppose there aren’t any major differences, or?”

---

## Post #4 by @andrew
*Posted on 2025-07-06 12:28:54*

So we can use it instead of Pinecone, Milvus, or Qdrant—I suppose there aren’t any major differences, > or?”


Yes. However, I’m not suggesting that LangGraph Platform’s Store API/vector search functionality is a drop-in replacement for Pinecone, Milvus, or Qdrant. Try it out and see if it’s sufficient for your requirements. We’re always open to hearing direct feedback from users.

---

## Post #5 by @Petar
*Posted on 2025-07-07 06:43:22*

Okey.Thnaks!To summarize it Langgraph Cloud Store is postgre with pgvector extension?

---

## Post #6 by @andrew
*Posted on 2025-07-08 14:22:07*

Okey.Thnaks!To summarize it Langgraph Cloud Store is postgre with pgvector extension?


Yes.

---
