# Viewing experiment metadata - such as model and prompt - for Langsmith evaluations

**Topic ID:** 1602
**Created:** 2025-09-19 20:15:35
**URL:** https://forum.langchain.com/t/1602

---

## Post #1 by @dividor
*Posted on 2025-09-19 20:15:35*

Most evaluation platforms capture parameters for the experiment, such as prompt version and model configuration. This allows the user to more easily track how changes in these parameters affect performance.

Running experiments in Langsmith UI, I can’t see anything to indicate which prompts and model parameters are used for an experiment. Are these accessible somewhere, please?

Thanks!

---

## Post #2 by @Jameskanyiri
*Posted on 2025-09-20 08:45:56*

Here is how to view the parameters used

After running the eval there is a link to langsmith where you will be able to see the input, ouput, reference output and the evaluators.

If you hover on a given evaluator entry you will see an arrow, click on that arrow this will open a side window where you can be able to see the trace, you can now click the model and see the any other information, for example the prompt used etc

[/uploads/short-url/fgvf3SK4NP82YIvHVmFOJoGFTst.png?dl=1](Screenshot 2025-09-20 at 11.27.052370×964 208 KB)

[/uploads/short-url/pyrtMU0wsmKvxuwvvxYOr09GzMb.jpeg?dl=1](Screenshot 2025-09-20 at 11.27.551920×1425 165 KB)

---

## Post #3 by @dividor
*Posted on 2025-09-21 01:37:38*

Thanks for taking the time, but unfortunately, the above doesn’t capture model parameters such as temperature, token limits, and an array of other parameters that can be tuned and experimented with. Also, the prompt version isn’t captured as far as I can tell.

So looking at an experiment, I can’t tell what was actually tested.

Other platforms such as confident-ai capture these, I was wondering if Langsmith has similar features I am missing perhaps?

---

## Post #4 by @gmetzker-4c
*Posted on 2025-09-26 16:58:53*

I found this frustrating as well.  Quite of few of our experiments were comparing different models and in the main Experiments page there is no easy top level way to view this.

I end up naming all my experiments according to the model/version used which helps but it seems like this should be available on the experiments viewer page.


It would be nice if you could set a custom name format Experiments to with possibility to include model name  or parameters
Add model name/parameters as columns to the Experiments table

---

## Post #5 by @dividor
*Posted on 2025-09-26 21:14:30*

Yeah, thanks, that’s what we’re doing.

Langsmith has a lot of great features, but some of the basics like this seem to still be missing.

---
