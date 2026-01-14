---
title: "How to define a target function to evaluate"
url: "https://docs.langchain.com/langsmith/define-target-function"
section: "langsmith"
last_modified: "2025-12-16T22:07:24.147Z"
---
There are three main pieces need to run an evaluation:

1.  A [dataset](/langsmith/evaluation-concepts#datasets) of test inputs and expected outputs.
2.  A target function which is what you’re evaluating.
3.  [Evaluators](/langsmith/evaluation-concepts#evaluators) that score your target function’s outputs.

This guide shows you how to define the target function depending on the part of your application you are evaluating. See here for [how to create a dataset](/langsmith/manage-datasets-programmatically) and [how to define evaluators](/langsmith/code-evaluator), and here for an [end-to-end example of running an evaluation](/langsmith/evaluate-llm-application).

## 

[​

](#target-function-signature)

Target function signature

In order to evaluate an application in code, we need a way to run the application. When using `evaluate()` ([Python](https://docs.smith.langchain.com/reference/python/client/langsmith.client.Client#langsmith.client.Client.evaluate)/[TypeScript](https://docs.smith.langchain.com/reference/js/functions/evaluation.evaluate))we’ll do this by passing in a _target function_ argument. This is a function that takes in a dataset [Example’s](/langsmith/evaluation-concepts#examples) inputs and returns the application output as a dict. Within this function we can call our application however we’d like. We can also format the output however we’d like. The key is that any evaluator functions we define should work with the output format we return in our target function.

Copy

```
from langsmith import Client

# 'inputs' will come from your dataset.
def dummy_target(inputs: dict) -> dict:
    return {"foo": 1, "bar": "two"}

# 'inputs' will come from your dataset.
# 'outputs' will come from your target function.
def evaluator_one(inputs: dict, outputs: dict) -> bool:
    return outputs["foo"] == 2

def evaluator_two(inputs: dict, outputs: dict) -> bool:
    return len(outputs["bar"]) < 3

client = Client()
results = client.evaluate(
    dummy_target,  # <-- target function
    data="your-dataset-name",
    evaluators=[evaluator_one, evaluator_two],
    ...
)
```

`evaluate()` will automatically trace your target function. This means that if you run any traceable code within your target function, this will also be traced as child runs of the target trace.

## 

[​

](#example:-single-llm-call)

Example: Single LLM call

Python

TypeScript

Python (LangChain)

TypeScript (LangChain)

Copy

```
from langsmith import wrappers
from openai import OpenAI

# Optionally wrap the OpenAI client to automatically
# trace all model calls.
oai_client = wrappers.wrap_openai(OpenAI())

def target(inputs: dict) -> dict:
  # This assumes your dataset has inputs with a 'messages' key.
  # You can update to match your dataset schema.
  messages = inputs["messages"]
  response = oai_client.chat.completions.create(
      messages=messages,
      model="gpt-4o-mini",
  )
  return {"answer": response.choices[0].message.content}
```

## 

[​

](#example:-non-llm-component)

Example: Non-LLM component

Python

TypeScript

Copy

```
from langsmith import traceable

# Optionally decorate with '@traceable' to trace all invocations of this function.
@traceable
def calculator_tool(operation: str, number1: float, number2: float) -> str:
  if operation == "add":
      return str(number1 + number2)
  elif operation == "subtract":
      return str(number1 - number2)
  elif operation == "multiply":
      return str(number1 * number2)
  elif operation == "divide":
      return str(number1 / number2)
  else:
      raise ValueError(f"Unrecognized operation: {operation}.")

# This is the function you will evaluate.
def target(inputs: dict) -> dict:
  # This assumes your dataset has inputs with `operation`, `num1`, and `num2` keys.
  operation = inputs["operation"]
  number1 = inputs["num1"]
  number2 = inputs["num2"]
  result = calculator_tool(operation, number1, number2)
  return {"result": result}
```

## 

[​

](#example:-application-or-agent)

Example: Application or agent

Python

TypeScript

Copy

```
from my_agent import agent

      # This is the function you will evaluate.
def target(inputs: dict) -> dict:
  # This assumes your dataset has inputs with a `messages` key
  messages = inputs["messages"]
  # Replace `invoke` with whatever you use to call your agent
  response = agent.invoke({"messages": messages})
  # This assumes your agent output is in the right format
  return response
```

If you have a LangGraph/LangChain agent that accepts the inputs defined in your dataset and that returns the output format you want to use in your evaluators, you can pass that object in as the target directly:

Copy

```
from my_agent import agent
from langsmith import Client
client = Client()
client.evaluate(agent, ...)
```

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/define-target-function.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.