# Bug with high precision results from code evaluators

**Topic ID:** 1551
**Created:** 2025-09-16 20:55:24
**URL:** https://forum.langchain.com/t/1551

---

## Post #1 by @gmetzker-4c
*Posted on 2025-09-16 20:55:24*

I’m not sure if this is the appropriate place for issue reports.  If not please, redirect me and I’ll file elsewhere.

[#p-2638-issue-1]()Issue
I have several LangSmith Experiments with Custom code evaluators.  In the results display I’ve noticed that some of the result values will be displayed as a grayed out “No feedback” rather than the float value that my evaluator returns.

This is not correct, because if I drill in to the “execute_custom_evaluator” page I can see the result.  From what I’ve observed, if python outputs a high precision value, you will see this “No feedback” in the feedback display columns.

After reviewing a few examples, it appears when my custom evaluator is doing division, e.g. **2/3 = 0.6666666666666666**.

Additionally, the aggregate “Avg” value displayed in the top of the column header appears to be ignoring any of these high-precision values that it cannot display.  In this example, it is showing a 1.0 score for the AVG even though a few items are below 1.0.

[/uploads/short-url/fmmhBkbx6HyPAtVmu5rcx3MO2km.jpeg?dl=1](experiment_with_high_precision1920×891 78.1 KB)

[#p-2638-work-around-2]()Work around
If I change the evaluator code to **round(value, 4)**, the value is properly displayed in the feedback cells, and the AVG value is now computed correctly showing 0.97.

Thanks in advance!

---

## Post #2 by @gmetzker-4c
*Posted on 2025-09-16 20:57:50*

Here is what the UI looks like after the work around.

[/uploads/short-url/6vCpUKWwuG5Lb5XpAzeHtAcuur3.jpeg?dl=1](experiment_with_rounding1920×1038 98.9 KB)

---

## Post #3 by @EugeneJinXin
*Posted on 2025-09-19 20:21:03*

Thank you very much for reporting, we got awareness of this error now and will push a fix!

---
