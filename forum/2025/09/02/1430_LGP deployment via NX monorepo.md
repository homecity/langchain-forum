# LGP deployment via NX monorepo

**Topic ID:** 1430
**Created:** 2025-09-02 08:17:39
**URL:** https://forum.langchain.com/t/1430

---

## Post #1 by @lloyd-lighthouse
*Posted on 2025-09-02 08:17:39*

Hello.

We use NX monorepo and within our monorepo there is obviously a python folder for all of our very cool langgraph code.

When running locally, we use `langgraph dev` and all is good with the world.

However we need to deploy to our production environment now 

I notice that you can configure LGP to listen to any `push to branch` events (Merge events) and when it notices these events it will deploy your code.

Something I dont understand and have challenges working through.

When we merge code to our `main` branch, its not always going to be langgraph code that changed and therefore we will not want to trigger a LGP deployment, but sometimes we might have changed langgraph code and therefore will want a deployment to be triggered.


Is there a way to make sure you only trigger a deployment if you know for sure that langgraph related code inside your monorepo has changed, and how would you do that?

I came across this convo, but its a little bit different to what I need to find out.


  
    
    
    
      [https://forum.langchain.com/t/langgraph-cloud-deployments-pnpm-monorepo/289](LangGraph Cloud Deployments + PNPM monorepo) [/c/help/lgp/6](LangGraph Platform)
    
  
  
    Has anyone successfully set up a LangGraph cloud deployment in a PNPM monorepo where the agent is in a workspace? I go around in circles, running into failed deployments as the build doesn’t run pnpm I in the root directory and isn’t able to resolve shared packages in the workspace.

---

## Post #2 by @lloyd-lighthouse
*Posted on 2025-09-04 03:50:18*

Hey, anyone able to assist?

---

## Post #3 by @Isaac
*Posted on 2025-09-10 01:25:22*

Hey [/u/lloyd-lighthouse](@lloyd-lighthouse) , this is on our longer term roadmap but unfortunately not planned for the near future due to other features having priority at the moment.

---

## Post #4 by @lloyd-lighthouse
*Posted on 2025-09-10 02:46:19*

Thanks for the response.

We will have to work out another solution then.

---
