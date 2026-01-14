# Hostname configuration and HTTPS

**Topic ID:** 1370
**Created:** 2025-08-27 16:11:28
**URL:** https://forum.langchain.com/t/1370

**Tags:** self-hosted

---

## Post #1 by @eric-burel
*Posted on 2025-08-27 16:11:28*

Hi folks,

I am trying to run a `langgraph dev` instance on [http://Render.com](Render.com), for education purpose. I wanted developers to be able to deploy a toy project online easily.

However I am stuck with accessing the instance. It seems that I can configure a host name and port, but can’t use TLS and a custom hostname doesn’t work.

The URL ends up being “[http://foobar.onrender.com:10000](http://foobar.onrender.com:10000)” rather than the expected HTTPS and I hit an error “2025-08-27T16:07:44.822569Z [**error**    ] **[Errno 99] Cannot assign requested address** [**uvicorn.error**] api_variant=local_dev langgraph_api_version=0.4.1 thread_name=MainThread”.

I’ll give a shot at tunneling with Cloudflare but it seems convoluted.

Is there a way to self-host a dev instance online? Or maybe this is not a feature you want to see in LangGraph Platform?

I’ll probably fallback to a free developer account on LangGraph Platform, but I’d like to make sure that it’s not possible to host a dev instance elsewhere.

---

## Post #2 by @eric-burel
*Posted on 2025-08-27 16:31:50*

I finally found the correct command: `langgraph dev --port $PORT --host 0.0.0.0 --no-browser`

This will respect Render’s default behaviour of binding port 10000 on host 0.0.0.0. I can access the doc on “[https://foobar.onrender.com/docs%E2%80%9D](https://foobar.onrender.com/docs”) and I can access this URL in the studio.

The last issue is that I have to compute the studio URL manually, using “encodeURIComponent”, as the URL output by langgraph CLI logs is the 0.0.0.0:10000 local URL without the proper domain.  Or I can use the UI on the deployment page of Studio, to add a base url manually.

---
