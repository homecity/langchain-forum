# Erro with loading local memory via langgraph dev

**Topic ID:** 1682
**Created:** 2025-09-29 12:53:24
**URL:** https://forum.langchain.com/t/1682

---

## Post #1 by @Petar
*Posted on 2025-09-29 12:53:24*

[/uploads/short-url/crBis3V2xLGKn7vKlNiAOVztZTW.png?dl=1](image2974×1502 209 KB)

I am getting error when runing locally my langgraph and cannot acces my store?

09-29T12:52:11.395348Z [error    ] POST /store/namespaces 500 1ms [langgraph_api.server] api_variant=local_dev langgraph_api_version=0.4.26 latency_ms=1 method=POST path=/store/namespaces path_params={} proto=1.1 query_string= req_header={} res_header={} route=/store/namespaces status=500 thread_name=MainThread

2025-09-29T12:52:11.396055Z [error    ] Exception in ASGI application

[uvicorn.error] api_variant=local_dev langgraph_api_version=0.4.26 thread_name=MainThread


Exception Group Traceback (most recent call last):

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/_utils.py”, line 76, in collapse_excgroups

|     yield

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/middleware/base.py”, line 174, in **call**

|     async with anyio.create_task_group() as task_group:

|                ~~~~~~~~~~~~~~~~~~~~~~~^^

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/anyio/_backends/_asyncio.py”, line 767, in **aexit**

|     raise BaseExceptionGroup(

|         “unhandled errors in a TaskGroup”, self._exceptions

|     )

| ExceptionGroup: unhandled errors in a TaskGroup (1 sub-exception)

±±--------------- 1 ----------------

| Traceback (most recent call last):

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/uvicorn/protocols/http/httptools_impl.py”, line 409, in run_asgi

|     result = await app(  # type: ignore[func-returns-value]

|              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|         self.scope, self.receive, self.send

|         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|     )

|     ^

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/uvicorn/middleware/proxy_headers.py”, line 60, in **call**

|     return await self.app(scope, receive, send)

|            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/applications.py”, line 112, in **call**

|     await self.middleware_stack(scope, receive, send)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/middleware/errors.py”, line 187, in **call**

|     raise exc

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/middleware/errors.py”, line 165, in **call**

|     await self.app(scope, receive, _send)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/middleware/base.py”, line 173, in **call**

|     with recv_stream, send_stream, collapse_excgroups():

|                                    ~~~~~~~~~~~~~~~~~~^^

|   File “/opt/homebrew/Cellar/python@3.13/3.13.7/Frameworks/Python.framework/Versions/3.13/lib/python3.13/contextlib.py”, line 162, in **exit**

|     self.gen.throw(value)

|     ~~~~~~~~~~~~~~^^^^^^^

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/_utils.py”, line 82, in collapse_excgroups

|     raise exc

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/middleware/base.py”, line 175, in **call**

|     response = await self.dispatch_func(request, call_next)

|                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/langgraph_api/middleware/private_network.py”, line 50, in dispatch

|     response = await call_next(request)

|                ^^^^^^^^^^^^^^^^^^^^^^^^

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/middleware/base.py”, line 153, in call_next

|     raise app_exc

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/middleware/base.py”, line 140, in coro

|     await self.app(scope, receive_or_disconnect, send_no_error)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/middleware/cors.py”, line 93, in **call**

|     await self.simple_response(scope, receive, send, request_headers=headers)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/middleware/cors.py”, line 144, in simple_response

|     await self.app(scope, receive, send)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/langgraph_api/middleware/http_logger.py”, line 80, in **call**

|     raise exc

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/langgraph_api/middleware/http_logger.py”, line 74, in **call**

|     await self.app(scope, inner_receive, inner_send)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/langgraph_api/middleware/request_id.py”, line 35, in **call**

|     await self.app(scope, receive, send)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/middleware/exceptions.py”, line 62, in **call**

|     await wrap_app_handling_exceptions(self.app, conn)(scope, receive, send)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/_exception_handler.py”, line 53, in wrapped_app

|     raise exc

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/_exception_handler.py”, line 42, in wrapped_app

|     await app(scope, receive, sender)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/routing.py”, line 714, in **call**

|     await self.middleware_stack(scope, receive, send)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/routing.py”, line 734, in app

|     await route.handle(scope, receive, send)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/routing.py”, line 460, in handle

|     await self.app(scope, receive, send)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/langgraph_api/auth/middleware.py”, line 49, in **call**

|     return await super().**call**(scope, receive, send)

|            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/middleware/authentication.py”, line 48, in **call**

|     await self.app(scope, receive, send)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/routing.py”, line 714, in **call**

|     await self.middleware_stack(scope, receive, send)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/routing.py”, line 734, in app

|     await route.handle(scope, receive, send)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/langgraph_api/route.py”, line 144, in handle

|     return await super().handle(scope, receive, send)

|            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/routing.py”, line 288, in handle

|     await self.app(scope, receive, send)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/langgraph_api/route.py”, line 50, in app

|     await wrap_app_handling_exceptions(app, request)(scope, receive, send)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/_exception_handler.py”, line 53, in wrapped_app

|     raise exc

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/starlette/_exception_handler.py”, line 42, in wrapped_app

|     await app(scope, receive, sender)

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/langgraph_api/route.py”, line 43, in app

|     response: ASGIApp = await func(request)

|                         ^^^^^^^^^^^^^^^^^^^

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/langgraph_runtime_inmem/retry.py”, line 27, in wrapper

|     return await func(*args, **kwargs)

|            ^^^^^^^^^^^^^^^^^^^^^^^^^^^

|   File “/Users/petarvukovic/Desktop/phill-v2/phill-v2/lib/python3.13/site-packages/langgraph_api/api/store.py”, line 153, in list_namespaces

|     result = await (await get_store()).alist_namespaces(

|              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|     ……

|     )

---
