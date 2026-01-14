# User isolation in LangGraph memory store

**Topic ID:** 1328
**Created:** 2025-08-25 10:50:30
**URL:** https://forum.langchain.com/t/1328

**Tags:** cloud

---

## Post #1 by @FocusedCreativity
*Posted on 2025-08-25 10:50:30*

Hi all,

We’re onboarding multiple users and noticed the memory store doesn’t isolate data by default. Even when we manually add user ID namespaces, it still feels like a patch.

Do we need to move to an external solution for proper user isolation, or will LangGraph Cloud provide built-in support for this?

Thanks!

---

## Post #2 by @Jake
*Posted on 2025-08-25 21:59:53*

Hi [/u/focusedcreativity](@FocusedCreativity) ,

Typically we see users move to an external memory store like Postgres or Mongo that they then enforce this logic in - the InMemory store (which I assume you’re referring to) is best suited for sub-prod apps and so might feel less robust from a data separation perspective

Please let me know if you have any additional questions!

---
