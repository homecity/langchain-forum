# Langsmith Studio not showing state schema

**Topic ID:** 2371
**Created:** 2025-11-27 16:06:23
**URL:** https://forum.langchain.com/t/2371

**Tags:** langsmith-studio

---

## Post #1 by @hesamzkr
*Posted on 2025-11-27 16:06:23*

Hi, I am returning a compiled state graph from this script as graph and it launches the server and shows the nodes and edges correctly and runs but in the input state it’s not able to recognize and render the state schema, which makes it harder to interact with. Am I missing something or is it a bug?

Currently the server is being run locally

The graph variable is an async method being called when file is loaded like. The graph state isn’t being loaded into this file directly instead a function is being loaded which creates compiled graph


```
`export const graph = (async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const compiledStateGraph = createGraph(props);

  return compiledStateGraph;
})();
`
```

Thank you

[/uploads/short-url/jlazPKKKyCeXJyJ3ZW9UeCNNvvq.png?dl=1](image1376×524 22.8 KB)

langgraph.json:


```
`{
  "node_version": "22",
  "graphs": {
    "agent": "./scripts/studio/index.ts:graph"
  },
  "env": ".env",
  "dependencies": ["."],
  "image_distro": "wolfi"
}

`
```

---

## Post #2 by @Josh
*Posted on 2025-11-28 17:59:57*

Hi - thanks for reaching out! Can you share more on how you’re defining the state in createGraph? Are you using a state annotation, zod or something else? [https://docs.langchain.com/oss/javascript/langgraph/use-graph-api#alternative-state-definitions](Use the graph API - Docs by LangChain)

---

## Post #3 by @hesamzkr
*Posted on 2025-11-28 21:34:48*

I’m using state annotation. example:


```
`export const GraphState = Annotation.Root({
  question: Annotation,
  generation: Annotation,
  answer: Annotation,
});
`
```


```
`import { GraphState } from './state';

export const createGraph = () => {

  return new StateGraph(GraphState)
    .addNode
    ...
    .compile({ checkpointer });
}
`
```

---
