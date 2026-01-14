# built something so my agents can learn from their own mistakes

**Topic ID:** 2158
**Created:** 2025-11-11 02:36:36
**URL:** https://forum.langchain.com/t/2158

---

## Post #1 by @M4T1SS3
*Posted on 2025-11-11 02:36:36*

hey everyone 

i’ve been playing around with langchain agents for a while, and honestly got tired of this cycle:

**agent fails → check logs → tweak prompt → test → repeat**

it felt like i was the one learning, not the model 

so i hacked together something called **[https://github.com/M4T1SS3/DeltaLoop?utm_source=chatgpt.com](DeltaLoop)**

it just takes the logs your agent already produces and turns them into training data, then fine-tunes a small LoRA adapter automatically.

repo’s here if you want to check it out or play with it:

[https://github.com/M4T1SS3/DeltaLoop?utm_source=chatgpt.com](github.com/M4T1SS3/DeltaLoop)

also:

i’m still pretty new to this community, so if anyone has **feedback, ideas, or wants to contribute**, i’d really appreciate it

---
