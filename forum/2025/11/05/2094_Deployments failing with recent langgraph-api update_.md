# Deployments failing with recent langgraph-api update?

**Topic ID:** 2094
**Created:** 2025-11-05 10:42:54
**URL:** https://forum.langchain.com/t/2094

---

## Post #1 by @scrowland
*Posted on 2025-11-05 10:42:54*

Hi there, our deployments have started failing, despite us making no relevant changes.

[/uploads/short-url/45Wv4JQgIeIBxhuYjxfpVZjrfXh.png?dl=1](Screenshot 2025-11-05 at 10.39.211699×899 146 KB)

**Our passing deployment was id `819cdcb-34cd-4a03-a19d-54187db3148b` but then `37ebcfcf-90d8-449f-8f0e-fa44980f2dc5` fails with a dependency issue, despite our dependencies not changing.**

I have tried a lot of things to fix this, but so far no joy.

we get this error:


```
`langgraph_api.utils.errors.GraphLoadError: Failed to load graph 'assistant_graph' from /deps/agent_graphs/assistant_graph.py: No module named 'django'
`
```

What could have changed in the platform to cause this? I have tried pinning an older langgraph-api version in our langgraph.json but no joy. The failure occurs locally when running `langgraph up` too.

---

## Post #2 by @Isaac
*Posted on 2025-11-05 15:49:19*

Taking a look, sorry for the inconvenience.

---

## Post #3 by @scrowland
*Posted on 2025-11-05 15:54:29*

Thank you!

---

## Post #4 by @Isaac
*Posted on 2025-11-05 20:03:02*

Are you using a module named `pipedream` in your files anywhere? I think you may have forgotten to add it to your deps? Not 100% sure - but just wanted to throw this out here as I keep digging.

---

## Post #5 by @bleib1dj
*Posted on 2025-11-05 20:09:07*

Thanks Isaac, [/u/scrowland](@scrowland) logged off for the day so hopping in to help with the question. We have pipedream imported. We’ve now gone through multiple iterations of trying to resolve the package installs due to the langgraph update to the package manager. Here is the latest version of the file:


