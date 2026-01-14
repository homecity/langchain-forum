---
title: "Log LLM calls"
url: "https://docs.langchain.com/langsmith/log-llm-trace"
section: "langsmith"
last_modified: "2026-01-08T16:42:32.297Z"
---
This guide will cover how to log LLM calls to LangSmith when you are using a custom model or a custom input/output format. To make the most of LangSmith’s LLM trace processing, you should log your LLM traces in one of the specified formats. LangSmith offers the following benefits for LLM traces:

-   Rich, structured rendering of message lists
-   Token and cost tracking per LLM call, per trace and across traces over time

If you don’t log your LLM traces in the suggested formats, you will still be able to log the data to LangSmith, but it may not be processed or rendered in expected ways. If you are using [LangChain OSS](https://python.langchain.com/docs/tutorials/llm_chain/) to call language models or LangSmith wrappers ([OpenAI](/langsmith/trace-openai), [Anthropic](/langsmith/trace-anthropic)), these approaches will automatically log traces in the correct format.

The examples on this page use the `traceable` decorator/wrapper to log the model run (which is the recommended approach for Python and JS/TS). However, the same idea applies if you are using the [RunTree](/langsmith/annotate-code#use-the-runtree-api) or [API](https://api.smith.langchain.com/redoc) directly.

## 

[​

](#messages-format)

Messages format

When tracing a custom model or a custom input/output format, it must either follow the LangChain format, OpenAI completions format or Anthropic messages format. For more details, refer to the [OpenAI Chat Completions](https://platform.openai.com/docs/api-reference/chat/create) or [Anthropic Messages](https://platform.claude.com/docs/en/api/messages) documentation. The LangChain format is:

Show LangChain format

[​

](#param-messages)

messages

array

required

A list of messages containing the content of the conversation.

[​

](#param-role)

role

string

required

Identifies the message type. One of: `system` | `reasoning` | `user` | `assistant` | `tool`

[​

](#param-content)

content

array

required

Content of the message. List of typed dictionaries.

Show Content options

[​

](#param-type)

type

string

required

One of: `text` | `image` | `file` | `audio` | `video` | `tool_call` | `server_tool_call` | `server_tool_result`.

Show text

[​

](#param-type-1)

type

literal('text')

required

[​

](#param-text)

text

string

required

Text content.

[​

](#param-annotations)

annotations

object\[\]

List of annotations for the text

[​

](#param-extras)

extras

object

Additional provider-specific data.

Show reasoning

[​

](#param-type-2)

type

literal('reasoning')

required

[​

](#param-text-1)

text

string

required

Text content.

[​

](#param-extras-1)

extras

object

Additional provider-specific data.

Show image

[​

](#param-type-3)

type

literal('image')

required

[​

](#param-url)

url

string

URL pointing to the image location.

[​

](#param-base64)

base64

string

required

Base64-encoded image data.

[​

](#param-id)

id

string

Reference ID to an externally stored image (e.g., in a provider’s file system or in a bucket).

[​

](#param-mime-type)

mime\_type

string

Image [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml#image) (e.g., `image/jpeg`, `image/png`).

Show file (e.g., PDFs)

[​

](#param-type-4)

type

literal('file')

required

[​

](#param-url-1)

url

string

URL pointing to the file.

[​

](#param-base64-1)

base64

string

required

Base64-encoded file data.

[​

](#param-id-1)

id

string

Reference ID to an externally stored file (e.g., in a provider’s file system or in a bucket).

[​

](#param-mime-type-1)

mime\_type

string

File [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml#image) (e.g., `application/pdf`).

Show audio

[​

](#param-type-5)

type

literal('audio')

required

[​

](#param-url-2)

url

string

URL pointing to the audio file.

[​

](#param-base64-2)

base64

string

required

Base64-encoded audio data.

[​

](#param-id-2)

id

string

Reference ID to an externally stored audio file (e.g., in a provider’s file system or in a bucket).

[​

](#param-mime-type-2)

mime\_type

string

Audio [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml#image) (e.g., `audio/mpeg`, `audio/wav`).

Show video

[​

](#param-type-6)

type

literal('video')

required

[​

](#param-url-3)

url

string

URL pointing to the video file.

[​

](#param-base64-3)

base64

string

required

Base64-encoded video data.

[​

](#param-id-3)

id

string

Reference ID to an externally stored video file (e.g., in a provider’s file system or in a bucket).

[​

](#param-mime-type-3)

mime\_type

string

Video [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml#image) (e.g., `video/mp4`, `video/webm`).

Show tool\_call

[​

](#param-type-7)

type

literal('tool\_call')

required

[​

](#param-name)

name

string

[​

](#param-args)

args

object

required

Arguments to pass to the tool.

[​

](#param-id-4)

id

string

Unique identifier for this tool call.

Show server\_tool\_call

[​

](#param-type-8)

type

literal('server\_tool\_call')

required

[​

](#param-id-5)

id

string

required

Unique identifier for this tool call.

[​

](#param-name-1)

name

string

required

The name of the tool to be called.

[​

](#param-args-1)

args

object

required

Arguments to pass to the tool.

Show server\_tool\_result

[​

](#param-type-9)

type

literal('server\_tool\_result')

required

[​

](#param-tool-call-id)

tool\_call\_id

string

required

Identifier of the corresponding server tool call.

[​

](#param-id-6)

id

string

Unique identifier for this tool call.

[​

](#param-status)

status

string

required

Execution status of the server-side tool. One of: `success` | `error`.

[​

](#param-output)

output

Output of the executed tool.

[​

](#param-tool-call-id-1)

tool\_call\_id

string

Must match the `id` of a prior `assistant` message’s `tool_calls[i]` entry. Only valid when `role` is `tool`.

[​

](#param-usage-metadata)

usage\_metadata

object

Use this field to send token counts and/or costs with your model’s output. See [this guide](/langsmith/log-llm-trace#provide-token-and-cost-information) for more details.

### 

[​

](#examples)

Examples

Text and reasoning

Tool calls

Multimodal

Server-side tool calls

Copy

```
 inputs = {
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Hi, can you tell me the capital of France?"
        }
      ]
    }
  ]
}

outputs = {
  "messages": [
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "The capital of France is Paris."
        },
        {
          "type": "reasoning",
          "text": "The user is asking about..."
        }
      ]
    }
  ]
}

```

## 

[​

](#converting-custom-i/o-formats-into-langsmith-compatible-formats)

Converting custom I/O formats into LangSmith compatible formats

If you’re using a custom input or output format, you can convert it to a LangSmith compatible format using `process_inputs`/`processInputs` and `process_outputs`/`processOutputs` functions on the [`@traceable` decorator](https://docs.smith.langchain.com/reference/python/run_helpers/langsmith.run_helpers.traceable) (Python) or [`traceable` function](https://docs.smith.langchain.com/reference/js/functions/traceable.traceable) (TS). `process_inputs`/`processInputs` and `process_outputs`/`processOutputs` accept functions that allow you to transform the inputs and outputs of a specific trace before they are logged to LangSmith. They have access to the trace’s inputs and outputs, and can return a new dictionary with the processed data. Here’s a boilerplate example of how to use `process_inputs` and `process_outputs` to convert a custom I/O format into a LangSmith compatible format:Show the code

Python

Copy

```
class OriginalInputs(BaseModel):
    """Your app's custom request shape"""

class OriginalOutputs(BaseModel):
    """Your app's custom response shape."""

class LangSmithInputs(BaseModel):
    """The input format LangSmith expects."""

class LangSmithOutputs(BaseModel):
    """The output format LangSmith expects."""

def process_inputs(inputs: dict) -> dict:
    """Dict -> OriginalInputs -> LangSmithInputs -> dict"""

def process_outputs(output: Any) -> dict:
    """OriginalOutputs -> LangSmithOutputs -> dict"""


@traceable(run_type="llm", process_inputs=process_inputs, process_outputs=process_outputs)
def chat_model(inputs: dict) -> dict:
    """
    Your app's model call. Keeps your custom I/O shape.
    The decorators call process_* to log LangSmith-compatible format.
    """

```

## 

[​

](#identifying-a-custom-model-in-traces)

Identifying a custom model in traces

When using a custom model, it is recommended to also provide the following `metadata` fields to identify the model when viewing traces and when filtering.

-   `ls_provider`: The provider of the model, e.g. “openai”, “anthropic”, etc.
-   `ls_model_name`: The name of the model, e.g. “gpt-4o-mini”, “claude-3-opus-20240229”, etc.

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
    ]
}

@traceable(
    run_type="llm",
    metadata={"ls_provider": "my_provider", "ls_model_name": "my_model"}
)
def chat_model(messages: list):
    return output

chat_model(inputs)
```

This code will log the following trace:

![LangSmith UI showing an LLM call trace called ChatOpenAI with a system and human input followed by an AI Output.](https://mintcdn.com/langchain-5e9cc07a/9cRCWDFnPjFk6hYc/langsmith/images/chat-model-light.png?fit=max&auto=format&n=9cRCWDFnPjFk6hYc&q=85&s=f152f49a6313d98e29d3a7b42b76c11f)![LangSmith UI showing an LLM call trace called ChatOpenAI with a system and human input followed by an AI Output.](https://mintcdn.com/langchain-5e9cc07a/9cRCWDFnPjFk6hYc/langsmith/images/chat-model-dark.png?fit=max&auto=format&n=9cRCWDFnPjFk6hYc&q=85&s=1da2f0a1adc972aa6de6df94cbfc1407)

If you implement a custom streaming chat\_model, you can “reduce” the outputs into the same format as the non-streaming version. This is currently only supported in Python.

Copy

```
def _reduce_chunks(chunks: list):
    all_text = "".join([chunk["choices"][0]["message"]["content"] for chunk in chunks])
    return {"choices": [{"message": {"content": all_text, "role": "assistant"}}]}

@traceable(
    run_type="llm",
    reduce_fn=_reduce_chunks,
    metadata={"ls_provider": "my_provider", "ls_model_name": "my_model"}
)
def my_streaming_chat_model(messages: list):
    for chunk in ["Hello, " + messages[1]["content"]]:
        yield {
            "choices": [
                {
                    "message": {
                        "content": chunk,
                        "role": "assistant",
                    }
                }
            ]
        }

list(
    my_streaming_chat_model(
        [
            {"role": "system", "content": "You are a helpful assistant. Please greet the user."},
            {"role": "user", "content": "polly the parrot"},
        ],
    )
)
```

If `ls_model_name` is not present in `extra.metadata`, other fields might be used from the `extra.metadata` for estimating token counts. The following fields are used in the order of precedence:

1.  `metadata.ls_model_name`
2.  `inputs.model`
3.  `inputs.model_name`

To learn more about how to use the `metadata` fields, refer to the [Add metadata and tags](/langsmith/add-metadata-tags) guide.

## 

[​

](#provide-token-and-cost-information)

Provide token and cost information

LangSmith calculates costs derived from token counts and model prices automatically. Learn about [how to provide tokens and/or costs in a run](/langsmith/cost-tracking#cost-tracking) and [viewing costs in the LangSmith UI](/langsmith/cost-tracking#viewing-costs-in-the-langsmith-ui).

## 

[​

](#time-to-first-token)

Time-to-first-token

If you are using `traceable` or one of our SDK wrappers, LangSmith will automatically populate time-to-first-token for streaming LLM runs. However, if you are using the `RunTree` API directly, you will need to add a `new_token` event to the run tree in order to properly populate time-to-first-token. Here’s an example:

Python

TypeScript

Copy

```
from langsmith.run_trees import RunTree
run_tree = RunTree(
    name="CustomChatModel",
    run_type="llm",
    inputs={ ... }
)
run_tree.post()
llm_stream = ...
first_token = None
for token in llm_stream:
    if first_token is None:
      first_token = token
      run_tree.add_event({
        "name": "new_token"
      })
run_tree.end(outputs={ ... })
run_tree.patch()
```

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/log-llm-trace.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.