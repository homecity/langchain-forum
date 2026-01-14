# LangGraph Deployment Error: Module Not Found

**Topic ID:** 2419
**Created:** 2025-12-04 18:19:38
**URL:** https://forum.langchain.com/t/2419

**Tags:** js-help, cloud

---

## Post #1 by @shawon-majid
*Posted on 2025-12-04 18:19:38*

I am getting this error, while deploying project to langgraph.


```
`05/12/2025, 00:10:20

[ERROR] Node.js v20.19.6

05/12/2025, 00:10:20

[ERROR] }

05/12/2025, 00:10:20

[ERROR]   code: 'ERR_MODULE_NOT_FOUND'

05/12/2025, 00:10:20

[ERROR]     at async resolve (file:///api/langgraph_api/js/src/load.hooks.mjs:53:22) {

05/12/2025, 00:10:20

[ERROR]     at async nextResolve (node:internal/modules/esm/hooks:864:22)

05/12/2025, 00:10:20

[ERROR]     at async resolve (file:///usr/lib/node_modules/tsx/dist/esm/index.mjs?1764871820470:2:5355)

05/12/2025, 00:10:20

[ERROR]     at resolveTsPaths (file:///usr/lib/node_modules/tsx/dist/esm/index.mjs?1764871820470:2:4984)

05/12/2025, 00:10:20

[ERROR]     at resolveDirectory (file:///usr/lib/node_modules/tsx/dist/esm/index.mjs?1764871820470:2:4243)

05/12/2025, 00:10:20

[ERROR]     at resolveBase (file:///usr/lib/node_modules/tsx/dist/esm/index.mjs?1764871820470:2:3744)

05/12/2025, 00:10:20

[ERROR]     at nextResolve (node:internal/modules/esm/hooks:864:28)

05/12/2025, 00:10:20

[ERROR]     at defaultResolve (node:internal/modules/esm/resolve:1188:11)

05/12/2025, 00:10:20

[ERROR]     at moduleResolve (node:internal/modules/esm/resolve:946:18)

05/12/2025, 00:10:20

[ERROR]     at packageResolve (node:internal/modules/esm/resolve:873:9)

05/12/2025, 00:10:20

[ERROR] Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@langchain/langgraph' imported from /deps/indigo-nx/apps/assistant-chat/src/assistant/graph.ts
`
```

My langgraph.json


```
`{

    "node_version": "20",

"dockerfile_lines": [],

"dependencies": [

"."

    ],

"graphs": {

"assistant": "./src/assistant/graph.ts:assistant"

    },

"env": ".env"

}

`
```

and my package.json is the following:


```
`{

  "name": "assistant-chat",

"version": "1.0.0",

"description": "",

"main": "index.js",

"scripts": {

"test": "echo \"Error: no test specified\" && exit 1",

"dev": "pnpm dlx @langchain/langgraph-cli dev"

  },

"keywords": [],

"author": "",

"license": "ISC",

"packageManager": "pnpm@10.19.0",

"dependencies": {

"@langchain/anthropic": "^1.1.3",

"@langchain/core": "^1.1.1",

"@langchain/google-genai": "^2.0.1",

"@langchain/google-vertexai": "^2.0.1",

"@langchain/langgraph": "^1.0.2",

"@langchain/openai": "^1.1.3",

"@langchain/xai": "^1.0.2",

"langchain": "1.1.2",

"mongodb": "^7.0.0",

"zod": "4.1.0"

  }

}
`
```

How to resolve this?

it works locally with this command:

`pnpm dlx @langchain/langgraph-cli dev`

but it’s not getting deployed

---

## Post #2 by @hsm207
*Posted on 2025-12-12 21:11:47*

Is your project a monorepo?



If YES,  you need to follow a specific setup.  See: [https://docs.langchain.com/langsmith/monorepo-support](monorepo support)



If NO, try explicitly adding the missing package to your langgraph.json:




```
`   1     "dependencies": [
   2         ".",
   3         "@langchain/langgraph"
   4     ]
`
```

---
