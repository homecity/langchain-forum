# DeepResearch Course:NotImplementedError on Windows when using MCP stdio with LangGraph

**Topic ID:** 1349
**Created:** 2025-08-26 20:12:21
**URL:** https://forum.langchain.com/t/1349

**Tags:** python-help

---

## Post #1 by @ANISHTWAGLE
*Posted on 2025-08-26 20:12:21*

NotImplementedError: BaseEventLoop._make_subprocess_transport

Looks like it’s related to `asyncio` subprocess support on Windows.

Can anyone help . This is the code .


```
`console = Console()

# Get the absolute path to our sample research docs
sample_docs_path = os.path.abspath("./files/")
console.print(f"[bold blue]Sample docs path:[/bold blue] {sample_docs_path}")

# Check if the directory exists
if os.path.exists(sample_docs_path):
    console.print(f"[green]✓ Directory exists with files:[/green] {os.listdir(sample_docs_path)}")
else:
    console.print("[red]✗ Directory does not exist![/red]")

# MCP Client configuration - filesystem server for local document access
mcp_config = {
    "filesystem": {
        "command": "npx",
        "args": [
            "-y",  # Auto-install if needed
            "@modelcontextprotocol/server-filesystem",
            sample_docs_path
        ],
        "transport": "stdio"
    }
}

console.print(Panel("[bold yellow]Creating MCP client...[/bold yellow]", expand=False))
client = MultiServerMCPClient(mcp_config) # client will initiate the server process.
console.print("[green]✓ MCP client created successfully![/green]")

# Test getting tools
console.print(Panel("[bold yellow]Getting tools...[/bold yellow]", expand=False))
tools = await client.get_tools()

# Create a rich table for tool display
table = Table(title="Available MCP Tools", show_header=True, header_style="bold magenta")
table.add_column("Tool Name", style="cyan", width=25)
table.add_column("Description", style="white", width=80)

for tool in tools:
    # Truncate long descriptions for better display
    description = tool.description[:77] + "..." if len(tool.description) > 80 else tool.description
    table.add_row(tool.name, description)

`
```

---

## Post #2 by @ANISHTWAGLE
*Posted on 2025-08-28 14:42:56*

Solved .

---

## Post #3 by @A-Ha
*Posted on 2025-09-13 23:25:34*

Can you please share what the solution was? Thanks

---
