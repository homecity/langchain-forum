# LangSmith Tracing Issue with Function Calls from LangGraph Nodes

**Topic ID:** 1531
**Created:** 2025-09-15 04:20:19
**URL:** https://forum.langchain.com/t/1531

**Tags:** python-help

---

## Post #1 by @otteru
*Posted on 2025-09-15 04:20:20*

Issue Description

I’m experiencing a tracing issue with LangSmith when using LangGraph nodes that call external functions containing LLM invocations.

[#p-2600-current-setup-1]()Current Setup
My current architecture consists of:


**LangGraph Node** (`parallel_cefr_processing_node.py`) - wrapped with `LLMObs.workflow`
**External Function** (`generate_level_specific_text_node.py`) - contains the actual LLM chain invocation
**Parallel Execution** - using `ThreadPoolExecutor` to call the external function

[#p-2600-code-structure-2]()Code Structure

```
`# parallel_cefr_processing_node.py
def create_all_cefr_versions_parallel(state: BookState) -> BookState:
    with LLMObs.workflow(name="create_all_cefr_versions_parallel") as span:
        # ... setup code ...
        
        with concurrent.futures.ThreadPoolExecutor(max_workers=len(levels_to_run)) as executor:
            future_to_level = {
                executor.submit(generate_text_for_level, level, use_rag, current_chunk_text, context, state): level 
                for level in levels_to_run
            }
            # ... process results ...

# generate_level_specific_text_node.py  
def generate_text_for_level(level: str, use_rag: bool, current_chunk: str, context: dict, state) -> tuple:
    # This function contains the actual LLM chain invocation
    chain = prompt | bedrock_llm
    response = chain.invoke({"text": current_chunk, **context})
    # ... process response ...
`
```

[#p-2600-problem-3]()Problem
**LangSmith Behavior:**


Usage metrics appear in the `parallel_cefr_processing_node` trace
However, these metrics are **NOT included** in the overall LangGraph totals
The LLM invocations from the external function seem to be “orphaned” from the main workflow trace

**DataDog Comparison:**


DataDog automatically traces any `invoke()` call regardless of where it occurs
Shows these invocations as part of the LangGraph workflow seamlessly
No issues with cross-function tracing

[#p-2600-questions-4]()Questions


**Is this a known limitation?** Does LangSmith currently not support tracing LLM invocations that occur in functions called from LangGraph nodes?



**Best Practice Clarification:** Does the LangGraph community recommend always performing LLM `invoke()` calls directly within the node functions rather than in external helper functions?



**Workaround Solutions:** Are there recommended patterns for maintaining proper trace continuity when using helper functions with LLM invocations?



**Future Support:** Is this functionality planned for future LangSmith releases, or should I restructure my code to keep all LLM calls within the node boundaries?



[#p-2600-environment-5]()Environment

LangChain/LangGraph: Latest version
LangSmith: Latest version
LLM Provider: AWS Bedrock
Execution: Multi-threaded with ThreadPoolExecutor

Any insights or recommendations would be greatly appreciated!

---
