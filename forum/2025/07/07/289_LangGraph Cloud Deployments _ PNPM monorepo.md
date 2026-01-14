# LangGraph Cloud Deployments + PNPM monorepo

**Topic ID:** 289
**Created:** 2025-07-07 15:16:38
**URL:** https://forum.langchain.com/t/289

---

## Post #1 by @tobi
*Posted on 2025-07-07 15:16:38*

Has anyone successfully set up a LangGraph cloud deployment in a PNPM monorepo where the agent is in a workspace? I go around in circles, running into failed deployments as the build doesn’t run pnpm I in the root directory and isn’t able to resolve shared packages in the workspace.

---

## Post #2 by @amitchaudharyc
*Posted on 2025-07-08 09:59:44*

Hey, I am also developing using same monorepo + pnpm. I am able to run everything on local. But it does fail on deployment. I am not sure what is the issue, but it constantly fails, sometime with no logs at all.

---

## Post #3 by @nkolly
*Posted on 2025-07-14 13:07:12*

+1 for having issues with the monorepo packages when deployed

---

## Post #4 by @NicholasDullam
*Posted on 2025-07-18 14:07:17*

+1; their existing `dockerlines` override in the config leaves much to be desired

Would love to be able to build an image for a revision in our own CI/CD

---

## Post #5 by @nickwinder
*Posted on 2025-07-31 00:13:37*

+1 I’m having similar issues. Shared packages are not persisted in the build when trying to deploy.

---

## Post #6 by @scrowder
*Posted on 2025-07-31 00:28:20*

Thanks for adding your feedback, Nick. We are actively working on this and will hopefully have a solution soon. We plan to support monorepos by allowing files outside of the langgraph.json directory to be included in the container prior to the build process.

---

## Post #7 by @nickwinder
*Posted on 2025-07-31 02:22:45*

Thanks. Is there any work around to this?

---

## Post #8 by @scrowder
*Posted on 2025-07-31 06:12:57*

For now, the best options are to (a) have agents each in their own repository connected to LangGraph Platform as individual deployments, or (b) use a monorepo but ensure that all code/packages needed by the agent live below the place in the directory structure where langgraph.json lives.

---

## Post #9 by @jfatora
*Posted on 2025-08-06 06:45:27*

This made me have to move away from langgraph for now unfortunately. We got into the startup program and can’t even use it

---

## Post #10 by @JoeRoddy
*Posted on 2025-08-08 17:11:37*

scrowder:

For now, the best options are to (a) have agents each in their own repository connected to LangGraph Platform as individual deployments, or (b) use a monorepo but ensure that all code/packages needed by the agent live below the place in the directory structure where langgraph.json lives.



[/u/scrowder](@scrowder)

I’m trying to implement what you described (b), with langgraph.json at the root of our monorepo, but we’ve hit multiple build errors when our app gets deployed to langgraph platform.  We have a pnpm monorepo with a directory structure like the following:


```
`pnpm-workspace.yaml
langgraph.json
/packages
/apps
  /web
  /langgraph-server
    /src
`
```

langgraph.json:


```
`{
  "node_version": "20",
  "dockerfile_lines": [],
  "dependencies": ["./apps/langgraph-server"],
  "graphs": {
    "agent": "./apps/langgraph-server/src/react_agent/graph.ts:graph"
  },
  "auth": {
    "path": "./apps/langgraph-server/src/auth.ts:auth"
  },
  "env": "./apps/langgraph-server/.env"
}

`
```

Our langgraph app has the following as a dev script in `package.json`:

`( cd ../.. && npx @langchain/langgraph-cli dev )`

^All of the above works great locally, and everything plays and starts up nicely together.

However, when we deploy we hit:


```
`[INFO] ERROR: build step 14 "langchain/hosted-langgraph-api-build" failed: step exited with non-zero status: 2
[INFO] ERROR
[INFO] Finished Step #14
[INFO] Step #14: Error: Only 'node' engine is supported in package.json engines. Got engines: ['node', 'pnpm']
`
```

