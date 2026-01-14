# Manager graph does not get the header despite adding the custom heade in langgraph.json

**Topic ID:** 2037
**Created:** 2025-10-31 19:36:00
**URL:** https://forum.langchain.com/t/2037

**Tags:** js-help, cloud, langsmith-studio

---

## Post #1 by @mariam-eissa
*Posted on 2025-10-31 19:36:00*

we deplyed our project on langgraph cloud but for the last 4 days we have this issue related with the custom header does not get pass to langgraph cloud neither appear in the meta for trace causing this issue Missing required ${GITHUB_INSTALLATION_ID} in configuration. in open-swe prject , i also try to revert for my working deployment before but it also did not works .

if someone have idea how to fix this issue

---

## Post #2 by @Isaac
*Posted on 2025-11-05 22:47:30*

Hi [/u/mariam-eissa](@mariam-eissa) sorry for the delay. Are you still seeing this error? Just so I understand, you are saying that you are passing an extra header to your langsmith deployment but you are not seeing it in the config? Do you have a code snippet you could provide?

---

## Post #3 by @mariam-eissa
*Posted on 2025-11-06 09:25:41*

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
  "auth": {
    "path": "./apps/open-swe/src/security/auth.ts:auth"
  },
  "http": {
    "app": "./apps/open-swe/src/routes/app.ts:app",
     
    "configurable_headers": {
      "include": ["x-github-admin-id","x-github-access-token","x-github-installation-id", "x-github-installation-token", "x-github-installation-name", "x-github-user-id","x-github-user-login","x-is-default-github"]
   
    }
  }
}

`
```

this is my langraph.json file

[/uploads/short-url/vWmuNHgORqIcu5fxtk7DIXFsDE7.png?dl=1](error manager1256×785 98.1 KB)

in local it works wel but it does not works on cloud .

it was working last time in cloud almost 29/10 and despite i reset the deployment branch to my last working code on cloud  but it gives the same error

---

## Post #4 by @Isaac
*Posted on 2025-11-06 17:58:24*

Do you mind sharing your deployment id? Haven’t seen this error before will need to do a little digging.

---

## Post #5 by @mariam-eissa
*Posted on 2025-11-06 18:19:41*

thanks for responding , Deployment_id: 21fdf1f5-5577-425a-8898-5ac90db9094a

---

## Post #6 by @mariam-eissa
*Posted on 2025-11-06 18:21:26*

please ignore the first one is dev , this is the production deployment_id : 2159044f-e37d-4fe5-ad6f-ece771316825

---

## Post #7 by @Isaac
*Posted on 2025-11-06 21:51:24*

Ok. Will try my best to tal today, if not will get to this tmrw.

---

## Post #8 by @mariam-eissa
*Posted on 2025-11-06 22:11:23*

thanks alot .

---

## Post #9 by @Isaac
*Posted on 2025-11-07 21:29:04*

Hey [/u/mariam-eissa](@mariam-eissa) . Do you mind setting LOG_LEVEL=DEBUG in the environment variables in your deployment. I have been unable to debug this with the current set of logs, I’m so sorry.

---

## Post #10 by @mariam-eissa
*Posted on 2025-11-07 23:09:03*

sure, done .

---

## Post #11 by @Isaac
*Posted on 2025-11-08 00:08:13*

Shot in the dark, but could you modify your `include` list to have upper case versions of all the headers as well, i.e. “x-github-admin-id” AND “X-Github-Admin-Id”? I’m not sure this will fix it but I feel like the headers are being modified somewhere and it might have something to do with the JS server we run on cloud that doesn’t exist locally.

---

## Post #12 by @mariam-eissa
*Posted on 2025-11-08 10:30:35*

unfortunately, still the same issue.

---

## Post #13 by @david.asamu
*Posted on 2025-11-13 03:17:45*

[/u/mariam-eissa](@mariam-eissa) in your config file, can you switch the key from “include“  to “includes“? That would fix the issue

i.e

`{`

` ...`

`  "http": {`

`    "app": "./apps/open-swe/src/routes/app.ts:app",`

` `

`    "configurable_headers": {`

`      "includes": ["x-github-admin-id","x-github-access-token","x-github-installation-id", "x-github-installation-token", "x-github-installation-name", "x-github-user-id","x-github-user-login","x-is-default-github"]`

`    }`

`  }`

`}`

---

## Post #14 by @mariam-eissa
*Posted on 2025-11-13 12:03:14*

thanks , alot .

---
