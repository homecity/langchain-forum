# When deploying in a subpath, the ui/agent interface returns script paths without the subpath prefix, and setting the MOUNT_PREFIX environment variable has no effect. How to solve this?

**Topic ID:** 258
**Created:** 2025-07-04 20:57:05
**URL:** https://forum.langchain.com/t/258

**Tags:** self-hosted

---

## Post #1 by @Juicpt
*Posted on 2025-07-04 20:57:05*

Hello everyone,

I’ve encountered an issue when deploying a application under a subpath. Specifically, when the application is deployed behind a reverse proxy (like Nginx) under a subpath such as `/subpath/`, the paths for static assets (like JavaScript scripts and CSS stylesheets) referenced in the HTML page returned by the `ui/agent` interface do not correctly include the subpath prefix.

For example, I expect the script path to be `/subpath/ui/agent/entrypoint.js`, but the actual path returned in the interface  is `/ui/agent/entrypoint.js`. This causes the browser to fail to load these resources, resulting in a blank page or a non-functional application.

I have already tried setting the `MOUNT_PREFIX=/subpath` environment variable, but it doesn’t seem to have any effect, and the problem persists.

**Core Issue:**


**Symptom:** When the `ui/agent` application is deployed in a subpath, the URLs for its static resources (JS/CSS) are incorrect because they are missing the subpath prefix.
**Attempted Solution:** Setting the `MOUNT_PREFIX` environment variable did not solve the problem.

It appears that the `ui/agent` interface is not reading or using the `MOUNT_PREFIX` environment variable.

---
