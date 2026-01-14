# Dynamically create/edit/deploy graphs with no code?

**Topic ID:** 1353
**Created:** 2025-08-27 08:31:50
**URL:** https://forum.langchain.com/t/1353

---

## Post #1 by @fran-mora
*Posted on 2025-08-27 08:31:50*

Deep diving into LanGraph for the first time. Really excited by all the features.

We want to rewrite our internal agentic platform to use LanGraph. I have only two main missing features and I was wondering if they are on the roadmap (or if a solution exists already):


a no-code UI for creating/updating graphs. Even a json/yaml editor would be enough, but I need an editor which my team can use to create new graphs and update existing ones. I could custom make it but I get the feeling this would fit very well in the LanGraph (Platform?) offering.
a way to update/add graphs to a deployed server (e.g. on the Platform) without requiring re-deployment (which takes several minutes). My team would typically create a new graph, test in dev, change it, test again, etc.

Thank you!

---

## Post #2 by @MartijnLeplae
*Posted on 2025-09-05 19:12:09*

Hello, have you tried using the assistants feature with a custom config?


Assistants allow you to practically configure your graph on LangGraph Platform. [https://docs.langchain.com/langgraph-platform/assistants](Assistants - Docs by LangChain) .  (If you set up the config type correctly, you even get a nice rendered UI when creating an assistant)
The way assistants are used in the langgraph-supervisor ( [https://github.com/langchain-ai/langgraph-supervisor-py](GitHub - langchain-ai/langgraph-supervisor-py) & [https://github.com/langchain-ai/langgraphjs/tree/main/libs/langgraph-supervisor](langgraphjs/libs/langgraph-supervisor at main · langchain-ai/langgraphjs · GitHub) ) is quite interesting since it allows for a mechanism to dynamically create the graph at runtime.

Hope this helps you

---
