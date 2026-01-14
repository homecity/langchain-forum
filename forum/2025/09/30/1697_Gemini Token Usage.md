# Gemini Token Usage

**Topic ID:** 1697
**Created:** 2025-09-30 20:07:39
**URL:** https://forum.langchain.com/t/1697

**Tags:** python-help

---

## Post #1 by @imlevelhead
*Posted on 2025-09-30 20:07:39*

Howdy! I’m having trouble getting token usage to show up correctly in LangSmith when using Gemini models. Since there’s no Gemini wrapper, I can’t get the token metadata nested under `usage_metadata`, so it doesn’t roll up into the top-level LangGraph run summary. Here’s what OpenAI’s auto-formatted usage looks like vs. what I can produce with Gemini notice how mine isn’t under `usage_metadata`, so it’s not being summed.Could anyone share a pattern or example for shaping Gemini traces so token usage lands in `usage_metadata` and aggregates at the run level?

[/uploads/short-url/xCS7mgpmIDk0DcUAvGjyoyiLvnE.png?dl=1](Screenshot 2025-09-30 at 12.54.49 PM1086×658 92.3 KB)

---

## Post #2 by @imlevelhead
*Posted on 2025-09-30 20:08:22*

Here’s the openAI run

[/uploads/short-url/d6bGNDbYdoujUSxtGZS5bMoJXwL.png?dl=1](Screenshot 2025-09-30 at 12.54.58 PM1057×786 95.7 KB)

---
