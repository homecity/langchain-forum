# Creating a dataset example for a ChatPromptTemplate with MessagesPlaceholder

**Topic ID:** 1633
**Created:** 2025-09-24 17:01:32
**URL:** https://forum.langchain.com/t/1633

**Tags:** python-help, cloud

---

## Post #1 by @vivaperon
*Posted on 2025-09-24 17:01:32*

In Langchain/Langsmith, I have defined a prompt template like this:


```
`from langchain_core.messages import SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts.chat import MessagesPlaceholder

prompt_template = ChatPromptTemplate([
    SystemMessage("Here goes a mustache variable: {{var_1}}"),
    MessagesPlaceholder("chat_history")
],
    template_format="mustache")
`
```

Which is kind of hybrid because it combines normal variables with a messages list. The way to render it is:


```
`prompt_template.format_prompt(var_1 = "mustache-variable", chat_history = [("hi!")])
`
```

And this works.

Now [https://docs.langchain.com/langsmith/manage-datasets-programmatically#create-a-dataset-from-list-of-values](apparently) I should define my dataset like this:


```
`examples = [
{"var_1": 10, "chat_history": [("hi!")]},
{"var_1": 12, "chat_history": [("hola!")]},
]

dataset_name = "test_2"

dataset = client.create_dataset(
  dataset_name=dataset_name
)
`
```

But when I run this:


```
`client.create_examples(
  dataset_id=dataset.id,
  examples=examples
)
`
```

Although I get:


```
`{'example_ids': ['6dde8b13-ea79-441c-9c0d-a9ceb559f455'], 'count': 1}
`
```

I don’t see any new examples in the UI.



Also, I can’t create this kind of hybrid example from the “+ Example” button, which makes me think that this isn’t supported by the UI.

I’ve also seen that the `create_dataset` function has a `data_type` arg that supports this: `ls_schemas.DataType.chat`. But its behaviour is not clear to me and there’s no documentation on this.

I suspect that this might be related to [https://forum.langchain.com/t/setting-an-experiment-with-messages-list/1560/3](this other issue) with Langchain Cloud.

Any idea? Am I doing something wrong?

---
