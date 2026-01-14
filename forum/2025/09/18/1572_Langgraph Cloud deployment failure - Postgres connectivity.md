# Langgraph Cloud deployment failure - Postgres connectivity

**Topic ID:** 1572
**Created:** 2025-09-18 04:38:21
**URL:** https://forum.langchain.com/t/1572

**Tags:** cloud

---

## Post #1 by @andy-lh-nz
*Posted on 2025-09-18 04:38:21*

I have been getting server errors when trying to deploy my app in Langgraph Cloud. These errors occur whether I use the web-based deployment or the Control Plane API. The logs look like this:


```
`18/09/2025, 13:57:27 [WARNING] error connecting in 'pool-1': [Errno -2] Name or service not known
18/09/2025, 13:57:26 [WARNING] error connecting in 'pool-1': [Errno -2] Name or service not known
18/09/2025, 13:57:25 [WARNING] error connecting in 'pool-1': [Errno -2] Name or service not known
18/09/2025, 13:57:24 [WARNING] error connecting in 'pool-1': [Errno -2] Name or service not known
18/09/2025, 13:57:24 [INFO] Starting Postgres runtime with langgraph-api=0.4.20
18/09/2025, 13:57:24 [INFO] Waiting for application startup.
18/09/2025, 13:57:24 [INFO] Started server process [1]
18/09/2025, 13:57:24 [INFO] Loaded custom auth middleware: CustomAuthBackend(fn=, ls_auth=, param_names={'authorization', 'headers'})
18/09/2025, 13:57:24 [INFO] Loaded auth instance from path /deps/app/src/security/auth.py:auth: 
18/09/2025, 13:57:24 [INFO] Using custom authentication
18/09/2025, 13:57:24 [INFO] Using auth of type=custom
18/09/2025, 13:57:24 [INFO] Using langgraph_runtime_postgres
18/09/2025, 13:57:23 [WARNING] error connecting in 'pool-1': [Errno -2] Name or service not known
18/09/2025, 13:57:23 [INFO] Starting Postgres runtime with langgraph-api=0.4.20
18/09/2025, 13:57:23 [INFO] Loaded custom auth middleware: CustomAuthBackend(fn=, ls_auth=, param_names={'headers', 'authorization'})
18/09/2025, 13:57:23 [INFO] Loaded auth instance from path /deps/app/src/security/auth.py:auth: 
18/09/2025, 13:57:22 [INFO] Using custom authentication
18/09/2025, 13:57:22 [INFO] Using auth of type=custom
`
```

This error occurs many times as the deployment retries, and is eventually replaced by:


```
`18/09/2025, 14:05:40 [WARNING] error connecting in 'pool-1': connection failed: connection to server at "172.26.74.14", port 5432 failed: FATAL:  password authentication failed for user "postgres"
18/09/2025, 14:05:40 [WARNING] error connecting in 'pool-1': connection failed: connection to server at "172.26.74.14", port 5432 failed: FATAL:  password authentication failed for user "postgres"
18/09/2025, 14:05:39 [WARNING] error connecting in 'pool-1': connection failed: connection to server at "172.26.74.14", port 5432 failed: FATAL:  password authentication failed for user "postgres"
18/09/2025, 14:05:39 [INFO] Starting Postgres runtime with langgraph-api=0.4.20
18/09/2025, 14:05:39 [INFO] Waiting for application startup.
18/09/2025, 14:05:39 [INFO] Started server process [1]
`
```

Note that I am not attempting (consciously) to use my own Postgres instance. This is a fully cloud-based deployment. I set a number of secrets in the environment, but none of them are related to Postgres.

Is this caused by something wrong in my deployment? It doesn’t feel like this error is something that I have any control over, but perhaps I’ve misunderstood something.

---

## Post #2 by @Jinsong-Zhou
*Posted on 2025-09-22 09:10:48*

I also meet this problem

---

## Post #3 by @andersenthomas98
*Posted on 2025-10-03 20:07:23*

same here

---
