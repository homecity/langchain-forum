# Prompt Playground does not support the Responses API

**Topic ID:** 730
**Created:** 2025-07-26 09:24:22
**URL:** https://forum.langchain.com/t/730

---

## Post #1 by @benjamin.ellis
*Posted on 2025-07-26 09:24:22*

I can log traces to LangSmith from the OpenAI Agents SDK using [https://docs.smith.langchain.com/observability/how_to_guides/trace_with_openai_agents_sdk](Trace with OpenAI Agents SDK | 🦜️🛠️ LangSmith)

and the traces appear in LangSmith.

But then when I browse from the trace of the LLM call to Prompt Playground using the contextual “Playground” button, the prompt which loads into Prompt Playground is incomplete (it lacks the “instructions” node) and malformed (it does not categorize conversation history correctly).

I’ve attempted to work around that in the meantime with this patch. It’s not perfect but I share it here for context:


```
`# playground_friendly_patch.py
"""
Apply at program start *before* the first Agent run is executed.

The patch makes LangSmith store:
    inputs = {
        "messages": [
            {"role": "system", "content": ""},
            ...  # all original chat messages
        ]
    }

so the prompt playground will show the full context.
"""

from typing import Any

from agents import tracing
from langsmith.wrappers import _agent_utils as agent_utils

_orig_extract = agent_utils.extract_span_data  # keep original reference


def _patched_extract_span_data(span: tracing.Span) -> dict[str, Any]:
    data: dict[str, Any] = _orig_extract(span)

    # We care only about the inputs of "response" spans (where the LLM call happens)
    inputs: dict[str, Any] = data.get("inputs", {})
    instructions: str | None = inputs.pop("instructions", None)
    messages: list[dict[str, str]] | None = inputs.get("input")

    if instructions is not None and isinstance(messages, list):
        # Prepend system message if not already present
        if not (messages and messages[0].get("role") == "system"):
            messages.insert(0, {"role": "system", "content": instructions})
        inputs["messages"] = messages  # rename key for clarity (optional)
        data["inputs"] = inputs

    return data


# Monkey-patch
agent_utils.extract_span_data = _patched_extract_span_data
`
```

The above patch “works” up to a point (the conversation history of previous messages gets wrapped in a message node and presented as embedded text in a “human” message in Prompt Playground, which isn’t correct, but is close enough to let me run the prompt and get an equivalent response) but it’s not ideal.

It would be great if Prompt Playground supported the Responses API format used by Agents SDK, such that when one clicks “Start” to run the prompt, it dynamically used the Responses API instead of Chat Completions API, so you truly run the prompt as it was intended.

Failing that, not as good but still helpful would be if the OpenAIAgentsTracingProcessor supported an option to log traces into LangSmith in a format supported by Prompt Playground, recasting them as if they were Chat Completions API calls. (I say “option” here as I imagine not all users would want this. Logging the original trace faithfully is useful, but so is being able to load the trace into Prompt Playground. Some may value the former more than the latter.)

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-28 08:16:58*

You’re correct that LangSmith’s Prompt Playground doesn’t natively support the OpenAI Agents SDK format, causing incomplete prompts when using the contextual “Playground” button. Your patch is a reasonable workaround that reformats the trace data to be more playground-compatible by combining instructions and messages.

The ideal solution would be LangSmith adding native Agents SDK support to Playground, allowing it to use the Responses API instead of Chat Completions. As an interim solution, you could request LangSmith add a configuration option in `OpenAIAgentsTracingProcessor` to automatically reformat traces for Playground compatibility, similar to your patch but built-in. This would let users choose between faithful trace logging and playground usability without requiring manual monkey-patching.

---

## Post #3 by @benjamin.ellis
*Posted on 2025-10-11 12:09:45*

Right, the ideal would be for Prompt Playground to support the Responses API. Patching for it is not a good workaround (and besides, the Responses API includes additional features, which I would want Prompt Playground to be able to invoke). Where can we lobby to add this support to Prompt Playground?

---
