# Escape characters in the jsonl file

**Topic ID:** 1719
**Created:** 2025-10-01 17:01:36
**URL:** https://forum.langchain.com/t/1719

---

## Post #1 by @abhijit.mahalunkar
*Posted on 2025-10-01 17:01:36*

**Question:**

Is anyone experiencing issues with the **import function corrupting or altering escape characters in the payload**?

**Context / Details:**

When importing data, some escape characters (like `\n`, `\"`, `\\`, etc.) in the payload seem to be modified, which affects downstream processing. Has anyone found a reliable way to handle the original escape sequences during import?

---

## Post #2 by @jacoblee93
*Posted on 2025-10-01 17:13:23*

Hey [/u/abhijit.mahalunkar](@abhijit.mahalunkar), thanks for flagging this. I will take a look.

---

## Post #3 by @jacoblee93
*Posted on 2025-10-01 17:57:19*

Do you have a file that repros the behavior you’re seeing? I tried a few basic examples that seemed to work as expected.

---
