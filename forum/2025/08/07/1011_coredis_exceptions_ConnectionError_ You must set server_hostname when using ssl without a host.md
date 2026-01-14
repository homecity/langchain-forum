# coredis.exceptions.ConnectionError: You must set server_hostname when using ssl without a host

**Topic ID:** 1011
**Created:** 2025-08-07 20:40:47
**URL:** https://forum.langchain.com/t/1011

**Tags:** python-help

---

## Post #1 by @alansteiman
*Posted on 2025-08-07 20:40:47*

I am trying to deploy a langgraph server on my own AWS setup.

In the REDIS_URI env var, I am using the SSL connection (rediss://…..), however when the server starts, I get the following error


```
`coredis.exceptions.ConnectionError: You must set server_hostname when using ssl without a host
`
```

---

## Post #2 by @AbdulBasit
*Posted on 2025-08-08 10:43:31*

This error happens when the Redis SSL connection string doesn’t contain a proper hostname. With AWS ElastiCache (or any SSL Redis setup), you must specify the **full cluster endpoint** in `REDIS_URI`, not just the port or IP.


```
`# Correct 
REDIS_URI=rediss://your-cluster-id.cache.amazonaws.com:6380  

# Wrong (missing hostname) 
REDIS_URI=rediss://:6380 
`
```

If you already have the hostname and still see the error, the issue may be SSL hostname verification. You can try disabling strict checks for testing (not recommended for production unless you understand the security implications):


```
`REDIS_URI=rediss://your-cluster-id.cache.amazonaws.com:6380?ssl_cert_reqs=none 
`
```

Or set these environment variables:


```
`REDIS_SSL_CERT_REQS=none 
REDIS_SSL_CHECK_HOSTNAME=false 
`
```

Also make sure:



ElastiCache has **in-transit encryption** enabled.



You’re connecting to **port 6380** (SSL) instead of 6379 (non-SSL).



Your security group allows inbound connections from your server to port 6380.

---

## Post #3 by @alansteiman
*Posted on 2025-08-08 12:38:48*

Thanks for the response.

My issue was very silly: the redis password contained a # character, that was breaking the parsing -_-

I updated the password and works fine using the following format: `rediss://:@:`

---
