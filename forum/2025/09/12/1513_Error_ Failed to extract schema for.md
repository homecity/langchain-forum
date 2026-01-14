# Error: Failed to extract schema for

**Topic ID:** 1513
**Created:** 2025-09-12 03:46:22
**URL:** https://forum.langchain.com/t/1513

---

## Post #1 by @johnsonfamily1234
*Posted on 2025-09-12 03:46:22*

I’m using Typescript on Windows and am blocked on local development. Any time I spin up the server I just get “Error: Failed to extract schema for {agent name}” for each of the agents in the project. Nothing runs.

On another project on the same machine I get the same errors but it works.

Have had this issue on another machine and it would come and go - sometimes work after I restarted a few times.

Another engineer on the same project has no issues working on it on his Mac.

I am sure this isn’t the best information but I’ve done a bunch of research, asked Deep Research & can’t find a practical solution.

Any thoughts or leads that might help me resolve this?

An example of the error that repeatedly happens is:

info:     → GET /assistants/af899edb-a679-53c2-aca6-b756ceacc0a7/schemas 500 30s

Error: Failed to extract schema for “assistant-v1”

at getCachedStaticGraphSchema (file:///C:/repos/indigo-nx/apps/langgraph-assistant-chat/node_modules/@langchain/langgraph-api/dist/graph/load.mjs:90:19)

at async file:///C:/repos/indigo-nx/apps/langgraph-assistant-chat/node_modules/@langchain/langgraph-api/dist/api/assistants.mjs:110:29

at async file:///C:/repos/indigo-nx/apps/langgraph-assistant-chat/node_modules/@langchain/langgraph-api/dist/api/assistants.mjs:106:20

at async dispatch (file:///C:/repos/indigo-nx/apps/langgraph-assistant-chat/node_modules/hono/dist/compose.js:22:17)

at async file:///C:/repos/indigo-nx/apps/langgraph-assistant-chat/node_modules/hono/dist/validator/validator.js:81:5

at async dispatch (file:///C:/repos/indigo-nx/apps/langgraph-assistant-chat/node_modules/hono/dist/compose.js:22:17)

at async file:///C:/repos/indigo-nx/apps/langgraph-assistant-chat/node_modules/@langchain/langgraph-api/dist/http/middleware.mjs:55:9

at async dispatch (file:///C:/repos/indigo-nx/apps/langgraph-assistant-chat/node_modules/hono/dist/compose.js:22:17)

at async logger2 (file:///C:/repos/indigo-nx/apps/langgraph-assistant-chat/node_modules/hono/dist/middleware/logger/index.js:38:5)

at async dispatch (file:///C:/repos/indigo-nx/apps/langgraph-assistant-chat/node_modules/hono/dist/compose.js:22:17) {

[cause]: Error: Schema extract worker timed out

at Timeout._onTimeout (C:\repos\indigo-nx\apps\langgraph-assistant-chat\node_modules@langchain\langgraph-api\dist\graph\parser\index.mjs:23:24)

at listOnTimeout (node:internal/timers:588:17)

at process.processTimers (node:internal/timers:523:7)

}

info:     → GET /assistants/fec3fe5c-13b9-5cb8-9af8-dd5c10c0a3ed/schemas 500 30s

---

## Post #2 by @Isaac
*Posted on 2025-09-12 17:23:33*

Hey [/u/johnsonfamily1234](@johnsonfamily1234) - sorry to hear this. Can you share a little more about how your graphs are defined? Any insight into the topology of your graphs, and how they are compiled would be very helpful.

---

## Post #3 by @johnsonfamily1234
*Posted on 2025-09-13 16:22:13*

Hey [/u/isaac](@Isaac) - thanks for the response. I had sonnet 4 describe the topology and compilation (as I figured it would do a better job than I would) - here’s what we’ve got. Note that this branch has some debugging work I was doing already that isn’t normally there.

I appreciate the mindshare & any thoughts you might have that would help me focus my efforts. Also note that we are not really currently using the open canvas agent right now - if removing that might help it’s on the table. Thanks!

**Project Structure & Configuration**

**Location:** apps/langgraph-assistant-chat/

**LangGraph Configuration Files:**



**Primary:** langgraph.json - Defines 3 graphs with Node.js 20 runtime



**Simplified:** langgraph.simple.json - Contains only the assistant-v1 graph



**Environment:** Uses .env file for configuration



**Key Dependencies:**



[/u/langchain](@langchain)/langgraph: v0.4.6



[/u/langchain](@langchain)/langgraph-sdk: v0.0.109



[/u/langchain](@langchain)/langgraph-cli: v0.0.63



[#p-2591-graph-definitions-1]()**Graph Definitions**
Your project contains **3 distinct graphs** as defined in langgraph.json:

json

{

“graphs”: {


```
`"src": "./src/open-canvas/index.ts:graph",

"assistant-v1": "./src/assistant/index.ts:graph", 

"reflection": "./src/reflection/index.ts:graph"
`
```

}

}


[#p-2591-h-1-assistant-graph-assistant-v1-2]()**1. Assistant Graph (assistant-v1)**
**File:** src/assistant/index.ts

**Compilation:**

typescript

export const graph = builder.compile().withConfig({

runName: “assistant”,

recursionLimit: 256

});

**Node Topology:**

text

START → router → [agent | generateImageNode]


```
`                ↓         ↓

        \[executeTool | saveJob | respondToUser\] → saveJob

                ↓                                   ↓

        \[agent | saveJob\]                    saveReflection

                                                    ↓

                                                  END
`
```

**Active Nodes:**



router (initialRouter) - Entry point routing logic



agent - Main conversational agent



respondToUser - Final response agent (marked as final)



generateImageNode - Image generation



executeTool - Tool execution handler



saveReflection - Reflection persistence



saveJob - Job state persistence



**Commented Out (Deep Research Subgraph):**



deepResearchPlanningNode



deepResearchAgent



deepResearchToolNode



deepResearchAuditorNode



**Routing Logic:**



Uses routeNode() function with Send() for conditional routing



Routes based on state.next field



Initial routing via initialRouter() checks for generateImage or runningCommand flags




[#p-2591-h-2-open-canvas-graph-src-3]()**2. Open Canvas Graph (src)**
**File:** src/open-canvas/index.ts

**Compilation:**

typescript

export const graph = builder.compile().withConfig({

runName: “open_canvas”

});

**Node Topology:**

text

START → generatePath → [updateArtifact | rewriteArtifactTheme | rewriteCodeArtifactTheme |


```
`                    respondToQuery | generateArtifact | rewriteArtifact | analyzeData\]

                            ↓

                    generateFollowup → reflect → cleanState → END

                            ↓

                    analyzeData → \[respondToQuery | cleanState | executeCode\]
`
```

**Nodes:**



generatePath - Initial routing/path generation



respondToQuery - Query response handler



rewriteArtifact - Artifact rewriting



rewriteArtifactTheme - Theme-based artifact rewriting



rewriteCodeArtifactTheme - Code artifact theme rewriting



updateArtifact - Artifact updates



generateArtifact - New artifact generation



generateFollowup - Follow-up generation



analyzeData - Data analysis



executeCode - Code execution



cleanState - State cleanup



reflect - Reflection processing




[#p-2591-h-3-reflection-graph-4]()**3. Reflection Graph**
**File:** src/reflection/index.ts

**Compilation:**

typescript

export const graph = builder.compile().withConfig({

runName: ‘reflection’

});

**Simple Linear Topology:**

text

START → reflect → (END - implicit)

**Single Node:**


reflect - Memory generation and persistence using Claude 3.5 Sonnet


[#p-2591-state-management-5]()**State Management**
**Assistant Graph State Schema:**



Uses StateSchema from src/assistant/state.ts



Extends MessagesAnnotation with 20+ custom fields



Key fields: artifacts, highlighted, next, tools, plan, etc.



**Configuration Schema:**



Defined in src/assistant/config.ts



Supports multiple AI providers: OpenAI, Anthropic, Google, XAI



Model selection, temperature, tokens, user/org context



**Routing Mechanism:**



All graphs use routeNode() function with Send() for dynamic routing



Routes determined by state.next field set by individual nodes



Error handling for missing routing state




[#p-2591-compilation-runtime-configuration-6]()**Compilation & Runtime Configuration**
**Development Scripts:**

json

{

“dev”: “cross-env NODE_OPTIONS=\”–max-old-space-size=4096 --no-warnings\" UV_THREADPOOL_SIZE=128 LANGGRAPH_DISABLE_SCHEMA_VALIDATION=true langgraphjs dev",

“dev:debug”: “cross-env NODE_OPTIONS=\”–max-old-space-size=8192 --inspect\" UV_THREADPOOL_SIZE=128 LANGGRAPH_DISABLE_SCHEMA_VALIDATION=true langgraphjs dev",

“dev:no-schema”: “cross-env LANGGRAPH_SKIP_SCHEMA_EXTRACTION=true NODE_OPTIONS=\”–max-old-space-size=4096\" langgraphjs dev"

}

**Key Runtime Flags:**



LANGGRAPH_DISABLE_SCHEMA_VALIDATION=true - Disables schema validation



LANGGRAPH_SKIP_SCHEMA_EXTRACTION=true - Skips schema extraction (alternative mode)



UV_THREADPOOL_SIZE=128 - Increases thread pool size



Memory allocation: 4GB-8GB for Node.js



**Environment Requirements:**



Node.js 20



TypeScript compilation



MongoDB connection for persistence



Multiple AI provider API keys

---
