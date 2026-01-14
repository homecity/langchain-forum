# LangSmith refuses to run in Colab

**Topic ID:** 2529
**Created:** 2025-12-16 10:29:12
**URL:** https://forum.langchain.com/t/2529

---

## Post #1 by @dsemeria
*Posted on 2025-12-16 10:29:12*

Hi guys, I’m tearing my hair out here.

I’m running this code in Colab notebook cell and it throws the error you can see in the comment. I tried contacting the endpoint with curl and it responds, so clearly the problem is with  tracing not being activated.

Any ideas?


```
`os.environ["LANGCHAIN_API_KEY"] = "..."

os.environ["LANGCHAIN_ENDPOINT"] = "https://api.smith.langchain.com"

os.environ["LANGCHAIN_TRACING"] = "true"

os.environ["LANGCHAIN_TRACING_V2"] = "true"

os.environ["LANGCHAIN_PROJECT"] = "default"


from langsmith import traceable

from langsmith.run_helpers import get_current_run_tree


@traceable

def test_fn(x):

  run = get_current_run_tree()

  print("Run ID inside function:", run.id)

  return x * 2

test_fn(21)  # AttributeError: 'NoneType' object has no attribute 'id'




`
```

---

## Post #2 by @wfh
*Posted on 2025-12-19 06:15:25*

Does it work if you restart your kernel?

Env is cached after the first trace call, so if you had run the cell before setting the environment, the changes would be ignored.

---

## Post #3 by @dsemeria
*Posted on 2025-12-19 10:47:00*

Yes, tried running the code again in a fresh runtime and it worked. I didn’t know about the env cache.

Many thanks.

---
