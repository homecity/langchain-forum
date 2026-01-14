---
title: "Set up custom authentication"
url: "https://docs.langchain.com/langsmith/set-up-custom-auth"
section: "langsmith"
last_modified: "2026-01-05T13:59:47.100Z"
---
In this tutorial, we will build a chatbot that only lets specific users access it. We’ll start with the LangGraph template and add token-based security step by step. By the end, you’ll have a working chatbot that checks for valid tokens before allowing access. This is part 1 of our authentication series:

1.  Set up custom authentication (you are here) - Control who can access your bot
2.  [Make conversations private](/langsmith/resource-auth) - Let users have private conversations
3.  [Connect an authentication provider](/langsmith/add-auth-server) - Add real user accounts and validate using OAuth2 for production

This guide assumes basic familiarity with the following concepts:

-   [**Authentication & Access Control**](/langsmith/auth)
-   [**LangSmith**](/langsmith/home)

Custom auth is only available for LangSmith SaaS deployments or Enterprise Self-Hosted deployments.

## 

[​

](#1-create-your-app)

1\. Create your app

Create a new chatbot using the LangGraph starter template:

pip

uv

Copy

```
pip install -U "langgraph-cli[inmem]"
langgraph new --template=new-langgraph-project-python custom-auth
cd custom-auth
```

The template gives us a placeholder LangGraph app. Try it out by installing the local dependencies and running the development server:

pip

uv

npm

Copy

```
pip install -e .
langgraph dev
```

The server will start and open [Studio](/langsmith/studio) in your browser:

Copy

```
> - 🚀 API: http://127.0.0.1:2024
> - 🎨 Studio UI: https://smith.langchain.com/studio/?baseUrl=http://127.0.0.1:2024
> - 📚 API Docs: http://127.0.0.1:2024/docs
>
> This in-memory server is designed for development and testing.
> For production use, please use LangSmith.
```

If you were to self-host this on the public internet, anyone could access it. ![No authentication: the dev server is publicly reachable, anyone can access the bot if exposed to the internet.](https://mintcdn.com/langchain-5e9cc07a/N1xJUsnxxRqnrjxV/langsmith/images/no-auth.png?fit=max&auto=format&n=N1xJUsnxxRqnrjxV&q=85&s=3ca2c9a8d65891ef71abfb7ad0aae7d3)

## 

[​

](#2-add-authentication)

2\. Add authentication

Now that you have a base LangGraph app, add authentication to it.

In this tutorial, you will start with a hard-coded token for example purposes. You will get to a “production-ready” authentication scheme in the third tutorial.

The [Auth](https://reference.langchain.com/python/langsmith/deployment/sdk/#langgraph_sdk.auth.Auth) object lets you register an authentication function that the LangSmith deployment will run on every request. This function receives each request and decides whether to accept or reject. Create a new file `src/security/auth.py`. This is where your code will live to check if users are allowed to access your bot:

src/security/auth.py

Copy

```
from langgraph_sdk import Auth

# This is our toy user database. Do not do this in production
VALID_TOKENS = {
    "user1-token": {"id": "user1", "name": "Alice"},
    "user2-token": {"id": "user2", "name": "Bob"},
}

# The "Auth" object is a container that LangGraph will use to mark our authentication function
auth = Auth()


# The `authenticate` decorator tells LangGraph to call this function as middleware
# for every request. This will determine whether the request is allowed or not
@auth.authenticate
async def get_current_user(authorization: str | None) -> Auth.types.MinimalUserDict:
    """Check if the user's token is valid."""
    assert authorization
    scheme, token = authorization.split()
    assert scheme.lower() == "bearer"
    # Check if token is valid
    if token not in VALID_TOKENS:
        raise Auth.exceptions.HTTPException(status_code=401, detail="Invalid token")

    # Return user info if valid
    user_data = VALID_TOKENS[token]
    return {
        "identity": user_data["id"],
    }
```

Notice that your [Auth.authenticate](https://reference.langchain.com/python/langsmith/deployment/sdk/#langgraph_sdk.auth.Auth.authenticate) handler does two important things:

1.  Checks if a valid token is provided in the request’s [Authorization header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization)
2.  Returns the user’s [MinimalUserDict](https://reference.langchain.com/python/langsmith/deployment/sdk/#langgraph_sdk.auth.types.MinimalUserDict)

Now tell LangGraph to use authentication by adding the following to the [langgraph.json](https://reference.langchain.com/python/cloud/reference/cli/#configuration-file) configuration:

langgraph.json

Copy

```
{
  "dependencies": ["."],
  "graphs": {
    "agent": "./src/agent/graph.py:graph"
  },
  "env": ".env",
  "auth": {
    "path": "src/security/auth.py:auth"
  }
}
```

## 

[​

](#3-test-your-bot)

3\. Test your bot

Start the server again to test everything out:

Copy

```
langgraph dev --no-browser
```

If you didn’t add the `--no-browser`, the Studio UI will open in the browser. By default, we also permit access from Studio, even when using custom auth. This makes it easier to develop and test your bot in Studio. You can remove this alternative authentication option by setting `disable_studio_auth: true` in your auth configuration:

Copy

```
{
    "auth": {
        "path": "src/security/auth.py:auth",
        "disable_studio_auth": true
    }
}
```

## 

[​

](#4-chat-with-your-bot)

4\. Chat with your bot

You should now only be able to access the bot if you provide a valid token in the request header. Users will still, however, be able to access each other’s resources until you add [resource authorization handlers](/langsmith/auth#resource-specific-handlers) in the next section of the tutorial. ![Auth gate passes requests with a valid token, but no per-resource filters are applied yet—so users share visibility until authorization handlers are added in the next step.](https://mintcdn.com/langchain-5e9cc07a/IMK8wJkjSpMCGODD/langsmith/images/authentication.png?fit=max&auto=format&n=IMK8wJkjSpMCGODD&q=85&s=3ccfa86789baea630b8f418e9eb5b648) Run the following code in a file or notebook:

Copy

```
from langgraph_sdk import get_client

# Try without a token (should fail)
client = get_client(url="http://localhost:2024")
try:
    thread = await client.threads.create()
    print("❌ Should have failed without token!")
except Exception as e:
    print("✅ Correctly blocked access:", e)

# Try with a valid token
client = get_client(
    url="http://localhost:2024", headers={"Authorization": "Bearer user1-token"}
)

# Create a thread and chat
thread = await client.threads.create()
print(f"✅ Created thread as Alice: {thread['thread_id']}")

response = await client.runs.create(
    thread_id=thread["thread_id"],
    assistant_id="agent",
    input={"messages": [{"role": "user", "content": "Hello!"}]},
)
print("✅ Bot responded:")
print(response)
```

You should see that:

1.  Without a valid token, we can’t access the bot
2.  With a valid token, we can create threads and chat

Congratulations! You’ve built a chatbot that only lets “authenticated” users access it. While this system doesn’t (yet) implement a production-ready security scheme, we’ve learned the basic mechanics of how to control access to our bot. In the next tutorial, we’ll learn how to give each user their own private conversations.

## 

[​

](#next-steps)

Next steps

Now that you can control who accesses your bot, you might want to:

1.  Continue the tutorial by going to [Make conversations private](/langsmith/resource-auth) to learn about resource authorization.
2.  Read more about [authentication concepts](/langsmith/auth).
3.  Check out the API reference for [Auth](https://reference.langchain.com/python/langsmith/deployment/sdk/#langgraph_sdk.auth.Auth), [Auth.authenticate](https://reference.langchain.com/python/langsmith/deployment/sdk/#langgraph_sdk.auth.Auth.authenticate), and [MinimalUserDict](https://reference.langchain.com/python/langsmith/deployment/sdk/#langgraph_sdk.auth.types.MinimalUserDict) for more authentication details.

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/set-up-custom-auth.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.