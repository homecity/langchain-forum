# Is it possible to change the repository path of an existing LangSmith deployment?

**Topic ID:** 2492
**Created:** 2025-12-11 07:01:01
**URL:** https://forum.langchain.com/t/2492

---

## Post #1 by @bharathiselvan
*Posted on 2025-12-11 07:01:01*

Is there a way to change or override the repo URL/path for an existing LangSmith deployment?

---

## Post #2 by @hsm207
*Posted on 2025-12-12 19:57:16*

Looking at the [https://api.host.langchain.com/docs#/Deployments%20(v2)/patch_deployment_v2_deployments__deployment_id__patch](PATCH deployment endpoint), this does  not seem to be possible. You’ll need to delete the deployment and create a new one with the desired name.

---
