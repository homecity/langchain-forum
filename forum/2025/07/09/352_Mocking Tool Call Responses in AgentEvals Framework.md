# Mocking Tool Call Responses in AgentEvals Framework

**Topic ID:** 352
**Created:** 2025-07-09 13:43:42
**URL:** https://forum.langchain.com/t/352

---

## Post #1 by @ssmithra
*Posted on 2025-07-09 13:43:42*

Hi all,

This might be confusion on my part, but does the AgentEvals Framework mock tool calling under the hood for us automagically? I want to test trajectory, and I’d of course like to use the actual list of messages from the invocation of the agent to test against an expected list of messages. However, I do not want Tools to get executed (like a typical unit test you would usually mock API calls).

Thanks.

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-09 16:23:59*

AgentEvals Framework doesn’t automatically mock tool calls, it runs your agent with real tool executions by default. To test trajectory without executing tools, you need to manually mock them by creating dummy tool implementations that return expected responses without side effects, or use a mocking library like unittest.mock to patch your tools before passing them to the evaluation. This lets you test the agent’s decision making and message flow while controlling tool outputs for predictable testing scenarios.

---
