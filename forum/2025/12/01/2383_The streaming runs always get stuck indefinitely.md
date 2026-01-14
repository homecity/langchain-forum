# The streaming runs always get stuck indefinitely

**Topic ID:** 2383
**Created:** 2025-12-01 00:59:38
**URL:** https://forum.langchain.com/t/2383

---

## Post #1 by @abhagsain
*Posted on 2025-12-01 00:59:38*

We’re using `"langchain": "^0.3.27"` ``“langsmith”: “^0.3.65” versions with JS + Cloudflare Workers and our streaming runs always get stuck in the loading state, and we can’t see the response, which makes having langsmith useless.  This doesn’t happen for non-streaming, though.

Sometimes, some of them load, but it’s unpredictable. The majority of them never resolve.

This doesn’t affect the actual LLM response, but I can’t see the response, so I can’t investigate issues.

[/uploads/short-url/a5RDh8uR7h9lghE4TKJhvMoEVxn.png?dl=1](image419×162 8.1 KB)

---

## Post #2 by @eric-langchain
*Posted on 2025-12-03 17:05:35*

could you give us a little more info on how you’re tracing? some sample code would help

---
