# OpenAI Agent SDK + LangSmith Integration

**Topic ID:** 1254
**Created:** 2025-08-19 14:41:38
**URL:** https://forum.langchain.com/t/1254

---

## Post #1 by @daniel
*Posted on 2025-08-19 14:41:38*

Hi,

I am using an OpenAI Agent SDK for agentic workflow, which calls tools which are simple LLM calls.

I have a simple tool responsible for making a string into lowercase using LLM as well as an triage Agent responsible for picking up the right tool for the task, in this case there is only one tool. I run the code with the `OpenAIAgentsTracingProcessor` defined.

This approach works well, the issue is that it created in the LangSmith UI a separate trace for the Agent vs Tool calls (LLM).

My understanding is that `OpenAIAgentsTracingProcessor` and langsmith specific tracing either via `@traceable`, `wrap_openai`  create different tracing session and thus everything is separate.

I tried to solve the issue of creation of separate traces by assigning custom metadata to both agent and tool calls but I can not assign the metadata to `OpenAIAgentsTracingProcessor`.

**How can I have the agent and tool call under the same trace?\ How can I add metadata to OpenAIAgentsTracingProcessor?**


```
`if __name__ == "__main__":

    set_trace_processors([OpenAIAgentsTracingProcessor()])
    asyncio.run(main())
`
```


```
`import json
from typing import Any
from pydantic import BaseModel, Field
from agents import Agent, Runner, RunContextWrapper, function_tool, FunctionTool
from openai import AsyncOpenAI

from dotenv import load_dotenv
from langsmith import traceable
from langsmith.wrappers import wrap_openai

load_dotenv()

class TextInput(BaseModel):
    text: str = Field(..., min_length=1, max_length=10_000, description="Text to process")

@traceable(run_type="tool", metadata={"daniel": "tool"})
async def _make_lowercase_on_invoke(
    ctx: RunContextWrapper[Any],
    args_json: str
) -> str:
    """Tool that uses LLM to convert text to lowercase."""

    args = TextInput.model_validate_json(args_json)

    client = wrap_openai(AsyncOpenAI(), tracing_extra={"metadata": {"service": "smart-text-agent", "team": "draftwise"}})

    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Convert the given text to lowercase. Return only the result."},
            {"role": "user", "content": f"Convert to lowercase: {args.text}"}
        ],
        max_tokens=100,
        temperature=0)
    
    
    result = (response.choices[0].message.content or "").strip()

    usage_info = {
        "model": response.model,
        "prompt_tokens": getattr(response.usage, "prompt_tokens", None),
        "completion_tokens": getattr(response.usage, "completion_tokens", None),
        "total_tokens": getattr(response.usage, "total_tokens", None),
        "request_id": response.id,
        "created": response.created,
        "finish_reason": response.choices[0].finish_reason,
    }

    print(f"make_lowercase_tool tokens | {usage_info.get("total_tokens")}")

    return json.dumps({
        "result": result,
        "operation": "lowercase",
        "original_text": args.text,
        "usage_metadata": {
            "input_tokens": usage_info.get("prompt_tokens"),
            "output_tokens": usage_info.get("completion_tokens"),
            "total_tokens": usage_info.get("total_tokens")
    }})
MAKE_LOWERCASE_SCHEMA = {
    "type": "object",
    "properties": {
        "text": {
            "type": "string",
            "minLength": 1,
            "maxLength": 10_000,
            "description": "Text to process",
        }
    },
    "required": ["text"],
    "additionalProperties": False,}

make_lowercase_tool = FunctionTool(
    name="make_lowercase_tool",
    description="Convert the given text to lowercase.",
    params_json_schema=MAKE_LOWERCASE_SCHEMA,
    on_invoke_tool=_make_lowercase_on_invoke,
)

@traceable(run_type='llm', metadata={"daniel": "agent"})
async def run_smart_text_agent(user_query: str, text: str) -> str:
    """Run the agent that uses the tool to process the input."""
        
    instructions = (
        "You are a text processing agent. You have 3 tools:\n"
        "- make_lowercase_tool: converts text to lowercase\n"
        "- make_capitalize_tool: capitalizes first letter of each word\n"
        "- count_words_tool: counts words in text\n\n"
        "IMPORTANT: When given a text and a request, immediately use the appropriate tool to process the text. "
        "Do NOT explain your capabilities - just do the work and return the results."
    )
    agent = Agent(
        name="Smart Text Processing Agent",
        instructions=instructions,
        tools=[make_lowercase_tool], #, make_capitalize_tool, count_words_tool],
        model="gpt-4o-mini-2024-07-18"
    )
    prompt = f"Process this text: '{text}'. Request: {user_query}. Use the appropriate tool immediately."
    result = await Runner.run(agent, prompt)

    # (optional) create agent insight summary
    summary = []
    for i, mr in enumerate(result.raw_responses):
        model = result._last_agent.model
        if i [/uploads/short-url/89gaa7xjhm4QeS06F8mnbugpFBl.png?dl=1](image1788×568 53.1 KB)

**The `run_smart_text_agent` has the metadata labels I created both the `{daniel: tool}` and `{daniel: agent}` but the trace created by `OpenAIAgentsTracingProcessor` i.e. `Agent workflow` doesnt have any metadata and I cant attach any.**

---

## Post #2 by @angus
*Posted on 2025-08-19 15:08:04*

You can set metadata and tags directly on the OpenAIAgentsTracingProcessor


```
`session_metadata = {"session_id": , "user_id": }

if __name__ == "__main__":

    set_trace_processors([OpenAIAgentsTracingProcessor(metadata=session_metadata, tags=["agent", "openai", "production"])])
    asyncio.run(main())
`
```

Additionally project_name and name are also configurable

---

## Post #3 by @daniel
*Posted on 2025-08-20 07:53:13*

Thank you,

I am exploring a way to either add those two traces into one trace, or add metadata to each of them that will “link” them together, so that later I could use filtering to group them together.

I tried an approach of generating UUID which would be a value in the metadata, but that wouldnt work, as the UUID is generated on the start and doesnt referesh with every new trace.

Do you have any suggestion on how to solve this issue? - either by grouping those calls together or assigning metadata that links them?

---

## Post #4 by @angus
*Posted on 2025-08-20 16:41:06*

You could link the two together via a [https://docs.smith.langchain.com/observability/how_to_guides/threads](thread) but that does require a unique identifier like a UUID. Why can’t you generate one for each request?

---

## Post #5 by @daniel
*Posted on 2025-08-22 12:35:42*

Thank you for the answer,

I found a temporary way around it, so will move forward with it.

Appreciate the help.

---
