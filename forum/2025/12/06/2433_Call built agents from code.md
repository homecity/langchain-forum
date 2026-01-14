# Call built agents from code

**Topic ID:** 2433
**Created:** 2025-12-06 17:15:08
**URL:** https://forum.langchain.com/t/2433

---

## Post #1 by @13kz
*Posted on 2025-12-06 17:15:08*

Hi everyone,

I’m trying to invoke an Agent Builder agent from my Next.js application using the [/u/langchain](@langchain)/langgraph-sdk package, but my runs fail immediately with status: “error” without any detailed error message.

**Setup:**



Agent Builder agent



Model: anthropic:claude-sonnet-4-5



Visibility: tenant (workspace-scoped)



LangGraph SDK: [/u/langchain](@langchain)/langgraph-sdk (latest)



Framework: Next.js 16



**What works:**



 Authentication with PAT (Personal Access Token)



 client.assistants.get(AGENT_ID) returns the agent successfully



 client.threads.create() works



 client.runs.create() creates a run with status pending



**What fails:**



 The run immediately transitions to status: “error” (within 1 second)



 No detailed error message in the run object



 client.runs.stream() and client.runs.wait() both throw PermissionDeniedError



**My code:**


```
`import { Client } from “
/langgraph-sdk”;

const client = new Client({
apiUrl: process.env.LANGGRAPH_API_URL,  // https://prod-deepagents-agent-build-xxx.us.langgraph.app
apiKey: process.env.LANGGRAPH_API_KEY,  // PAT token (lsv2_pt_xxx)
defaultHeaders: {
“X-Auth-Scheme”: “langsmith-api-key”,
},
});

const AGENT_ID = “xxxxx”; //retrieve from code snippet

// This works
const agent = await client.assistants.get(AGENT_ID);
console.log(agent.name); // “Healthcare Appointment Booking Assistant” ✅

// This creates a thread
const thread = await client.threads.create(); // ✅

// This creates a run but it fails immediately
const run = await client.runs.create(thread.thread_id, AGENT_ID, {
input: { messages: [{ role: “user”, content: “Hello” }] },
});
// run.status = “pending” initially, then “error” after 1 second

// This throws PermissionDeniedError
await client.runs.wait(thread.thread_id, AGENT_ID, {
input: { messages: [{ role: “user”, content: “Hello” }] },
});
`
```

Environment:

PAT belongs to the agent owner (same ls_user_id)

Agent works fine in the Agent Builder UI

Using the correct API URL from Agent Builder settings

Questions:


Why does runs.stream() and runs.wait() throw PermissionDeniedError while runs.create() works?
How can I get the actual error details from a failed run?
Is there something specific I need to configure for workspace-scoped (tenant) agents?
Could this be related to the Anthropic API key configuration in Agent Builder?

Any help would be appreciated!

---
