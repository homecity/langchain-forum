# Deployment does not include git submodules (no recursive checkout)

**Topic ID:** 1384
**Created:** 2025-08-28 09:56:51
**URL:** https://forum.langchain.com/t/1384

---

## Post #1 by @samgoos
*Posted on 2025-08-28 09:56:51*

When deploying a repository that uses **git submodules**, the deployed environment does not include the submodule contents. It seems the deployment process clones the parent repo without a **recursive checkout**, leaving submodule directories empty.

**Request**



Add support for recursive submodule checkout in deployments.



Document how to handle **private submodules** if authentication (SSH keys or tokens) is required.

---

## Post #2 by @daniel-style
*Posted on 2025-09-17 04:22:52*

I ran into this same setup ,I need to point to a UI component library in my LangGraph project(use python),like specifying `ui` in the `langgraph.json` file. Thinks is ,I put the UI library in a separate repo and added it as a sumodule in the graph project. But when i deployed it to the platform,seems like the submodule didn’t get pulled,even though it works totally fine on my local. i tried adding `RUN git submodule update --init --recursive --remote` in the `dockerfile_lines` config,but at that point the directory probably doesn’t even exist yet, so that didn’t help either.

---
