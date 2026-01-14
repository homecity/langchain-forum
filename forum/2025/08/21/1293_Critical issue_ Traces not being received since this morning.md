# Critical issue: Traces not being received since this morning

**Topic ID:** 1293
**Created:** 2025-08-21 11:11:24
**URL:** https://forum.langchain.com/t/1293

**Tags:** cloud

---

## Post #1 by @Dvinge
*Posted on 2025-08-21 11:11:24*

We havn’t been able to receive any traces since this morning, which seems to be related to the latest version of langgraph-api (0.3.0). The traces was working perfectly in the previous versions.

This is currently only affecting our development environment but blocks us from releasing to other environments. [/u/arjun](@arjun)

We urgently need the ability to lock versions of langgraph-api in the cloud platform. The currect approach where it always install the latest version makes a lot of trouble.


we are forced to monitor and test every release you push to the hub before testing our own things
we spend a lot of time debugging every time we encounter issues with the langgraph-api.
we are locked out from releasing and could accidentally break production by pushing a new revision.

**This is the error from the logs**

`[ERROR] LangSmith tracing error: Failed to submit trace data. This does not affect your application's runtime. Error details: Traceback (most recent call last):   File "/usr/local/lib/python3.12/site-packages/langsmith/_internal/_background_thread.py", line 260, in _tracing_thread_handle_batch     group_ops, api_url=api_url, api_key=api_key     ^^^^^^^^^ UnboundLocalError: cannot access local variable 'group_ops' where it is not associated with a value`

---

## Post #2 by @Dvinge
*Posted on 2025-08-22 12:26:17*

Any update on this?

---

## Post #3 by @arjun
*Posted on 2025-08-22 15:17:24*

Hi [/u/dvinge](@Dvinge)

Apologies for the disruption here. Our team has a fix in progress for this that should be live shortly.

In the meantime, we recently released support for pinning the version `langgraph-api` , which hopefully will alleviate many of these concerns. Please see the reference docs [https://docs.langchain.com/langgraph-platform/cli](here) for how to do this. Essentially you just need to specify `api_version` in your project’s `langgrpah.json` file.

---

## Post #4 by @wfh
*Posted on 2025-08-22 15:32:27*

Hello! Sorry to hear you’re having traces issues. As Arjun mentioned, you can pin and bump the api version in your config to manage server upgrades.

That said, we’ve never touched the production tracing logic in the langgraph server (it just uses the default langgraph settings), so I don’t think it’s related to the server version here EXCEPT in the default langsmith version that’s built into the base image. If you want to pin a particular langsmith SDK version, that can be set in your pyproject.toml.

I suspect it was

langsmith==0.4.15 that has the regression and pinning to

0.4.14 would work (the tracing sdk)

---

## Post #5 by @Dvinge
*Posted on 2025-09-10 10:15:06*

Thanks for the response.

We encounter a similar issue now where we dont get any traces in langsmith, but this time with no errors showing up.

These are the versions i tried

0.4.15 - no traces

0.4.12 - no traces

0.4.9 -  no traces

0.4.8 - no traces

Our staging and production environment is both using 0.4.8 where there is visible traces. Why dont we get any traces for our dev environment anymore?

We have otel set up with elastic as well, and it used to work. We followed the documentation [https://docs.smith.langchain.com/observability/how_to_guides/trace_with_opentelemetry#send-traces-to-an-alternate-provider](here), which states that it will send otel to both langsmith and your provider if you set `LANGSMITH_OTEL_ENABLED` to `true`

[/u/wfh](@wfh)

---
