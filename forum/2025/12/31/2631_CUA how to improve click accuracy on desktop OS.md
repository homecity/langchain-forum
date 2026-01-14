# CUA how to improve click accuracy on desktop OS

**Topic ID:** 2631
**Created:** 2025-12-31 21:32:24
**URL:** https://forum.langchain.com/t/2631

---

## Post #1 by @frincones
*Posted on 2025-12-31 21:32:24*

Hi all,  I’m building a Computer Use Agent (CUA) with LangChain to control desktop apps (click/typing/scroll) using screenshots + coordinate-based actions.

I’m struggling with click precision (DPI scaling, multi-monitor offsets, window focus), so the agent often clicks a few pixels off or on the wrong element.

Any suggestions to make this more accurate and production-reliable?



Should I combine vision + accessibility tree (Windows UIA / macOS AX / Linux AT-SPI) instead of pure coordinates?



Which LLM/vision model has worked best for screen understanding + actions?



Any recommended pattern like observe → act → verify → retry, or repos/examples?



Thanks!

---
