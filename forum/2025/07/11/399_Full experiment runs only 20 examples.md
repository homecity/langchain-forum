# Full experiment runs only 20 examples

**Topic ID:** 399
**Created:** 2025-07-11 17:12:51
**URL:** https://forum.langchain.com/t/399

---

## Post #1 by @vertrue
*Posted on 2025-07-11 17:12:51*

Hi everyone. Facing strange problem

I am trying to run experiment over a dataset in langsmith UI but it runs only 20 examples. Full experiment report also contains only 20 examples. My dataset has 100+ examples in it.

What is strange that it worked previously, I have an experiment where runs count is 112.

[/uploads/short-url/yi5D1QDcazKxerzOVSAsYfIdrMl.png?dl=1](screenshot on the "experiments" page for a dataset1000×324 18 KB)

Using Python SDK, I’ve managed to fetch that 20-run-count experiment has fields `end_time = None`

Answering your possible questions:


I did not changed size of the dataset.
I picked the same subset (112 examples) for experiment.
I tried to run it again, still got only 20 run count.
My 2 evaluators were “custom code” and “LLM-as-a-judge”.
UI also looks strange while running an experiment. For outputs it says “Press Start to run your prompt over the dataset”, for my metrics it says “No feedback”. But experiment results are available.
While running an experiment there are no any errors on any requests. Checked it via network in browsers console.

Thanks!

---

## Post #2 by @jacoblee93
*Posted on 2025-07-11 17:20:50*

Hey [/u/vertrue](@vertrue),

Apologies for this. We were in the middle of deploying a fix for this and it should be live momentarily.

Jacob

---

## Post #3 by @vertrue
*Posted on 2025-07-11 17:23:07*

Thanks for letting know, will be waiting!

---

## Post #4 by @jacoblee93
*Posted on 2025-07-11 17:33:49*

Fix should be live now, you shouldn’t have to refresh but might be good just in case.

Thank you again for reporting!

---

## Post #5 by @Gadi
*Posted on 2025-07-24 13:09:33*

vertrue:

trying to run experiment over a dataset in langsmith UI but it runs only 20 examples. Full e



We still suffer from this (stumbled on it 2 hours ago).

Tried to run 450 , and got ±20 covered in the experiment

---

## Post #6 by @vertrue
*Posted on 2025-07-24 14:24:23*

[/u/gadi](@Gadi) did you try to open full experiments results?

default playground ui displays only 20 first example. or this bug appeared again

---

## Post #7 by @Gadi
*Posted on 2025-07-24 15:20:41*

Hi Vertrue  -  yes , we tried and still seeing only 20.

Just to make sure I proparly “open full experiments results” : I click on “Datasets & Experiments” → See the table with experiments names , find the row of “my experiment”  (and the column of the “Run Count” reflects the number 18  - instead of 450) , and than click on that row , and seeing only 18 rows of experiment from dataset instead of 450.

---

## Post #8 by @edgargalvao
*Posted on 2025-08-01 17:23:27*

Hey, i have the same issue here. My dataset has 27 examples, but it only runs 20. i’ve tried create a split, use base split and “All examples“ option. But stills only 20 examples to run. How can i fix it?

---

## Post #9 by @Anejz
*Posted on 2025-08-26 11:12:42*

Hey, having the same issue here. I have 64 examples, but only 20 run. I have tried multiple times, but still only 20 ran.

---

## Post #11 by @EugeneJinXin
*Posted on 2025-11-04 22:45:56*

hello [/u/anejz](@Anejz) and [/u/edgargalvao](@edgargalvao) can you please retry and see if you still have this issue?  we made a few fixes hope they work for you!

---

## Post #12 by @polipoli
*Posted on 2025-12-15 01:40:02*

[/u/eugenejinxin](@EugeneJinXin)

I am still experiencing the same issue described above.

In LangSmith, when I go to Prompt > Set up evaluation and run an evaluation, only 20 samples are returned, even though the dataset contains more than 75 examples.

Additionally, I am unable to view the detailed experiment results.

Also, I am experiencing the issue below.


  
    
    
    
      [https://forum.langchain.com/t/experiments-in-langgraph-studio-show-completed-but-no-runs-available/1692](Experiments in LangGraph Studio Show “Completed” but No Runs Available) [/c/help/langsmith/8](Observability & Evals)
    
  
  
    I am running experiments in LangGraph Studio through LangSmith. I have added datasets with examples and configured an LLM as the judge for correctness evaluation. The setup is for a RAG application. 
When I execute the experiment against the staging environment via LangGraph Studio, the status shows “Experiments completed”, but no runs are displayed. That said, I can still see the traces under “Tracing Projects” as well as in “Evaluators”. 
[#p-2951-experiment-details-1]()Experiment details
 [/uploads/short-url/ksXT2u5PyICm3nz3lDRgBs8SLgD.png?dl=1]([Screenshot 2025-09-30 at 14.14.12]) …

---

## Post #13 by @IttaySegal
*Posted on 2026-01-04 07:52:28*

Hey,

We are too still suffer with the same issue. Trying different datasets of 64,69,34 and etc. Sometimes it may run 40 instead of 20, but still not a full coverage when we run more than 20 examples

---
