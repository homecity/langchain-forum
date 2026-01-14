# Running into basic access problem with new key created

**Topic ID:** 185
**Created:** 2025-07-02 01:13:32
**URL:** https://forum.langchain.com/t/185

---

## Post #1 by @felixwong
*Posted on 2025-07-02 01:13:32*

I am trying to test out Langsmith by running it with a simple example, with a new key created with my personal account.  I have double checked that I copy and pasted the key properly.

However, I keep on getting this error:

WARNING:langsmith.client:Failed to send compressed multipart ingest: langsmith.utils.LangSmithError: Failed to POST [https://api.smith.langchain.com/runs/multipart](https://api.smith.langchain.com/runs/multipart) in LangSmith API. HTTPError(‘403 Client Error: Forbidden for url: [https://api.smith.langchain.com/runs/multipart](https://api.smith.langchain.com/runs/multipart)’, ‘{“error”:“Forbidden”}\n’)

---

## Post #2 by @nhuang
*Posted on 2025-07-02 15:09:05*

Hey Felix

To troubleshoot, could you try:


If you’re using a venv, restarting the venv and printing it out with `os.environ.get("LANGSMITH_API_KEY")`
If that doesn’t work, can you try pasting it directly into the client

---

## Post #3 by @eric-burel
*Posted on 2025-12-15 13:32:06*

Hi [/u/nhuang](@nhuang) , my LangChain training participants sometimes hit this issue on newly created accounts and keys (personal key on the default workspace). Is there some security safeguard that kicks in somehow? I don’t hit this issue on my “older” key.

Related: [https://forum.langchain.com/t/langchain-auth-client-always-return-403-even-with-valid-langsmith-api-key/1853](Langchain_auth Client always return 403 even with valid Langsmith API key)

Indirectly related (case of a service key) : [https://forum.langchain.com/t/langsmith-api-error-403-forbidden-org-scoped-key-requires-workspace/1476](LangSmith API Error: 403 Forbidden - org_scoped_key_requires_workspace)

---

## Post #4 by @eric-burel
*Posted on 2025-12-16 16:11:34*

It seems that it might be related to picking the wrong region between eu and non-eu.

---
