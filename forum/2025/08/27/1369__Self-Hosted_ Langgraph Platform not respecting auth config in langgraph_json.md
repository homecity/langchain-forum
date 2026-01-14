# [Self-Hosted] Langgraph Platform not respecting auth config in langgraph.json

**Topic ID:** 1369
**Created:** 2025-08-27 15:08:20
**URL:** https://forum.langchain.com/t/1369

---

## Post #1 by @ssmithra
*Posted on 2025-08-27 15:08:20*

```
`{
  "dependencies": ["."],
  "graphs": {
    "agent": "./src/react_agent/graph.py:graph"
  },
  "http": {
    "app": "./src/react_agent/webapp/app.py:app"
  },
  "auth": {
    "path": "./src/react_agent/auth/auth.py:auth"
  },
  "env": ".env"
}

`
```

When running the server locally, auth is respected. When deploying to platform, I see the auth type still gets set to “langsmith” and only accepts x-api-key authentication scheme. Interestingly, the custom webapp gets picked up correctly.

Any thoughts here?

---

## Post #2 by @hari
*Posted on 2025-08-28 02:00:17*

Hi [/u/ssmithra](@ssmithra) , are you interacting with your agent via studio? How are you calling your agent? And what version of the api are you on right now?

---

## Post #3 by @ssmithra
*Posted on 2025-09-02 13:05:21*

Current version of the api is `0.3.1`. This is not an interaction between the Studio and the Agent deployment, we are testing via Postman.

---

## Post #4 by @wfh
*Posted on 2025-09-05 21:47:24*

How are you building the image and deploying?

---

## Post #5 by @ssmithra
*Posted on 2025-09-08 13:21:12*

Closing the loop here - it was user error. I had realized that the Agent Image did not have the Auth config in it. I needed to re-run `langgraph dockerfile` to get that config in the Image.

Side question, why doesn’t the image refer to langgraph.json file at runtime?

---
