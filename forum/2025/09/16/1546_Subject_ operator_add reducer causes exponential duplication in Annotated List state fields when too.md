# Subject: operator.add reducer causes exponential duplication in Annotated List state fields when tools update state

**Topic ID:** 1546
**Created:** 2025-09-16 11:46:32
**URL:** https://forum.langchain.com/t/1546

---

## Post #1 by @Trapti
*Posted on 2025-09-16 11:46:33*

[#p-2628-issue-description-1]()**Issue Description:**
[#p-2628-problem-2]()**Problem:**
When using Annotated[List[Dict], operator.add] for state fields that are updated by tools via Command(update=…), the state accumulates exponentially instead of properly merging list items. Each tool update appears to wrap the previous state in a new array, causing nested concatenation rather than flat list merging.

[#p-2628-reproduction-steps-3]()**Reproduction Steps:**


Define a state field: current_context_source: Annotated[List[Dict[str, str]], operator.add]



Create tools that update this field: Command(update={“current_context_source”: [{“id”: “A”, “value”: [“source1”]}]})



Run multiple queries through the graph



Observe exponential growth: [A] → [[A], B] → [[[A], B], C]



[#p-2628-expected-behavior-4]()**Expected Behavior:**
**python**

***# Query 1: [{“id”: “A”, “value”: [“source1”]}]***

***# Query 2: [{“id”: “A”, “value”: [“source1”]}, {“id”: “B”, “value”: [“source2”]}]***

***# Query 3: [{“id”: “A”, “value”: [“source1”]}, {“id”: “B”, “value”: [“source2”]}, {“id”: “C”, “value”: [“source3”]}]***

[#p-2628-actual-behavior-5]()**Actual Behavior:**
**python**

***# Query 1: [{“id”: “A”, “value”: [“source1”]}]***

***# Query 2: [{“id”: “A”, “value”: [“source1”]}, {“id”: “A”, “value”: [“source1”]}, {“id”: “B”, “value”: [“source2”]}]***

***# Query 3: [{“id”: “A”, “value”: [“source1”]}, {“id”: “A”, “value”: [“source1”]}, {“id”: “B”, “value”: [“source2”]}, {“id”: “A”, “value”: [“source1”]}, {“id”: “A”, “value”: [“source1”]}, {“id”: “B”, “value”: [“source2”]}, {“id”: “C”, “value”: [“source3”]}]***

[#p-2628-code-example-6]()**Code Example:**
**python**

**class MyState(AgentState):**


```
`**current_context_source: Annotated\[List\[Dict\[str, str\]\], operator.add\] = Field(*default_factory*=list)**
`
```

**@tool(“my_tool”)**

**async def my_tool(*query_id*: str):**


```
`***return***** Command(*update*={**

    **"current_context_source": \[{"id": query_id, "value": \["source"\]}\]**

**})**
`
```

[#p-2628-attempted-solutions-all-failed-7]()**Attempted Solutions (All Failed):**
[#p-2628-h-1-custom-lambda-reducer-8]()**1. Custom Lambda Reducer:**
**python**

**current_context_source: Annotated[List[Dict], lambda *x*, *y*: (x or []) + (y or [])]**

**Result:** Same behavior as operator.add - still creates nested arrays

[#p-2628-h-2-messages-style-manual-concatenation-9]()**2. Messages-Style Manual Concatenation:**
**python**

***# In tools***

**existing_sources = state.get(“current_context_source”, [])**

**“current_context_source”: existing_sources + [{“id”: query_id, “value”: sources}]**

**Result:** Failed because tools don’t have access to state parameter

[#p-2628-h-3-different-reducer-functions-10]()**3. Different Reducer Functions:**


operator.setitem - Overwrites instead of merging



operator.add - Same nested behavior



Custom functions - All produce same nested concatenation



[#p-2628-h-4-state-structure-changes-11]()**4. State Structure Changes:**


Tried different Annotated syntax



Attempted to flatten in custom reducers



Modified update patterns



**All approaches failed because the issue appears to be in LangGraph’s internal handling of Command(update=…) with operator.add reducers.**

[#p-2628-root-cause-analysis-12]()**Root Cause Analysis:**
The issue seems to be that LangGraph internally wraps tool updates in arrays before applying the operator.add reducer, causing:

python

*# What we send: [{“id”: “A”, “value”: [“source1”]}]*

*# What LangGraph does internally: existing + [new_array]*

*# Instead of: existing + new_items*

[#p-2628-workaround-13]()**Workaround:**
Currently using response-level deduplication:

python

*# Deduplicate at response creation time*

unique_sources = 

seen_ids = set()

*for* source *in* raw_sources:


```
`*if* source\["id"\] not in seen_ids:

    unique_sources.append(source)

    seen_ids.add(source\["id"\])
`
```

[#p-2628-request-14]()**Request:**
Please investigate the operator.add reducer behavior with tool updates and provide a proper solution for flat list merging in state management. Also explain why this does not happen with the in built messafes state in AgentState ?

---

## Post #2 by @wfh
*Posted on 2025-09-16 11:49:21*

operator.add is just the python stdlib “+” sign. If you want deduplication then the function should be something different than naive +.

You can check out the add_messages reducer as an example.

---

## Post #3 by @Trapti
*Posted on 2025-09-16 12:29:16*

thank you for the reminder ! I wrote the custom reducer and fixed the issue.

---
