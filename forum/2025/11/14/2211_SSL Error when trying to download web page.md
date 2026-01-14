# SSL Error when trying to download web page

**Topic ID:** 2211
**Created:** 2025-11-14 18:15:15
**URL:** https://forum.langchain.com/t/2211

**Tags:** cloud

---

## Post #1 by @febbraro
*Posted on 2025-11-14 18:15:15*

Hello,

When using LangSmith Deployments, when trying to download a web page to send to an LLM in a subsequent node, my agents are running into an SSL error that we dont get when running locally. Here is a stack trace and the exact error. We are using httpx.

`[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1032)`

`Traceback (most recent call last):`

`  File "/usr/local/lib/python3.13/site-packages/httpx/_transports/default.py", line 101, in map_httpcore_exceptions`

`    yield`

`  File "/usr/local/lib/python3.13/site-packages/httpx/_transports/default.py", line 394, in handle_async_request`

`    resp = await self._pool.handle_async_request(req)`

`           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`

`  File "/usr/local/lib/python3.13/site-packages/httpcore/_async/connection_pool.py", line 256, in handle_async_request`

`    raise exc from None`

`  File "/usr/local/lib/python3.13/site-packages/httpcore/_async/connection_pool.py", line 236, in handle_async_request`

`    response = await connection.handle_async_request(`

`               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`

`        pool_request.request`

`        ^^^^^^^^^^^^^^^^^^^^`

`    )`

`    ^`

`  File "/usr/local/lib/python3.13/site-packages/httpcore/_async/connection.py", line 101, in handle_async_request`

`    raise exc`

`  File "/usr/local/lib/python3.13/site-packages/httpcore/_async/connection.py", line 78, in handle_async_request`

`    stream = await self._connect(request)`

`             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^`

`  File "/usr/local/lib/python3.13/site-packages/httpcore/_async/connection.py", line 156, in _connect`

`    stream = await stream.start_tls(**kwargs)`

`             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`

`  File "/usr/local/lib/python3.13/site-packages/httpcore/_backends/anyio.py", line 67, in start_tls`

`    with map_exceptions(exc_map):`

`         ~~~~~~~~~~~~~~^^^^^^^^^`

`  File "/usr/local/lib/python3.13/contextlib.py", line 162, in __exit__`

`    self.gen.throw(value)`

`    ~~~~~~~~~~~~~~^^^^^^^`

`  File "/usr/local/lib/python3.13/site-packages/httpcore/_exceptions.py", line 14, in map_exceptions`

`    raise to_exc(exc) from exc`

`httpcore.ConnectError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1032)`

Any idea how to go about debugging why this is happening on LangSmith Cloud Deployments and not locally?

---

## Post #2 by @febbraro
*Posted on 2025-11-14 22:57:22*

Additionally, is it possible to ignore certificates entirely? We were looking at this using this service from within our deployment, [https://developers.oxylabs.io/scraping-solutions/web-scraper-api/integration-methods/proxy-endpoint](Proxy Endpoint | Oxylabs Documentation) and it requires ignoring certificates otherwise it produces an SslVerify error.

---
