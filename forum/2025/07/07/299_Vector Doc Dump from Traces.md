# Vector Doc Dump from Traces

**Topic ID:** 299
**Created:** 2025-07-07 22:33:19
**URL:** https://forum.langchain.com/t/299

---

## Post #1 by @kavitatipnis
*Posted on 2025-07-07 22:33:19*

Is there a way to export just the documents from a trace ? Even a small copy icon on the raw json can help with debugging. Often with RAG, we need to debug whether a document is retrieved or not based on user feedback and a quick way to get a dump of retrieved docs will help us in debugging issues faster.

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-09 16:26:04*

LangSmith doesn’t have a direct “export documents” feature, but you can extract retrieved documents from traces by using the LangSmith SDK to fetch the trace data and filter for retrieval steps. Use `client.read_run(run_id)` to get the full trace, then parse the outputs/inputs of your retrieval nodes to extract document content. Alternatively, you can add custom logging in your RAG pipeline to specifically log retrieved documents with metadata, making them easier to find in traces. A quick workaround is using browser dev tools to copy the JSON from the trace view and parse it locally.

---

## Post #3 by @kavitatipnis
*Posted on 2025-07-09 19:17:44*

Thanks for the idea on using the SDK, I can add that as a step, we use the SDK for connecting the evals to the vector store. We have logging but if you have a higher “k” number ( k > 10) the logs are unmanageable so a dump is the most efficient way to debug.

---

## Post #4 by @kavitatipnis
*Posted on 2025-07-10 23:27:03*

I found that there is a weird UX issue between Firefox and Chrome browsers → On Firefox there is an option to copy the set of documents but on Chrome that functionality is missing , likely the ux widget only works on Firefox vs Chrome

---

## Post #5 by @kavitatipnis
*Posted on 2025-07-30 21:30:51*

I don’t think that there is a right method in the client sdk that will get me the list of documents metadata for a run.. for example get run_results

  
      

      [https://docs.smith.langchain.com/reference/python/client/langsmith.client.Client](docs.smith.langchain.com)
  

  
    

[https://docs.smith.langchain.com/reference/python/client/langsmith.client.Client](Client — 🦜️🛠️ LangSmith  documentation)

---
