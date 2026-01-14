---
title: "Auth-aware tool responses"
url: "https://docs.langchain.com/langsmith/agent-builder-auth-format"
section: "langsmith"
last_modified: "2025-12-16T22:07:23.605Z"
---
Some [tools](/langsmith/agent-builder-tools) require user authorization (for example, Google, Slack, GitHub). Agent Builder includes middleware to detect when a tool needs authorization and to pause the run with a clear prompt to the user. After the user completes auth, the same tool call is retried automatically.

## 

[​

](#return-shape-to-request-auth)

Return shape to request auth

If a tool detects missing authorization, return a JSON string containing the following fields:

Copy

```
{
  "auth_required": true,
  "auth_url": "https://auth.example.com/start",
  "auth_id": "opaque-tracking-id"
}
```

-   `auth_required`: set to `true` to signal an interrupt is needed.
-   `auth_url`: where the user should be redirected to authorize.
-   `auth_id`: optional correlation ID to track the auth session.

When Agent Builder detects this response, it interrupts the run, displays the authentication UI to the user, and automatically retries the tool call once authorization completes. If you want your custom tools to reuse the same authentication required interrupt + UI, ensure your tools return the same shape of JSON.

Return only this JSON as the tool’s output. Avoid including additional text or content. Agent Builder parses the response to trigger the authentication flow.

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/agent-builder-auth-format.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.