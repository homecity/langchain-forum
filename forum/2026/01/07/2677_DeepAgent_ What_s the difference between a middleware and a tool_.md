# DeepAgent: What's the difference between a middleware and a tool?

**Topic ID:** 2677
**Created:** 2026-01-07 09:06:55
**URL:** https://forum.langchain.com/t/2677

---

## Post #1 by @hbkmadness
*Posted on 2026-01-07 09:06:55*

I’m reading through the DeepAgent docs and I think the middleware section could use some a bit more explanations, other than it is composable.


What is the difference between a tool and a middleware
Any examples of a custom middleware (if it is possible to write one atm) so we can see what kind of interface it needs to implement.

As far as I understood, it looks like a middleware is an abstraction over the tools, that would help get some deterministic functionality from a bit more composite logic and eventually provides an API for the agent to call.

Or if we can say that a tool is a normal function, the middleware would potentially be a class that has some public functions, which end up being the tools the agent could call.

---

## Post #2 by @pawel-twardziak
*Posted on 2026-01-07 11:40:12*

hi [/u/hbkmadness](@hbkmadness)

lemme try to answer your question:

[#p-5312-high-level-intuition-1]()High-level intuition

**Tools** are the *individual actions* an agent can call (e.g. “read this file”, “write that file”, “run this command”).
**Middleware** is a *plugin layer around the agent* that can:

Bundle and register related tools
Add/shape the agent’s state and system prompt
Intercept/modify model calls and tool calls
Implement cross‑cutting policies (retries, logging, safety, planning, etc.)



Your mental model of “a tool ≈ function, middleware ≈ class bundling several tools + logic” is directionally right, but middleware also has lifecycle hooks and state management that go beyond just “a nicer wrapper over multiple tools”.

[#p-5312-h-1-what-is-a-tool-in-deepagent-2]()1. What is a tool in DeepAgent?
In DeepAgent, tools are the same basic primitive as LangChain tools:


Definition: A tool is a callable (usually implementing BaseTool or created with @tool) with:
a name (what the model calls),
a description (for tool selection),
an input schema and an execute method.
Role: It performs one concrete action when the model calls it. It does not orchestrate the agent loop itself.

Examples from DeepAgents’ built-ins include tools like ls, read_file, write_file, edit_file, glob, grep, execute, and a task tool for delegating to sub‑agents.

So a tool is very close to your “normal function” analogy: “When the LLM calls read_file(path=…), run this function and return the result.”.

[#p-5312-h-2-what-is-middleware-3]()2. What is middleware?
Middleware is a higher‑level, composable plugin that sits around the agent loop. It can:



Provide tools


A middleware can expose a list of tools that get registered on the agent.

Example: FilesystemMiddleware contributes ls, read_file, write_file, edit_file, glob, grep, execute





Extend and manage state


Middleware can define a state_schema that extends the agent’s base state (beyond just messages).
This is exactly how the core LangChain AgentState / AgentMiddleware abstractions work: the state is a typed TypedDict with channels like messages, jump_to, structured_response, and middleware can add its own fields



Hook into the agent lifecycle



By subclassing AgentMiddleware, a middleware can override hooks such as (see the LangChain middleware types for the canonical list and semantics):


before_agent / after_agent: run logic at the beginning/end of an agent run.
before_model / after_model: modify prompts, tools, or state around model calls.
wrap_model_call: intercept the model call; you get a ModelRequest and a handler. You can:

modify the request (system message, tools, model),
call the handler multiple times (retries/fallbacks),
or short‑circuit and not call it at all.


wrap_tool_call: intercept each tool execution; you receive a ToolCallRequest plus a handler to actually execute the tool, and can implement retries, safety checks, logging, or even replace the result.

So your mental model:


“middleware is an abstraction over tools that provides deterministic functionality and an API for the agent to call”


…is partially correct, but incomplete. Middleware does often bundle a small API surface (its tools), but its real power is that it can shape the entire agent loop - prompts, model parameters, state, and tool behavior - not just expose methods.


Does it add up for you?

---

## Post #3 by @hbkmadness
*Posted on 2026-01-08 11:49:31*

Hey [/u/pawel-twardziak](@pawel-twardziak) ,

Thank you for your answer. Yes that’s now fully understood.

I missed the part where it can hook into the different stages of the actual agent (and generally what is the interface on an middleware as general) and I guess that is a context that you get if you have read the other documents about middlewares.

Now when you described it, I remember I saw something like this before but I thought it was meant as a different thing.

Than you again!

---

## Post #4 by @pawel-twardziak
*Posted on 2026-01-08 12:06:37*

your welcome [/u/hbkmadness](@hbkmadness) 

If it answers your question, huge favor, mark this post as `solved`, so others can make use of it  thank!

---

## Post #5 by @system
*Posted on 2026-01-13 07:38:27*

This topic was automatically closed 12 hours after the last reply. New replies are no longer allowed.

---
