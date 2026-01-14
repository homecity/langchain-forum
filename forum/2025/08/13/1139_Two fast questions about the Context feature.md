# Two fast questions about the Context feature

**Topic ID:** 1139
**Created:** 2025-08-13 17:31:20
**URL:** https://forum.langchain.com/t/1139

---

## Post #1 by @NathanAP
*Posted on 2025-08-13 17:31:20*

Hi, I’ve been migrating from `config` to `Context` class and I have two fast questions:


Can I use it as `BaseModel` or I should be always using only with `@dataclass` decorator?
Can I “store” complexes values on it for later use, like `BaseModel`, `Dict` or `List`?

---

## Post #2 by @AbdulBasit
*Posted on 2025-08-13 18:16:28*

Yes to both:



**Using with `BaseModel`**: `Context` can work with either a Pydantic `BaseModel` or a `@dataclass`. Use `BaseModel` if you want validation, type coercion and JSON serialization, use `@dataclass` if you want a lighter faster structure without Pydantic’s overhead.



**Storing complex values**: You can store any Python object in `Context` including other `BaseModel` instances, dicts, lists or custom classes. There’s no restriction on data type. Just keep in mind that if you need to serialize or persist the `Context` those objects must be serializable.




```
`from typing import Dict, List
from pydantic import BaseModel
from langgraph import Context

class MyModel(BaseModel):
    name: str

class MyContext(BaseModel):
    user_data: Dict
    models: List[MyModel]
    complex_state: MyModel

ctx = MyContext(
    user_data={"key": "value"},
    models=[MyModel(name="test")],
    complex_state=MyModel(name="state")
)
`
```

---

## Post #3 by @NathanAP
*Posted on 2025-08-13 18:27:09*

Thats great! I believe I’m pretty aware of the possible problems with `BaseModel` 

In my entire project I treat everything as `BaseModel`, but I remembered a little too late that in Postgres everything would be saved as JSON (or dict) to keep persisted, so I need to re-translate everything again and again. I thought it would be the same here, but if this is not required, thats awesome!

Just to be sure, thats also true when I use `get_runtime` in a tool as well, right?

---

## Post #4 by @system
*Posted on 2025-08-14 06:27:43*

This topic was automatically closed 12 hours after the last reply. New replies are no longer allowed.

---
