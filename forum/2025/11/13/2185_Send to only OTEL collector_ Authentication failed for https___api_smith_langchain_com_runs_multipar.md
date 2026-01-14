# Send to only OTEL collector: Authentication failed for https://api.smith.langchain.com/runs/multipart. HTTPError('401 Client Error: Unauthorized for url: https://api.smith.langchain.com/runs/multipart'

**Topic ID:** 2185
**Created:** 2025-11-13 07:09:21
**URL:** https://forum.langchain.com/t/2185

---

## Post #1 by @adam.gardner
*Posted on 2025-11-13 07:09:21*

Hi all, I want to send data **only** to an OpenTelemetry collector.

I can see the data hitting the collector, so that works, but how do I prevent the `401` code as it’s also trying to export to `https://api.smith.langchain.com/runs/multipart`


```
`set OPENAI_API_BASE=https://my.endpoint.com/api/.../v1
set OPENAI_API_KEY=REDACTED
set LANGSMITH_TRACING=true
set LANGSMITH_OTEL_ENABLED=true
set OTEL_SERVICE_NAME=langchain
set OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
python app.py
`
```

Where `app.py` is just something basic:


```
`from langchain.agents import create_agent

def get_weather(city: str) -> str:
    """Get weather for a given city."""
    return f"It's always sunny in {city}!"

agent = create_agent(
    model="gpt-4o",
    tools=[get_weather],
    system_prompt="You are a helpful assistant",
)

# Run the agent
output = agent.invoke(
    {"messages": [{"role": "user", "content": "what is the weather in sf"}]}
)

print(output)
`
```

---

## Post #2 by @angus
*Posted on 2025-11-13 17:53:41*

[/u/adam.gardner](@adam.gardner)  Hybrid tracing is the default in LangSmith version **≥ 0.4.1**.

To send traces **only** to your OTEL endpoint, set:**`LANGSMITH_OTEL_ONLY="true"`** (Recommendation: use **langsmith ≥ 0.4.25**.)


  
      

      [https://docs.langchain.com/langsmith/trace-with-opentelemetry#configure-alternate-otlp-endpoints](Docs by LangChain)
  

  
    

[https://docs.langchain.com/langsmith/trace-with-opentelemetry#configure-alternate-otlp-endpoints](Trace with OpenTelemetry - Docs by LangChain)

---
