# How to use interrupt with astream for frontend interaction?

**Topic ID:** 1516
**Created:** 2025-09-12 13:18:58
**URL:** https://forum.langchain.com/t/1516

**Tags:** python-help, intro-to-langgraph

---

## Post #1 by @alonahmias
*Posted on 2025-09-12 13:18:58*

Hi team, thank you for the great work on LangGraph! I’m working on a project and need some help understanding how to properly use `interrupt` in combination with the `astream` function.


[#p-2574-setup-1]()**Setup**


**Frontend:** Streamlit app with a simple streaming chat interface.



**Backend:** LangGraph agent with the following node flow:



`generate_plan`



`human_decision` — this is where I use `interrupt`



`execute_plan` — this executes tools based on the approved plan





The flow looks like this:


```
`generate_plan -> human_decision (interrupt) -> [user approves] -> execute_plan
                                      |
                                 [user rejects]
                                      ↓
                             back to generate_plan with user feedback

`
```


[#p-2574-my-question-2]()**My Question**
I’m unclear on how to handle the `interrupt` inside an `astream` call so that:



The `interrupt` can pause and wait for user input from the frontend.



The frontend can properly receive and respond to the interrupt (e.g. show a message, buttons, or form for user feedback).



I can then resume the graph flow once the user responds.



What I’d like to understand is:



What is the recommended way to yield/return the interrupt back to the frontend when using `agraph.astream()`?



What object/type should I expect or listen for on the frontend side to know when an interrupt has occurred?



How do I resume the LangGraph flow after the user provides their input?



Any examples, tips, or best practices would be hugely appreciated!

#help:langgraph

---

## Post #2 by @Isaac
*Posted on 2025-09-12 18:25:07*

Hi! This docs page should help you get started, there is a specific section in Interrupts: [https://docs.langchain.com/langgraph-platform/use-stream-react](How to integrate LangGraph into your React application - Docs by LangChain)

---

## Post #3 by @alonahmias
*Posted on 2025-09-15 12:27:50*

But i don’t want to use the Langgraph server , i want to implement the backend myself, the langgraph server doesnt provide me with what i want

---
