# Deployment to platform failing

**Topic ID:** 897
**Created:** 2025-08-02 07:08:32
**URL:** https://forum.langchain.com/t/897

**Tags:** cloud

---

## Post #1 by @gaurav
*Posted on 2025-08-02 07:08:32*

Getting error message saying **An error occurred while creating a Docker image from your specified GitHub repository. Please see your build logs (by clicking on the revision) for more information.**

The logs are not very helpful. FYI, I’m not using custom docker image.

Deployment id=13c1e838-5df4-4769-8e30-e67c24f237a5

---

## Post #2 by @scrowder
*Posted on 2025-08-04 15:52:55*

On our end, I am seeing lots of import errors. E.g.:

`ImportError: cannot import name 'RetryPolicy' from 'langgraph.pregel' (/usr/local/lib/python3.12/site-packages/langgraph/pregel/__init__.py)`

In my experience, import errors do show up in the logs on LangGraph Platform cloud. Are you never seeing them when you create new revisions?

And does your graph work when using `langgraph dev` and `langgraph up`? If it’s failing with import errors in cloud, it should also fail in those environments.

---

## Post #3 by @scrowder
*Posted on 2025-08-04 15:55:50*

If it is an issue on our end, could you send over a minimal graph that reproduces the build error?

---
