# Can't change python version to specified in project.toml file

**Topic ID:** 1525
**Created:** 2025-09-12 17:58:36
**URL:** https://forum.langchain.com/t/1525

---

## Post #1 by @sameer
*Posted on 2025-09-12 17:58:36*

I’m finding it very difficult to find support for this framework so I’m aiming to be part of the solution.

after upgrading some libraries and everything working fine on `uv run langgraph dev` locally, I was having major issues deploying to Langgraph Platform.

**An error occurred while creating a Docker image from your specified GitHub repository. Please see your build logs (by clicking on the revision) for more information**


```
`react-agent, we can conclude that your requirements are unsatisfiable. And because only react-agent==0.1 is available and you require conclude that react-agent==0.1 cannot be used. 
Python>=3.12 and react-agent==0.1 depends on Python>=3.12, we can 
╰─▶ Because the current Python version (3.11.13) does not satisfy 
× No solution found when resolving dependencies: Using Python 3.11.13 environment at: /usr/local 9/10/2025, 7:06:57 PM [INFO] Step #17:  > [ 3/10] R
UN PYTHONDONTWRITEBYTECODE=1 uv pip install --system --prerelease=allow --no-cache-dir -c /api/constraints.txt -e /deps/*:
`
```

---

## Post #2 by @sameer
*Posted on 2025-09-12 18:02:37*

so from this doc [https://docs.langchain.com/langgraph-platform/application-structure#python-pyproject-toml](Application structure - Docs by LangChain)

I had the incorrect impression that only a few params were customizable in langgraph.json

The documentation is improving every day, and it seems more clear now that there are several params available

[https://docs.langchain.com/langgraph-platform/cli#configuration-file](https://docs.langchain.com/langgraph-platform/cli#configuration-file)

so in order to upgrade your server python version you have to specify it in `langgraph.json`


```
`{
  "dependencies": [
    "."
  ],
  "graphs": {
    "agent": "./src/react_agent/graph.py:make_graph"
  },
  "env": ".env",
  "auth": {
    "path": "./src/react_agent/auth.py:auth"
  },
  "http": {
    "app": "./src/react_agent/app.py:app"
  },
  "python_version": "3.12"
}
`
```

---

## Post #3 by @Isaac
*Posted on 2025-09-12 18:23:09*

Yup thats correct! We are working hard on improving the docs, so thank you for this feedback it is very helpful!

---
