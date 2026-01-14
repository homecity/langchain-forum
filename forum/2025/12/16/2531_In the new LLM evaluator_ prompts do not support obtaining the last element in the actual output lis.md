# In the new LLM evaluator, prompts do not support obtaining the last element in the actual output list.

**Topic ID:** 2531
**Created:** 2025-12-16 16:52:11
**URL:** https://forum.langchain.com/t/2531

---

## Post #1 by @leon
*Posted on 2025-12-16 16:52:11*

**Hello, our team is using Langsmith to evaluate our agents, and we have encountered the following issues during the process:**


```
`We added an LLM as a judge evaluator, but when mapping the agent's actual output in the prompt of this evaluator, the 'output' label only supports simple dictionary indexing.The output of our agent is a JSON string, where the final output is actually in the content of the last element of the messages list. However, in the prompt's UI, under the output label, it doesn't support an index like Python's list\[-1\]. Is there any way for me to get the last element of the list? The length of our messages list is variable.
`
```

**I hope to be able to help us solve this problem. Thank you.**[/uploads/short-url/faAeNOzAwU2TL8WdJmM3kNwFUr6.jpeg?dl=1](img_v3_02t1_9355729e-8dd2-43cf-83a8-d95de0958cbg1920×1081 180 KB)

---

## Post #2 by @eric-langchain
*Posted on 2025-12-17 00:53:17*

hey Leon, our LLM as judge evaluators actually do support negative indexing. do you mind sending me your workspace id and the project/dataset id that this evaluator is set up on?

---

## Post #4 by @leon
*Posted on 2025-12-17 11:04:40*

hey，eric, thank for you reply ,I have found the source of the problem. When there is data with negative indexes in the output of the prompt, the preview cannot display the real data that I mapped; it appears empty. This misleads me into thinking that such index retrieval is not supported, but in actual evaluation work, negative indexes are valid.

As a loyal paying user of Langsmith, I hope your team can resolve this small issue. This scenario misleads me into thinking that negative indexes are not supported.

---

## Post #5 by @tanushree-sharma
*Posted on 2025-12-17 17:30:42*

Thanks for flagging this. We can reproduce the issue and will get this fixed.

I did test out setting an evaluator with a negative index and although the preview doesn’t work, the evaluator itself does still work. To verify you can click into the “Evaluator Traces” tab and inspect that the data is being send to the LLM as a judge

[/uploads/short-url/hI0FyH4jS2oWaVkwhtDEQiWGYdV.png?dl=1](image2466×1388 482 KB)

---
