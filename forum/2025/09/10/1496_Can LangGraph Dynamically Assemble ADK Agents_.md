# Can LangGraph Dynamically Assemble ADK Agents?

**Topic ID:** 1496
**Created:** 2025-09-10 10:44:20
**URL:** https://forum.langchain.com/t/1496

---

## Post #1 by @Adithya
*Posted on 2025-09-10 10:44:20*

Hi @langchain_Community,

I’m working on a task to explore if **LangChain + LangGraph** can be used to **dynamically assemble agents in the ADK (Agent Development Kit)**.

[#p-2532-my-understanding-so-far-1]()My understanding so far:


LangGraph allows defining workflows with conditional routing and state tracking.



ADK is built around LangChain but expects static YAML configurations.



LangGraph graphs are Python objects and not serializable into ADK’s tool format out of the box.



[#p-2532-what-ive-tried-2]()What I’ve Tried:


Creating a LangGraph and wrapping it as a Python tool



Calling that wrapped function inside a tool node in ADK



Attempting to make graph construction conditional based on inputs



But it feels like a workaround, and it’s not clear if ADK officially supports this pattern.

My Questions:



Is there a recommended way to dynamically assemble agents using LangGraph inside ADK?



Are there any plans to integrate LangGraph graph definitions into ADK directly?



Has anyone tried making LangGraph the core agent runtime instead of LangChain agents?



Appreciate any examples or guidance.

Research Note:

While LangChain and LangGraph are powerful for building dynamic workflows, **ADK currently lacks native support for LangGraph integration**. However, **it’s possible to wrap LangGraph graphs as callable tools** inside ADK agents, which allows limited dynamic assembly. Full dynamic graph-driven agents in ADK would require custom wrappers or extending ADK itself.

---
