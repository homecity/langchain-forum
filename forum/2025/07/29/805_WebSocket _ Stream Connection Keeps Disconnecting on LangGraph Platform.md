# WebSocket + Stream Connection Keeps Disconnecting on LangGraph Platform

**Topic ID:** 805
**Created:** 2025-07-29 13:17:28
**URL:** https://forum.langchain.com/t/805

**Tags:** cloud

---

## Post #1 by @ibbybuilds
*Posted on 2025-07-29 13:17:28*

[#p-1306-issue-summary-1]()Issue Summary
Experiencing persistent connection stability issues on LangGraph Platform production deployment for 6+ days.

[#p-1306-technical-details-2]()Technical Details
[#p-1306-stream-connections-runsidstream-3]()Stream Connections (`/runs/{id}/stream`)

`net::ERR_CONNECTION_CLOSED` during active streaming
Retry pattern: ECONNREFUSED → nginx 404 → success
Multiple drops per session

[#p-1306-websocket-connections-4]()WebSocket Connections

`ECONNREFUSED` and `ECONNRESET` errors during active connections
Tool calls timeout, require page refresh to recover

[#p-1306-key-observations-5]()Key Observations

**Works perfectly:** Local development (`langgraph dev`) and self-hosted
**Fails consistently:** LangGraph Platform only
WebSocket disconnects every 5-10 minutes on platform
nginx 404s suggest ingress-level issues
Both connection types affected simultaneously

[#p-1306-troubleshooting-attempted-6]()Troubleshooting Attempted

Client-side pinging every 30s with `ws.ping()` - still disconnecting
Confirmed no deployments during disconnection times
No custom timeout configurations

[#p-1306-additional-issue-7]()Additional Issue
After package upgrades: `disable_streaming=True` setting ignored on platform but respected locally, causing duplicate message chunks.

[#p-1306-questions-8]()Questions

Known production infrastructure stability issues?
Expected connection stability SLAs?
Recommended WebSocket timeout configurations?

Has anyone experienced similar platform-specific connectivity issues? Any workarounds or configuration recommendations?

---

## Post #2 by @scrowder
*Posted on 2025-07-29 16:56:19*

Hey, thank you for flagging these. We’ve seen a dramatic increase load over the last couple weeks, and as a result a few more intermittent errors such as this one. We’re actively working on this and will follow up later with any update(s).

---
