# Plus Plan Dev Deployment: How Far Can We Push It?

**Topic ID:** 555
**Created:** 2025-07-18 15:18:50
**URL:** https://forum.langchain.com/t/555

---

## Post #1 by @ibbybuilds
*Posted on 2025-07-18 15:18:51*

Hey folks,

I’m evaluating the **Plus Plan SaaS offering** and had a few technical and operational questions, especially around dev vs prod deployment:


[#p-914-h-1-dev-deployment-on-plus-plan-1]()1. **Dev Deployment on Plus Plan**

What exactly does the “basic dev-sized deployment” include in terms of resources (CPU, memory, DB limits, etc.)?
How does it differ from a production deployment in terms of performance, reliability, or scaling?
Roughly how many concurrent users/requests can it realistically support before we need to move to production?
Is data persistent in dev deployments (across restarts)?
Does it support built-in authentication and authorization?


[#p-914-h-2-upgrading-to-production-2]()2. **Upgrading to Production**

If we decide to upgrade to a production deployment later, is it a seamless process? (e.g., one-click upgrade or minimal downtime?)
Will our data carry over from dev to prod or do we need to reconfigure/migrate anything?


[#p-914-h-3-data-access-migration-3]()3. **Data Access & Migration**

If we ever decide to move away from the platform, will we have **direct access** to our data?
Since you use Postgres under the hood, will we be able to export a dump or connect directly for migration?


[#p-914-bonus-question-for-the-nerds-out-here-4]()Bonus question (for the nerds out here):
Does anyone know what **kind of instance or infra a dev-sized deployment uses**? I’m trying to estimate how many users we could handle before needing to go production-grade. Even ballpark figures (like “good for internal testing but not 1000 users”) would help.


Thanks in advance!

---
