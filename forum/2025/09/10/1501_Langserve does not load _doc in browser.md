# Langserve does not load /doc in browser

**Topic ID:** 1501
**Created:** 2025-09-10 21:30:23
**URL:** https://forum.langchain.com/t/1501

---

## Post #1 by @banto
*Posted on 2025-09-10 21:30:23*

langchain                                0.3.27

langchain-chroma                         0.2.5

langchain-community                      0.3.29

langchain-core                           0.3.76

langchain-google-genai                   2.1.10

langchain-groq                           0.3.7

langchain-openai                         0.3.33

langchain-text-splitters                 0.3.11

langgraph                                0.6.7

langgraph-checkpoint                     2.1.1

langgraph-prebuilt                       0.6.4

langgraph-sdk                            0.2.6

langserve                                0.3.1

langsmith                                0.4.27


```
`import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langserve import add_routes
from src.graph import Workflow
from dotenv import load_dotenv

# Load .env file
load_dotenv()

app = FastAPI(
    title="Gmail Automation",
    version="1.0",
    description="LangGraph backend for the AI Gmail automation workflow",
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

def get_runnable():
    return  Workflow().app

# Fetch LangGraph Automation runnable which generates the workouts
runnable = get_runnable()

# Create the Fast API route to invoke the runnable
add_routes(app, runnable, path="/automate_gmail")

def main():
    # Start the API
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    main()
`
```

When opening with browser at [http://localhost:8000/docs](http://localhost:8000/docs) I get “Failed to load API definition” error and on console this error too:


```
`INFO:     127.0.0.1:61587 - "GET /automate_gmail/playground/favicon.ico HTTP/1.1" 200 OK
INFO:     127.0.0.1:64762 - "GET /docs HTTP/1.1" 200 OK
INFO:     127.0.0.1:64762 - "GET /openapi.json HTTP/1.1" 500 Internal Server Error
ERROR:    Exception in ASGI application
Traceback (most recent call last):
  File "D:\xxxxx\langgraph-email-automation\venv\Lib\site-packages\uvicorn\protocols\http\httptools_impl.py", line 409, in run_asgi
    result = await app(  # type: ignore[func-returns-value]
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        self.scope, self.receive, self.send
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
`
```

---
