# When will langgraph-cli be updated?

**Topic ID:** 2534
**Created:** 2025-12-17 02:51:38
**URL:** https://forum.langchain.com/t/2534

---

## Post #1 by @daniel-style
*Posted on 2025-12-17 02:51:38*

When will langgraph-cli be updated? I keep getting this warning during development

**`⚠️ [support] langgraph-api 0.5.42 is in Critical support.`

`Only critical security and installation fixes are provided.`

`You are one minor version behind the latest (0.6.x).`

`Please plan an upgrade soon. See changelog:`** [https://docs.langchain.com/langgraph-platform/langgraph-server-changelog](Agent Server changelog - Docs by LangChain) **

`2025-12-17T02:29:28.999115Z [info     ]`**

In fact, when I’m developing with `langgraph dev`, it often freezes. Is it because the latest version of langgraph-api is not included?

---

## Post #2 by @mcavdar
*Posted on 2025-12-17 10:59:27*

hi [/u/daniel-style](@daniel-style)

Actually, it’s not literally a **warning** since the logging level is INFO, but it might still be an issue. By the way, did you try running `pip install -U langgraph-api` as suggested in the info message? Does it fix the freezing issue?

---

## Post #3 by @wfh
*Posted on 2025-12-19 06:17:14*

CLI was updated last on December 17. In that version, it relaxed the upper bound to permit langgraph-api version 0.6.x

---

## Post #5 by @daniel-style
*Posted on 2025-12-20 00:56:56*

thanks ,just updated at all, and i got another issue, when i use `langgraph dev` to run the graph ,why the update action is so slow,very slow ,but when i build and run in docker on my computer ,it works fine,and also works fine in the platform. using `langgraph dev` can be quite challenging at times.

---

## Post #6 by @wfh
*Posted on 2025-12-23 02:39:55*

Which update action? Do you happen to have a video to share to help us improve the experience for you?

Thanks for your patience!

---
