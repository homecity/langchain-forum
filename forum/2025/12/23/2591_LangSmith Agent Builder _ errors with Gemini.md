# LangSmith Agent Builder – errors with Gemini

**Topic ID:** 2591
**Created:** 2025-12-23 12:44:49
**URL:** https://forum.langchain.com/t/2591

---

## Post #1 by @ahhk22
*Posted on 2025-12-23 12:44:49*

I have been trying to use the Agent Builder having configured Gemini as a custom model with my API key and the required fields.  When I subsequently describe the agent I want to build, I get:  **Error: HTTP 400: {“detail”:“Missing one of AGENT_BUILDER_ANTHROPIC_API_KEY, ANTHROPIC_API_KEY in workspace secrets”}**

I have tried this several times with different Gemini model selections. Is there a problem under the hood?

Wish that the built-in model selection wasn’t limited to Anthropic and OpenAI.

---

## Post #2 by @palashshah
*Posted on 2025-12-29 20:15:33*

Hey! Thank you for flagging this. This isn’t intended, and seems to be a bug with adding custom models. Will look into this and report back when we have a fix!

---
