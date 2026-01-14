# LangGraph Cloud Deployment Failure with docker error

**Topic ID:** 1565
**Created:** 2025-09-17 18:04:26
**URL:** https://forum.langchain.com/t/1565

**Tags:** cloud

---

## Post #1 by @febbraro
*Posted on 2025-09-17 18:04:26*

Hello,

I’m deploying my Github repo to LangGraph cloud and I can’t get a successful deployment revision.  The build fails over and over again when. building the docker container with the following error

`ERROR: failed to build: failed to solve: rpc error: code = Unknown desc = failed to solve with frontend dockerfile.v0: unsupported frontend capability moby.buildkit.frontend.contexts`

The internet basically says this is an error when trying to a multi-stage build on a platform that doesn;t support it, but I dont have any control over that.

Here is my langgraph.json


```
`{
  "python_version": "3.13",
  "base_image": "langchain/langgraph-server:0.4-py3.13",
  "dependencies": [
    ".",
    "../database"
  ],
  "graphs": {
    "url_processor": "./src/url_processor.py:graph"
  }
}
`
```

I tried without the base_image and with, no difference at all. Any pointers at all would be appreciated.

Thanks

---

## Post #2 by @febbraro
*Posted on 2025-09-17 22:39:35*

Ok, turns out it was partly my fault. The docs claim that python monorepo is supported, [https://docs.langchain.com/langgraph-platform/monorepo-support](Monorepo support - Docs by LangChain) yet when I removed my shared library and just included it directly in my project, the docker container build worked.  So, the docs are wrong. The deployment creation screen says that only JS monorepos are supported, and that appears to be the truth,

---
