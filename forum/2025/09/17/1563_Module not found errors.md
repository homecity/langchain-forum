# Module not found errors

**Topic ID:** 1563
**Created:** 2025-09-17 15:13:18
**URL:** https://forum.langchain.com/t/1563

**Tags:** cloud

---

## Post #1 by @neil1
*Posted on 2025-09-17 15:13:18*

Hi - I’m seeing the following error on LGP but the package is defined in my pyproject.toml and obviously builds fine locally with uv. How do I resolve this on the platform deployment?


```
`ModuleNotFoundError: No module named 'loguru'
`
```

---

## Post #2 by @neil1
*Posted on 2025-09-18 04:31:32*

For anyone reading - make sure your langgraph.json has a" dependencies key with “[.]” as the value (or whatever path you need).

---
