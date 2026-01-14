# # [Bug/Question] Runtime Context Not Working in Deployed LangSmith Agent - Headers and Config Stripped

**Topic ID:** 2705
**Created:** 2026-01-11 21:17:29
**URL:** https://forum.langchain.com/t/2705

**Tags:** js-help, cloud, langsmith-studio

---

## Post #1 by @itzhak-lobak
*Posted on 2026-01-11 21:17:29*

[#p-5363-summary-1]()Summary
I’m unable to pass runtime configuration (specifically `x-nxty-tenant-id`) to my deployed LangGraph agent on LangSmith. Both HTTP headers and request body fields are being stripped/ignored, but the same code works almost perfectly in local development.

Similar issue: [https://forum.langchain.com/t/manager-graph-does-not-get-the-header-despite-adding-the-custom-heade-in-langgraph-json/2037/14](Manager graph does not get the header despite adding the custom heade in langgraph.json - #14 by mariam-eissa)

[#p-5363-environment-2]()Environment

**LangGraph Version**: Latest (as of Jan 2026)
**LangChain Version**: `1.2.6`
**Node Version**: 20
**Deployment**: LangSmith Cloud (deployed via GitHub integration)
**Deployment ID**: afc7591d-cb78-4aa0-85b8-f97e35c5b110
**Agent Type**: `createAgent` from `langchain` package with custom middleware

[#p-5363-expected-behavior-3]()Expected Behavior
The middleware should receive tenant ID via `runtime.context` or `runtime.configurable` from:


HTTP header `x-nxty-tenant-id` (configured in `langgraph.json`)
Request body `context` field (with `contextSchema` defined)
Request body `config` field (for HTTP API)

[#p-5363-actual-behavior-4]()Actual Behavior
[#p-5363-local-development-langgraph-dev-5]()Local Development (`langgraph dev`)

 **Works**: `context` field in request body → accessible in `runtime.context`
 **Doesn’t work**: HTTP header `x-nxty-tenant-id` → not in `runtime.configurable`

[#p-5363-deployed-on-langsmith-6]()Deployed on LangSmith

 **Doesn’t work**: `context` field in request body → `runtime.context` is empty `{}`
 **Doesn’t work**: `config` field in request body → `runtime.configurable` is empty `{}`
 **Doesn’t work**: HTTP header `x-nxty-tenant-id` → `runtime.configurable` is empty `{}`

[#p-5363-configuration-files-7]()Configuration Files
[#p-5363-langgraphjson-8]()`langgraph.json`

```
`{
  "node_version": "20",
  "graphs": {
    "agent": "./src/agent/react-agent/index.ts:agent"
  },
  "http": {
    "configurable_headers": {
      "includes": ["x-nxty-tenant-id"]
    }
  },
  "env": ".env",
  "dependencies": ["."],
  "image_distro": "wolfi"
}
`
```

[#p-5363-agent-configuration-srcagentreact-agentindexts-9]()Agent Configuration (`src/agent/react-agent/index.ts`)

```
`import { createAgent } from 'langchain'
import * as z from 'zod'

const contextSchema = z.object({
  'x-nxty-tenant-id': z.string().optional(),
})

const stateSchema = z.object({
  messages: z.array(z.any()),
})

export const agent = createAgent({
  model: 'gpt-4o-mini',
  tools: [...],
  stateSchema,
  contextSchema,  // Defined to support runtime context
  middleware: [configureModelMiddleware],
  checkpointer: new MemorySaver(),
})
`
```

[#p-5363-middleware-srcagentreact-agentmiddlewareconfigure-modelts-10]()Middleware (`src/agent/react-agent/middleware/configure-model.ts`)

```
`import { createMiddleware } from 'langchain'

export const configureModelMiddleware = createMiddleware({
  name: 'ConfigureModel',
  stateSchema,
  wrapModelCall: async (request, handler) => {
    console.log('[ConfigureModel] Runtime:', JSON.stringify(request.runtime, null, 2))
    
    // Try all possible sources
    const tenantIdFromContext = request.runtime.context?.['x-nxty-tenant-id']
    const tenantIdFromConfigurable = request.runtime.configurable?.['x-nxty-tenant-id']
    
    console.log('tenantIdFromContext:', tenantIdFromContext)
    console.log('tenantIdFromConfigurable:', tenantIdFromConfigurable)
    
    // Both are undefined in deployed environment!
    
    return handler(request)
  },
})
`
```

[#p-5363-test-cases-11]()Test Cases
[#p-5363-local-development-works-partially-12]()Local Development (Works Partially)

```
`# ✅ Works: context in body
curl -X POST http://localhost:2024/threads/test-123/runs/stream \
  -H "Content-Type: application/json" \
  -d '{
    "input": {"messages": [{"role": "user", "content": "hello"}]},
    "context": {"x-nxty-tenant-id": "test-tenant"},
    "assistant_id": "agent"
  }'

# Logs show: runtime.context = {"x-nxty-tenant-id": "test-tenant"} ✅
`
```


```
`# ❌ Doesn't work: HTTP header
curl -X POST http://localhost:2024/threads/test-123/runs/stream \
  -H "Content-Type: application/json" \
  -H "x-nxty-tenant-id: test-tenant" \
  -d '{
    "input": {"messages": [{"role": "user", "content": "hello"}]},
    "assistant_id": "agent"
  }'

# Logs show: runtime.configurable = undefined ❌
`
```

[#p-5363-deployed-on-langsmith-nothing-works-13]()Deployed on LangSmith (Nothing Works)

```
`# ❌ Attempt 1: context field
curl -X POST https://my-app.us.langgraph.app/threads/test-123/runs/stream \
  -H "Content-Type: application/json" \
  -H "x-api-key: lsv2_pt_..." \
  -d '{
    "input": {"messages": [{"role": "user", "content": "hello"}]},
    "context": {"x-nxty-tenant-id": "test-tenant"},
    "assistant_id": "agent"
  }'

# Logs show: runtime.context = {} ❌
`
```


```
`# ❌ Attempt 2: config field (as per docs)
curl -X POST https://my-app.us.langgraph.app/threads/test-123/runs/stream \
  -H "Content-Type: application/json" \
  -H "x-api-key: lsv2_pt_..." \
  -d '{
    "input": {"messages": [{"role": "user", "content": "hello"}]},
    "config": {"x-nxty-tenant-id": "test-tenant"},
    "assistant_id": "agent"
  }'

# Logs show: runtime.configurable = undefined ❌
`
```


```
`# ❌ Attempt 3: HTTP header (as per langgraph.json config)
curl -X POST https://my-app.us.langgraph.app/threads/test-123/runs/stream \
  -H "Content-Type: application/json" \
  -H "x-api-key: lsv2_pt_..." \
  -H "x-nxty-tenant-id: test-tenant" \
  -d '{
    "input": {"messages": [{"role": "user", "content": "hello"}]},
    "assistant_id": "agent"
  }'

# Logs show: runtime.configurable = undefined ❌
`
```

[#p-5363-observations-14]()Observations

**Local dev**: `contextSchema` works for `context` field, but `configurable_headers` doesn’t work for HTTP headers
**Deployed**: Neither `contextSchema` nor `configurable_headers` work - both `runtime.context` and `runtime.configurable` are always empty objects or undefined
The headers ARE being sent (verified with curl verbose mode)
The LangSmith deployment logs show the middleware is being called, but runtime objects are empty

[#p-5363-questions-15]()Questions


**Is there a known issue with `configurable_headers` in LangSmith deployments?** The documentation suggests this should work, but it appears to be stripped before reaching the middleware.



**Why doesn’t `contextSchema` work in deployed environments?** The docs show examples using `context` parameter with SDK, but it’s unclear if this should work with HTTP API.



**Is there a different approach for passing runtime configuration to deployed agents?** We need to support multi-tenant deployments where each request needs tenant-specific configuration.



**Are there any LangSmith-specific configurations needed?** Maybe something in the deployment settings or environment variables?



[#p-5363-workarounds-attempted-16]()Workarounds Attempted

 Using assistants API with pre-configured assistants (works but not scalable for multi-tenant)
 Environment variables (can’t be dynamic per-request)
 State-based approach (state is for conversation-level data, not request-level config)
 Custom HTTP middleware via `webapp.py` (Python only, we’re using TypeScript/JavaScript)

[#p-5363-documentation-references-17]()Documentation References

[https://docs.langchain.com/oss/javascript/langchain/runtime](Runtime Context)
[https://docs.langchain.com/langsmith/configurable-headers](Use HTTP headers for runtime configuration)
[https://docs.langchain.com/oss/javascript/langchain/context-engineering](Context Engineering)

[#p-5363-request-18]()Request
Could someone from the LangChain team or community provide guidance on:


How to properly pass runtime configuration to deployed LangSmith agents
Whether this is a bug or a configuration issue on our end
Any workarounds or best practices for multi-tenant deployments

This is blocking our production deployment as we need per-request tenant isolation for security and data separation.

Thank you!


**Additional Context**: We’re building a multi-tenant SaaS where each request needs to load tenant-specific secrets (API keys, database connections, etc.) based on the incoming tenant ID. The current behavior makes it impossible to implement this pattern securely.

---
