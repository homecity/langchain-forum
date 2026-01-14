# Clarification: Does LangSmith Cloud Support WebSockets in Production Deployments?

**Topic ID:** 2161
**Created:** 2025-11-11 02:36:50
**URL:** https://forum.langchain.com/t/2161

---

## Post #1 by @HeramG
*Posted on 2025-11-11 02:36:50*

**Body:**

Hi, I have a question regarding WebSocket support on the LangSmith Cloud deployment platform:

**Scenario:**



I have built an application using LangGraph, FastAPI, and uvicorn.



My app exposes a WebSocket endpoint for streaming messages, and I connect to it from a React frontend using the WebSocket protocol.



Everything works perfectly in my local development environment:



Backend is started with uvicorn



React frontend connects to **`ws://localhost/...`**



WebSocket connection is stable and messaging works as expected.





**Deployment steps taken:**



I deployed my backend to LangSmith Cloud and updated my **`langgraph.json`** as follows:


```
`json
`
```

`{`

`  "graph_id": "dynamic_tone_agent/dynamictoneagent.py",`

`  "entrypoint": "dynamic_tone_agent.server:app",`

`  "type": "fastapi",`

`  "python_version": "3.11",`

`  "dependencies": {`

`    "file": "requirements.txt"`

`  }`

`}`



After deployment, I updated my React frontend to connect to the WebSocket using the provided API URL from LangSmith Cloud, changing **`https://`** to **`wss://`**.



When running the frontend with the deployed backend URL, the WebSocket fails to connect. In the console, I consistently see “WebSocket Disconnected” errors and the connection closes immediately.



**Question:**



Does LangSmith Cloud currently allow production WebSocket connections for deployed FastAPI apps?



Are there any special configuration requirements or known infrastructure limitations that might cause the connection to be dropped or blocked after deployment?



Is there any official example or guidance for deploying and exposing WebSocket endpoints on LangSmith Cloud that work with React or other browser clients?

---
