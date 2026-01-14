# Specify langraph-api version in the deployment

**Topic ID:** 843
**Created:** 2025-07-31 00:57:21
**URL:** https://forum.langchain.com/t/843

**Tags:** cloud

---

## Post #1 by @hokichaio
*Posted on 2025-07-31 00:57:21*

Hi, I have a deployment on LangSmith. We recently facing an issue that the stream stopped in the middle without giving any output. I am suspecting this is due to an update on langgraph-api version. Is there a way to specify langgraph-api version in the deployment?

I have tried setting base_image in the langgraph.json file but it seems not changing the image tag. Here is my langgraph.json


```
`{
    "base_image": "langchain/langgraph-api:0.2.101-py3.12-wolfi",
    "image_distro": "wolfi",
    "dependencies": [
        "."
    ],
    "graphs": {
      // ...
    },
    "python_version": "3.12"
}

`
```

---

## Post #2 by @scrowder
*Posted on 2025-07-31 00:59:10*

Assuming you are on our Cloud SaaS deployment option, it will always use the newest available version of LangGraph Server. Let us know if we can help with the streaming issue though!

---

## Post #3 by @wfh
*Posted on 2025-08-26 12:40:49*

You can set `api_version` now FYI.

---
