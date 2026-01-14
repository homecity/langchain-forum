# How to have a nested tool/graph invocation have it's own tracer (js)

**Topic ID:** 1621
**Created:** 2025-09-23 17:47:11
**URL:** https://forum.langchain.com/t/1621

**Tags:** js-help

---

## Post #1 by @hesamzkr
*Posted on 2025-09-23 17:47:11*

I’m using Langchain js

I have a graph which calls a tool in one of it’s nodes via tool.invoke() I want to have the normal tracing continue including this tool but also with a different tracing project of ONLY this tool.

I’ve tried creating a `LangChainTracer` inside the node which executes the tool but the projectName I give it is ignored and uses the parent graph’s tracer from the `callbacks`

How can I achieve this? in the end there needs to be two tracing projects at the end of the execution.

one with the full graph including the tool.

one with only the tool.

---

## Post #2 by @jacoblee93
*Posted on 2025-09-23 20:14:52*

Hey [/u/hesamzkr](@hesamzkr),

Can you try wrapping your graph with a `traceable` invoked with the special `ROOT` value? Something like the following?


```
`  import { traceable, ROOT } from "langsmith/traceable";
  const parent = traceable(
    () => {
      const child = await myGraph.invoke({...});
      return child;
    },
    { client, project_name: ... }
  );

  await parent(ROOT);
`
```

---

## Post #3 by @hesamzkr
*Posted on 2025-09-24 14:07:32*

Hey [/u/jacoblee93](@jacoblee93), thank you answering

If I do that it half works but breaks and has some other problems. Firstly that part of the trace goes only to the new tracing project instead of also being part of the parent trace as well as the other tracing project.

This is not only a tracing visualization problem but it also causes the human-in-the-loop interrupt to not work and be propagated in the parent trace.

Two side notes: the reason for the configurable.thread_id is if I don’t pass it the postgres checkpointer won’t work properly. also it’s a tool I’m invoking which invokes a graph inside I’m not sure if this causes a problem vs just a graph

Basically it needs to be as if it was normally executed with the trace and everything but also have a side tracer that is encapsulated to this part with a different project. Please let me know if this is possible and how.

Thank 


```
`const parent = traceable(
      async () => {
        const child = await agentTool.invoke(toolCall, {
          configurable: {
            thread_id: parentUuid
          }
        });
        return child;
      },
      {
        client: client,
        project_name: project_name
        name: run_name,
      }
    );

const agentToolResponse = await parent(ROOT as any);
`
```

---

## Post #4 by @jacoblee93
*Posted on 2025-09-26 22:00:34*

Ahhh sorry I think I misread the intent of your initial question.

I don’t think we have a smooth way to do this sadly - you would need to create and use our `RunTree` API directly:


  
      

      [https://docs.langchain.com/langsmith/annotate-code#use-the-runtree-api](Docs by LangChain)
  

  
    

[https://docs.langchain.com/langsmith/annotate-code#use-the-runtree-api](Custom instrumentation - Docs by LangChain)

---
