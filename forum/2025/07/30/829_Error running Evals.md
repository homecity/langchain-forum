# Error running Evals

**Topic ID:** 829
**Created:** 2025-07-30 13:29:51
**URL:** https://forum.langchain.com/t/829

---

## Post #1 by @JarredR092699
*Posted on 2025-07-30 13:29:51*

Goodmorning all,

I am having an issue running an experiment in the LangSmith UI using LLM as a judge. For some reason I am getting this error message in the output. This is the first time I’ve run evals so I am confused and it’s been difficult finding an answer so I hope this forum can point me in the right direction.

[/uploads/short-url/zwmLmHqBZHa0nqRe5iNP2p29ung.png?dl=1](image1036×454 64.9 KB)

---

## Post #2 by @jacoblee93
*Posted on 2025-07-30 16:12:10*

Hi [/u/jarredr092699](@JarredR092699),

It looks like your prompt is expecting a key named `question` as part of your input. You can either change that to `{InputText}` or click `InputText` in your `Inputs` column and change that to `question`

---

## Post #3 by @JarredR092699
*Posted on 2025-07-30 17:10:17*

Jacob,

Thanks for the response. I guess I’m confused on what “prompt” the error message is referring to. I have loaded an LLM as a judge for my evaluator and edited the fields there to match my input/output schema from my dataset.. but I’m still getting the same error message.

---

## Post #4 by @jacoblee93
*Posted on 2025-07-30 17:28:49*

Can you send a screenshot of the whole screen?

---
