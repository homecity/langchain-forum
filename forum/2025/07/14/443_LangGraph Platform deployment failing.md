# LangGraph Platform deployment failing

**Topic ID:** 443
**Created:** 2025-07-14 17:27:38
**URL:** https://forum.langchain.com/t/443

**Tags:** cloud

---

## Post #1 by @aleksac99
*Posted on 2025-07-14 17:27:38*

[#p-708-langgraph-platform-deployment-failing-1]()LangGraph Platform Deployment failing
Hi, LangChain team. Our production deployment is failing on new revision upload. Logs display this error:


```
`7/14/2025, 6:43:51 PM
[INFO]                ^^^^^^^^^^^^^^^^^^^^^^^^^^
7/14/2025, 6:43:51 PM
[INFO] Traceback (most recent call last):
  File "/usr/local/lib/python3.12/site-packages/starlette/routing.py", line 693, in lifespan
    async with self.lifespan_context(app) as maybe_state:
7/14/2025, 6:43:51 PM
[INFO] During handling of the above exception, another exception occurred:
7/14/2025, 6:43:51 PM
[INFO] asyncio.exceptions.CancelledError
7/14/2025, 6:43:51 PM
[INFO]     await getter
7/14/2025, 6:43:51 PM
[INFO]   File "/usr/local/lib/python3.12/asyncio/queues.py", line 158, in get
7/14/2025, 6:43:51 PM
[INFO]            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
7/14/2025, 6:43:51 PM
[INFO]     return await self.receive_queue.get()
7/14/2025, 6:43:51 PM
[INFO]   File "/usr/local/lib/python3.12/site-packages/uvicorn/lifespan/on.py", line 137, in receive
7/14/2025, 6:43:51 PM
[INFO]     await receive()
7/14/2025, 6:43:51 PM
[INFO]   File "/usr/local/lib/python3.12/site-packages/starlette/routing.py", line 700, in lifespan
7/14/2025, 6:43:51 PM
[INFO]   File "/api/langgraph_api/server.py", line 151, in combined_lifespan
7/14/2025, 6:43:51 PM
[INFO]   File "/usr/local/lib/python3.12/site-packages/langgraph_runtime_postgres/lifespan.py", line 96, in lifespan
7/14/2025, 6:43:51 PM
[INFO] ERROR [uvicorn.error:on.py:send:134] Traceback (most recent call last):
`
```

---

## Post #2 by @wfh
*Posted on 2025-07-14 17:29:02*

What’s your deployment_id ?

---

## Post #3 by @aleksac99
*Posted on 2025-07-14 17:36:57*

Deployment ID: c9c3bf9c-79b4-45f6-aa10-f33850f2cde2

New revision passed in the meantime, without any changes in the codebase.

---

## Post #4 by @gaurav
*Posted on 2025-08-02 07:06:51*

Same here. Getting error message saying **An error occurred while creating a Docker image from your specified GitHub repository. Please see your build logs (by clicking on the revision) for more information.**

The logs are not very helpful.  FYI, I’m not using custom docker,

Deployment id=13c1e838-5df4-4769-8e30-e67c24f237a5

---

## Post #5 by @JUSTINMKAUFMAN
*Posted on 2025-10-28 22:20:29*

Same issue here.

**An error occurred while creating a Docker image from your specified GitHub repository. See Build Logs for more information and resolve any errors before creating a new revision.**

Main changes I am aware of on my end are:


New default branch for the project (changed from `main` to `deploy`) - but I also changed that setting in the langgraph project and this continued to happen.
Migrated to the new major version (1.0.x) of the langchain deps in my Typescript project

Deployment ID: **a0ba5d97-9025-480f-bb9a-140ecda98fce**

Build Logs:


```
`10/28/2025, 3:07:18 PM Step #17: #8 8.417 npm warn   @aws-amplify/plugin-types@"^1.10.1" from @aws-amplify/ai-constructs@1.5.3
10/28/2025, 3:07:18 PM Step #17: #8 8.417 npm warn node_modules/@aws-amplify/data-construct/node_modules/@aws-amplify/ai-constructs/node_modules/@aws-amplify/plugin-types
10/28/2025, 3:07:18 PM Step #17: #8 8.417 npm warn peer @aws-sdk/types@"^3.734.0" from @aws-amplify/plugin-types@1.10.1
10/28/2025, 3:07:18 PM Step #17: #8 8.417 npm warn Could not resolve dependency:
10/28/2025, 3:07:18 PM Step #17: #8 8.417 npm warn
10/28/2025, 3:07:18 PM Step #17: #8 8.417 npm warn node_modules/@aws-amplify/data-construct/node_modules/@aws-amplify/ai-constructs/node_modules/@aws-amplify/plugin-types/node_modules/@aws-sdk/types
10/28/2025, 3:07:18 PM Step #17: #8 8.417 npm warn Found: @aws-sdk/types@3.821.0
10/28/2025, 3:07:18 PM Step #17: #8 8.417 npm warn While resolving: @aws-amplify/plugin-types@1.10.1
10/28/2025, 3:07:18 PM Step #17: #8 8.417 npm warn ERESOLVE overriding peer dependency
10/28/2025, 3:07:18 PM Step #17: #8 [3/5] RUN cd /deps/client && npm ci
10/28/2025, 3:07:18 PM Step #17: 
10/28/2025, 3:07:18 PM Step #17: #7 DONE 3.3s
10/28/2025, 3:07:18 PM Step #17: #7 [2/5] ADD . /deps/client
10/28/2025, 3:07:18 PM Step #17: 
10/28/2025, 3:07:18 PM Step #17: #6 DONE 2.8s
10/28/2025, 3:07:18 PM Step #17: #6 transferring context: 446.31MB 2.8s done
10/28/2025, 3:07:18 PM Step #17: #6 [internal] load build context
10/28/2025, 3:07:18 PM Step #17: 
10/28/2025, 3:07:18 PM Step #17: #5 DONE 1.0s
10/28/2025, 3:07:18 PM Step #17: #5 [1/5] FROM gcr.io/langchain-prod/langgraphjs-api-unlicensed:20
10/28/2025, 3:07:18 PM Step #17: 
10/28/2025, 3:07:18 PM Step #17: #4 DONE 0.0s
10/28/2025, 3:07:18 PM Step #17: #4 importing cache manifest from us-west1-docker.pkg.dev/langchain-prod/langgraph-cloud-builds/heyoh-98f6a94f3f405c978ac1f3016257f681:latest
10/28/2025, 3:07:18 PM Step #17: 
10/28/2025, 3:07:18 PM Step #17: #3 DONE 0.0s
10/28/2025, 3:07:18 PM Step #17: #3 [internal] load metadata for gcr.io/langchain-prod/langgraphjs-api-unlicensed:20
10/28/2025, 3:07:18 PM Step #17: 
10/28/2025, 3:07:18 PM Step #17: #2 DONE 0.0s
10/28/2025, 3:07:18 PM Step #17: #2 transferring context: 245B 0.0s done
10/28/2025, 3:07:18 PM Step #17: #2 [internal] load .dockerignore
10/28/2025, 3:07:18 PM Step #17: 
10/28/2025, 3:07:18 PM Step #17: #1 DONE 0.0s
10/28/2025, 3:07:18 PM Step #17: #1 transferring dockerfile: 390B done
10/28/2025, 3:07:18 PM Step #17: #1 [internal] load build definition from Dockerfile
10/28/2025, 3:07:18 PM Step #17: 
10/28/2025, 3:07:18 PM Step #17: #0 building with "default" instance using docker driver
10/28/2025, 3:07:18 PM Step #17: gcr.io/langchain-prod/langgraphjs-api-unlicensed:20
10/28/2025, 3:07:18 PM Step #17: Status: Downloaded newer image for gcr.io/langchain-prod/langgraphjs-api-unlicensed:20
`
```

---
