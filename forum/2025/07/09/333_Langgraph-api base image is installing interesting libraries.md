# Langgraph-api base image is installing interesting libraries

**Topic ID:** 333
**Created:** 2025-07-09 04:08:44
**URL:** https://forum.langchain.com/t/333

**Tags:** cloud, self-hosted

---

## Post #1 by @jriedel199715
*Posted on 2025-07-09 04:08:44*

FROM langchain/langgraph-api:3.12

Install langgraph-api 0.2.82 but there is no version for that so not sure how this is possible… I test with 0.2.78 and everything works fine and then when I build docker file with FROM langchain/langgraph-api:3.12 as the base image or from langgrpah dockerfile it installs 0.2.82 which introduces issues in my code

---

## Post #2 by @wfh
*Posted on 2025-07-09 04:52:01*

What issues? Share sufficient context for a sufficient answer.

---

## Post #3 by @jriedel199715
*Posted on 2025-07-09 14:17:13*

Apologies for the vagueness. The streaming behavior in my langgraph api container was inconsistent and at the end of the day using langgraph 0.5.1 was causing the streaming of messages to come in differently then what I was testing with locally using langgraph dev. My local conda env has langgraph 0.4.8. When I built the FROM langchain/langgraph-api:3.12  image, it was installing the latest langgraph and I guess something in the way the langgraph api streams when using the langgraph-api has changed drastically between those two versions.

---

## Post #4 by @kundanRao8507
*Posted on 2025-07-09 18:01:09*

I’ve been facing the same issue for several days now. It seems like something significant changed between versions, which is causing the streams to be dropped.

---
