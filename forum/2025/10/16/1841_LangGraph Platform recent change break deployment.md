# LangGraph Platform recent change break deployment

**Topic ID:** 1841
**Created:** 2025-10-16 11:14:48
**URL:** https://forum.langchain.com/t/1841

**Tags:** cloud

---

## Post #1 by @AnhQuanTrl
*Posted on 2025-10-16 11:14:48*

We had the same code commit that was deployed successfully. Today, we try to create a new revision of the same commit but now it fail!.

This is the GitHub issue where I provide more context of the error stack trace.


  

      [https://github.com/langchain-ai/langgraph/issues/6288](github.com/langchain-ai/langgraph)
  

  
    
  
	  
  

  
    
      [https://github.com/langchain-ai/langgraph/issues/6288](LangGraph Platform Deployment suddenly fail to deploy with multiple dependencies)
    

    
      
        opened 11:03AM - 16 Oct 25 UTC
      


      
        [https://github.com/AnhQuanTrl](
          
          AnhQuanTrl
        )
      
    

    
        
          bug
        
        
          pending
        
    
  


  
    ### Checked other resources

- [x] This is a bug, not a usage question. For ques[](…)tions, please use the LangChain Forum (https://forum.langchain.com/).
- [x] I added a clear and detailed title that summarizes the issue.
- [x] I read what a minimal reproducible example is (https://stackoverflow.com/help/minimal-reproducible-example).
- [x] I included a self-contained, minimal example that demonstrates the issue INCLUDING all the relevant imports. The code run AS IS to reproduce the issue.

### Example Code

```python
{
  "dependencies": [
    "./libs/tools",
    "./libs/security",
    "./agents/agenta",
    "./agents/agentb"
  ],
  "graphs": {
    "Agent A": "./agents/agenta/src/agenta/graph.py:make_graph",
    "Agent B": "./agents/agentb/src/agentb/my_agent/graph.py:build_main_graph"
  },
  "env": ".env",
  "python_version": "3.12",
  "auth": {
    "path": "./libs/security/src/security/auth.py:auth"
  }
}
```

### Error Message and Stack Trace (if applicable)

```shell
10/16/2025, 5:51:23 PM Application startup failed. Exiting.
10/16/2025, 5:51:23 PM Traceback (most recent call last):
  File "/api/langgraph_api/graph.py", line 420, in collect_graphs_from_env
  File "/api/langgraph_api/utils/config.py", line 144, in run_in_executor
  File "/usr/local/lib/python3.12/concurrent/futures/thread.py", line 59, in run
    result = self.fn(*self.args, **self.kwargs)
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/api/langgraph_api/utils/config.py", line 135, in wrapper
  File "/api/langgraph_api/graph.py", line 469, in _graph_from_spec
  File "", line 999, in exec_module
  File "", line 488, in _call_with_frames_removed
  File "/deps/agentb/src/agentb/my_agent/graph.py", line 6, in 
    from agentb.my_agent.context import AgentBContext
ModuleNotFoundError: No module named 'agentb'
Could not import python module for graph:
GraphSpec(id='Cleo Clause Simplifier', path='/deps/agentb/src/agentb/my_agent/graph.py', module=None, variable='build_main_graph', config={}, description=None)

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "/usr/local/lib/python3.12/site-packages/starlette/routing.py", line 694, in lifespan
    async with self.lifespan_context(app) as maybe_state:
               ^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/local/lib/python3.12/contextlib.py", line 210, in __aenter__
    return await anext(self.gen)
           ^^^^^^^^^^^^^^^^^^^^^
  File "/storage/langgraph_runtime_postgres/lifespan.py", line 141, in lifespan
  File "/api/langgraph_api/graph.py", line 422, in collect_graphs_from_env
langgraph_api.utils.errors.GraphLoadError: Failed to load graph 'Agent B' from /deps/agentb/src/agentb/my_agent/graph.py: No module named 'agentb'

10/16/2025, 5:51:23 PM Checkpointer ingestion task cancelled. Draining queue.
10/16/2025, 5:51:23 PM Shutting down remote graphs
10/16/2025, 5:51:23 PM Graph 'Cleo Clause Simplifier' failed to load: ModuleNotFoundError: No module named 'cleo'
10/16/2025, 5:51:23 PM Registering graph with id 'Sheila'
10/16/2025, 5:51:22 PM Successfully submitted metadata to LangSmith instance
10/16/2025, 5:51:22 PM HTTP Request: POST https://europe-west4.p.api.smith.langchain.com/v1/metadata/submit "HTTP/1.1 204 No Content"
10/16/2025, 5:51:22 PM Starting long query monitor with 5min threshold, scanning every 600s
10/16/2025, 5:51:22 PM Starting thread TTL sweeper with interval 5 minutes
10/16/2025, 5:51:22 PM Starting store TTL sweeper with interval 5.0 minutes
10/16/2025, 5:51:22 PM Getting auth instance: {'path': '/deps/security/src/security/auth.py:auth'}
10/16/2025, 5:51:22 PM Starting metadata loop
10/16/2025, 5:51:22 PM Starting checkpointer ingestion loop
10/16/2025, 5:51:21 PM Migration lock released
10/16/2025, 5:51:21 PM No LANGGRAPH_STORE configuration found, using default configuration
10/16/2025, 5:51:21 PM Migration lock acquired
10/16/2025, 5:51:21 PM Attempting to acquire migration lock
10/16/2025, 5:51:21 PM Starting Postgres runtime with langgraph-api=0.4.42
10/16/2025, 5:51:21 PM Waiting for application startup.
10/16/2025, 5:51:21 PM Started server process [1]
10/16/2025, 5:51:21 PM Loaded custom auth middleware: CustomAuthBackend(fn=, ls_auth=, param_names={'authorization', 'headers'})
10/16/2025, 5:51:21 PM Loaded auth instance from path /deps/security/src/security/auth.py:auth: 
10/16/2025, 5:51:21 PM Using custom authentication
10/16/2025, 5:51:21 PM Using auth of type=custom
10/16/2025, 5:51:21 PM Using langgraph_runtime_postgres
10/16/2025, 5:51:20 PM Cancelling queue entrypoint task
10/16/2025, 5:51:20 PM Checkpointer ingestion task cancelled. Draining queue.
10/16/2025, 5:51:20 PM Shutting down remote graphs
10/16/2025, 5:51:20 PM Graph 'Cleo Clause Simplifier' failed to load: ModuleNotFoundError: No module named 'cleo'
10/16/2025, 5:51:20 PM Registering graph with id 'Sheila'
10/16/2025, 5:51:19 PM Successfully submitted metadata to LangSmith instance
10/16/2025, 5:51:19 PM HTTP Request: POST https://europe-west4.p.api.smith.langchain.com/v1/metadata/submit "HTTP/1.1 204 No Content"
10/16/2025, 5:51:19 PM Starting long query monitor with 5min threshold, scanning every 600s
10/16/2025, 5:51:19 PM Starting thread TTL sweeper with interval 5 minutes
10/16/2025, 5:51:19 PM Starting store TTL sweeper with interval 5.0 minutes
10/16/2025, 5:51:19 PM Getting auth instance: {'path': '/deps/security/src/security/auth.py:auth'}
10/16/2025, 5:51:19 PM Starting metadata loop
10/16/2025, 5:51:19 PM Starting checkpointer ingestion loop
10/16/2025, 5:51:18 PM Migration lock released
10/16/2025, 5:51:18 PM No LANGGRAPH_STORE configuration found, using default configuration
10/16/2025, 5:51:18 PM Migration lock acquired
10/16/2025, 5:51:18 PM Attempting to acquire migration lock
10/16/2025, 5:51:18 PM Starting Postgres runtime with langgraph-api=0.4.42
10/16/2025, 5:49:57 PM Application startup failed. Exiting.
```

### Description

We have this same code commit that was deployable to LangGraph for weeks. Then suddenly today, we try to create a new revision with same commit and got this error.

Our set up has multiple packages and we use dependencies in `langgraph.json` to specify all of them. This prevent us from deploying code to LangGraph Platform. Please help promptly. 

We are increasingly concerned about the platform production readiness as last month we had another issue with breaking change that break graph configuration. The symptom is the same: same code commit that was deployed successfully could not be deployed again.

### System Info


System Information
------------------
> OS:  Darwin
> OS Version:  Darwin Kernel Version 24.6.0: Mon Aug 11 21:15:09 PDT 2025; root:xnu-11417.140.69.701.11~1/RELEASE_ARM64_T6041
> Python Version:  3.12.11 (main, Jun  3 2025, 15:41:47) [Clang 17.0.0 (clang-1700.0.13.3)]

Package Information
-------------------
> langchain_core: 0.3.79
> langchain: 0.3.27
> langchain_community: 0.3.31
> langsmith: 0.4.34
> langchain_anthropic: 0.3.22
> langchain_mcp_adapters: 0.1.11
> langchain_openai: 0.3.35
> langchain_tavily: 0.2.12
> langchain_text_splitters: 0.3.11
> langgraph_api: 0.4.38
> langgraph_cli: 0.4.3
> langgraph_license: Installed. No version info available.
> langgraph_runtime: Installed. No version info available.
> langgraph_runtime_inmem: 0.14.1
> langgraph_sdk: 0.2.9

Optional packages not installed
-------------------------------
> langserve

Other Dependencies
------------------
> aiohttp: 3.13.0
> aiohttp=3.8.3: Installed. No version info available.
> anthropic=0.69.0: Installed. No version info available.
> async-timeout=4.0.0;: Installed. No version info available.
> blockbuster=1.5.24: Installed. No version info available.
> click>=8.1.7: Installed. No version info available.
> cloudpickle>=3.0.0: Installed. No version info available.
> cryptography=42.0.0: Installed. No version info available.
> dataclasses-json=0.6.7: Installed. No version info available.
> grpcio-tools=1.75.0: Installed. No version info available.
> grpcio=1.75.0: Installed. No version info available.
> httpx-sse=0.4.0: Installed. No version info available.
> httpx=0.23.0: Installed. No version info available.
> httpx>=0.25.0: Installed. No version info available.
> httpx>=0.25.2: Installed. No version info available.
> jsonpatch=1.33.0: Installed. No version info available.
> jsonschema-rs=0.20.0: Installed. No version info available.
> langchain-anthropic;: Installed. No version info available.
> langchain-aws;: Installed. No version info available.
> langchain-azure-ai;: Installed. No version info available.
> langchain-cohere;: Installed. No version info available.
> langchain-community;: Installed. No version info available.
> langchain-core=0.3.72: Installed. No version info available.
> langchain-core=0.3.78: Installed. No version info available.
> langchain-core=0.3.36: Installed. No version info available.
> langchain-core=0.3.75: Installed. No version info available.
> langchain-core=0.3.78: Installed. No version info available.
> langchain-core>=0.3.64: Installed. No version info available.
> langchain-deepseek;: Installed. No version info available.
> langchain-fireworks;: Installed. No version info available.
> langchain-google-genai;: Installed. No version info available.
> langchain-google-vertexai;: Installed. No version info available.
> langchain-groq;: Installed. No version info available.
> langchain-huggingface;: Installed. No version info available.
> langchain-mistralai;: Installed. No version info available.
> langchain-ollama;: Installed. No version info available.
> langchain-openai;: Installed. No version info available.
> langchain-perplexity;: Installed. No version info available.
> langchain-text-splitters=0.3.9: Installed. No version info available.
> langchain-together;: Installed. No version info available.
> langchain-xai;: Installed. No version info available.
> langchain=0.3.27: Installed. No version info available.
> langgraph-api=0.3;: Installed. No version info available.
> langgraph-checkpoint>=2.0.23: Installed. No version info available.
> langgraph-checkpoint>=2.0.25: Installed. No version info available.
> langgraph-runtime-inmem=0.14.0: Installed. No version info available.
> langgraph-runtime-inmem>=0.7;: Installed. No version info available.
> langgraph-sdk>=0.1.0;: Installed. No version info available.
> langgraph-sdk>=0.2.0: Installed. No version info available.
> langgraph>=0.2: Installed. No version info available.
> langgraph>=0.4.0: Installed. No version info available.
> langsmith-pyo3>=0.1.0rc2;: Installed. No version info available.
> langsmith=0.1.125: Installed. No version info available.
> langsmith=0.3.45: Installed. No version info available.
> langsmith>=0.1.17: Installed. No version info available.
> langsmith>=0.3.45: Installed. No version info available.
> mcp>=1.9.2: Installed. No version info available.
> numpy>=1.26.2;: Installed. No version info available.
> numpy>=2.1.0;: Installed. No version info available.
> openai-agents>=0.0.3;: Installed. No version info available.
> openai=1.104.2: Installed. No version info available.
> opentelemetry-api>=1.30.0;: Installed. No version info available.
> opentelemetry-api>=1.37.0: Installed. No version info available.
> opentelemetry-exporter-otlp-proto-http>=1.30.0;: Installed. No version info available.
> opentelemetry-exporter-otlp-proto-http>=1.37.0: Installed. No version info available.
> opentelemetry-sdk>=1.30.0;: Installed. No version info available.
> opentelemetry-sdk>=1.37.0: Installed. No version info available.
> orjson>=3.10.1: Installed. No version info available.
> orjson>=3.9.14;: Installed. No version info available.
> orjson>=3.9.7: Installed. No version info available.
> packaging=23.2.0: Installed. No version info available.
> packaging>=23.2: Installed. No version info available.
> protobuf=6.32.1: Installed. No version info available.
> pydantic-settings=2.10.1: Installed. No version info available.
> pydantic=1: Installed. No version info available.
> pydantic=2.7.4: Installed. No version info available.
> pyjwt>=2.9.0: Installed. No version info available.
> pytest>=7.0.0;: Installed. No version info available.
> python-dotenv>=0.8.0;: Installed. No version info available.
> PyYAML=5.3.0: Installed. No version info available.
> PyYAML>=5.3: Installed. No version info available.
> requests: 2.32.5
> requests-toolbelt>=1.0.0: Installed. No version info available.
> requests=2: Installed. No version info available.
> requests=2.32.5: Installed. No version info available.
> requests>=2.0.0: Installed. No version info available.
> rich>=13.9.4;: Installed. No version info available.
> SQLAlchemy=1.4: Installed. No version info available.
> SQLAlchemy=1.4.0: Installed. No version info available.
> sse-starlette=2.1.0: Installed. No version info available.
> sse-starlette>=2: Installed. No version info available.
> starlette>=0.37: Installed. No version info available.
> starlette>=0.38.6: Installed. No version info available.
> structlog=24.1.0: Installed. No version info available.
> structlog>23: Installed. No version info available.
> tenacity!=8.4.0,=8.1.0: Installed. No version info available.
> tenacity>=8.0.0: Installed. No version info available.
> tiktoken=0.7.0: Installed. No version info available.
> truststore>=0.1: Installed. No version info available.
> typing-extensions=4.7.0: Installed. No version info available.
> typing-extensions>=4.14.0: Installed. No version info available.
> uvicorn>=0.26.0: Installed. No version info available.
> vcrpy>=7.0.0;: Installed. No version info available.
> watchfiles>=0.13: Installed. No version info available.
> zstandard>=0.23.0: Installed. No version info available.

  

  

  
    
    
  

  


[/uploads/short-url/tNxBQiPeP9AO5Fc7ysd9nKHS4iG.jpeg?dl=1](Screenshot 2025-10-16 at 18.12.281920×728 64.7 KB)

`dev (daa4363)` this is the commit that fail to be deployed but was deployed successfully before.

This seems like a breaking change that affect our current set up.

---

## Post #2 by @david.asamu
*Posted on 2025-10-16 21:27:06*

Hi [/u/anhquantrl](@AnhQuanTrl) ,  thanks for reporting this. We can see that commit `dev (daa4363)` deployed successfully before but is now failing on new revisions with the same code.

We’re looking into what’s happening with this deployment and will share an update here once we have more information.

---

## Post #3 by @david.asamu
*Posted on 2025-10-17 01:47:44*

A change in how local dependency installation is handled inadvertently caused this. This has now been resolved.

Please try triggering a new revision, and apologies for the disruption.

---

## Post #4 by @AnhQuanTrl
*Posted on 2025-10-17 02:44:50*

[/uploads/short-url/62XbjUCL1HNmjEpWdk2vKCmcjQi.jpeg?dl=1](Screenshot 2025-10-17 at 09.44.011920×1157 140 KB)

We just re-deploy but the issue still persists.

---

## Post #5 by @AnhQuanTrl
*Posted on 2025-10-17 04:15:35*

nvm. I saw that langgraph-cli now use `uv` . I just need to make some change to our pyproject (s) and it work!

---
