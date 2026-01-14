# Create_agent + ToolStrategy: Tools + Structured Output Not Working Across Models (LangChain 1.0.2)

**Topic ID:** 2293
**Created:** 2025-11-21 14:20:22
**URL:** https://forum.langchain.com/t/2293

---

## Post #1 by @prathamagarwal07
*Posted on 2025-11-21 14:20:22*

Hi everyone — I’m running into a major limitation with `create_agent` in LangChain **1.0.2**, specifically when using **tools + structured output together**.

I’ve tested both `ToolStrategy` and `ProviderStrategy`, and each has problems in different ways.


[#p-4364-issue-summary-1]()**Issue Summary**
[#p-4364-h-1-toolstrategy-tools-structured-output-conflict-2]()**1. ToolStrategy — Tools + Structured Output Conflict**
When using **ToolStrategy** with real tools and structured output:



Agent hits recursion limit (30 iterations)



Real tool calls don’t execute properly



The artificial structured-output tool conflicts with actual tools



The agent keeps retrying instead of returning valid structured output



This makes ToolStrategy unusable when both tools + structured output are required.


[#p-4364-h-2-providerstrategy-only-works-with-very-few-models-3]()**2. ProviderStrategy — Only Works With Very Few Models**
Switching to **ProviderStrategy** fixes the conflict, but introduces a new issue:

**Works:**


`openai/gpt-4o-mini` (via OpenRouter)

**Fails (recursion loops, parsing errors):**



`google/gemini-2.5-pro`



`openai/gpt-5`



Several other OpenRouter models



This means ProviderStrategy only works with a very limited subset of models, even when the models *claim* to support structured output.


[#p-4364-what-i-expect-4]()**What I Expect**
Ideally, I want an agent that can:



Use real tools (tool calling)



Return structured output at the end



Work across multiple models that support tool calling + structured output



Avoid recursion-limit failures from parsing mismatch




[#p-4364-environment-5]()**Environment**


**LangChain:** 1.0.2



**LangGraph:** 0.2.62



**Provider:** OpenRouter



**Models tested:** GPT-4o-mini (works), Gemini 2.5 Pro (fails), GPT-5 (fails)




[#p-4364-questions-6]()**Questions**


**Is there a recommended/official pattern for using tools + structured output together that works across different models—not just GPT-4o-mini?**



**Why does ProviderStrategy fail with models like Gemini 2.5 Pro that *claim* to support structured output?

Are there known incompatibilities?**



**Is there any fallback approach recommended, such as:**



Doing tool calling first, then applying `with_structured_output()` after?



Prompt-based JSON mode instead of `response_format`?



Splitting tool calling + structured output into separate agent steps?





**Is this limitation expected in LangChain 1.0.2, or should ToolStrategy and ProviderStrategy work together more reliably?**

---

## Post #2 by @Milan
*Posted on 2025-11-26 13:48:09*

When using openrouter I found that using `ToolStrategy(YourPydanticModel.model_json_schema())` fixes most recursion loops.

The response sometimes needs to be parsed using (nested) `json.loads()`, but it’s valid json pretty much 99% of the time.

Since openrouter uses OpenAI format, the ProviderStrategy doesn’t work correctly when using other model providers through openrouter.

---

## Post #3 by @jrocco2
*Posted on 2025-11-27 01:30:36*

Same issue for me!

---

## Post #4 by @ZYJ-3721
*Posted on 2026-01-05 01:48:15*

Currently, there is a conflict between the structured output of create_agent and the tool call. Can it be optimized in this direction: 1. Place the restrictions on the structured output at the last output. 2. Set structured output for the tool. Within the agent, the llm can call different tools and use different structured outputs as the input for the tool functions. A bit of insight, I wonder if it’s feasible.

---
