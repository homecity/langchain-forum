# Check RAG answers against current documentation

Use this workflow when a forum-based answer refers to an older API, or the local
RAG sources do not cover a recent LangChain, LangGraph, or LangSmith feature.
[Parallel Search MCP](https://docs.parallel.ai/integrations/mcp/search-mcp) lets an
external MCP client search the web and fetch specific pages for comparison.

This is a manual research workflow in your MCP client. The chat application still
uses its existing local retrieval pipeline; it does not call this server or ingest
the pages you find.

## Connect your MCP client

You need a client that supports remote MCP servers over Streamable HTTP. Follow
the [client-specific installation instructions](https://docs.parallel.ai/integrations/mcp/search-mcp#installation)
and add a server with these settings:

| Setting | Value |
| --- | --- |
| Name | `parallel-search` |
| Transport | Streamable HTTP |
| URL | `https://search.parallel.ai/mcp` |
| Authentication | None for anonymous use |

Merge the server entry into your existing configuration so other configured
servers remain available. Start the server in your client and confirm that
`web_search` and `web_fetch` appear in its tool list. Enable those tools for your
research conversation if your client requires tool selection.

Anonymous search uses Fast mode and needs no Parallel account or API key. The
free endpoint has lower rate limits and is intended for exploration and light
use. If a request is rate limited, respect the returned retry guidance or follow
the linked instructions for authenticated access. Your MCP client's own access
requirements still apply.

## Compare an answer with current sources

1. Ask the local chat your question. Keep its answer and source URLs, along with
   the relevant installed package versions from your environment. The backend
   dependencies are declared in [backend/pyproject.toml](../backend/pyproject.toml).
2. In your MCP client, use `web_search` with a focused objective and related
   `search_queries`. Prefer official `docs.langchain.com` pages, and include the
   language and package version when they matter.
3. Read the search excerpts first. Use `web_fetch` on a relevant result URL when
   the excerpts do not explain the API or behavior you need. Pass a focused
   `objective` and the queries that found the page.
4. Compare the current page with the local answer's sources. Check imports,
   version requirements, migration notes, and whether the example uses Python or
   JavaScript. Current documentation may target a newer version than this demo.
5. Keep a short note with the original question, local source URL, current source
   URL, date checked, package version, and the specific difference. Distinguish a
   version mismatch from missing retrieval context before changing the pipeline.

For example, give your MCP client this request:

> Use Parallel's web_search to find current official Python LangChain
> documentation for loading tools from a remote MCP server. Search for
> `site:docs.langchain.com MCP tools LangChain`. Fetch a relevant official page
> with web_fetch if its search excerpts are insufficient. Summarize the required
> package versions and transport, and cite the URLs. Compare them with the package
> versions and local RAG answer I provide; identify any version mismatch before
> suggesting code changes.

An external research result is separate from the application's answer, source
list, and LangSmith traces. If a verified gap warrants updating the local corpus,
follow the [RAG checklist](../templates/rag-checklist.md) before changing chunking,
embeddings, metadata, or vector-store settings.
