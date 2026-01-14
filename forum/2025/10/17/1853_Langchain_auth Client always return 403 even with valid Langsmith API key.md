# Langchain_auth Client always return 403 even with valid Langsmith API key

**Topic ID:** 1853
**Created:** 2025-10-17 10:39:33
**URL:** https://forum.langchain.com/t/1853

**Tags:** python-help

---

## Post #1 by @julienbachmann
*Posted on 2025-10-17 10:39:33*

I’m trying to use the `langchain_auth` python module, but any action return a 403 error.

I initilize the client like this

`from langchain_auth import Client`

`client = Client(api_key="your-langsmith-api-key")`

But then if I try for example

`providers = await client.list_oauth_providers()`

I get `Exception: HTTP 403: {“detail”:“Forbidden”}`

I’ve tried personal and service API keys and I always have this error. What should I do to be allowed to use this API?

---
