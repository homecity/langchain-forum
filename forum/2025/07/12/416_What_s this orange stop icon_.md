# What's this orange stop icon?

**Topic ID:** 416
**Created:** 2025-07-12 12:48:24
**URL:** https://forum.langchain.com/t/416

**Tags:** cloud

---

## Post #1 by @abhagsain
*Posted on 2025-07-12 12:48:24*

[/uploads/short-url/sIRbRBAjHx2RjtUdFhYW1G4xX5E.png?dl=1](image916×312 14.3 KB)

What’s this icon? And I think it means something went wrong, but how do I investigate what the issue was?

There was no error in the child runs

---

## Post #2 by @niilooy
*Posted on 2025-07-22 18:35:07*

Hi! This most likely means the run was interrupted / aborted before completion. Not necessarily an error though, this could’ve happened due to premature termination of code, async context loss or partial ingestion of high-volume data (which is more likely considering the token size).

---

## Post #3 by @kavitatipnis
*Posted on 2025-08-13 04:07:47*

Can we get some documentation on this error ? We are encountering these and we have logging in place but it is hard to debug and triage if it’s an LLM API issue or LangChain or  LangSmith Issue given we use  langchain runnables and langsmith tracing.

---
