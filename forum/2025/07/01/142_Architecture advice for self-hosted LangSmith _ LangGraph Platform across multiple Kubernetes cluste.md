# Architecture advice for self-hosted LangSmith + LangGraph Platform across multiple Kubernetes clusters

**Topic ID:** 142
**Created:** 2025-07-01 11:43:29
**URL:** https://forum.langchain.com/t/142

**Tags:** self-hosted

---

## Post #1 by @yossi.cohn
*Posted on 2025-07-01 11:43:29*

Hi everyone,

We’re planning a self-hosted deployment of LangSmith and LangGraph Platform across multiple Kubernetes clusters and would appreciate some architecture guidance.

**Current thinking:**


Deploy **LangSmith centrally** (shared across all clusters) to provide unified observability and monitoring capabilities across our entire infrastructure(Separated by Tiers & Regions)
Deploy **LangGraph Platform per cluster** to keep application workloads isolated

**Questions:**


Does this architecture make sense? Are there any gotchas with sharing LangSmith across multiple clusters while keeping LangGraph Platform deployments isolated?
If we go with this approach, what’s the best way to configure each LangGraph Platform deployment to point to the centralized LangSmith instance? Are there specific endpoint configuration parameters we should be aware of?
Has anyone implemented a similar setup? Any lessons learned or alternative approaches you’d recommend?

---
