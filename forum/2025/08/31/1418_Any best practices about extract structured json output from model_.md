# Any best practices about extract structured json output from model?

**Topic ID:** 1418
**Created:** 2025-08-31 03:52:09
**URL:** https://forum.langchain.com/t/1418

**Tags:** js-help

---

## Post #1 by @postbird
*Posted on 2025-08-31 03:52:09*

I am learning `structured_output` in langchain from the doc [https://js.langchain.com/docs/how_to/structured_output/#advanced-raw-outputs](How to return structured data from a model | 🦜️🔗 Langchain)

Is there any best practice and the better packages in JS stack to extract JSON response from the llm without using `.`withStructuredOutput`？`

`The llm I am using is not good at `extract` tool based on the `withStructuredOutput` approach like below, here is the `extract schema:


```
`{
    "name": "extract",
    "parameters": {
        "type": "object",
        "properties": {
            "summary": {
                "type": "string",
                "description": "Concise summary of the webpage content"
            },
            "key_excerpts": {
                "type": "string",
                "description": "Important quotes and excerpts from the content"
            }
        },
        "required": [
            "summary",
            "key_excerpts"
        ],
        "additionalProperties": false,
        "$schema": "http://json-schema.org/draft-07/schema#"
    }
}
`
```

Most of time, it’s failed to extract (maybe the llm is poor):

[/uploads/short-url/xVTMk65kh1fvFcgT8a9ESk2xULN.png?dl=1](image1218×1738 389 KB)

So, the only way for me is to use prompt to let llm return json code block, and build a custom extactor.

I am finding some help and the packages can improve the efficiency:



better way or packages to extract code block from markdown



packages recommendation like  `dirty-json or ``[https://www.npmjs.com/package/jsonrepair](jsonrepair)```

---

## Post #2 by @postbird
*Posted on 2025-08-31 03:56:32*

I have read the topic `https://forum.langchain.com/t/should-withstructuredoutput-throw-an-error-when-get-some-wrong-input/1315`

It seems like my llm provider also doesn’t support the `method`

---

## Post #3 by @AndyM10
*Posted on 2025-09-03 21:19:08*

Have you tried using a tool to enforce structured output.


  
      

      [https://langchain-ai.github.io/langgraph/how-tos/react-agent-structured-output/#define-graph](langchain-ai.github.io)
  

  
    

[https://langchain-ai.github.io/langgraph/how-tos/react-agent-structured-output/#define-graph](How to force tool-calling agent to structure output)

  Build reliable, stateful AI systems, without giving up control



  

  
    
    
  

  


There is an example here, that doesn’t rely on WithStructuredOutput but rather passing a schema to a tool

Hope this help!

---

## Post #4 by @postbird
*Posted on 2025-09-04 10:23:44*

I will try this, thanks U!

---