```
`
{
“graphs”: {
“assistant_graph”: “./app/agent_graphs/assistant_graph.py:graph”,
“collaboration_participant_graph”: “./app/agent_graphs/collaboration_participant_graph.py:graph”
},
“python_version”: “3.13”,
“dependencies”: \[
“cryptography==44.0.3”,
“grpcio-tools==1.75.1”,
“jsonschema-rs==0.29.1”,
“opentelemetry-exporter-otlp-proto-http==1.38.0”,
“opentelemetry-sdk==1.38.0”,
“langgraph-runtime-inmem==0.16.0”,
“.”,
“Django==5.1.10”,
“dj-database-url==2.3.0”,
“django-admin-csvexport==2.3”,
“django-celery-beat==2.8.1”,
“django-celery-results==2.6.0”,
“django-clear-cache==0.3”,
“django-cloudinary-storage==0.3.0”,
“django-dirtyfields==1.9.7”,
“django-environ==0.12.0”,
“django-filter==21.1”,
“django-json-widget==2.0.1”,
“django-lifecycle==0.9.6”,
“django-model-utils==4.5.1”,
“django-organizations==2.5.0”,
“django-recurrence==1.11.1”,
“django-ses\[events\]==4.4.0”,
“django-storages==1.14.6”,
“djangorestframework-gis==1.0.0”,
“djangorestframework-jsonapi==7.1.0”,
“djangorestframework==3.16.0”,
“drf-access-policy==1.5.0”,
“drf-spectacular==0.28.0”,
“drf-typed-views==0.3.0”,
“whitenoise==6.9.0”,
“django-structlog==8.1.0”,
“python-json-logger==3.3.0”,
“structlog==25.4.0”,
“fastapi-jsonrpc==3.4.1”,
“fastapi-limiter==0.1.6”,
“fastapi\[standard\]==0.115.14”,
“fastapi-cli==0.0.8”,
“pydantic-settings==2.10.1”,
“pydantic==2.11.7”,
“celery==5.5.2”,
“broadcaster==0.3.1”,
“gevent==25.5.1”,
“nest-asyncio==1.6.0”,
“psycopg==3.2.9”,
“psycopg-pool==3.2.6”,
“neomodel==5.5.0”,
“auth0-python==4.10.0”,
“drf-jwt==1.19.2”,
“oauthlib==3.3.1”,
“PyJWT==2.10.1”,
“python-jose==3.5.0”,
“boto3==1.39.3”,
“firebase-admin==6.9.0”,
“googlemaps==4.10.0”,
“pyairtable==3.1.1”,
“python-http-client==3.3.7”,
“requests-oauthlib==2.0.0”,
“requests==2.32.4”,
“sendgrid==6.12.4”,
“ShopifyAPI==12.7.0”,
“stripe==7.8.1”,
“supabase==2.16.0”,
“tavily-python==0.7.9”,
“tldextract==5.1.3”,
“urllib3==2.5.0”,
“urlman==2.0.2”,
“twilio==9.6.4”,
“slack-sdk==3.35.0”,
“stream-chat==4.26.0”,
“python-telegram-bot==22.2.0”,
“discord.py==2.5.2”,
“elasticsearch==8.17.1”,
“elasticsearch-dsl\[async\]==8.17.1”,
“cloudinary==1.44.1”,
“google-cloud-storage==2.16.0”,
“logdna==1.18.12”,
“sentry-sdk==2.32.0”,
“pydantic-ai==0.4.0”,
“agentverse_client==0.1.10”,
“uagents-core==0.3.11”,
“fetchai==0.1.44”,
“gpt-researcher==0.10.2”,
“langchain==0.3.26”,
“langchain-anthropic==0.3.17”,
“langchain-aws==0.2.27”,
“langchain-community==0.3.27”,
“langchain-core==0.3.68”,
“langchain-openai==0.3.27”,
“langchain-text-splitters==0.3.8”,
“langdetect==1.0.9”,
“langgraph==0.6.11”,
“langgraph-checkpoint==3.0.1”,
“langgraph-prebuilt==0.6.5”,
“langgraph-sdk==0.2.9”,
“langsmith==0.4.34”,
“zep-cloud==2.21.0”,
“ftfy==6.3.1”,
“parse==1.20.2”,
“python-dateutil==2.9.0.post0”,
“random-username==1.0.2”,
“shortuuid==1.0.13”,
“text-unidecode==1.3”,
“geoip2==5.1.0”,
“geopy==2.4.1”,
“h3==4.3.0”,
“timezonefinder==6.5.9”,
“croniter==6.0.0”,
“bech32==1.2.0”,
“ecdsa==0.19.1”,
“xhtml2pdf==0.2.17”,
“apify-client==2.0.0”,
“apify-shared==2.1.0”,
“youtube-transcript-api==0.6.3”,
“factory-boy==2.12.0”,
“ipython==9.4.0”,
“redis\[hiredis\]==6.4.0”,
“psutil==7.0.0”,
“tiktoken==0.9.0”,
“dependency-injector==4.48.1”,
“mcp==1.18.0”,
“sse-starlette==2.1.3”,
“fastmcp==2.12.3”,
“pipedream==1.0.10”
\],
“env”: “.env.langgraph”,
“dockerfile_lines”: \[
“ENV DEBIAN_FRONTEND=noninteractive”,
“RUN apt-get update && apt-get install -y --no-install-recommends apt-utils gdal-bin libgdal-dev build-essential pkg-config python3-dev libcairo2-dev”,
“HEALTHCHECK --interval=10s --timeout=2s --start-period=10s CMD curl --fail http://localhost:8000/health || exit 1”
\],
“pip_installer”: “pip”
}
`
```

---

## Post #6 by @Isaac
*Posted on 2025-11-05 20:11:08*

From our logs it seems like your latest revision went through? (my logs say this is the `staging-flockx-agents` deployment) - are you seeing smth different on your end?

---

## Post #7 by @bleib1dj
*Posted on 2025-11-05 23:28:59*

Hey Isaac, yes the latest build went through, thanks for the assistance.

---

## Post #8 by @scrowland
*Posted on 2025-11-06 09:26:00*

Thank you Isaac and Devon, yep our build is now working. We think the key change was to move the pipedream import out of the top of the file and into the methods that call pipedream, which feels a little clunky. This is still a little confusing, as the “pipedream==1.0.10” dependency has been in all of our dependency files (and now our langgraph.json dependencies) all along. Really appreciate you taking a look for us, would still be grateful for any thoughts you have on why this workaround has worked and what it was that was trying to load the graph code seemingly outside the env we have specified??

Thanks, Simon

---

## Post #9 by @scrowland
*Posted on 2025-11-06 09:28:14*

Also notable is that the failures started to occur around a code change that is utterly unconnected to any code that touches our pipedream codepath or any of the requirements. It felt external to our code change, and did conincide with new releases of the langchain tools that we would have picked up (we don’t pin any api_version or similar in our langgraph.json spec).

---
