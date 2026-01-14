---
title: "Query traces (SDK)"
url: "https://docs.langchain.com/langsmith/export-traces"
section: "langsmith"
last_modified: "2026-01-08T16:42:32.245Z"
---
**Recommended Reading**Before diving into this content, it might be helpful to read the following:

-   [Run (span) data format](/langsmith/run-data-format)

-   [LangSmith trace query syntax](/langsmith/trace-query-syntax)

**If you are looking to export a large volume of traces, we recommend that you use the [Bulk Data Export](./data-export) functionality, as it will better handle large data volumes and will support automatic retries and parallelization across partitions.**

The recommended way to query runs (the span data in LangSmith traces) is to use the `list_runs` method in the SDK or `/runs/query` endpoint in the API. LangSmith stores traces in a simple format that is specified in the [Run (span) data format](/langsmith/run-data-format).

## 

[​

](#use-filter-arguments)

Use filter arguments

For simple queries, you don’t have to rely on our query syntax. You can use the filter arguments specified in the [filter arguments reference](/langsmith/trace-query-syntax#filter-arguments).

**Prerequisites**Initialize the client before running the below code snippets.

Python

TypeScript

Copy

```
from langsmith import Client

client = Client()
```

Below are some examples of ways to list runs using keyword arguments:

### 

[​

](#list-all-runs-in-a-project)

List all runs in a project

Python

TypeScript

Copy

```
project_runs = client.list_runs(project_name="<your_project>")
```

### 

[​

](#list-llm-and-chat-runs-in-the-last-24-hours)

List LLM and chat runs in the last 24 hours

Python

TypeScript

Copy

```
todays_llm_runs = client.list_runs(
    project_name="<your_project>",
    start_time=datetime.now() - timedelta(days=1),
    run_type="llm",
)
```

### 

[​

](#list-root-runs-in-a-project)

List root runs in a project

Root runs are runs that have no parents. These are assigned a value of `True` for `is_root`. You can use this to filter for root runs.

Python

TypeScript

Copy

```
root_runs = client.list_runs(
    project_name="<your_project>",
    is_root=True
)
```

### 

[​

](#list-runs-without-errors)

List runs without errors

Python

TypeScript

Copy

```
correct_runs = client.list_runs(project_name="<your_project>", error=False)
```

### 

[​

](#list-runs-by-run-id)

List runs by run ID

**Ignores Other Arguments**If you provide a list of run IDs in the way described above, it will ignore all other filtering arguments like `project_name`, `run_type`, etc. and directly return the runs matching the given IDs.

If you have a list of run IDs, you can list them directly:

Python

TypeScript

Copy

```
run_ids = ['a36092d2-4ad5-4fb4-9c0d-0dba9a2ed836','9398e6be-964f-4aa4-8ae9-ad78cd4b7074']
selected_runs = client.list_runs(id=run_ids)
```

### 

[​

](#fetch-a-single-run-by-id)

Fetch a single run by ID

To fetch a single run (trace) by its ID, use the `read_run` method. This is useful when you have a specific trace ID (for example, from a LangSmith share link like `https://smith.langchain.com/public/<trace-id>/r`) and want to retrieve its full data.

Python

TypeScript

Copy

```
run_id = "a36092d2-4ad5-4fb4-9c0d-0dba9a2ed836"
run = client.read_run(run_id)

# Access run data
print(run.inputs)
print(run.outputs)
print(run.name)
```

**Replay traces locally with LangGraph**If you’re using LangGraph with checkpointing, you can fetch a trace from LangSmith and replay it locally for debugging. See [LangGraph’s time travel and replay documentation](/oss/python/langgraph/use-time-travel) for details on resuming execution from checkpoints.

## 

[​

](#use-filter-query-language)

Use filter query language

For more complex queries, you can use the query language described in the [filter query language reference](/langsmith/trace-query-syntax#filter-query-language).

### 

[​

](#list-all-root-runs-in-a-conversational-thread)

List all root runs in a conversational thread

This is the way to fetch runs in a conversational thread. For more information on setting up threads, refer to our [how-to guide on setting up threads](./threads). Threads are grouped by setting a shared thread ID. The LangSmith UI lets you use any one of the following three metadata keys: `session_id`, `conversation_id`, or `thread_id`. The session ID is also known as the tracing project ID. The following query matches on any of them.

Python

TypeScript

Copy

```
group_key = "<your_thread_id>"
filter_string = f'and(in(metadata_key, ["session_id","conversation_id","thread_id"]), eq(metadata_value, "{group_key}"))'
thread_runs = client.list_runs(
    project_name="<your_project>",
    filter=filter_string,
    is_root=True
)
```

### 

[​

](#list-all-runs-called-“extractor”-whose-root-of-the-trace-was-assigned-feedback-“user_score”-score-of-1)

List all runs called “extractor” whose root of the trace was assigned feedback “user\_score” score of 1

Python

TypeScript

Copy

```
client.list_runs(
    project_name="<your_project>",
    filter='eq(name, "extractor")',
    trace_filter='and(eq(feedback_key, "user_score"), eq(feedback_score, 1))'
)
```

### 

[​

](#list-runs-with-“star_rating”-key-whose-score-is-greater-than-4)

List runs with “star\_rating” key whose score is greater than 4

Python

TypeScript

Copy

```
client.list_runs(
    project_name="<your_project>",
    filter='and(eq(feedback_key, "star_rating"), gt(feedback_score, 4))'
)
```

### 

[​

](#list-runs-that-took-longer-than-5-seconds-to-complete)

List runs that took longer than 5 seconds to complete

Python

TypeScript

Copy

```
client.list_runs(project_name="<your_project>", filter='gt(latency, "5s")')
```

### 

[​

](#list-all-runs-that-have-“error”-not-equal-to-null)

List all runs that have “error” not equal to null

Python

TypeScript

Copy

```
client.list_runs(project_name="<your_project>", filter='neq(error, null)')
```

### 

[​

](#list-all-runs-where-start_time-is-greater-than-a-specific-timestamp)

List all runs where start\_time is greater than a specific timestamp

Python

TypeScript

Copy

```
client.list_runs(project_name="<your_project>", filter='gt(start_time, "2023-07-15T12:34:56Z")')
```

### 

[​

](#list-all-runs-that-contain-the-string-“substring”)

List all runs that contain the string “substring”

Python

TypeScript

Copy

```
client.list_runs(project_name="<your_project>", filter='search("substring")')
```

### 

[​

](#list-all-runs-that-are-tagged-with-the-git-hash-“2aa1cf4”)

List all runs that are tagged with the git hash “2aa1cf4”

Python

TypeScript

Copy

```
client.list_runs(project_name="<your_project>", filter='has(tags, "2aa1cf4")')
```

### 

[​

](#list-all-runs-that-started-after-a-specific-timestamp-and-either-have-“error”-not-equal-to-null-or-a-“correctness”-feedback-score-equal-to-0)

List all runs that started after a specific timestamp and either have “error” not equal to null or a “Correctness” feedback score equal to 0

Python

TypeScript

Copy

```
client.list_runs(
  project_name="<your_project>",
  filter='and(gt(start_time, "2023-07-15T12:34:56Z"), or(neq(error, null), and(eq(feedback_key, "Correctness"), eq(feedback_score, 0.0))))'
)
```

### 

[​

](#complex-query:-list-all-runs-where-tags-include-“experimental”-or-“beta”-and-latency-is-greater-than-2-seconds)

Complex query: List all runs where tags include “experimental” or “beta” and latency is greater than 2 seconds

Python

TypeScript

Copy

```
client.list_runs(
  project_name="<your_project>",
  filter='and(or(has(tags, "experimental"), has(tags, "beta")), gt(latency, 2))'
)
```

### 

[​

](#search-trace-trees-by-full-text)

Search trace trees by full text

You can use the `search()` function without any specific field to do a full text search across all string fields in a run. This allows you to quickly find traces that match a search term.

Python

TypeScript

Copy

```
client.list_runs(
  project_name="<your_project>",
  filter='search("image classification")'
)
```

### 

[​

](#check-for-presence-of-metadata)

Check for presence of metadata

If you want to check for the presence of metadata, you can use the `eq` operator, optionally with an `and` statement to match by value. This is useful if you want to log more structured information about your runs.

Python

TypeScript

Copy

```
to_search = {
    "user_id": ""
}

# Check for any run with the "user_id" metadata key
client.list_runs(
  project_name="default",
  filter="eq(metadata_key, 'user_id')"
)
# Check for runs with user_id=4070f233-f61e-44eb-bff1-da3c163895a3
client.list_runs(
  project_name="default",
  filter="and(eq(metadata_key, 'user_id'), eq(metadata_value, '4070f233-f61e-44eb-bff1-da3c163895a3'))"
)
```

### 

[​

](#check-for-environment-details-in-metadata)

Check for environment details in metadata

A common pattern is to add environment information to your traces via metadata. If you want to filter for runs containing environment metadata, you can use the same pattern as above:

Python

TypeScript

Copy

```
client.list_runs(
  project_name="default",
  filter="and(eq(metadata_key, 'environment'), eq(metadata_value, 'production'))"
)
```

### 

[​

](#check-for-conversation-id-in-metadata)

Check for conversation ID in metadata

Another common way to associate traces in the same conversation is by using a shared conversation ID. If you want to filter runs based on a conversation ID in this way, you can search for that ID in the metadata.

Python

TypeScript

Copy

```
client.list_runs(
  project_name="default",
  filter="and(eq(metadata_key, 'conversation_id'), eq(metadata_value, 'a1b2c3d4-e5f6-7890'))"
)
```

### 

[​

](#negative-filtering-on-key-value-pairs)

Negative filtering on key-value pairs

You can use negative filtering on metadata, input, and output key-value pairs to exclude specific runs from your results. Here are some examples for metadata key-value pairs but the same logic applies to input and output key-value pairs.

Python

TypeScript

Copy

```
# Find all runs where the metadata does not contain a "conversation_id" key
client.list_runs(
  project_name="default",
  filter="and(neq(metadata_key, 'conversation_id'))"
)

# Find all runs where the conversation_id in metadata is not "a1b2c3d4-e5f6-7890"
client.list_runs(
  project_name="default",
  filter="and(eq(metadata_key, 'conversation_id'), neq(metadata_value, 'a1b2c3d4-e5f6-7890'))"
)

# Find all runs where there is no "conversation_id" metadata key and the "a1b2c3d4-e5f6-7890" value is not present
client.list_runs(
  project_name="default",
  filter="and(neq(metadata_key, 'conversation_id'), neq(metadata_value, 'a1b2c3d4-e5f6-7890'))"
)

# Find all runs where the conversation_id metadata key is not present but the "a1b2c3d4-e5f6-7890" value is present
client.list_runs(
  project_name="default",
  filter="and(neq(metadata_key, 'conversation_id'), eq(metadata_value, 'a1b2c3d4-e5f6-7890'))"
)
```

### 

[​

](#combine-multiple-filters)

Combine multiple filters

If you want to combine multiple conditions to refine your search, you can use the `and` operator along with other filtering functions. Here’s how you can search for runs named “ChatOpenAI” that also have a specific `conversation_id` in their metadata:

Python

TypeScript

Copy

```
client.list_runs(
  project_name="default",
  filter="and(eq(name, 'ChatOpenAI'), eq(metadata_key, 'conversation_id'), eq(metadata_value, '69b12c91-b1e2-46ce-91de-794c077e8151'))"
)
```

### 

[​

](#tree-filter)

Tree filter

List all runs named “RetrieveDocs” whose root run has a “user\_score” feedback of 1 and any run in the full trace is named “ExpandQuery”. This type of query is useful if you want to extract a specific run conditional on various states or steps being reached within the trace.

Python

TypeScript

Copy

```
client.list_runs(
    project_name="<your_project>",
    filter='eq(name, "RetrieveDocs")',
    trace_filter='and(eq(feedback_key, "user_score"), eq(feedback_score, 1))',
    tree_filter='eq(name, "ExpandQuery")'
)
```

### 

[​

](#advanced:-export-flattened-trace-view-with-child-tool-usage)

Advanced: export flattened trace view with child tool usage

The following Python example demonstrates how to export a flattened view of traces, including information on the tools (from nested runs) used by the agent within each trace. This can be used to analyze the behavior of your agents across multiple traces. This example queries all tool runs within a specified number of days and groups them by their parent (root) run ID. It then fetches the relevant information for each root run, such as the run name, inputs, outputs, and combines that information with the child run information. To optimize the query, the example:

1.  Selects only the necessary fields when querying tool runs to reduce query time.
2.  Fetches root runs in batches while processing tool runs concurrently.

Python

Copy

```
from collections import defaultdict
from concurrent.futures import Future, ThreadPoolExecutor
from datetime import datetime, timedelta

from langsmith import Client
from tqdm.auto import tqdm

client = Client()
project_name = "my-project"
num_days = 30

# List all tool runs
tool_runs = client.list_runs(
    project_name=project_name,
    start_time=datetime.now() - timedelta(days=num_days),
    run_type="tool",
    # We don't need to fetch inputs, outputs, and other values that # may increase the query time
    select=["trace_id", "name", "run_type"],
)

data = []
futures: list[Future] = []
trace_cursor = 0
trace_batch_size = 50

tool_runs_by_parent = defaultdict(lambda: defaultdict(set))
# Do not exceed rate limit
with ThreadPoolExecutor(max_workers=2) as executor:
    # Group tool runs by parent run ID
    for run in tqdm(tool_runs):
        # Collect all tools invoked within a given trace
        tool_runs_by_parent[run.trace_id]["tools_involved"].add(run.name)
        # maybe send a batch of parent run IDs to the server
        # this lets us query for the root runs in batches
        # while still processing the tool runs
        if len(tool_runs_by_parent) % trace_batch_size == 0:
            if this_batch := list(tool_runs_by_parent.keys())[
                trace_cursor : trace_cursor + trace_batch_size
            ]:
                trace_cursor += trace_batch_size
                futures.append(
                    executor.submit(
                        client.list_runs,
                        project_name=project_name,
                        run_ids=this_batch,
                        select=["name", "inputs", "outputs", "run_type"],
                    )
                )
    if this_batch := list(tool_runs_by_parent.keys())[trace_cursor:]:
        futures.append(
            executor.submit(
                client.list_runs,
                project_name=project_name,
                run_ids=this_batch,
                select=["name", "inputs", "outputs", "run_type"],
            )
        )

for future in tqdm(futures):
    root_runs = future.result()
    for root_run in root_runs:
        root_data = tool_runs_by_parent[root_run.id]
        data.append(
            {
                "run_id": root_run.id,
                "run_name": root_run.name,
                "run_type": root_run.run_type,
                "inputs": root_run.inputs,
                "outputs": root_run.outputs,
                "tools_involved": list(root_data["tools_involved"]),
            }
        )

# (Optional): Convert to a pandas DataFrame
import pandas as pd

df = pd.DataFrame(data)
df.head()
```

### 

[​

](#advanced:-export-retriever-io-for-traces-with-feedback)

Advanced: export retriever IO for traces with feedback

This query is useful if you want to fine-tune embeddings or diagnose end-to-end system performance issues based on retriever behavior. The following Python example demonstrates how to export retriever inputs and outputs within traces that have a specific feedback score.

Python

Copy

```
from collections import defaultdict
from concurrent.futures import Future, ThreadPoolExecutor
from datetime import datetime, timedelta

import pandas as pd
from langsmith import Client
from tqdm.auto import tqdm

client = Client()
project_name = "your-project-name"
num_days = 1

# List all tool runs
retriever_runs = client.list_runs(
    project_name=project_name,
    start_time=datetime.now() - timedelta(days=num_days),
    run_type="retriever",
    # This time we do want to fetch the inputs and outputs, since they
    # may be adjusted by query expansion steps.
    select=["trace_id", "name", "run_type", "inputs", "outputs"],
    trace_filter='eq(feedback_key, "user_score")',
)

data = []
futures: list[Future] = []
trace_cursor = 0
trace_batch_size = 50

retriever_runs_by_parent = defaultdict(lambda: defaultdict(list))
# Do not exceed rate limit
with ThreadPoolExecutor(max_workers=2) as executor:
    # Group retriever runs by parent run ID
    for run in tqdm(retriever_runs):
        # Collect all retriever calls invoked within a given trace
        for k, v in run.inputs.items():
            retriever_runs_by_parent[run.trace_id][f"retriever.inputs.{k}"].append(v)
        for k, v in (run.outputs or {}).items():
            # Extend the docs
            retriever_runs_by_parent[run.trace_id][f"retriever.outputs.{k}"].extend(v)
        # maybe send a batch of parent run IDs to the server
        # this lets us query for the root runs in batches
        # while still processing the retriever runs
        if len(retriever_runs_by_parent) % trace_batch_size == 0:
            if this_batch := list(retriever_runs_by_parent.keys())[
                trace_cursor : trace_cursor + trace_batch_size
            ]:
                trace_cursor += trace_batch_size
                futures.append(
                    executor.submit(
                        client.list_runs,
                        project_name=project_name,
                        run_ids=this_batch,
                        select=[
                            "name",
                            "inputs",
                            "outputs",
                            "run_type",
                            "feedback_stats",
                        ],
                    )
                )
    if this_batch := list(retriever_runs_by_parent.keys())[trace_cursor:]:
        futures.append(
            executor.submit(
                client.list_runs,
                project_name=project_name,
                run_ids=this_batch,
                select=["name", "inputs", "outputs", "run_type"],
            )
        )

for future in tqdm(futures):
    root_runs = future.result()
    for root_run in root_runs:
        root_data = retriever_runs_by_parent[root_run.id]
        feedback = {
            f"feedback.{k}": v.get("avg")
            for k, v in (root_run.feedback_stats or {}).items()
        }
        inputs = {f"inputs.{k}": v for k, v in root_run.inputs.items()}
        outputs = {f"outputs.{k}": v for k, v in (root_run.outputs or {}).items()}
        data.append(
            {
                "run_id": root_run.id,
                "run_name": root_run.name,
                **inputs,
                **outputs,
                **feedback,
                **root_data,
            }
        )

# (Optional): Convert to a pandas DataFrame
import pandas as pd
df = pd.DataFrame(data)
df.head()
```

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/export-traces.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.