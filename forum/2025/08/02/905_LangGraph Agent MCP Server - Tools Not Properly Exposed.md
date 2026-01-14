# LangGraph Agent MCP Server - Tools Not Properly Exposed

**Topic ID:** 905
**Created:** 2025-08-02 20:07:45
**URL:** https://forum.langchain.com/t/905

---

## Post #1 by @ksiskar
*Posted on 2025-08-02 20:07:45*

Hello!

We successfully set up our LangGraph Agent’s MCP Server and can connect to it in MCP Clients. However, we are having an issue where our agents existing tools are not being exposed through the MCP. What am I missing?



I have read through ***[https://docs.langchain.com/langgraph-platform/server-mcp#use-user-scoped-mcp-tools-in-your-deployment](MCP endpoint in LangGraph Server Documentation),*** and double checked “**Use user-scoped MCP tools in your deployment”.** Can someone point me in the right direction here?

Sharing a bit more technical knowledge below in case it helps:

**Issue Summary:**

We have successfully deployed a LangGraph Agent with MCP Server capabilities, but individual tools within the agent are not being exposed through the MCP endpoint as expected.

**What’s Working:**

 MCP endpoint initialization succeeds

 Capabilities properly declared: {“tools”: {“listChanged”: false}}

 Can connect with MCP clients

 tools/call method accepts requests

**What’s Not Working:**

 tools/list returns “Internal Server Error”

 Agent’s internal tools (9 LangChain tools) not discoverable via MCP

 MCP clients show “No tools or prompts” when connecting

**Technical Details:**

**Our Setup:**



LangGraph API version: 0.2.119 (confirmed via MCP response)



Agent has 9 bound tools (serpAPITool, webScraperTool, etc.)



MCP-optimized input/output schemas implemented



langgraph.json configured with proper agent description



**Expected Behavior:**

Based on LangGraph MCP documentation, we expected:



tools/list to return our agent as a discoverable tool



Individual tools within the agent to be accessible via MCP



External MCP clients to see and use our agent’s capabilities



Current Behavior:


```
`# This works:
curl -X POST /mcp -d '{"jsonrpc":"2.0","method":"initialize",...}'
# Returns: {"capabilities":{"tools":{"listChanged":false}}}

# This fails:
curl -X POST /mcp -d '{"jsonrpc":"2.0","method":"tools/list",...}'
# Returns: "Internal Server Error"
`
```

**Questions:**



Do LangGraph agents automatically expose their individual tools via MCP, or only the agent itself?



Is there additional configuration needed beyond the standard langgraph.json setup?



Is the tools/list Internal Server Error a known issue?



Do we need to implement custom MCP tool exposure for our agent’s internal tools?



Any guidance would be greatly appreciated! We’re particularly interested in understanding the expected architecture for exposing tool-enabled agents via MCP.

**Environment:**



Platform: LangGraph Cloud



LangGraph API: ≥0.2.3



LangGraph SDK: ≥0.1.61

---
