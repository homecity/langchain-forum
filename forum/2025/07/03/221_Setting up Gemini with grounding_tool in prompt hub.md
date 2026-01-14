# Setting up Gemini with grounding_tool in prompt hub

**Topic ID:** 221
**Created:** 2025-07-03 14:00:54
**URL:** https://forum.langchain.com/t/221

---

## Post #1 by @andres_sp_ai
*Posted on 2025-07-03 14:00:54*

Hi everyone,

I’m testing a prompt that uses web_search_preview in OpenAI and I wanted to compare it’s results using one of the Gemini models with search groundings. I couldn’t figure out how to set it up.

When I configure the model in the playground (using the set up cog), and I go to the  “Tool Settings” tab I don’t get any options for the gemini settings. I also tried using the “+tool” button in the playground but I don’t know how to set it up there.

Setting up websearch for OpenAI was straight forward since it’s one of their native tools. Has anyone configured search_grounding for gemini models and who can share how they got it working?

Thank you,

Andres

---

## Post #2 by @Isaac
*Posted on 2025-07-03 20:27:52*

Hi Andres, welcome to the community! Unfortunately we do not support Gemini native tools in the playground at the moment (only OpenAI native tools) but it is something we are thinking about adding in the near future. You can of course run these using the Gemini SDK or LangChain package, but not in the UI today -  sorry about that.

---

## Post #3 by @andres_sp_ai
*Posted on 2025-07-03 20:46:05*

Thank you Isaac! Glad to hear it’s in the works.

---
