# Runs stopped streaming

**Topic ID:** 540
**Created:** 2025-07-18 04:45:58
**URL:** https://forum.langchain.com/t/540

---

## Post #1 by @sjay
*Posted on 2025-07-18 04:45:58*

We’re seeing an issue where most of our graph runs get stuck in an odd state. In Langsmith, the spinner just keeps spinning even after the run appears to be finished. The main problem is that these “stuck” runs aren’t streaming any output.

Everything works as expected when running locally with `langgraph dev`. Any ideas on what might be causing this?

---

## Post #2 by @wfh
*Posted on 2025-07-18 05:32:10*

What’s your deployment ID?

This usually means your worker is terminated mid-run.

---

## Post #3 by @sjay
*Posted on 2025-07-18 05:35:33*

Deployment ID: 9eeb79b8-1fab-4aa8-ac19-db0f3c3ca5d1

Latest Revision ID: ee007968-005c-4ce5-99e3-3bbc7233b7f3

---

## Post #4 by @Isaac
*Posted on 2025-07-22 21:50:40*

Hi sjay,

We believe this was caused by an error raising if the following flag was set: `PYTHONASYNCIODEBUG=1` which we think was done somewhere in your deployment. This was caused by us scheduling tasks on the wrong loops if you ran with isolated background loops. This error should be fixed if you update to the latest version of the api. You can also unset the env variable and that should fix it as well.

---

## Post #5 by @sjay
*Posted on 2025-07-23 05:13:43*

Isaac:

think was done somewhere in your deployment. This was caused by us scheduling tasks on the wrong loops if you ran with isolated background loops. This error should be fixed if you update to the latest version of the api. You can also unset the env variable and



This is true - we solved it by unsetting that flag from the revision. We’ll update to the latest version too.

Thanks Isaac!

---
