---
title: "Trace with Instructor"
url: "https://docs.langchain.com/langsmith/trace-with-instructor"
section: "langsmith"
last_modified: "2025-12-16T22:07:24.966Z"
---
LangSmith provides a convenient integration with [Instructor](https://python.useinstructor.com/), a popular open-source library for generating structured output with LLMs. In order to use, you first need to set your LangSmith API key.

Copy

```
export LANGSMITH_API_KEY=<your-api-key>
# For LangSmith API keys linked to multiple workspaces, set the LANGSMITH_WORKSPACE_ID environment variable to specify which workspace to use.
export LANGSMITH_WORKSPACE_ID=<your-workspace-id>
```

Next, you will need to install the LangSmith SDK:

pip

uv

Copy

```
pip install -U langsmith
```

Wrap your OpenAI client with `langsmith.wrappers.wrap_openai`

Copy

```
from openai import OpenAI
from langsmith import wrappers

client = wrappers.wrap_openai(OpenAI())
```

After this, you can patch the wrapped OpenAI client using `instructor`:

Copy

```
import instructor

client = instructor.patch(client)
```

Now, you can use `instructor` as you normally would, but now everything is logged to LangSmith!

Copy

```
from pydantic import BaseModel


class UserDetail(BaseModel):
    name: str
    age: int


user = client.chat.completions.create(
    model="gpt-4o-mini",
    response_model=UserDetail,
    messages=[
        {"role": "user", "content": "Extract Jason is 25 years old"},
    ]
)
```

Oftentimes, you use `instructor` inside of other functions. You can get nested traces by using this wrapped client and decorating those functions with `@traceable`. Please see [this guide](./annotate-code) for more information on how to annotate your code for tracing with the `@traceable` decorator.

Copy

```
# You can customize the run name with the `name` keyword argument
@traceable(name="Extract User Details")
def my_function(text: str) -> UserDetail:
    return client.chat.completions.create(
        model="gpt-4o-mini",
        response_model=UserDetail,
        messages=[
            {"role": "user", "content": f"Extract {text}"},
        ]
    )

my_function("Jason is 25 years old")
```

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/trace-with-instructor.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.