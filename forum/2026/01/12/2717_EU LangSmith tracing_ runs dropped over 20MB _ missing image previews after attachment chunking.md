# EU LangSmith tracing: runs dropped over 20MB + missing image previews after attachment chunking

**Topic ID:** 2717
**Created:** 2026-01-12 12:55:44
**URL:** https://forum.langchain.com/t/2717

**Tags:** python-help, cloud

---

## Post #1 by @Byte
*Posted on 2026-01-12 12:55:44*

Hi LangSmith Support,

We’re running into a tracing issue on the EU endpoint that started happening recently and is now blocking our observability workflow.

**1) Problem / symptom**

Some runs never show up in LangSmith UI even though the application/test completes successfully. The logs consistently show the multipart ingest failing due to payload size:


Failed to send compressed multipart ingest: Connection error caused failure to POST [https://eu.api.smith.langchain.com/runs/multipart](https://eu.api.smith.langchain.com/runs/multipart) in LangSmith API. The content length of 29568864 bytes exceeds the maximum size limit of 20971520 bytes.


We confirmed the behavior is fully size-dependent:



Inputs 

Inputs > 20MB (e.g., ~29.6MB) → tracing is dropped and nothing appears in LangSmith



**2) Why this is critical for us**

Our analysts actively use LangSmith traces to investigate issues. They need to:



see image inputs and outputs directly in the trace,



have working image previews/thumbnails in the UI,



keep original image quality (we do not want to downscale/compress images).



Also, we intentionally keep a single LLM call that may include >20MB of image data. We don’t want to split or change the payload that is sent to the LLM.

**3) What we tried**



Different projects / API keys: no difference.



Environment variables:



LANGSMITH_BATCH_SIZE_LIMIT=55242880



LANGSMITH_DISABLE_RUN_COMPRESSION=true

This did not help; the ingest still fails once the payload exceeds ~20MB.





We implemented chunking so that logging is split into smaller parts (each below the 20MB limit). This prevented runs from being dropped.



However, after switching to chunking + attachments, we no longer get image previews in the trace UI (the images are present as attachments, but the UI doesn’t render thumbnails/preview as expected).

**4) Questions / requested guidance**



Is the 20MB limit a hard limit per multipart ingest request on the EU endpoint? Is there any way to increase it (enterprise setting / alternative ingest)?



What is the recommended “supported” way to log larger volumes of image data while keeping:



images visible in traces (not hidden),



working image previews in the UI,



and without changing image quality?





For attachments specifically: are there requirements that affect previews (MIME types, file names/extensions, max per-attachment size, where attachments must live in inputs/outputs, etc.)?



Are there recommended best practices for large image-heavy traces where the actual LLM call should remain a single request with >20MB of images, but tracing still needs to be complete and analyst-friendly?



Thanks in advance for your help.

Best regards,

Byte

---

## Post #2 by @Byte
*Posted on 2026-01-12 13:47:16*

managed to display the image preview using custom tracing with this format: “01_photo.jpg”: “data:image/jpeg;base64,/9j/4AAQ…”. In that case, the preview is shown correctly. So we don’t need to solve the preview issue anymore — but how can we solve the problem with requests over 20MB?

---

## Post #3 by @angus
*Posted on 2026-01-12 17:39:00*

[/u/byte](@Byte)  25MB is a hard limit. You can still trace images above that limit by using [https://docs.langchain.com/langsmith/upload-files-with-traces](attachments). The only caveat being that attachments are not indexed/searchable

---

## Post #4 by @Byte
*Posted on 2026-01-13 08:57:00*

Hi [/u/angus](@angus) ,

thanks for the clarification — understood that ~25MB is a hard limit and that tracing larger images should be done via attachments (with the caveat that attachments aren’t indexed/searchable).

We have a follow-up issue around *how to practically use attachments* for our case.

**Our situation**

We send **many of images** to an LLM call (OpenAI) as **base64**. That single LLM call can easily exceed 25MB total, which causes the LangSmith multipart ingest to fail if the LLM run is traced normally.

So the most realistic approach for us seems to be:



**disable tracing for the OpenAI LLM call**, and



add a **custom traced wrapper** that logs the same images as **LangSmith attachments**, so analysts can inspect them in the trace UI.



**The blocker: attachments don’t show up unless they are explicit function parameters**

In the documentation, attachments are shown as explicit parameters, e.g.:


```
`@traceable(dangerously_allow_filesystem=True)
def trace_with_attachments(val: int, text: str, image: Attachment):
    ...
`
```

However, we need to log **many files**, and we cannot realistically define a separate function parameter for each file.

We tried two approaches that look like they should be supported, but neither results in attachments appearing in LangSmith:



Passing attachments via **kwargs (dynamic keys)



Passing a single object like:

attachments: dict[str, Union[tuple[str, bytes], Attachment, tuple[str, Path]]]



In both cases the run is created, but **no attachments are persisted / visible in LangSmith**.

**Question**



What is the recommended / supported way to trace a *large number of attachments* within a single @traceable call?



Is there a specific parameter name (e.g., attachments=) that LangSmith expects?



Does the attachments dict need to be a particular type/shape to be detected?





Are attachments only recognized when they are **top-level function arguments** (explicit params), or can they be nested inside dicts/lists and still be treated as attachments?



If the answer is “top-level args only”: is there a supported pattern for logging “N images” without declaring N function params (e.g., a dedicated attachments container class, or a helper like extract_attachments)?



Our goal is to keep our LLM request unchanged (single call, high-quality images), but avoid tracing the LLM run directly and instead log the images via custom tracing with attachments — reliably, and at scale.

Thanks a lot for guidance on the correct API/pattern.

---
