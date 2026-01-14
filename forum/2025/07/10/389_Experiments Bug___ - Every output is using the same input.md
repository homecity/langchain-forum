# Experiments Bug(?) - Every output is using the same input

**Topic ID:** 389
**Created:** 2025-07-10 22:16:14
**URL:** https://forum.langchain.com/t/389

---

## Post #1 by @promptlordjess
*Posted on 2025-07-10 22:16:14*

Is anyone else running into issues with Langsmith experiments tab in their UI?

[/uploads/short-url/nFRNsjL7s4da8JOiLoCHx7L0Hbt.jpeg?dl=1](Screenshot 2025-07-10 at 3.15.44 PM1846×1844 257 KB)

Every single one of my outputs seems to be referencing the same input so I think somehow it’s only pulling the first input to run all the tests?

---

## Post #2 by @jacoblee93
*Posted on 2025-07-10 22:22:36*

Hey [/u/promptlordjess](@promptlordjess),

I’m unable to repro - can you share more details on your dataset and exactly how you’re running things?

---

## Post #3 by @promptlordjess
*Posted on 2025-07-10 22:32:56*

Yes this is what I do.

1 I click datasets&experiemnts tab

2 I open my golden labels data set

3. I click +Experiment → Run in Playground

4.  I select my prompt, my 5 examples from that golden labels dataset, then I pick my evaluator

5. I hit run

6. I look through the output column and realize every thing was run against one of the examples instead of 5 different examples

Here’s the link if it helps: [https://smith.langchain.com/o/f46d0907-a4f5-45ed-8303-445d2f66779f/playground?datasetId=328ccea9-153d-4e62-9d20-88d29452629c](LangSmith)

---
