# Prompt name is not selected automatically when i go from trace to playground

**Topic ID:** 1365
**Created:** 2025-08-27 14:37:30
**URL:** https://forum.langchain.com/t/1365

---

## Post #1 by @Maya
*Posted on 2025-08-27 14:37:30*

When i go from trace to playground , first the prompt name is not selected automatically which mean my model configs are not selected properly. So when i select prompt name manually, my chat disappear and i cant test the trace.

---

## Post #2 by @Maya
*Posted on 2025-08-27 14:38:34*

Step 1.  trace

[/uploads/short-url/jcKx3P1WYoEi8QPFiqTIk23N5HY.jpeg?dl=1](image1920×1043 123 KB)

---

## Post #3 by @Maya
*Posted on 2025-08-27 14:39:25*

Step2. playground. you see prompt name is not selected

[/uploads/short-url/lfGyWvtZK3UY62HUwLejfnh65CX.jpeg?dl=1](image1920×1043 156 KB)

---

## Post #4 by @Maya
*Posted on 2025-08-27 14:40:04*

step3 manually selecting prompt disappear the conversation

[/uploads/short-url/6dG0iWtKESWOVmNgsy1o7d6mDBI.jpeg?dl=1](image1920×1043 180 KB)

---

## Post #5 by @madams0013
*Posted on 2025-08-27 19:40:26*

Hi Maya — thanks for flagging this! I can see the issue you’re running into. We’re working on a better solution to this so that when you open a prompt in the playground from a trace, your default model configuration will be automatically selected.

In the meantime, you can keep your preferred setup without losing the prompt by saving your OpenAI Compatible endpoint model configuration as a **saved configuration**. That way, it’s easy to re-apply whenever you need it.

Here are the docs with step-by-step instructions: [https://docs.smith.langchain.com/prompt_engineering/how_to_guides/managing_model_configurations?utm_source=chatgpt.com#creating-saved-configurations](https://docs.smith.langchain.com/prompt_engineering/how_to_guides/managing_model_configurations#creating-saved-configurations)

Let me know if you have any other questions!

---
