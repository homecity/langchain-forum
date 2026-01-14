# 503 Service Unavailable Error

**Topic ID:** 335
**Created:** 2025-07-09 04:31:40
**URL:** https://forum.langchain.com/t/335

---

## Post #1 by @bae
*Posted on 2025-07-09 04:31:40*

Hello,

I’m making the following POST request to the LangSmith API and consistently receiving a 503 error.

**Endpoint:**

bash

CopyEdit


```
`POST https://api.smith.langchain.com/api/v1/runs/query
`
```

**Headers:**

makefile

CopyEdit


```
`x-api-key: (my API key)
Content-Type: application/json
`
```

**JSON Body:**

json

CopyEdit


```
`{
  "project_id": "(my project ID)",
  "session": ["(same project ID)"],
  "run_type": "chain",
  "filter": "gt(cursor, '2025-06-11 16:24:35.433000...')",
  "limit": 100,
  "order": "asc"
}
`
```

This same request structure was working previously just yesterday. Is this related to rate limits?

---

## Post #2 by @jacoblee93
*Posted on 2025-07-10 22:23:50*

Hey [/u/bae](@bae),

Flagging internally - is it working now?

Jacob

---

## Post #3 by @jacoblee93
*Posted on 2025-07-10 22:25:37*

Have been told that there was briefly an issue with this but it should be fixed now.

---
