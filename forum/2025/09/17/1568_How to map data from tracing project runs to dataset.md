# How to map data from tracing project runs to dataset

**Topic ID:** 1568
**Created:** 2025-09-17 22:21:35
**URL:** https://forum.langchain.com/t/1568

**Tags:** cloud

---

## Post #1 by @otaku
*Posted on 2025-09-17 22:21:35*

I’m trying to create a dataset from selected Chain runs. I selected the runs, created a new dataset and setup a json schema to validate the input. So far so good, I have a dataset of a few runs.

Now I want to test my prompt against this dataset.

The input has a json structure following the below schema:


```
`{
  "title": "dataset_input_schema",
  "type": "object",
  "additionalProperties": true,
  "properties": {
    "params": {
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "content": {
          "type": "string",
          "description": "Conversation text or prompt content."
        },
        "org_info": {
          "type": "object",
          "additionalProperties": true,
          "properties": {
            "about": {
              "type": "string"
            },
            "org_name": {
              "type": "string"
            },
            "qualification_requirements": {
              "type": "string"
            }
          },
          "required": ["org_name", "about", "qualification_requirements"]
        },
        "qualification_data": {
          "type": "string"
        },
        "existing_conversation_summary": {
          "type": "string"
        }
      },
      "required": [
        "content",
        "org_info",
        "existing_conversation_summary"
      ]
    }
  },
  "required": ["params"]
}
`
```

The prompt has variables for “content”, “about”, “org_name”, “qualification_requirements”, “qualification_data”, “existing_conversation_summary”

I try setting the variable in the prompt as {params.content} but langsmith reports the error:

“missing 1 input variable from prompt: params.content”

Am i missing something?

I’m using the langsmith UI.

Haven’t tried it via the SDK. Will this be achievable there?

---
