# How to upgrade Langgraph cli

**Topic ID:** 643
**Created:** 2025-07-23 07:04:07
**URL:** https://forum.langchain.com/t/643

**Tags:** intro-to-langgraph

---

## Post #1 by @lee
*Posted on 2025-07-23 07:04:07*

I run the cmd: ‘langgraph dev’, LangSmith notified me to upgrade the LangGraph CLI:


```
`Current Server Version: 0.2.56

Latest Server Version: 0.2.100

Seeing issues? Try upgrading your server by upgrading the LangGraph CLI.
`
```

But my langgraph cli is the latest version:


```
`(react-agent) ➜  langgraph-server git:(f_Lee_250722_new_pq) ✗ langgraph --version
LangGraph CLI, version 0.3.5
`
```

How can I upgrade the LangGraph CLI?

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-24 08:50:42*

The CLI version (0.3.5) and server version (0.2.56) are different components. The warning is about the LangGraph server, not the CLI itself. To upgrade the server version, you need to update the LangGraph package in your project:


```
`pip install --upgrade langgraph
`
```

Or if using a specific version:


```
`pip install langgraph>=0.2.100
`
```

The CLI version 0.3.5 is likely current, but your project’s LangGraph dependency is still on 0.2.56. Check your `requirements.txt` or `pyproject.toml` for the LangGraph version pinning and update it accordingly.

---

## Post #3 by @Eskiii
*Posted on 2025-08-04 08:09:17*

it is about the langgraph server, which is the langgraph-api.

pip install  -–upgrade langgraph-api

---
