# How to get the field inputs_preview populated when querying runs via id using the Rest API

**Topic ID:** 1930
**Created:** 2025-10-24 13:17:30
**URL:** https://forum.langchain.com/t/1930

---

## Post #1 by @francisco.junior
*Posted on 2025-10-24 13:17:30*

Hi,

I am using LangSmith Rest API to retrieve Run details. I was interested in the inputs and outputs. In the api it mentions two fields inputs_preview and outputs_preview but in most of the cases they don’t come populated.

Is there any parameter in the API or traces generation that causes those fields to be populated?

As the inputs and outputs is a dict, it makes very hard to get some standard on their format.

API Doc: [https://api.smith.langchain.com/redoc#tag/run/operation/read_run_api_v1_runs__run_id__get](LangSmith - ReDoc)

Thanks,

Francisco

---