We do specify a [https://pnpm.io/package_json#engines](minimum pnpm version) in our root package.json:


```
`"engines": {
  "node": ">=20.18",
  "pnpm": ">=9.15"
}
`
```

After removing “engines” (we do need this property), the build hits a separate breaking issue, it can’t resolve / didn’t install the langgraph app’s package.json dependencies:


```
`[ERROR] Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@langchain/langgraph-sdk' imported from /deps//apps/langgraph-server/src/auth.ts
    at packageResolve (node:internal/modules/esm/resolve:873:9)
`
```

---

## Post #11 by @JoeRoddy
*Posted on 2025-08-08 19:10:00*

I was able to get a deployment working **inside of** our existing repository, but without any of the pnpm monorepo features (eg: installing `workspace:*` packages via pnpm).

I just nested the langgraph app like you’d expect (with langgraph.json in the nested dir rather than root), and pointed the deployment to `./apps/langgraph-server/langgraph.json`.  It “works”, but it’s essentially just nesting a disconnected folder inside of our repo.

Obviously not satisfactory, but it’s at least a way to keep the langgraph code inside of a single repository, if that was annoying for anyone else.

---

## Post #12 by @tobi
*Posted on 2025-08-29 15:47:43*

[/u/scrowder](@scrowder) Is there any movement on this? This is a major blocker now for us as there seem to be no valid workaround.

---

## Post #13 by @sriram
*Posted on 2025-09-04 14:04:18*

I am able to deploy the agent in the cloud.

This is my langgraph.json


```
`{
  "node_version": "20",
  "dockerfile_lines": [
    "ADD . /deps/langgraph-pnpm-monorepo",
    "WORKDIR /deps/langgraph-pnpm-monorepo",
    "RUN npm install -g corepack@latest",
    "RUN corepack enable",
    "RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile",
    "RUN pnpm turbo db:generate --filter=@app/prisma",
    "RUN pnpm run build --filter='!@app/agents' --filter='@app/agents...'"
  ],
  "dependencies": [
    "."
  ],
  "graphs": {
    "agent": "./apps/langgraph-server/src/react_agent/graph.ts:graph"
  },
  "auth": {
    "path": "./apps/langgraph-server/src/auth.ts:auth"
  }
}
`
```

---

## Post #14 by @Isaac
*Posted on 2025-09-04 21:50:03*

Hey all! We just released support for this! Check out this docs page to learn more: [https://docs.langchain.com/langgraph-platform/monorepo-support](Monorepo support - Docs by LangChain)

Please leave any and all questions/bugs and I will address them as best I can!

---

## Post #15 by @nickwinder
*Posted on 2025-09-16 22:06:18*

I’m still trying to get this working. Quick note, the link in the documentation for [https://github.com/langchain-ai/js-langraph-monorepo-example](https://github.com/langchain-ai/js-langraph-monorepo-example) has a typo. It’s missing the second `g` in langgraph.

---

## Post #16 by @tobi
*Posted on 2025-09-19 12:13:22*

Same here, it still fails for me in cloud deployments:


```
`9/19/2025, 5:05:36 AM
[INFO] Step #17: RUN cd /deps/agents && pnpm i
9/19/2025, 5:05:36 AM
[INFO] Step #17: ADD . /deps/agents
9/19/2025, 5:05:36 AM
[INFO] Step #17: FROM gcr.io/langchain-prod/langgraphjs-api-unlicensed:20
9/19/2025, 5:05:36 AM
[INFO] Step #17: + docker build -f - -t us-west1-docker.pkg.dev/langchain-prod/langgraph-cloud-builds/development-781a499f154b5b16b9f6f78996e061a7:0f2ca097-3ba1-41b1-bf0c-89b8171120aa /workspace/monorepo/agents <
9/19/2025, 5:05:36 AM
[INFO] Step #17: + docker pull gcr.io/langchain-prod/langgraphjs-api-unlicensed:20
9/19/2025, 5:05:36 AM
[INFO] Step #17: ERROR: failed to build: failed to solve: executor failed running [/bin/sh -c cd /deps/agents && pnpm i]: exit code: 1
9/19/2025, 5:05:36 AM
[INFO] Step #17: ------
9/19/2025, 5:05:36 AM
[INFO] Step #17: 1.554 This error happened while installing a direct dependency of /deps/agents
9/19/2025, 5:05:36 AM
[INFO] Step #17: 1.554 
9/19/2025, 5:05:36 AM
[INFO] Step #17: 1.554  ERR_PNPM_LINKED_PKG_DIR_NOT_FOUND  Could not install from "/deps/packages/shared" as it does not exist.
9/19/2025, 5:05:36 AM
[INFO] Step #17: 0.370 ! Corepack is about to download https://registry.npmjs.org/pnpm/-/pnpm-10.12.4.tgz
`
```

---

## Post #17 by @tobi
*Posted on 2025-09-19 12:33:12*

And the CLI doesn’t actually support the `–build-command` flag right now?

---
