# How to Pass Runtime Data from SDK to LangGraph Nodes Without Polluting State?

**Topic ID:** 1488
**Created:** 2025-09-09 14:40:12
**URL:** https://forum.langchain.com/t/1488

**Tags:** python-help, cloud, langsmith-studio

---

## Post #1 by @arturbagramyan1
*Posted on 2025-09-09 14:40:12*

I’m building a multi-tenant LangGraph application and need to pass user-specific data (like **`user_id`**, **`organization_id`**, etc.) from my client SDK to individual nodes in my graph. I want to avoid adding this metadata to my graph state since it’s not part of the actual conversation flow.

**What I need:**



Pass **`user_id`** and **`organization_id`** from my Python SDK client to specific nodes



Access this data within nodes for database queries, API calls, etc.



Keep my graph state clean and focused on conversation data





What’s the recommended pattern for passing runtime context to nodes?



Should I use configurable headers, runtime config, or another approach?



How do I access this data within nested functions called by my nodes?



Any examples or best practices would be greatly appreciated!

---
