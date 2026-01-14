# AzureChatOpenAI: Sending files directly without pre-upload to storage

**Topic ID:** 2358
**Created:** 2025-11-27 01:30:19
**URL:** https://forum.langchain.com/t/2358

**Tags:** python-help

---

## Post #1 by @dmatoslf
*Posted on 2025-11-27 01:30:19*

Hi everyone,

I’m trying to use AzureChatOpenAI with Langchain to send a file (PDF) directly in a chat message, without having to first upload it to Azure storage or any external location.

So far, all examples I’ve seen—for both **Chat Completions** and the **Responses API**—require uploading the file first and then referencing it via a `file_id`.

This extra upload step adds latency and complicates workflows. I would like to know if there is any way to send a file directly in a message to AzureChatOpenAI, in base64, **without needing external storage**, for either Chat Completions or Responses API.

Is there a supported method, workaround, or planned feature for this?

Thanks in advance!

---
