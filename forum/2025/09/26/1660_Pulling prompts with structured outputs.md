# Pulling prompts with structured outputs

**Topic ID:** 1660
**Created:** 2025-09-26 23:51:33
**URL:** https://forum.langchain.com/t/1660

**Tags:** python-help

---

## Post #1 by @emily
*Posted on 2025-09-26 23:51:33*

I want to use langsmith to version and iterate on my prompts. All my (prompt | model) chains require structured output. From what I can tell, if you set an output schema on a prompt (whether through the langsmith prompt playground UI directly or by adding a prompt from a trace with structured output to the playground), pull_prompt will return a StructuredPrompt (instead of a ChatPromptTemplate). if you pull_prompt with include_model=True, invoking the resulting runnable gives you a python dictionary. i want my invocation result to be a pydantic model.

is there a way to pull_prompt for a prompt with structured output, with include_model=True, and have the invocation result be a pydantic model without having to explicitly cast/deserialize it as such?

the clearest path forward i see is to not store the the prompt with an output schema, nor include_model. but this seems like a huge drawback wrt keeping track of all the “assets” associated with a given prompt configuration…

---
