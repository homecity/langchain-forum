# Question about the license

**Topic ID:** 2242
**Created:** 2025-11-18 16:11:08
**URL:** https://forum.langchain.com/t/2242

**Tags:** self-hosted

---

## Post #1 by @PlaeryinBol
*Posted on 2025-11-18 16:11:08*

Our application is currently failing to deploy in Kubernetes due license verification fail. I want to make sure I understand the licensing correctly: based on my investigation of the langgraph-api source code, I found that the LANGGRAPH_CLOUD_LICENSE_KEY is only required for self-hosted observability feature. The core functionality of langgraph-api - running LangGraph workflows, checkpointing, and API endpoints - appears to work without a license key when this observability feature is disabled.

Am I correct in understanding that:


The license key is only required if I want to use self-hosted logging/metrics through LangSmith, and NOT required for the core functionality of deploying and running LangGraph workflows?
Can I deploy my application using the official [http://docker.io/langchain/langgraph-api:3.11](docker.io/langchain/langgraph-api:3.11) image directly in my own Kubernetes infrastructure without a license? Or this Docker image are licensed too and cant be used for self-hosting without a license?

Can I disable the licensed logging/metrics Langsmith tracking functionality so we can deploy our application without a license? Specifically, which environment variables need to be set in our Kubernetes deployment configuration to disable these features?   We’ve been unable to find clear documentation on how to disable the observability features, which we don’t need at this stage - our priority right now is to get the application deployed and running. Any guidance would be extremely helpful!

---

## Post #2 by @sbates
*Posted on 2025-12-09 23:39:13*

I’d also be interested in the answer to this.  I’ve noticed there are a lot of unanswered questions here in these forums. Not much interaction.

---

## Post #3 by @wfh
*Posted on 2025-12-19 06:22:29*

Hi all! Thanks for your patience. We’ve been doing a lot of building lately, and it seems I’ve spent inadequate time responding to questions here.

It seems you’re asking about the single server setup? [https://docs.langchain.com/langsmith/deploy-standalone-server](Self-host standalone servers - Docs by LangChain)

Full self-hosting of production workloads currently requires an enterprise license, though you can run the server with a valid LangSmith API key for lighter workloads.

---

## Post #4 by @dsemeria
*Posted on 2025-12-19 10:45:38*

Hi, I tried running the dockerized version langsmith using my API key (don’t have a license key because I’m not an organization) but got authentication errors. What exactly do you mean by “lighter workloads”? Thanks.

---

## Post #5 by @wfh
*Posted on 2025-12-19 12:47:17*

I mean development and testing purposes!

---

## Post #6 by @dsemeria
*Posted on 2025-12-19 17:09:47*

But you’re saying it *can* work with the API key in place of the license key?

---

## Post #7 by @wfh
*Posted on 2025-12-21 05:17:45*

That’s how `langgraph up` works

---
