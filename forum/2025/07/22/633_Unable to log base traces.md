# Unable to log base traces

**Topic ID:** 633
**Created:** 2025-07-22 18:29:51
**URL:** https://forum.langchain.com/t/633

**Tags:** js-help

---

## Post #1 by @MarkProjectRepo
*Posted on 2025-07-22 18:29:51*

Our org has two workspaces, one for production and one for experimentation. In the experimentation platform we’re trying to log traces with the Base retention, but have tried just about everything and can’t seem to get it to apply. We’re applied Base to new projects via the top level selector, to all existing projects in the workspace budgeting selector, but nothing works. We’re doing this via TS, are there some params for the traceable wrapper that I don’t know about that might solve this?

[/uploads/short-url/81knYtBNqbMRiM5y0eENenTPGN4.png?dl=1](image1446×184 42.1 KB)

---

## Post #2 by @MarkProjectRepo
*Posted on 2025-07-22 18:38:12*

Also worth noting: I’ve specified a project with the correct defaults set (Base, not extended), no luck. Is there any explicit param for the JS side?

---
