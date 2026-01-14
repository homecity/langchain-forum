# Never ending nightmare

**Topic ID:** 2458
**Created:** 2025-12-09 14:58:24
**URL:** https://forum.langchain.com/t/2458

---

## Post #1 by @marcvertrou
*Posted on 2025-12-09 14:58:24*

i ran the deepagent on my machine, works perfectly but once deployed and with a paid seat:

TypeError(‘“Could not resolve authentication method. Expected either api_key or auth_token to be set. Or for one of the `X-Api-Key` or `Authorization` headers to be explicitly omitted”’)Traceback (most recent call last):

File “/usr/local/lib/python3.11/site-packages/langgraph/pregel/main.py”, line 2971, in astream

async for _ in runner.atick(…

And no documentation of any help would work, its own Studio failed repeatedly the ai help in langchain keeps on insisting to add anthropic key, langsmith secret key and so on .

Not a single success api call and test for hours trying to unravel what should have been a too making agent deployment easier.

---

## Post #2 by @wfh
*Posted on 2025-12-09 15:03:07*

This looks like it’s the Anthropic SDK (or your model provider) telling you that you haven’t provided an API key for your model.

Have you set an ANTHROPIC_API_KEY in your deployment environment?

---

## Post #3 by @marcvertrou
*Posted on 2025-12-09 15:04:48*

yup i set it in the settings → workspace → secrets

ANTHROPIC_API_KEY

In fact i done this twice by deleting and setting it again in case the first one has a typo on the value.

---

## Post #4 by @wfh
*Posted on 2025-12-09 15:09:09*

Ah I see the misunderstanding. LangSmith observability secrets are entirely different than the environment for a given agent server / LangGraph app you’re deploying.

You need to configure environment for a specific deployment. You can do so by clicking “New revision” and adding the relevant variables.

[/uploads/short-url/p9DmIudp8W09syQzBmnXhaS1t8E.png?dl=1](image1636×952 91.3 KB)

---

## Post #5 by @marcvertrou
*Posted on 2025-12-09 15:14:15*

can u kindly provide also a simple script in python or curl where i could send a “hello world” to my deployed agent and get back some response. the docs don’t even have this example.  The “assistand id” isnt even obvious or copyable anywhere in the deployment screen and not an id that was needed in the console version, i dont get why the deploy version is just so drastically diff and difficult.

---

## Post #6 by @hari
*Posted on 2025-12-09 15:32:25*

Hi [/u/marcvertrou](@marcvertrou) , I recommend using Studio to easily invoke your agent, docs are here: [https://docs.langchain.com/langsmith/use-studio#run-application](How to use Studio - Docs by LangChain) .

If you would like to invoke the agent via python, I recommend using the[https://reference.langchain.com/python/langsmith/deployment/sdk/]( langsmith deployment sdk). Here is a good example: [https://docs.langchain.com/langsmith/configuration-cloud#use-an-assistant](Manage assistants - Docs by LangChain) . As mentioned in that section, you can pass either a **graph ID** or **assistant ID** when running your graph.

For more information on assistants, I recommend going through the conceptual guide: [https://docs.langchain.com/langsmith/assistants](Assistants - Docs by LangChain) .

Hope this helps!

---
