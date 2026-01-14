# Custom Code online evals on multi-agent system traces not seeing sub-agent tool calls (or any ids or details about Child Runs)

**Topic ID:** 2026
**Created:** 2025-10-30 19:18:34
**URL:** https://forum.langchain.com/t/2026

---

## Post #1 by @aerickson-clt
*Posted on 2025-10-30 19:18:34*

I have a multi-agent system with a supervisor that can call on some other ReAct agents.  I have configured some Online Evaluators with Custom Code, but I find that the top-level Runs do not contain the tool calls, or any other action taken by my sub-agents besides the message they write back to the supervisor.  As such, those Runs don’t contain things like how many tool calls were made, how many tokens were consumed and what type, or the results of any tool call.  Of course, I can run Evals over those other Runs too, but I can’t aggregate the results over the Trace without seeing everything in one place.

I’m using the built-in `create_react_agent` and the library `langgraph-supervisor` (which is also `create_react_agent`), part of which is shown in the diagram below.

[/uploads/short-url/rmiA4mGDOQnNfTphEU6ANvC7rBX.png?dl=1](image939×599 47 KB)

If I create an eval for a top level Trace (correct me if I’m wrong, but I think this is where `trace_id == run_id`), I can then look at the trace for the eval itself and see how it received the run (can’t include a picture because of forum restrictions).

In that Run outputs I can only see the main Message thread as seen by the supervisor, as well as metadata and the remainder of the final State.  That includes things like messages that show transfers to sub-agents like the following:


```
``{`
`
```

`      "additional_kwargs": {},`

`      "content": "",`

`      "id": "lc_run--412923f1-c17d-409c-9616-606bea4c5259",`

`      "invalid_tool_calls": [],`

`      "name": "supervisor",`

`      "response_metadata": {`

`        "finish_reason": "tool_calls",`

`        "model_name": "gpt-5-mini-2025-08-07",`

`        "model_provider": "openai"`

`      },`

`      "tool_calls": [`

`        {`

`          "args": {},`

`          "id": "call_3L7pxKSSTtIek0rwo2SLhxad",`

`          "name": "transfer_to_planner_expert",`

`          "type": "tool_call"`

`        }`

`      ],`

`      "type": "ai",`

`      "usage_metadata": {`

`        "input_token_details": {`

`          "audio": 0,`

`          "cache_read": 0`

`        },`

`        "input_tokens": 9849,`

`        "output_token_details": {`

`          "audio": 0,`

`          "reasoning": 64`

`        },`

`        "output_tokens": 88,`

`        "total_tokens": 9937`

`      }`

`    },`

`    {`

`      "additional_kwargs": {},`

`      "content": "Successfully transferred to planner_expert",`

`      "id": "9589376d-ea0e-423a-ae8c-e3233734b296",`

`      "name": "transfer_to_planner_expert",`

`      "response_metadata": {`

`        "__handoff_destination": "planner_expert"`

`      },`

`      "status": "success",`

`      "tool_call_id": "call_3L7pxKSSTtIek0rwo2SLhxad",`

`      "type": "tool"`

`    },`

But the work of the sub-agent itself is not there.

I have shared the way I’m calling some of the built-in agents, because maybe there is configuration I can add that will improve this.


```
`supervisor_with_planner = create_supervisor(
    agents=[
        planner_agent.graph,
        description_writer_agent.graph,
        # OTHERS
        ],
    model=LLM,
    prompt=build_supervisor_prompt, # <--- This builds a dynamic prompt that injects some things from state
    state_schema=MyCustomState,
    add_handoff_back_messages=True, # My sub-agents send a message back to the supervisor
    output_mode="last_message",
).compile()

# In another file...

_description_writer_agent_graph = create_react_agent(
    model=LLM,
    tools=DESCRIPTION_WRITER_TOOLS,
    state_schema=MyCustomState,
    prompt=build_description_writer_prompt, # <--- This builds a dynamic prompt that injects some things from state
    name="description_writer",
)
`
```

