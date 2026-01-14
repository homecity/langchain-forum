# Logging to "production" project no longer works — possibly corrupt or locked?

**Topic ID:** 486
**Created:** 2025-07-15 20:38:54
**URL:** https://forum.langchain.com/t/486

---

## Post #1 by @dpustalk
*Posted on 2025-07-15 20:38:54*

Hi LangSmith team,

I’ve been using a project named `production` in LangSmith for several months without issue. Recently, logging to that project stopped working — despite my code reporting that the logs were successfully written, nothing appears in the UI under that project.

To isolate the issue, I tested the exact same logging code with other project names, including:


 `test_production` (new, lowercase, fresh project) — works
 `nonprod`, `"nonprod"` — both work
 `production` (my original project) — **no longer works**, even though it used to

It feels like the original `production` project may be **corrupted, locked, or in an invalid state**. The issue is not with the project name itself — other projects work fine regardless of name formatting. It’s just this one `production` project that fails silently: no errors, but logs don’t show up.

Has there been any change to how certain project names are handled, or is it possible that this project got into a bad state internally?

I’d appreciate any help identifying what’s wrong with the `production` project, or assistance in recovering/cleaning it up if needed.

Thanks!

---
