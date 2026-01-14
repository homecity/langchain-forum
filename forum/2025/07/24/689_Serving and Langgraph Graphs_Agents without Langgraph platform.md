# Serving and Langgraph Graphs/Agents without Langgraph platform

**Topic ID:** 689
**Created:** 2025-07-24 21:09:18
**URL:** https://forum.langchain.com/t/689

**Tags:** python-help, self-hosted

---

## Post #1 by @jriedel199715
*Posted on 2025-07-24 21:09:18*

How do we setup our AI applications that leverage the Langgraph framework for success in production without buying a license for the Langgraph plaftorm? Even the self hosted Langgraph platform option still requires a license key and depending on your account only a limited amount of node runs. I know the checkpointer feature is a community contributed feature but are there any other features that are community contributed/ open source. The checkpointer is one aspect that helps get our applications ready for production but there is still a big gap for concurrency control, scalability, persistence, etc. I love the langgraph api (platform) and I have been using the Dockerfile with a development account. I have been using it to my serve my graphs and get things tested but it is not practical if I am bringing my application to enterprise customers. I am having a hard time modeling out the costs on how I would be able to use the langgraph platform and provide our AI product to our customers. Even the idea of getting a certain amount of node runs does not make sense.

Is there any guidance on how to cover the other aspects of serving graphs apart from the langgraph platform. I use Python FastAPI so the application itself is probably setup well to handle the serving of my graphs but the langgraph api/platform abstracted that all away nicely. Any advice here on what to do or any advice on tackling certain features that are necessary for production readiness. I hope this make sense. Thanks in advance!

---
