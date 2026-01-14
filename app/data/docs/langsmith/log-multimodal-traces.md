---
title: "Log multimodal traces"
url: "https://docs.langchain.com/langsmith/log-multimodal-traces"
section: "langsmith"
last_modified: "2025-12-16T22:07:24.456Z"
---
LangSmith supports logging and rendering images as part of traces. This is currently supported for multimodal LLM runs. In order to log images, use `wrap_openai`/ `wrapOpenAI` in Python or TypeScript respectively and pass an image URL or base64 encoded image as part of the input.

Python

TypeScript

Copy

```
from openai import OpenAI
from langsmith.wrappers import wrap_openai
client = wrap_openai(OpenAI())
response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
      {
        "role": "user",
        "content": [
          {"type": "text", "text": "What's in this image?"},
          {
            "type": "image_url",
            "image_url": {
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            },
          },
        ],
      }
    ],
)
print(response.choices[0])
```

The image will be rendered as part of the trace in the LangSmith UI. ![Multimodal](https://mintcdn.com/langchain-5e9cc07a/4kN8yiLrZX_amfFn/langsmith/images/multimodal.png?fit=max&auto=format&n=4kN8yiLrZX_amfFn&q=85&s=ff41711a0992c77f86cbc9f523e2ae93)

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/log-multimodal-traces.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.