I have looked at the multi-turn evaluators and that is not what I need.  I am aware that `create_react_agent` is deprecated, but I had issues migrating and will wait until (hopefully) the langgraph_supervisor library migrates.

Question:  How can I see the runs from all the sub-agents and the supervisor in one place and run an Online Eval on that?

---

## Post #2 by @aerickson-clt
*Posted on 2025-10-30 22:09:15*

I went a bit deeper with this after finding the documentation at [https://docs.langchain.com/langsmith/evaluate-graph](How to evaluate a graph - Docs by LangChain) and at [https://docs.langchain.com/langsmith/evaluate-on-intermediate-steps](How to evaluate an application's intermediate steps - Docs by LangChain)

The docs suggest that I can get ahold of “child runs” through the Run object (`run` or `root_run`), but this doesn’t seem to be the case.

Both of these pages recommend using the `langsmith.schemas.Run` object, but this doesn’t seem to be available in Custom Code Online evaluators.  The `Run` object is not recognized, and the `langsmith` dependency is not there.  Furthermore, I wrote an eval that lists some properties of the environment and found that `child_run_ids` and `direct_child_run_ids` are always empty, but that `parent_run_ids` are populated when expected.  I don’t know how we would access the child runs even if we had the ids, but the fact that these properties are always null suggests I’ll never get ahold of them…


```
`import json
from collections.abc import Mapping, Sequence

def perform_eval(run):
    """
    Evaluator that returns a multiline snapshot in `comment` covering:
      - All locals & globals (names + types)
      - A detailed summary of the `run` object:
          * type and dir()
          * common fields (if present)
          * JSON-like dump via model_dump/dict/json/__dict__
          * mapping/sequence views if applicable
          * child_runs summary
    Returns: {"key": , "comment": , "score": 1}
    """

    # --- Configuration ---
    MAX_ITEMS_PER_SECTION = 500
    MAX_VALUE_CHARS = 300
    INDENT = "  "

    # --- Helpers ---
    def safe_type_name(obj):
        try:
            t = type(obj)
            return f"{t.__module__}.{t.__qualname__}"
        except Exception:
            return str(type(obj))

    def safe_repr(value, max_len=MAX_VALUE_CHARS):
        try:
            s = repr(value)
        except Exception as e:
            s = f""
        if s is None:
            s = "None"
        if len(s) > max_len:
            return s[:max_len] + f"... "
        return s

    def summarize_namespace(ns_items, title):
        items = list(ns_items)
        lines = [f"{title} (count={len(items)}):"]
        items.sort(key=lambda kv: kv[0])
        for i, (k, v) in enumerate(items):
            if i >= MAX_ITEMS_PER_SECTION:
                lines.append(f"{INDENT}... ")
                break
            lines.append(f"{INDENT}{k}: {safe_type_name(v)}")
        return "\n".join(lines)

    def try_json_like(obj):
        """Try to extract a JSON-like dict for `run`."""
        # pydantic v2 / v1 model methods, then json text, then __dict__
        for meth in ("model_dump", "dict"):
            f = getattr(obj, meth, None)
            if callable(f):
                try:
                    data = f()
                    if isinstance(data, Mapping):
                        return data
                except Exception:
                    pass
        for meth in ("model_dump_json", "json"):
            f = getattr(obj, meth, None)
            if callable(f):
                try:
                    s = f()
                    if isinstance(s, (str, bytes)):
                        return json.loads(s)
                except Exception:
                    pass
        d = getattr(obj, "__dict__", None)
        if isinstance(d, Mapping):
            try:
                return dict(d)
            except Exception:
                pass
        return None

    def summarize_mapping(m, title):
        try:
            size = len(m)
        except Exception:
            size = "unknown"
        lines = [f"{title} (mapping, {size} keys):"]
        try:
            iterator = m.items()
        except Exception:
            iterator = []
        for i, (k, v) in enumerate(iterator):
            if i >= MAX_ITEMS_PER_SECTION:
                lines.append(f"{INDENT}... ")
                break
            lines.append(f"{INDENT}{k!r}: {safe_type_name(v)} = {safe_repr(v)}")
        return "\n".join(lines)

    def summarize_sequence(seq, title):
        try:
            n = len(seq)
        except Exception:
            n = "unknown"
        lines = [f"{title} (sequence, len={n}):"]
        try:
            it = iter(seq)
        except Exception:
            it = iter(())
        for i, v in enumerate(it):
            if i >= MAX_ITEMS_PER_SECTION:
                lines.append(f"{INDENT}... ")
                break
            lines.append(f"{INDENT}[{i}]: {safe_type_name(v)} = {safe_repr(v)}")
        return "\n".join(lines)

    def list_attributes(obj):
        try:
            names = dir(obj)
        except Exception as e:
            return f""
        out = []
        for i, name in enumerate(names):
            if i >= MAX_ITEMS_PER_SECTION:
                out.append("... ")
                break
            out.append(name)
        return ", ".join(out)

    def get_common_fields(obj):
        # Likely fields on Run-like objects
        candidates = [
            "id", "name", "run_id", "parent_run_id", "trace_id",
            "project_name", "session_name",
            "start_time", "end_time", "created_at", "updated_at",
            "status", "error", "tags", "metadata",
            "inputs", "outputs", "extra",
            "child_runs", "child_run_ids", "events",
            "reference_example_id", "feedback",
            "execution_order", "serialized",
        ]
        lines = ["Common run fields (if present):"]
        for key in candidates:
            try:
                val = getattr(obj, key)
                lines.append(f"{INDENT}{key}: {safe_type_name(val)} = {safe_repr(val)}")
            except Exception:
                # Not present or error accessing
                pass
        return "\n".join(lines)

    def summarize_run(obj):
        lines = []
        lines.append(f"RUN TYPE: {safe_type_name(obj)}")
        lines.append(f"RUN ATTRIBUTES (dir): {list_attributes(obj)}")
        lines.append(get_common_fields(obj))

        data = try_json_like(obj)
        if isinstance(data, Mapping):
            lines.append(summarize_mapping(data, "RUN JSON-like dump"))
        elif data is not None:
            if isinstance(data, Sequence) and not isinstance(data, (str, bytes, bytearray)):
                lines.append(summarize_sequence(data, "RUN JSON-like dump (sequence)"))
            else:
                lines.append(f"RUN JSON-like dump (other): {safe_repr(data)}")
        else:
            lines.append("RUN JSON-like dump: ")

        # If the run object itself is Mapping/Sequence, show that view too
        try:
            if isinstance(obj, Mapping):
                lines.append(summarize_mapping(obj, "RUN AS MAPPING"))
            elif isinstance(obj, Sequence) and not isinstance(obj, (str, bytes, bytearray)):
                lines.append(summarize_sequence(obj, "RUN AS SEQUENCE"))
        except Exception as e:
            lines.append(f"RUN AS MAPPING/SEQUENCE: ")

        # Child runs, if any
        try:
            child_runs = getattr(obj, "child_runs", None)
            if child_runs is not None:
                if isinstance(child_runs, Mapping):
                    lines.append(summarize_mapping(child_runs, "child_runs"))
                elif isinstance(child_runs, Sequence) and not isinstance(child_runs, (str, bytes, bytearray)):
                    lines.append(summarize_sequence(child_runs, "child_runs"))
                else:
                    lines.append(f"child_runs: {safe_type_name(child_runs)} = {safe_repr(child_runs)}")
        except Exception as e:
            lines.append(f"child_runs: ")

        return "\n".join(lines)

    # --- Build the snapshot ---
    _locals = dict(locals())    # includes `run`
    _globals = dict(globals())

    sections = []
    sections.append(summarize_namespace(_locals.items(), "LOCALS"))
    sections.append(summarize_namespace(_globals.items(), "GLOBALS"))

    try:
        sections.append(summarize_run(run))
    except Exception as e:
        sections.append(f"RUN SUMMARY: ")

    comment = "\n\n".join(sections)

    return {
        "key": "environment and run introspection",
        "comment": comment,
        "score": 1,
    }

`
```

---
