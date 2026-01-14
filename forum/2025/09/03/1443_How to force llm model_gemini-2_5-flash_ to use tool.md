# How to force llm model(gemini-2.5-flash) to use tool

**Topic ID:** 1443
**Created:** 2025-09-03 13:42:39
**URL:** https://forum.langchain.com/t/1443

**Tags:** js-help

---

## Post #1 by @ashishkujoy
*Posted on 2025-09-03 13:42:40*

I am trying to build a coding agent using langgraph. I am currently developing a graph that try to understand the user query and gather the requirement by asking question to user. Currently sometime the llm uses my ‘askUserTool‘ but many times it does not uses the tool and simply frame the question in the response.

My Code is on this github repo: [https://github.com/ashishkujoy/ai-coding-agent](GitHub - ashishkujoy/ai-coding-agent)

graph code: [https://github.com/ashishkujoy/ai-coding-agent/blob/main/src/nodes/requirementGatherer.ts](ai-coding-agent/src/nodes/requirementGatherer.ts at main · ashishkujoy/ai-coding-agent · GitHub)

And the system prompt i am using is here.: [https://github.com/ashishkujoy/ai-coding-agent/blob/main/src/prompts/requirement-gathering.ts](ai-coding-agent/src/prompts/requirement-gathering.ts at main · ashishkujoy/ai-coding-agent · GitHub)

Output gist: [https://gist.github.com/ashishkujoy/9595b105df253930770a150a098a759b](AI coding agent output · GitHub)

Kindly someone please help me understand the issue with the prompt or how i am creating graph.

---

## Post #2 by @AndyM10
*Posted on 2025-09-03 21:10:06*

Hi,

The `bindTools` method takes a optional second argument where you can pass a `tool_choice` stating the name of the tool you want to force the llm to call .

If you want to to always call a tool but don’t want to choose a specific tool to always run you can pass `any` to this `tool_choice` and the llm will pick the most appropriate tool depending on the query.


  
      

      [https://js.langchain.com/docs/how_to/tool_choice/](js.langchain.com)
  

  
    

[https://js.langchain.com/docs/how_to/tool_choice/](How to force tool calling behavior | 🦜️🔗 Langchain)

  In order to force our LLM to select a specific tool, we can use the



  

  
    
    
  

  


Hope this helps!

---
