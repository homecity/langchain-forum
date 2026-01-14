# Missing assistant configuration inputs in Langgraph Deployment

**Topic ID:** 1166
**Created:** 2025-08-15 05:18:00
**URL:** https://forum.langchain.com/t/1166

**Tags:** js-help, cloud

---

## Post #1 by @dpoon
*Posted on 2025-08-15 05:18:00*

Hello!

We have a **LangGraph** application deployed to the cloud platform, and we’re currently seeing an issue when creating Assistants.

**Problem:**

Assistants in the **deployed environment** are **missing Configuration Inputs** defined by the graph’s `ConfigurationSchema`.



**Locally:** LangGraph Studio shows the expected configuration inputs.



**Deployed:** Configuration inputs are missing.



Additionally, the **typing for inputs** is incorrect for the deployed graph but correct in our local environment.

[/uploads/short-url/b0XzsdqWIlxH0ZhXcbnHN0QPwm6.png?dl=1](image2246×1740 498 KB)

We’ve tried the suggestion to use an earlier version of the api and cli packages but did not help with the deployed version.



package.json

```
`"dependencies": {
    "@langchain/anthropic": "^0.3.22",
    "@langchain/community": "^0.3.46",
    "@langchain/core": "^0.3.70",
    "@langchain/langgraph": "^0.4.5",
    "@langchain/mcp-adapters": "^0.5.2",
    "@langchain/openai": "^0.6.7",
    "@langchain/tavily": "^0.1.3",
    "axios": "^1.7.7",
    "cheerio": "^1.1.0",
    "date-fns": "^4.1.0",
    "langchain": "^0.3.28",
    "langsmith": "^0.3.31",
    "lodash-es": "^4.17.21",
    "zod": "^3.25.64"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.1.0",
    "@eslint/js": "^9.29.0",
    "@jest/globals": "^30.0.0",
    "@langchain/langgraph-api": "^0.0.55",
    "@langchain/langgraph-cli": "^0.0.55",
    "@tsconfig/recommended": "^1.0.7",
`
```




tsconfig.json

```
`{
  "extends": "@tsconfig/recommended",
  "compilerOptions": {
    "target": "ES2021",
    "lib": ["ES2021", "ES2022.Object", "DOM"],
    "module": "NodeNext",
    "moduleResolution": "nodenext",
    "esModuleInterop": true,
    "declaration": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "useDefineForClassFields": true,
    "strictPropertyInitialization": false,
    "allowJs": true,
    "strict": true,
    "strictFunctionTypes": false,
    "outDir": "dist",
    "types": ["jest", "node"],
    "resolveJsonModule": true
  },
  "include": ["**/*.ts", "**/*.js"],
  "exclude": ["node_modules", "dist"]
}
`
```

This text will be hidden


Has anyone ran into this issue or have a suggestion for me to look further into?

---

## Post #2 by @Isaac
*Posted on 2025-08-19 01:07:52*

Hi [/u/dpoon](@dpoon) - sorry to hear this. We pushed a fix for the schema change, if you could redeploy and test again and let me know if the error persists that would be great. We apologize for the inconvenience.

---

## Post #3 by @dpoon
*Posted on 2025-08-19 02:26:06*

Thanks for the quick fix [/u/isaac](@Isaac)! I was able to re-deploy and both Input typings and Configuration are working. Appreciate it!

---
