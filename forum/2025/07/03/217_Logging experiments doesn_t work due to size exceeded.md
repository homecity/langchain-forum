# Logging experiments doesn't work due to size exceeded

**Topic ID:** 217
**Created:** 2025-07-03 10:19:53
**URL:** https://forum.langchain.com/t/217

---

## Post #1 by @lukanarrative
*Posted on 2025-07-03 10:19:53*

I have a dataset on Langsmith. I’m using 2 splits which combined have 8 examples.

The examples are quite big → they contain a `base64` representation of a pdf, which is between 1 and 10MB each.

I build my graph locally, with `langgraph dev` and then select `Run experiment` and select the dataset and splits.

There’s this error in the logs:


```
`WARNING [langsmith.client:client.py:_send_multipart_req:1969] Failed to multipart ingest runs: Connection error caused failure to POST https://api.smith.langchain.com/runs/multipart in LangSmith API. The content length of 457264450 bytes exceeds the maximum size limit of 20971520 bytes. SSLError(MaxRetryError("HTTPSConnectionPool(host='api.smith.langchain.com', port=443): Max retries exceeded with url: /runs/multipart (Caused by SSLError(SSLEOFError(8, 'EOF occurred in violation of protocol (_ssl.c:2427)')))"))
`
```

457264450 bytes = 436MB → I honestly have no idea why there’s such a big payload.

No traces are logged in the traces project, and the experiment gets marked as “completed” in the UI:

[/uploads/short-url/zhNn3G9pvmLr3ODmqs7TeZnFaOB.png?dl=1](image742×362 36.9 KB), but when I open it, it’s empty.

When I use single split, with 5 examples, it works.

I don’t understand why there’s 436MB in the logs, and is there a way to go around this?

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-04 13:00:03*

The 436MB payload is from LangSmith trying to log all your PDF base64 data as part of the experiment traces. The 20MB limit is per request, and your 8 examples with 1-10MB PDFs each exceed this when batched together.

Solutions:


**Reduce batch size** - LangSmith batches runs, so fewer examples per batch might work
**Remove PDFs from logged data** - Use custom serializers to exclude base64 data from traces
**Store PDFs externally** - Replace base64 with URLs/IDs in your dataset, store actual PDFs elsewhere
**Use `exclude_keys`** parameter in your LangSmith client to filter out large fields

The cleanest approach is storing PDFs externally and only logging metadata/references in LangSmith experiments. Hope it helps🙂

---

## Post #3 by @lukanarrative
*Posted on 2025-07-17 10:27:32*

AbdulBasit:

Use custom serializers to exclude base64 data from traces



Can you please share reference to custom serializers for Langsmith?

---

## Post #4 by @lukanarrative
*Posted on 2025-07-17 11:03:01*

Is it [https://docs.smith.langchain.com/observability/how_to_guides/mask_inputs_outputs](Prevent logging of sensitive data in traces | 🦜️🛠️ LangSmith) ?

---
