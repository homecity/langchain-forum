# Langgraph deployment with langchain API key?

**Topic ID:** 226
**Created:** 2025-07-03 19:51:18
**URL:** https://forum.langchain.com/t/226

**Tags:** python-help, cloud

---

## Post #1 by @jasperhajonides
*Posted on 2025-07-03 19:51:18*

Hi there,

I’ve created a deployment of an agentic framework on langsmith (which runs all fine in studio). I now have my API URL to send api requests to in an external chat application.

Alongside, I need a langchain api key.

Workspace in which I deployed  → settings → API key

personal: lsv2_pt_2…e763

OR

service key: lsv2_sk_2…c924

However None of these API keys actually work for my external application:


```
`curl -s -X GET -H "x-api-key: lsv2_sk_***924" https://na*****us.langgraph.app/health -w "\nStatus:%{http_code}\n" -o /dev/stdout
`
```

and I get “Status:404” errors.

All LLM models keep insisting I create a new langchain api key

“”"

That response comes from the LangGraph gateway when the token is a valid LangSmith key but not authorised for the Threads APIs. Key types, verified against the gateway’s rules:





Prefix
Purpose
Works for /threads/*




lsv2_pt_*
Personal tracing key
404 Not Found


lsv2_sk_*
Service/tracing key
404 Not Found


sk-*
Single-tenant deployment key
 (200)


dep-srv-*
Multi-tenant deployment key
 (200)



The service key (lsv2_sk_*) can read the OpenAPI spec but is blocked from state-persisting endpoints such as Threads / Runs / Store.

“”"

I could not resolve this!

Any insights are very welcome!

Cheers,

Jasper

---

## Post #2 by @mukil
*Posted on 2025-07-04 14:46:05*

Hi Jasper, do you have any custom authentication setup? If so you may need to include additional headers etc to satisfy auth.  Also our deployments don’t have any method like /health which may be why you are seeing a 404.

---

## Post #3 by @jasperhajonides
*Posted on 2025-07-04 17:21:15*

Thanks Mukil,

I moved to the API studio to test my curl commands. Eventually the curl command below no longer gave 404 errors and it worked. In truth, I’m not sure what changed in the deployment. Perhaps, like you suggest, there was some authentication imposed in the deployment somehow.


```
`curl https://na***1.us.langgraph.app/threads/search \
  --request POST \
  --header 'Content-Type: application/json' \
  -H 'x-api-key: lsv2_pt_4c***28' \
  --data '{
  "metadata": {},
  "values": {},
  "status": "idle",
  "limit": 10,
  "offset": 0,
  "sort_by": "thread_id",
  "sort_order": "asc"
}'
`
```

all resolved now.

---
