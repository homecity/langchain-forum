---
title: "How to evaluate a runnable"
url: "https://docs.langchain.com/langsmith/langchain-runnable"
section: "langsmith"
last_modified: "2025-12-16T22:07:24.409Z"
---
-   `langchain`: [Python](https://python.langchain.com) and [JS/TS](https://js.langchain.com)
-   Runnable: [Python](https://python.langchain.com/docs/concepts/runnables/) and [JS/TS](https://js.langchain.com/docs/concepts/runnables/)

`langchain` [Runnable](https://python.langchain.com/docs/concepts/runnables/) objects (such as chat models, retrievers, chains, etc.) can be passed directly into `evaluate()` / `aevaluate()`.

## 

[​

](#setup)

Setup

Let’s define a simple chain to evaluate. First, install all the required packages:

Python

TypeScript

Copy

```
pip install -U langsmith langchain[openai]
```

Now define a chain:

Python

TypeScript

Copy

```
from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

instructions = (
    "Please review the user query below and determine if it contains any form "
    "of toxic behavior, such as insults, threats, or highly negative comments. "
    "Respond with 'Toxic' if it does, and 'Not toxic' if it doesn't."
)

prompt = ChatPromptTemplate(
    [("system", instructions), ("user", "{text}")],
)

model = init_chat_model("gpt-4o")
chain = prompt | model | StrOutputParser()
```

## 

[​

](#evaluate)

Evaluate

To evaluate our chain we can pass it directly to the `evaluate()` / `aevaluate()` method. Note that the input variables of the chain must match the keys of the example inputs. In this case, the example inputs should have the form `{"text": "..."}`.

Python

TypeScript

Copy

```
from langsmith import aevaluate, Client

client = Client()

# Clone a dataset of texts with toxicity labels.
# Each example input has a "text" key and each output has a "label" key.
dataset = client.clone_public_dataset(
    "https://smith.langchain.com/public/3d6831e6-1680-4c88-94df-618c8e01fc55/d"
)

def correct(outputs: dict, reference_outputs: dict) -> bool:
    # Since our chain outputs a string not a dict, this string
    # gets stored under the default "output" key in the outputs dict:
    actual = outputs["output"]
    expected = reference_outputs["label"]
    return actual == expected

results = await aevaluate(
    chain,
    data=dataset,
    evaluators=[correct],
    experiment_prefix="gpt-4o, baseline",
)
```

The runnable is traced appropriately for each output. ![Runnable Evaluation](https://mintcdn.com/langchain-5e9cc07a/Fr2lazPB4XVeEA7l/langsmith/images/runnable-eval.png?fit=max&auto=format&n=Fr2lazPB4XVeEA7l&q=85&s=b9dac41dafb9a1cbb3b90fc508f212f7)

## 

[​

](#related)

Related

-   [How to evaluate a `langgraph` graph](/langsmith/evaluate-on-intermediate-steps)

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/langchain-runnable.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.