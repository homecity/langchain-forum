# Can't add custom route in langgraph-api deployment

**Topic ID:** 1625
**Created:** 2025-09-24 05:23:18
**URL:** https://forum.langchain.com/t/1625

**Tags:** js-help, self-hosted, product-feedback

---

## Post #1 by @li199-code
*Posted on 2025-09-24 05:23:18*

my langgraph.json:


```
`{
  "node_version": "20",
  "dependencies": ["."],
  "graphs": {
    "agent": "./chatbi_agent.ts:deepResearcher"
  },
  "env": ".env",
  "http": {
    "app": "./app.ts:app"
  }
}
`
```

The custom routes in app.ts work well in my local pc. I try to apply it in the langgraph-api server using docker:


```
`FROM langchain/langgraphjs-api:20
ADD . /deps/chatbi-agent-js-v2
ENV LANGSERVE_GRAPHS='{"agent":"./chatbi_agent.ts:deepResearcher"}'
WORKDIR /deps/chatbi-agent-js-v2
RUN pnpm config set registry https://registry.npmmirror.com
ENV CI=true
RUN pnpm i --frozen-lockfile
RUN (test ! -f /api/langgraph_api/js/build.mts && echo "Prebuild script not found, skipping") || tsx /api/langgraph_api/js/build.mts
`
```

And the docker-compose.yaml:


```
`volumes:
    langgraph-data:
        driver: local
services:
    langgraph-redis:
        image: redis:6
        healthcheck:
            test: redis-cli ping
            interval: 5s
            timeout: 1s
            retries: 5
    langgraph-postgres:
        image: postgres:16
        ports:
            - "5433:5432"
        environment:
            POSTGRES_DB: postgres
            POSTGRES_USER: postgres
            POSTGRES_PASSWORD: postgres
        volumes:
            - langgraph-data:/var/lib/postgresql/data
        healthcheck:
            test: pg_isready -U postgres
            start_period: 10s
            timeout: 1s
            retries: 5
            interval: 5s
    langgraph-api:
        image: chatbi-agent:latest
        ports:
            - "8080:8000"
        depends_on:
            langgraph-redis:
                condition: service_healthy
            langgraph-postgres:
                condition: service_healthy
        env_file:
            - .env
        environment:
            REDIS_URI: redis://langgraph-redis:6379
            LANGSMITH_API_KEY: lsv2_pt_xxx
            POSTGRES_URI: postgres://postgres:postgres@langgraph-postgres:5432/postgres?sslmode=disable
    # frontend:
    #     image: agent-frontend:latest
    #     ports:
    #         - "3000:3000"
    #     env_file:
    #         - .env
`
```

And the custom route return ‘404’ when requesting ‘/api-route’

---

## Post #2 by @mariam-eissa
*Posted on 2025-11-05 12:17:53*

li199-code:

‘404’ when requesting ‘/api-route’



i have the same issue with self-host standalone , did you fix this issue or find why it happens ?

---

## Post #4 by @li199-code
*Posted on 2025-11-05 13:53:03*

Nope, I used other web framework

---

## Post #5 by @mariam-eissa
*Posted on 2025-11-05 14:00:01*

what other framework can you tell me ?

---

## Post #6 by @mariam-eissa
*Posted on 2025-11-11 16:58:41*

[https://forum.langchain.com/t/custom-routes-not-working-self-hosted-standalone/2116/2](custom route issue) solution

---
