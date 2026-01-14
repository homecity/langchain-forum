# Validation error when adding examples in the dataset: "Undefined reference in inputs schema: Unresolvable: https://api.smith.langchain.com/public/schemas/v1/message.json"

**Topic ID:** 770
**Created:** 2025-07-28 15:31:06
**URL:** https://forum.langchain.com/t/770

---

## Post #1 by @surenkov
*Posted on 2025-07-28 15:31:06*

Noticed recently, when adding new examples from traces or annotation queues to the dataset with `Array of Message` defined schema for `messages` field, LangSmith started responding with HTTP 400:


```
`// POST https://api.smith.langchain.com/examples

{
    "detail": {
        "message": "Failed example validation",
        "input_errors": [
            "Undefined reference in inputs schema: Unresolvable: https://api.smith.langchain.com/public/schemas/v1/message.json"
        ],
        "output_errors": []
    }
}
`
```

Looks like that issue was introduced no later than the last week, as we were able to add examples on 7/22 on the same dataset, and no schema changes were made during this period.

---

## Post #2 by @raphaelabreu1
*Posted on 2025-08-04 11:05:27*

I’m facing the same issue when trying to edit an example through the dataset/examples page. It started just after I performed an experiment using this example.

---
