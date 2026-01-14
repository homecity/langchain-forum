# LangSmith Deployment max execution time

**Topic ID:** 2112
**Created:** 2025-11-06 02:26:14
**URL:** https://forum.langchain.com/t/2112

---

## Post #1 by @febbraro
*Posted on 2025-11-06 02:26:14*

When I’m running my LangSmith deployment (via what used to be called LangGraph Cloud Deployments), some of my agents can take quite a long time to finish. All of my agents are timing out at right around 1 hour and I need to go into the Studio and “continue” them.   How can I configure my agents to allow for longer run times than an hour?  Is it part of the config like setting a recursion limit? or some other way?  Thanks for the help.

---

## Post #2 by @Isaac
*Posted on 2025-11-06 02:33:22*

I believe you are looking for this env var: [https://docs.langchain.com/langsmith/env-var#bg-job-timeout-secs](Environment variables - Docs by LangChain) ! lmk if you have any more questions.

---

## Post #3 by @febbraro
*Posted on 2025-11-06 03:36:39*

Ok so according to this

“The timeout of a background run can be increased. However, the infrastructure for a Cloud deployment enforces a 1 hour timeout limit for API requests. This means the connection between client and server will timeout after 1 hour. This is not configurable.”

I cannot change the timeout limit on cloud deployments. I guess Im unclear what is the client and what is the server. I’m using an asynchronous client to kick off an agent/graph/assistant run and not keeping the connection open, so does this mean then if I set this in my deployment revision config that the agent itself will run for a configurable length of time?

---

## Post #4 by @Isaac
*Posted on 2025-11-06 16:20:19*

The agent can keep running, but you will have to reconnect to the agent stream after the hour. The “background task” is the agent actually running, the client to server connection is your call to like `runs.stream` for example, and that has a timeout of 1 hour - which has nothing to do with the agent run timeout. Lmk if that makes sense, happy to provide more details and sorry this is so confusing!

---

## Post #5 by @febbraro
*Posted on 2025-11-06 17:43:46*

Isaac, thanks for the hand holding.  So to be very explicit… if I set BG_JOB_TIMEOUT_SECS in a LangSmith Deployment Environment variable (like I might set my OPENAI_API_KEY for example) that will allow my agents to run for more than the default 1 hour?

---

## Post #6 by @Isaac
*Posted on 2025-11-06 18:01:08*

Yes correct, if not then we have a bug and I’ll be happy to fix it! Lmk if you are seeing any issues.

---
