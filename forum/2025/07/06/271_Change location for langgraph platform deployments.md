# Change location for langgraph platform deployments

**Topic ID:** 271
**Created:** 2025-07-06 06:28:06
**URL:** https://forum.langchain.com/t/271

**Tags:** cloud

---

## Post #1 by @LucElsby
*Posted on 2025-07-06 06:28:06*

Hello - I setup my company and some clients Langgraph Cloud platform accounts and deployments a while ago (I think US data residency was the only option). I am based in the UK and would like to change to EU-based. I have a mix of fresh accounts/deployments and ongoing deployments with historic activity (and would therefore need data transfer to a new deployment if required).

Is this possible? It is not clear how to set this in the cloud dashboard.

---

## Post #2 by @andrew
*Posted on 2025-07-07 13:40:58*

I am based in the UK and would like to change to EU-based.


You’ll need to sign up for a new LangSmith account in the EU region and recreate the deployments from scratch.


Is this possible? It is not clear how to set this in the cloud dashboard.


Currently, data migrations between data regions (US vs EU) is not possible for LangGraph Platform deployments.

---
