# Best way to enforce strict puzzle-like constraints in langchain?

**Topic ID:** 2452
**Created:** 2025-12-08 18:48:24
**URL:** https://forum.langchain.com/t/2452

---

## Post #1 by @blaine458
*Posted on 2025-12-08 18:48:24*

I’m testing a small word-puzzle workflow in LangChain, and I keep running into inconsistent outputs whenever the model has to follow strict letter-based constraints. I’m using a simple daily puzzle format as a reference, similar to a [https://spellbeegame.com/](word challenge page), just to benchmark how the agent handles limited letter sets.

The issue is that langchain sometimes follows the rules perfectly and other times generates words that break the constraints entirely. I’m not sure if this is a prompt-structure problem, an output-parsing issue, or something I should be handling with an additional validation layer.

Has anyone here dealt with this kind of constraint-based generation? I’d appreciate any pointers on stabilizing the behavior.

---

## Post #2 by @MchoneDev
*Posted on 2025-12-16 14:12:51*

This is a great opportunity to create an eval that can be re-used! You can use an eval both for measuring your program’s performance but also as a feedback loop for the agent live in the loop. What I would suggest is to model the game board in memory and determine whether the word produced is valid given the context of the game board. If it is not, return a meaningful message to the agent, reminding it of the rules. Something like “spell is not a valid word. Violated rules:  Words must include the center letter”. By using this, you can provide automated feedback in the moment to the agent and this feedback can be automated through code rather than through an LLM as a Judge, so you can keep the checks quick without impacting users.

---
