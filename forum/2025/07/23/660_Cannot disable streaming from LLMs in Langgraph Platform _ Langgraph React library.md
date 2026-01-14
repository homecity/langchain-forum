# Cannot disable streaming from LLMs in Langgraph Platform + Langgraph React library

**Topic ID:** 660
**Created:** 2025-07-23 18:04:19
**URL:** https://forum.langchain.com/t/660

---

## Post #1 by @vslaykovsky
*Posted on 2025-07-23 18:04:19*

I’m trying to stop langgraph platform from streaming output of all models to the client with no luck.

In between getting updates from node outputs I’m also getting token-level updates from all individual LLMs for some reason.

On the client side I’m using `stream=useStream(...)` and rendering `stream.values.messages`

On the server side my models are loaded with the following code. Note `"disable_streaming": True,` and `.with_config(tags=["nostream"])`.


```
`from langchain_openai import ChatOpenAI
from pydantic import Field, SecretStr
from langchain_core.utils.utils import secret_from_env


class ChatOpenRouter(ChatOpenAI):
    openai_api_key: Optional[SecretStr] = Field(alias="api_key", default_factory=secret_from_env("OPENROUTER_API_KEY"))

    @property
    def lc_secrets(self) -> dict:
        return {"openai_api_key": "OPENROUTER_API_KEY"}

    def __init__(self, openai_api_key=None, **kwargs):
        key = openai_api_key or os.getenv("OPENROUTER_API_KEY")
        super().__init__(base_url="https://openrouter.ai/api/v1", openai_api_key=key, **kwargs)

def load_chat_model(fully_specified_name: str, name: Optional[str] = None) -> BaseChatModel:
    """Load a chat model from a fully specified name.

    Args:
        fully_specified_name (str): String in the format 'provider/model'.
        name (str, optional): Name for the model instance.
    """
    params = {
        "model": fully_specified_name,
        "rate_limiter": RATE_LIMITER,
        "timeout": LLM_TIMEOUT,
        "disable_streaming": True,
    }
    if name:
        params["name"] = name
    if fully_specified_name != "gpt-4o-search-preview":
        params["temperature"] = 1.0
    if fully_specified_name in {
        "o4-mini-high",
        "o4-mini",
        "google/gemini-2.5-flash",
        "google/gemini-2.5-pro",
        "anthropic/claude-sonnet-4",
    }:
        return ChatOpenRouter(
            **params,
        ).with_config(tags=["nostream"])
    else:
        return ChatOpenAI(
            **params,
        ).with_config(tags=["nostream"])
`
```

I’d appreciate suggestion of both client-side or server-side fixes, server-side fixes preferred.

---

## Post #2 by @samarth
*Posted on 2025-07-24 18:59:18*

Hi [/u/vslaykovsky](@vslaykovsky), I am facing the same issue with Langgraph. Each LLM invocation in the graph streams tokens to the user even if we do not store it in any state variable.

Tried all possible combinations of stream modes: values, updates, messages and even combinations of them for that matter.

If you resolve it, please let me know too.

---

## Post #3 by @scrowder
*Posted on 2025-07-29 17:53:58*

Hello,

How exactly are you invoking the graph on the client side? Via manual invoke or using LangGraph Platform APIs? If LangGraph Platform, where is it deployed exactly?

I’ve attempted to reproduce the issue, but it seems to have the streaming behavior that I am telling it to have.  Is there a minimal reproduction app that you could send which could help me understand the issue better?

---

## Post #4 by @elmdecoste
*Posted on 2025-08-13 15:46:12*

We’re running into the same issue with no code changes on our backend other than a new LangGraph cloud deployment. We were reliably using the `langsmith:nostream` tag in our various LLM calls that we don’t want streamed back and now those are getting returned back to the frontend and displayed when we don’t want them to be

---

## Post #5 by @akacperski
*Posted on 2025-08-20 15:12:06*

I have a workaround, which is to use the .`__call__()` method instead of invoke(). Example:


```
`llm = SomeChatModel(disable_streaming=True)
llm(input)
`
```

Note: this method is deprecated.

---

## Post #6 by @vslaykovsky
*Posted on 2025-08-21 06:50:08*

In our workaround we name AI messages and then filter by name on the client side. It doesn’t prevent messages from getting to the client, but at least there is a reliable way to distinguish them: `AIMessage(content=message, name="search_agent") `

A weird side effect though is that LLMs apparently have access to names in the model context and they sometimes mimic the past data and start prepending output messages with `search_agent: `

---

## Post #7 by @dudi-moveo
*Posted on 2025-09-10 13:08:32*

Any solution? [/groups/langchain-team](@LangChain-Team)

---

## Post #8 by @jasonunderstood
*Posted on 2025-09-11 20:01:37*

I was able to resolve this by setting `streaming=False` for any models whose output I don’t want streamed to the client. E.g.


```
`model = ChatOpenAI(temperature=0, streaming=False, model="gpt-4.1", api_key=openai_api_key)
`
```

---
