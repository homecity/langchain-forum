---
title: "Cost tracking"
url: "https://docs.langchain.com/langsmith/cost-tracking"
section: "langsmith"
last_modified: "2025-12-16T22:07:24.074Z"
---
Building agents at scale introduces non-trivial, usage-based costs that can be difficult to track. LangSmith automatically records LLM token usage and costs for major providers, and also allows you to submit custom cost data for any additional components. This gives you a single, unified view of costs across your entire application, which makes it easy to monitor, understand, and debug your spend. This guide covers:

-   [Viewing costs in the LangSmith UI](#viewing-costs-in-the-langsmith-ui)
-   [How cost tracking works](#cost-tracking)
-   [How to send custom cost data](#send-custom-cost-data)

## 

[​

](#viewing-costs-in-the-langsmith-ui)

Viewing costs in the LangSmith UI

In the [LangSmith UI](https://smith.langchain.com), you can explore usage and spend in three main ways: first by understanding how tokens and costs are broken down, then by viewing those details within individual traces, and finally by inspecting aggregated metrics in project stats and dashboards.

### 

[​

](#token-and-cost-breakdowns)

Token and cost breakdowns

Token usage and costs are broken down into three categories:

-   **Input**: Tokens in the prompt sent to the model. Subtypes include: cache reads, text tokens, image tokens, etc
-   **Output**: Tokens generated in the response from the model. Subtypes include: reasoning tokens, text tokens, image tokens, etc
-   **Other**: Costs from tool calls, retrieval steps or any custom runs.

You can view detailed breakdowns by hovering over cost sections in the UI. When available, each section is further categorized by subtype. ![Cost tooltip](https://mintcdn.com/langchain-5e9cc07a/S029Harmw-iSrSVw/langsmith/images/cost-tooltip-light.png?fit=max&auto=format&n=S029Harmw-iSrSVw&q=85&s=49971715854df465e81e53ad6b7b297c) ![Cost tooltip](https://mintcdn.com/langchain-5e9cc07a/S029Harmw-iSrSVw/langsmith/images/cost-tooltip-dark.png?fit=max&auto=format&n=S029Harmw-iSrSVw&q=85&s=a51c9bc7bbd1836231b80d7d5a8db735) You can inspect these breakdowns throughout the LangSmith UI, described in the following section.

### 

[​

](#where-to-view-token-and-cost-breakdowns)

Where to view token and cost breakdowns

In the trace tree

The trace tree shows the most detailed view of token usage and cost (for a single trace). It displays the total usage for the entire trace, aggregated values for each parent run and token and cost breakdowns for each child run.Open any run inside a tracing project to view its trace tree.![Cost tooltip](https://mintcdn.com/langchain-5e9cc07a/GpRpLUps9-PFSAXx/langsmith/images/trace-tree-costs-light.png?fit=max&auto=format&n=GpRpLUps9-PFSAXx&q=85&s=a25bf30084d96292ba00ca84c07653d6)![Cost tooltip](https://mintcdn.com/langchain-5e9cc07a/GpRpLUps9-PFSAXx/langsmith/images/trace-tree-costs-dark.png?fit=max&auto=format&n=GpRpLUps9-PFSAXx&q=85&s=e2037cd8309e754f8753278d334c8344)

In project stats

The project stats panel shows the total token usage and cost for all traces in a project.![Cost tracking chart](https://mintcdn.com/langchain-5e9cc07a/yIWcej3jR6iH0nDR/langsmith/images/stats-pane-cost-tracking-light.png?fit=max&auto=format&n=yIWcej3jR6iH0nDR&q=85&s=c9168cc335b0d9ccdde0ebe6ab1abd91)![Cost tracking chart](https://mintcdn.com/langchain-5e9cc07a/yIWcej3jR6iH0nDR/langsmith/images/stats-pane-cost-tracking-dark.png?fit=max&auto=format&n=yIWcej3jR6iH0nDR&q=85&s=e0be66ec244c134421af0475f83c3b1d)

In dashboards

Dashboards help you explore cost and token usage trends over time. The [prebuilt dashboard](/langsmith/dashboards#prebuilt-dashboards) for a tracing project shows total costs and a cost breakdown by input and output tokens.You may also configure custom cost tracking charts in [custom dashboards](https://docs.langchain.com/langsmith/dashboards#custom-dashboards).![Cost tracking chart](https://mintcdn.com/langchain-5e9cc07a/S029Harmw-iSrSVw/langsmith/images/cost-tracking-chart-light.png?fit=max&auto=format&n=S029Harmw-iSrSVw&q=85&s=18b74d9ee26db0fe17877b3dc3c2c120)![Cost tracking chart](https://mintcdn.com/langchain-5e9cc07a/S029Harmw-iSrSVw/langsmith/images/cost-tracking-chart-dark.png?fit=max&auto=format&n=S029Harmw-iSrSVw&q=85&s=134115cab7e741a5b7f6d784f9d51b76)

## 

[​

](#cost-tracking)

Cost tracking

You can track costs in two ways:

1.  Costs for LLM calls can be **automatically derived from token counts and model prices**
2.  Cost for LLM calls or any other run type can be **manually specified as part of the run data**

The approach you use will depend on on what you’re tracking and how your model pricing is structured:

Method

Run type: LLM

Run type: Other

**Automatically**

-   Calling LLMs with [LangChain](/oss/python/langchain/overview)
-   Tracing LLM calls to OpenAI, Anthropic or models that follow an OpenAI-compliant format with `@traceable`
-   Using LangSmith wrappers for [OpenAI](/langsmith/trace-openai) or [Anthropic](/langsmith/trace-anthropic)
-   For other model providers, read the [token and cost information guide](/langsmith/log-llm-trace#provide-token-and-cost-information)

Not applicable.

**Manually**

If LLM call costs are non-linear (eg. follow a custom cost function)

Send costs for any run types, e.g. tool calls, retrieval steps

### 

[​

](#llm-calls:-automatically-track-costs-based-on-token-counts)

LLM calls: Automatically track costs based on token counts

To compute cost automatically from token usage, you need to provide **token counts**, the **model and provider** and the **model price**.

Follow the instructions below if you’re using model providers whose responses don’t follow the same patterns as one of OpenAI or Anthropic.These steps are **only required** if you are _not_:

-   Calling LLMs with [LangChain](/oss/python/langchain/overview)
-   Using `@traceable` to trace LLM calls to OpenAI, Anthropic or models that follow an OpenAI-compliant format
-   Using LangSmith wrappers for [OpenAI](/langsmith/trace-openai) or [Anthropic](/langsmith/trace-anthropic).

**1\. Send token counts** Many models include token counts as part of the response. You must extract this information and include it in your run using one of the following methods:A. Set a \`usage\_metadata\` field on the run’s metadata

Set a `usage_metadata` field on the run’s metadata. The advantage of this approach is that you do not need to change your traced function’s runtime outputs

Python

TypeScript

Copy

```
from langsmith import traceable, get_current_run_tree

inputs = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "I'd like to book a table for two."},
]

@traceable(
    run_type="llm",
    metadata={"ls_provider": "my_provider", "ls_model_name": "my_model"}
)
def chat_model(messages: list):
    # Imagine this is the real model output format your application expects
    assistant_message = {
        "role": "assistant",
        "content": "Sure, what time would you like to book the table for?"
    }

    # Token usage you compute or receive from the provider
    token_usage = {
        "input_tokens": 27,
        "output_tokens": 13,
        "total_tokens": 40,
        "input_token_details": {"cache_read": 10}
    }

    # Attach token usage to the LangSmith run
    run = get_current_run_tree()
    run.set(usage_metadata=token_usage)

    return assistant_message

chat_model(inputs)
```
B. Return a \`usage\_metadata\` field in your traced function's outputs.

Include the `usage_metadata` key directly within the object returned by your traced function. LangSmith will extract it from the output.

Python

TypeScript

Copy

```
from langsmith import traceable

inputs = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "I'd like to book a table for two."},
]
output = {
    "choices": [
        {
            "message": {
                "role": "assistant",
                "content": "Sure, what time would you like to book the table for?"
            }
        }
    ],
    "usage_metadata": {
        "input_tokens": 27,
        "output_tokens": 13,
        "total_tokens": 40,
        "input_token_details": {"cache_read": 10}
    },
}

@traceable(
    run_type="llm",
    metadata={"ls_provider": "my_provider", "ls_model_name": "my_model"}
)
def chat_model(messages: list):
    return output

chat_model(inputs)
```
In either case, the usage metadata should contain a subset of the following LangSmith-recognized fields:Usage Metadata Schema and Cost Calculation

The following fields in the `usage_metadata` dict are recognized by LangSmith. You can view the full [Python types](https://github.com/langchain-ai/langsmith-sdk/blob/e705fbd362be69dd70229f94bc09651ef8056a61/python/langsmith/schemas.py#L1196-L1227) or [TypeScript interfaces](https://github.com/langchain-ai/langsmith-sdk/blob/e705fbd362be69dd70229f94bc09651ef8056a61/js/src/schemas.ts#L637-L689) directly.

[​

](#param-input-tokens)

input\_tokens

number

Number of tokens used in the model input. Sum of all input token types.

[​

](#param-output-tokens)

output\_tokens

number

Number of tokens used in the model response. Sum of all output token types.

[​

](#param-total-tokens)

total\_tokens

number

Number of tokens used in the input and output. Optional, can be inferred. Sum of input\_tokens + output\_tokens.

[​

](#param-input-token-details)

input\_token\_details

object

Breakdown of input token types. Keys are token-type strings, values are counts. Example `{"cache_read": 5}`.Known fields include: `audio`, `text`, `image`, `cache_read`, `cache_creation`. Additional fields are possible depending on the model or provider.

[​

](#param-output-token-details)

output\_token\_details

object

Breakdown of output token types. Keys are token-type strings, values are counts. Example `{"reasoning": 5}`.Known fields include: `audio`, `text`, `image`, `reasoning`. Additional fields are possible depending on the model or provider.

[​

](#param-input-cost)

input\_cost

number

Cost of the input tokens.

[​

](#param-output-cost)

output\_cost

number

Cost of the output tokens.

[​

](#param-total-cost)

total\_cost

number

Cost of the tokens. Optional, can be inferred. Sum of input\_cost + output\_cost.

[​

](#param-input-cost-details)

input\_cost\_details

object

Details of the input cost. Keys are token-type strings, values are cost amounts.

[​

](#param-output-cost-details)

output\_cost\_details

object

Details of the output cost. Keys are token-type strings, values are cost amounts.

**Cost Calculations**The cost for a run is computed greedily from most-to-least specific token type. Suppose you set a price of $2 per 1M input tokens with a detailed price of $1 per 1M `cache_read` input tokens, and $3 per 1M output tokens. If you uploaded the following usage metadata:

Copy

```
{
  "input_tokens": 20,
  "input_token_details": {"cache_read": 5},
  "output_tokens": 10,
  "total_tokens": 30,
}
```

Then, the token costs would be computed as follows:

Copy

```
# Notice that LangSmith computes the cache_read cost and then for any
# remaining input_tokens, the default input price is applied.
input_cost = 5 * 1e-6 + (20 - 5) * 2e-6  # 3.5e-5
output_cost = 10 * 3e-6  # 3e-5
total_cost = input_cost + output_cost  # 6.5e-5
```
**2\. Specify model name** When using a custom model, the following fields need to be specified in a [run’s metadata](/langsmith/add-metadata-tags) in order to associate token counts with costs. It’s also helpful to provide these metadata fields to identify the model when viewing traces and when filtering.

-   `ls_provider`: The provider of the model, e.g., “openai”, “anthropic”
-   `ls_model_name`: The name of the model, e.g., “gpt-4o-mini”, “claude-3-opus-20240229”

**3\. Set model prices** A model pricing map is used to map model names to their per-token prices to compute costs from token counts. LangSmith’s [model pricing table](https://smith.langchain.com/settings/workspaces/models) is used for this.

The table comes with pricing information for most OpenAI, Anthropic, and Gemini models. You can [add prices for other models](/langsmith/cost-tracking#create-a-new-model-price-entry), or [overwrite pricing for default models](/langsmith/cost-tracking#update-an-existing-model-price-entry) if you have custom pricing.

For models that have different pricing for different token types (e.g., multimodal or cached tokens), you can specify a breakdown of prices for each token type. Hovering over the `...` next to the input/output prices shows you the price breakdown by token type. ![Model price map](https://mintcdn.com/langchain-5e9cc07a/PYCacG42leg3Zt_8/langsmith/images/model-price-map-light.png?fit=max&auto=format&n=PYCacG42leg3Zt_8&q=85&s=ae82f1ff59cfc57923d63869cb0608c0) ![Model price map](https://mintcdn.com/langchain-5e9cc07a/PYCacG42leg3Zt_8/langsmith/images/model-price-map-dark.png?fit=max&auto=format&n=PYCacG42leg3Zt_8&q=85&s=739bb0123e9a238944452048578a4c49)

Updates to the model pricing map are not reflected in the costs for traces already logged. We do not currently support backfilling model pricing changes.

Create a new or modify an existing model price entry

To modify the default model prices, create a new entry with the same model, provider and match pattern as the default entry.To create a _new entry_ in the model pricing map, click on the `+ Model` button in the top right corner.![New price map entry interface](https://mintcdn.com/langchain-5e9cc07a/PYCacG42leg3Zt_8/langsmith/images/new-price-map-entry-light.png?fit=max&auto=format&n=PYCacG42leg3Zt_8&q=85&s=63dbd6e59b279a1f4ae692c892223af9)![New price map entry interface](https://mintcdn.com/langchain-5e9cc07a/4kN8yiLrZX_amfFn/langsmith/images/new-price-map-entry.png?fit=max&auto=format&n=4kN8yiLrZX_amfFn&q=85&s=2df87e349db00b8560f3d44824f2df13)Here, you can specify the following fields:

-   **Model Name**: The human-readable name of the model.
-   **Input Price**: The cost per 1M input tokens for the model. This number is multiplied by the number of tokens in the prompt to calculate the prompt cost.
-   **Input Price Breakdown** (Optional): The breakdown of price for each different type of input token, e.g. `cache_read`, `video`, `audio`
-   **Output Price**: The cost per 1M output tokens for the model. This number is multiplied by the number of tokens in the completion to calculate the completion cost.
-   **Output Price Breakdown** (Optional): The breakdown of price for each different type of output token, e.g. `reasoning`, `image`, etc.
-   **Model Activation Date** (Optional): The date from which the pricing is applicable. Only runs after this date will apply this model price.
-   **Match Pattern**: A regex pattern to match the model name. This is used to match the value for `ls_model_name` in the run metadata.
-   **Provider** (Optional): The provider of the model. If specified, this is matched against `ls_provider` in the run metadata.

Once you have set up the model pricing map, LangSmith will automatically calculate and aggregate the token-based costs for traces based on the token counts provided in the LLM invocations.

### 

[​

](#llm-calls:-sending-costs-directly)

LLM calls: Sending costs directly

If your model follows a non-linear pricing scheme, we recommend calculating costs client-side and sending them to LangSmith as `usage_metadata`.

Gemini 3 Pro Preview and Gemini 2.5 Pro follow a pricing scheme with a stepwise cost function. We support this pricing scheme for Gemini by default. For any other models with non-linear pricing, you will need to follow these instructions to calculate costs.

Python

TypeScript

Copy

```
from langsmith import traceable, get_current_run_tree

inputs = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "I'd like to book a table for two."},
]

@traceable(
    run_type="llm",
    metadata={"ls_provider": "my_provider", "ls_model_name": "my_model"}
)
def chat_model(messages: list):
    llm_output = {
        "choices": [
            {
                "message": {
                    "role": "assistant",
                    "content": "Sure, what time would you like to book the table for?"
                }
            }
        ],
        "usage_metadata": {
            # Specify cost (in dollars) for the inputs and outputs
            "input_cost": 1.1e-6,
            "input_cost_details": {"cache_read": 2.3e-7},
            "output_cost": 5.0e-6,
        },
    }
    run = get_current_run_tree()
    run.set(usage_metadata=llm_output["usage_metadata"])
    return llm_output["choices"][0]["message"]

chat_model(inputs)
```

### 

[​

](#other-runs:-sending-costs)

Other runs: Sending costs

You can also send cost information for any non-LLM runs, such as tool calls.The cost must be specified in the `total_cost` field under the runs `usage_metadata`.A. Set a \`total\_cost\` field on the run’s usage\_metadata

Set a `total_cost` field on the run’s `usage_metadata`. The advantage of this approach is that you do not need to change your traced function’s runtime outputs

Python

TypeScript

Copy

```
from langsmith import traceable, get_current_run_tree

# Example tool: get_weather
@traceable(run_type="tool", name="get_weather")
def get_weather(city: str):
    # Your tool logic goes here
    result = {
        "temperature_f": 68,
        "condition": "sunny",
        "city": city,
    }

    # Cost for this tool call (computed however you like)
    tool_cost = 0.0015

    # Attach usage metadata to the LangSmith run
    run = get_current_run_tree()
    run.set(usage_metadata={"total_cost": tool_cost})

    # Return only the actual tool result (no usage info)
    return result

tool_response = get_weather("San Francisco")
```
B. Return a \`total\_cost\` field in your traced function's outputs.

Include the `usage_metadata` key directly within the object returned by your traced function. LangSmith will extract it from the output.

Python

TypeScript

Copy

```
from langsmith import traceable

# Example tool: get_weather
@traceable(run_type="tool", name="get_weather")
def get_weather(city: str):
    # Your tool logic goes here
    result = {
        "temperature_f": 68,
        "condition": "sunny",
        "city": city,
    }

    # Attach tool call costs here
    return {
        **result,
        "usage_metadata": {
            "total_cost": 0.0015,   # <-- cost for this tool call
        },
    }

tool_response = get_weather("San Francisco")
```

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/cost-tracking.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.