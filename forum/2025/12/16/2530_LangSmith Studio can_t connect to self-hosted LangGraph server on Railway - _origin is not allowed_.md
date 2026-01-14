# LangSmith Studio can't connect to self-hosted LangGraph server on Railway - "origin is not allowed"

**Topic ID:** 2530
**Created:** 2025-12-16 16:12:11
**URL:** https://forum.langchain.com/t/2530

**Tags:** self-hosted, langsmith-studio

---

## Post #1 by @paddyfink
*Posted on 2025-12-16 16:12:11*

I have a LangGraph server deployed on Railway that was working fine with LangSmith Studio until a few days ago. Now I’m getting this error:


Error: Failed to connect to Agent Server because the origin is not allowed. Connect to a different server or add the origin to the allowed origins list.


It works fine locally with `langgraph dev. And it was also working fine in prod.`The server itself is responding correctly,  CORS headers are correct

Has something changed recently on LangSmith’s side regarding connecting to external/self-hosted servers? Any help would be appreciated!

---

## Post #2 by @mcavdar
*Posted on 2025-12-16 17:04:45*

I can confirm that `https://smith.langchain.com/studio/?baseUrl=http://serverenpoint` no longer works. However, when you click **“Connect to local server“**, it opens a new window. Entering the `base_url` and adding the endpoint to the `allowed origins`(in Advanced Settings) fixes the issue. I successfully connected to the endpoint.

---

## Post #3 by @paddyfink
*Posted on 2025-12-17 13:06:30*

It worked. Thank you

---

## Post #4 by @Bucky
*Posted on 2025-12-18 05:11:19*

Does this work with –tunnel enable? I tried using the local host as endpoint and the cloudflare url as endpoint, both doesn’t work.

---

## Post #5 by @mcavdar
*Posted on 2025-12-18 15:11:39*

Yes, I just tried it. It seems to work with the following settings:

[/uploads/short-url/XAEERPzbwEwV0CDVGmOtVEeNzH.png?dl=1](Ekran görüntüsü 2025-12-18 160911734×843 53.2 KB)

I followed the steps [https://docs.langchain.com/oss/python/langgraph/local-server#safari-compatibility](Run a local server - Docs by LangChain) .

Here is the output of `pip freeze`:


```
`Editable install with no version control (agent==0.0.1)

-e /home/pi/xxx
annotated-types==0.7.0
anyio==4.12.0
blockbuster==1.5.26
certifi==2025.11.12
cffi==2.0.0
charset-normalizer==3.4.4
click==8.3.1
cloudpickle==3.1.2
cryptography==46.0.3
forbiddenfruit==0.1.4
googleapis-common-protos==1.72.0
grpcio==1.76.0
grpcio-tools==1.75.1
h11==0.16.0
httpcore==1.0.9
httpx==0.28.1
idna==3.11
importlib_metadata==8.7.0
jsonpatch==1.33
jsonpointer==3.0.0
jsonschema_rs==0.29.1
langchain-core==1.2.2
langgraph==1.0.5
langgraph-api==0.6.8
langgraph-checkpoint==3.0.1
langgraph-cli==0.4.11
langgraph-prebuilt==1.0.5
langgraph-runtime-inmem==0.20.1
langgraph-sdk==0.3.0
langsmith==0.5.0
opentelemetry-api==1.39.1
opentelemetry-exporter-otlp-proto-common==1.39.1
opentelemetry-exporter-otlp-proto-http==1.39.1
opentelemetry-proto==1.39.1
opentelemetry-sdk==1.39.1
opentelemetry-semantic-conventions==0.60b1
orjson==3.11.5
ormsgpack==1.12.1
packaging==25.0
protobuf==6.33.2
pycparser==2.23
pydantic==2.12.5
pydantic_core==2.41.5
PyJWT==2.10.1
python-dotenv==1.2.1
PyYAML==6.0.3
requests==2.32.5
requests-toolbelt==1.0.0
setuptools==80.9.0
sse-starlette==2.1.3
starlette==0.50.0
structlog==25.5.0
tenacity==9.1.2
truststore==0.10.4
typing-inspection==0.4.2
typing_extensions==4.15.0
urllib3==2.6.2
uuid_utils==0.12.0
uvicorn==0.38.0
watchfiles==1.1.1
xxhash==3.6.0
zipp==3.23.0
zstandard==0.25.0
`
```

---

## Post #6 by @alexk
*Posted on 2026-01-01 15:50:14*

Thanks, that did the trick!

I also set allowed origins in my langgraph.json though not sure if this is needed:


```
`"http": {
    "cors": {
      "allow_origins": [
        "https://smith.langchain.com",
        "https://eu.smith.langchain.com"
      ],
      "allow_methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      "allow_headers": ["*"],
      "allow_credentials": true
    }
  }
`
```

---
