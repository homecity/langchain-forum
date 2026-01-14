# JsonPlusSerializer does not serialize exceptions

**Topic ID:** 2429
**Created:** 2025-12-05 17:20:31
**URL:** https://forum.langchain.com/t/2429

**Tags:** python-help

---

## Post #1 by @aecote92
*Posted on 2025-12-05 17:20:31*

Hi there!

I’m working to upgrade langchain and langgraph, including the checkpointer. With the langgraph-checkpoint changes in 3.0.0, there have been big changes in the JsonPlusSerializer. Previously, we were able to de/serialize all of our objects and exceptions without any issues, but since the upgrade we’ve had to modify our or objects to inherit from `Serializable` in order to get them to properly de/serialize. That’s totally fine, but the problem we’re running into is that we also store exceptions in our checkpointer, which cannot inherit from the `Serializable` class. I’m wondering if maybe there’s a workaround to ensure that we can de/serialize in the same way we could in the past? Or if I’m missing something and that functionality already exists?

Thanks in advance!

Best,

Alyssa

---

## Post #2 by @pawel-twardziak
*Posted on 2025-12-05 19:46:30*

Hi [/u/aecote92](@aecote92)

this is an interesting point. I think it was changed in that PR [https://github.com/langchain-ai/langgraph/pull/6269/](chore: Restrict "json" type deserialization by hinthornw · Pull Request #6269 · langchain-ai/langgraph · GitHub).

I assume that is for security hardening ([https://github.com/langchain-ai/langgraph/security/advisories/GHSA-wwqv-p2pp-99h5](RCE in "json" mode of JsonPlusSerializer · Advisory · langchain-ai/langgraph · GitHub)) - explicit behavior for exceptions to prevent deserialization RCE vectors.

**If you only need to display/report the error**: store a structured error payload rather than the exception object.


Example: persist `{"type": exc.__class__.__name__, "module": exc.__class__.__module__, "message": str(exc), "args": exc.args, "traceback": traceback_str}`.
This is stable, safe, and will round‑trip via `JsonPlusSerializer`.

**If you need to reconstruct an exception‑like object**: wrap it in a dataclass or pydantic model that can be round‑tripped and optionally rehydrate to a best‑effort exception class at read time.

Pseudocode:


```
`from dataclasses import dataclass
from typing import Optional, Tuple
import traceback as _tb

@dataclass
class ExceptionInfo:
    module: str
    type: str
    message: str
    args: Tuple
    traceback: Optional[str] = None

def capture_exception(e: BaseException) -> ExceptionInfo:
    return ExceptionInfo(
        module=e.__class__.__module__,
        type=e.__class__.__name__,
        message=str(e),
        args=getattr(e, "args", ()),
        traceback="".join(_tb.format_exception(type(e), e, e.__traceback__)),
    )

def rehydrate_exception(info: ExceptionInfo) -> BaseException:
    try:
        mod = __import__(info.module, fromlist=[info.type])
        cls = getattr(mod, info.type, Exception)
        return cls(*info.args)
    except Exception:
        return Exception(info.message)
`
```

[#p-4694-not-recommended-1]()Not recommended
**If you truly need to persist arbitrary Python exceptions as Python objects**: supply a custom serializer for the checkpointer that always uses pickle (ideally with encryption if the storage is not fully trusted).

Pseudocode:


```
`import pickle
from langgraph.checkpoint.serde.base import SerializerProtocol

class PickleOnlySerializer(SerializerProtocol):
    def dumps_typed(self, obj):
        return ("pickle", pickle.dumps(obj))
    def loads_typed(self, data):
        t, b = data
        if t != "pickle":
            raise ValueError(f"Unexpected type: {t}")
        return pickle.loads(b)
`
```

Then pass it to your saver:


```
`from langgraph.checkpoint.memory import InMemorySaver
checkpointer = InMemorySaver(serde=PickleOnlySerializer())
`
```

---
