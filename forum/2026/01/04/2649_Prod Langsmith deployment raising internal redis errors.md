# Prod Langsmith deployment raising internal redis errors

**Topic ID:** 2649
**Created:** 2026-01-04 10:30:32
**URL:** https://forum.langchain.com/t/2649

---

## Post #1 by @KurtzOmer
*Posted on 2026-01-04 10:30:32*

Hi team & community,

We are currently experiencing a critical issue with our production deployment. Our instance has been down for several hours, and we are seeking an urgent resolution.

Deployment Details:

- Deployment Name: mcp-playground-agent-scale

- Deployment ID: acb59f5b-e4b4-4c9c-be09-3e9cd8abbe1d

- Workspace ID: 5f6ecbbf-d894-480c-b184-9b677b3ed123



Latest Revision ID: 34c2f392-e53d-471e-ba20-1927d9c65c0f



Last Working Revision ID: 538ed1d8-3590-486b-814f-df722e4ca307



- URL: [https://smith.langchain.com/o/5f6ecbbf-d894-480c-b184-9b677b3ed123/host/deployments/acb59f5b-e4b4-4c9c-be09-3e9cd8abbe1d?revisionPeek=7ffbe9c7-3294-44ae-9b69-4c1ec144a49c](https://smith.langchain.com/o/5f6ecbbf-d894-480c-b184-9b677b3ed123/host/deployments/acb59f5b-e4b4-4c9c-be09-3e9cd8abbe1d?revisionPeek=7ffbe9c7-3294-44ae-9b69-4c1ec144a49c)

Based on deployment server logs, the application is failing to start due to internal Redis connection timeouts. Specifically, we are seeing redis.exceptions.TimeoutError: Timeout connecting to server and asyncio.exceptions.CancelledError during the migration and lifespan startup phases.

Relevant Log Snippet:

1/4/2026, 9:32:05 AM Application startup failed. Exiting.

…

redis.exceptions.TimeoutError: Timeout connecting to server

1/4/2026, 9:31:55 AM Redis ping timed out



Could you please investigate this internal connectivity issue and advise on a resolution as soon as possible?

This deployment was well used for the past few months, without errors of this kind. Also, we didn’t make any change to the repo (didn’t push to main), or to the deployment. It just started to raise these errors.

This is the only deployment in our workspace raising these errors (we have one more `production` deployment and one more `development` deployment that work fine).

This is a crucial deployment for us, holding most of our threads, and we are seeking to fix & enable it back again.

Thanks in advance!

---

## Post #2 by @hari
*Posted on 2026-01-04 18:37:19*

Hi [/u/kurtzomer](@KurtzOmer) ! Looks like your redis pod was stuck; on initial investigation, looks like this happened during a node pool outage we had on 12/26 at around 8pm pacific, where certain pods were unscheduled.

I just manually restarted your redis deployment, and looks like everything is back to being healthy now. Let me know if it is working - apologies for this major disruption!

---

## Post #3 by @KurtzOmer
*Posted on 2026-01-05 08:32:26*

Hi [/u/hari](@hari) , it works indeed, thanks!

Can you explain the root cause? And how come we are the ones that need to acknowledge Langchain team about the issue, while you should be able to find and fix these problematic cases?

We are pretty worried that it might just happen again, without no one taking care of it for us (or even informing us about it). Our main flow was broken for few hours, customers couldn’t use our platform, and support team (via email) didn’t respond - its all a pretty bad experience.

---
