# Access each experiment result in a pairwise experiments

**Topic ID:** 1772
**Created:** 2025-10-07 16:22:08
**URL:** https://forum.langchain.com/t/1772

---

## Post #1 by @eric-burel
*Posted on 2025-10-07 16:22:08*

Hi, all in the title, I’d be eager to build a pairwise evaluator based on the previous evaluations results, rather than outputs direct comparison. For instance I could write business rules indicating that I want to favour one metric and use the other as damage control in the pairwise experiment.


```
`def ranked_preference(inputs: dict, outputs: list[dict]) -> list:
    # Assumes example inputs have a 'question' key and experiment
    # outputs have an 'answer' key.
    response = chain.invoke({
        "question": inputs["question"],
        "answer_a": outputs[0].get("answer", "N/A"),
        "answer_b": outputs[1].get("answer", "N/A"),
    })
`
```

For instance in this code, does the “outputs” direct have more metadata to it I can use? Or should I look at `runs` rather than output? I am not sure whether evaluation results are found in the Run object though ([https://docs.langchain.com/langsmith/run-data-format](Reference here)).

---
