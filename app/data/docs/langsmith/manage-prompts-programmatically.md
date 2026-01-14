---
title: "Manage prompts programmatically"
url: "https://docs.langchain.com/langsmith/manage-prompts-programmatically"
section: "langsmith"
last_modified: "2026-01-06T20:30:18.815Z"
---
You can use the LangSmith Python and TypeScript SDK to manage prompts programmatically.

Previously this functionality lived in the `langchainhub` package which is now deprecated. All functionality going forward will live in the `langsmith` package.

## 

[​

](#install-packages)

Install packages

In Python, you can directly use the LangSmith SDK (_recommended, full functionality_) or you can use through the LangChain package (limited to pushing and pulling prompts). In TypeScript, you must use the LangChain npm package for pulling prompts (it also allows pushing). For all other functionality, use the LangSmith package.

pip

uv

TypeScript

Copy

```
pip install -U langsmith # version >= 0.1.99
```

## 

[​

](#configure-environment-variables)

Configure environment variables

If you already have `LANGSMITH_API_KEY` set to your current workspace’s api key from LangSmith, you can skip this step. Otherwise, get an API key for your workspace by navigating to `Settings > API Keys > Create API Key` in LangSmith. Set your environment variable.

Copy

```
export LANGSMITH_API_KEY="lsv2_..."
```

What we refer to as “prompts” used to be called “repos”, so any references to “repo” in the code are referring to a prompt.

## 

[​

](#push-a-prompt)

Push a prompt

To create a new prompt or update an existing prompt, you can use the `push prompt` method.

Python

LangChain (Python)

TypeScript

Copy

```
from langsmith import Client
from langchain_core.prompts import ChatPromptTemplate

client = Client()
prompt = ChatPromptTemplate.from_template("tell me a joke about {topic}")
url = client.push_prompt("joke-generator", object=prompt)
# url is a link to the prompt in the UI
print(url)
```

You can also push a prompt as a RunnableSequence of a prompt and a model. This is useful for storing the model configuration you want to use with this prompt. The provider must be supported by the LangSmith playground. (see settings here: [Supported Providers](https://langsmith.com/playground))

Python

LangChain (Python)

TypeScript

Copy

```
from langsmith import Client
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

client = Client()
model = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_template("tell me a joke about {topic}")
chain = prompt | model
client.push_prompt("joke-generator-with-model", object=chain)
```

## 

[​

](#pull-a-prompt)

Pull a prompt

To pull a prompt, you can use the `pull prompt` method, which returns a the prompt as a langchain `PromptTemplate`. To pull a **private prompt** you do not need to specify the owner handle (though you can, if you have one set). To pull a **public prompt** from the LangChain Hub, you need to specify the handle of the prompt’s author.

Python

LangChain (Python)

TypeScript

Copy

```
from langsmith import Client
from langchain_openai import ChatOpenAI

client = Client()
prompt = client.pull_prompt("joke-generator")
model = ChatOpenAI(model="gpt-4o-mini")
chain = prompt | model
chain.invoke({"topic": "cats"})
```

Similar to pushing a prompt, you can also pull a prompt as a RunnableSequence of a prompt and a model. Just specify include\_model when pulling the prompt. If the stored prompt includes a model, it will be returned as a RunnableSequence. Make sure you have the proper environment variables set for the model you are using.

Python

LangChain (Python)

TypeScript

Copy

```
from langsmith import Client

client = Client()
chain = client.pull_prompt("joke-generator-with-model", include_model=True)
chain.invoke({"topic": "cats"})
```

When pulling a prompt, you can also specify a specific commit hash or [commit tag](/langsmith/manage-prompts#commit-tags) to pull a specific version of the prompt.

Python

LangChain (Python)

TypeScript

Copy

```
prompt = client.pull_prompt("joke-generator:12344e88")
```

To pull a public prompt from the LangChain Hub, you need to specify the handle of the prompt’s author.

Python

LangChain (Python)

TypeScript

Copy

```
prompt = client.pull_prompt("efriis/my-first-prompt")
```

For pulling prompts, if you are using Node.js or an environment that supports dynamic imports, we recommend using the `langchain/hub/node` entrypoint, as it handles deserialization of models associated with your prompt configuration automatically.If you are in a non-Node environment, “includeModel” is not supported for non-OpenAI models and you should use the base `langchain/hub` entrypoint.

## 

[​

](#prompt-caching)

Prompt caching

We recommend enabling prompt caching in production environments to reduce latency and API calls. The cache uses a stale-while-revalidate pattern, ensuring your application always gets a fast response while keeping prompts up-to-date in the background.

The LangSmith SDK includes built-in in-memory caching for prompts. When enabled, pulled prompts are cached in memory, reducing latency and API calls for frequently used prompts. The cache persists for the lifetime of the client instance. **Requirements:**

-   Python SDK: `langsmith >= 0.6.1`
-   TypeScript SDK: `langsmith >= 0.4.5`

### 

[​

](#default-behavior)

Default behavior

Caching is **disabled by default**. When enabled, the default settings are:

Setting

Default

Description

`max_size`

100

Maximum number of prompts to cache

`ttl_seconds`

3600 (1 hour)

Time before a cached prompt is considered stale

`refresh_interval_seconds`

60

How often to check for stale prompts

### 

[​

](#enabling-the-cache)

Enabling the cache

Pass `cache=True` to enable caching with default settings, or pass a `Cache` instance for custom configuration:

Python

TypeScript

Copy

```
from langsmith import Client, Cache

# Enable with default settings
client = Client(cache=True)

# Or configure custom cache settings
my_cache = Cache(
    max_size=100,
    ttl_seconds=3600,
)
client = Client(cache=my_cache)

# First pull - fetches from API and caches
prompt = client.pull_prompt("joke-generator")

# Subsequent pulls - returns cached version instantly
prompt = client.pull_prompt("joke-generator")

# Check cache metrics
print(f"Cache hits: {client.cache.metrics.hits}")
print(f"Cache misses: {client.cache.metrics.misses}")
print(f"Hit rate: {client.cache.metrics.hit_rate:.1%}")
```

### 

[​

](#skipping-the-cache)

Skipping the cache

To bypass the cache and fetch a fresh prompt from the API, use the `skip_cache` parameter:

Python

TypeScript

Copy

```
# Force a fresh fetch, ignoring any cached version
prompt = client.pull_prompt("joke-generator", skip_cache=True)
```

This is useful when you need to ensure you have the latest version of a prompt, such as after making changes in the LangSmith UI.

### 

[​

](#offline-mode)

Offline mode

For environments with limited or no network connectivity, you can pre-populate the cache and use it offline. Set `ttl_seconds` to `None` (Python) or `null` (TypeScript) to prevent cache entries from expiring. **Step 1: Export your prompts to a cache file (while online)**

Python

TypeScript

Copy

```
from langsmith import Client, Cache

# Create client with caching enabled
client = Client(cache=True)

# Pull the prompts you need
client.pull_prompt("prompt-1")
client.pull_prompt("prompt-2")
client.pull_prompt("prompt-3")

# Export cache to a file
client.cache.dump("prompts_cache.json")
client.cleanup()
```

**Step 2: Load the cache file in your offline environment**

Python

TypeScript

Copy

```
from langsmith import Client, Cache

# Create cache with infinite TTL (never expire)
my_cache = Cache(ttl_seconds=None)
my_cache.load("prompts_cache.json")

client = Client(cache=my_cache)

# Uses cached version without any API calls
prompt = client.pull_prompt("prompt-1")
```

### 

[​

](#cleanup)

Cleanup

When you’re done using the client, call `cleanup()` to stop the background refresh task:

Python

TypeScript

Copy

```
client.cleanup()
```

## 

[​

](#use-a-prompt-without-langchain)

Use a prompt without LangChain

If you want to store your prompts in LangSmith but use them directly with a model provider’s API, you can use our conversion methods. These convert your prompt into the payload required for the OpenAI or Anthropic API. These conversion methods rely on logic from within LangChain integration packages, and you will need to install the appropriate package as a dependency in addition to your official SDK of choice. Here are some examples:

### 

[​

](#openai)

OpenAI

Python

TypeScript

Copy

```
pip install -U langchain_openai
```

Python

TypeScript

Copy

```
from openai import OpenAI
from langsmith.client import Client, convert_prompt_to_openai_format

# langsmith client
client = Client()
# openai client
oai_client = OpenAI()

# pull prompt and invoke to populate the variables
prompt = client.pull_prompt("joke-generator")
prompt_value = prompt.invoke({"topic": "cats"})
openai_payload = convert_prompt_to_openai_format(prompt_value)
openai_response = oai_client.chat.completions.create(**openai_payload)
```

### 

[​

](#anthropic)

Anthropic

Python

TypeScript

Copy

```
pip install -U langchain_anthropic
```

Python

TypeScript

Copy

```
from anthropic import Anthropic
from langsmith.client import Client, convert_prompt_to_anthropic_format

# langsmith client
client = Client()
# anthropic client
anthropic_client = Anthropic()

# pull prompt and invoke to populate the variables
prompt = client.pull_prompt("joke-generator")
prompt_value = prompt.invoke({"topic": "cats"})
anthropic_payload = convert_prompt_to_anthropic_format(prompt_value)
anthropic_response = anthropic_client.messages.create(**anthropic_payload)
```

## 

[​

](#list,-delete,-and-like-prompts)

List, delete, and like prompts

You can also list, delete, and like/unlike prompts using the `list prompts`, `delete prompt`, `like prompt` and `unlike prompt` methods. See the [LangSmith SDK client](https://github.com/langchain-ai/langsmith-sdk) for extensive documentation on these methods.

Python

TypeScript

Copy

```
# List all prompts in my workspace
prompts = client.list_prompts()

# List my private prompts that include "joke"
prompts = client.list_prompts(query="joke", is_public=False)

# Delete a prompt
client.delete_prompt("joke-generator")

# Like a prompt
client.like_prompt("efriis/my-first-prompt")

# Unlike a prompt
client.unlike_prompt("efriis/my-first-prompt")
```

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/manage-prompts-programmatically.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.