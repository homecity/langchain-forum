# Can't run gpt-5 in Langsmith

**Topic ID:** 1076
**Created:** 2025-08-11 20:50:44
**URL:** https://forum.langchain.com/t/1076

---

## Post #1 by @namtran6701
*Posted on 2025-08-11 20:50:44*

Is there a way to disable the temperature parameter in langsmith?

[/uploads/short-url/i38EG6Ob61FnO9PrCAERQG2Qg4F.png?dl=1](image1464×416 47.3 KB)

---

## Post #2 by @jacoblee93
*Posted on 2025-08-11 21:04:19*

Hey [/u/namtran6701](@namtran6701),

Thanks for the report -  we have a fix that will be going out for this soon. Will update when live.

Jacob

---

## Post #3 by @arjun
*Posted on 2025-08-12 18:37:57*

hi [/u/namtran6701](@namtran6701) this should be fixed now – the issue is that it looks like you were trying to modify the temperature, which gpt-5 doesn’t actually support.

We’ve disabled this setting now for gpt-5 models

---
