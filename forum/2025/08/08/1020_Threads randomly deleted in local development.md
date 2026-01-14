# Threads randomly deleted in local development

**Topic ID:** 1020
**Created:** 2025-08-08 12:12:11
**URL:** https://forum.langchain.com/t/1020

---

## Post #1 by @simby
*Posted on 2025-08-08 12:12:11*

Hi,

For the past week or so I’ve been noticing a trend in my local development environment (have not confirmed this case in a deployment) where my existing threads would be deleted. This has been extremely frustrating, as I would be working with a thread, leave and come back and I would start to receive 404s when trying to read a thread or create a run for an existing one.

Has anyone seen this before? My hunch is that it’s a langgraph_runtime_inmem error that may be orphaning or completely deleting my threads by restarting the service, but I cant be sure right now. Please let me know if anyone has seen anything similar or how to fix!

---

## Post #2 by @Isaac
*Posted on 2025-08-11 22:53:44*

Hi simby - welcome to the LangChain community. I would guess that this is an inmem issue where the checkpoints are wiped when you close/leave your laptop. Unfortunately I don’t think we are going to spend much time focusing on this, as we would suggest using a hosted version of your graph in development mode (instead of production mode) for more accurate testing.

---
