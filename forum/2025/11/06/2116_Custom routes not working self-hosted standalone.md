# Custom routes not working self-hosted standalone

**Topic ID:** 2116
**Created:** 2025-11-06 11:00:31
**URL:** https://forum.langchain.com/t/2116

**Tags:** js-help, self-hosted

---

## Post #1 by @mariam-eissa
*Posted on 2025-11-06 11:00:31*

we are trying to deploy our agents using the self-host standalone ,



we added the  **LANGGRAPH_AUTH_TYPE=noop**   in dockercompose environment .



we removed the auth from the config file




```
`{
  "node_version": "20",
  "graphs": {
    "programmer": "./apps/open-swe/src/graphs/programmer/index.ts:graph",
    "planner": "./apps/open-swe/src/graphs/planner/index.ts:graph",
    "manager": "./apps/open-swe/src/graphs/manager/index.ts:graph",
    "new-project": "./apps/open-swe/src/graphs/new-project/index.ts:graph"
  },

  "env": "./apps/open-swe/.env",

  "dependencies": ["./apps/open-swe"],

  "http": {
    "app": "./apps/open-swe/src/routes/app.ts:app",
     
    "configurable_headers": {
      "include": ["x-github-admin-id","x-github-access-token","x-github-installation-id", "x-github-installation-token", "x-github-installation-name", "x-github-user-id","x-github-user-login","x-is-default-github"]
   
    }
  }
}
`
```

the custom routes  was returning not found on cloud .

---

## Post #2 by @mariam-eissa
*Posted on 2025-11-11 16:56:20*

issue fixed when we add


```
`ENV LANGGRAPH_HTTP='{"app": 
"./apps/open-swe/src/routes/app.ts:app"

}' in the docker file which is not added using the command : langgraph dockerfile -c langgraph.json ./Dockerfile .
unlike in python which add the custom route in the docker file .

`
```

---
