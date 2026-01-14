# Unable to run create_react_agent using Ver: 1.0.3 of langchain-core

**Topic ID:** 2304
**Created:** 2025-11-22 16:24:31
**URL:** https://forum.langchain.com/t/2304

---

## Post #1 by @PallaviPadav
*Posted on 2025-11-22 16:24:31*

ModuleNotFoundError                       Traceback (most recent call last)

Cell In[18], line 1

----> 1 from langchain.agents import AgentExecutor, create_react_agent

2 # Create the agent

3 agent = create_react_agent(llm, tools, prompt)

File f:\AgenticAI\Workplace\ag_env\Lib\site-packages\langchain\agents_*init*_.py:40

37 from langchain_core.tools.convert import tool

39 from langchain._api import create_importer

—> 40 from langchain.agents.agent import (

41     Agent,

42     AgentExecutor,

43     AgentOutputParser,

44     BaseMultiActionAgent,

45     BaseSingleActionAgent,

46     LLMSingleActionAgent,

47 )

48 from langchain.agents.agent_iterator import AgentExecutorIterator

49 from langchain.agents.agent_toolkits.vectorstore.base import (

50     create_vectorstore_agent,

51     create_vectorstore_router_agent,

52 )

File f:\AgenticAI\Workplace\ag_env\Lib\site-packages\langchain\agents\agent.py:48

45 from typing_extensions import Self, override

47 from langchain._api.deprecation import AGENT_DEPRECATION_WARNING

—> 48 from langchain.agents.agent_iterator import AgentExecutorIterator

49 from langchain.agents.agent_types import AgentType

50 from langchain.agents.tools import InvalidTool

File f:\AgenticAI\Workplace\ag_env\Lib\site-packages\langchain\agents\agent_iterator.py:33

30 from langchain_core.tools import BaseTool

31 from langchain_core.utils.input import get_color_mapping

—> 33 from langchain.schema import RUN_KEY

34 from langchain.utilities.asyncio import asyncio_timeout

36 if TYPE_CHECKING:

File f:\AgenticAI\Workplace\ag_env\Lib\site-packages\langchain\schema_*init*_.py:8

6 from langchain_core.documents import BaseDocumentTransformer, Document

7 from langchain_core.exceptions import LangChainException, OutputParserException

----> 8 from langchain_core.memory import BaseMemory

9 from langchain_core.messages import (

10     AIMessage,

11     BaseMessage,

(…)     19     messages_to_dict,

20 )

21 from langchain_core.messages.base import message_to_dict

ModuleNotFoundError: No module named ‘langchain_core.memory’

---

## Post #2 by @mcavdar
*Posted on 2025-11-22 16:48:08*

hi [/u/pallavipadav](@PallaviPadav)

Can you please run `python -m langchain_core.sys_info` and share the result?

---

## Post #3 by @PallaviPadav
*Posted on 2025-11-22 16:50:52*

mcavdar:

python -m langchain_core.sys_info



[#p-4394-system-information-1]()System Information

OS:  Windows

OS Version:  10.0.19045

Python Version:  3.14.0 | packaged by Anaconda, Inc. | (main, Oct 22 2025, 08:58:42) [MSC v.1929 64 bit (AMD64)]


[#p-4394-package-information-2]()Package Information

langchain_core: 1.0.3

langchain: 0.3.27

langchain_community: 0.3.31

langsmith: 0.4.39

langchain_classic: 1.0.0

langchain_groq: 1.0.0

langchain_huggingface: 1.0.1

langchain_openai: 0.3.35

langchain_sambanova: 1.0.0

langchain_text_splitters: 1.0.0

langgraph_sdk: 0.2.9


[#p-4394-optional-packages-not-installed-3]()Optional packages not installed

langserve


[#p-4394-other-dependencies-4]()Other Dependencies

aiohttp: 3.13.2

async-timeout: Installed. No version info available.

claude-agent-sdk: Installed. No version info available.

dataclasses-json: 0.6.7

groq: 0.33.0

httpx: 0.28.1

httpx-sse: 0.4.3

huggingface-hub: 0.36.0

jsonpatch: 1.33

langchain-anthropic: Installed. No version info available.

langchain-aws: Installed. No version info available.

langchain-azure-ai: Installed. No version info available.

langchain-cohere: Installed. No version info available.

langchain-deepseek: Installed. No version info available.

langchain-fireworks: Installed. No version info available.

langchain-google-genai: Installed. No version info available.

langchain-google-vertexai: Installed. No version info available.

langchain-mistralai: Installed. No version info available.

langchain-ollama: Installed. No version info available.

langchain-perplexity: Installed. No version info available.

langchain-together: Installed. No version info available.

langchain-xai: Installed. No version info available.

langsmith-pyo3: Installed. No version info available.

numpy: 2.3.4

openai: 2.6.1

openai-agents: Installed. No version info available.

opentelemetry-api: Installed. No version info available.

opentelemetry-exporter-otlp-proto-http: Installed. No version info available.

opentelemetry-sdk: Installed. No version info available.

orjson: 3.11.4

packaging: 25.0

pydantic: 2.12.3

pydantic-settings: 2.11.0

pytest: Installed. No version info available.

pyyaml: 6.0.3

PyYAML: 6.0.3

requests: 2.32.5

requests-toolbelt: 1.0.0

rich: Installed. No version info available.

sambanova: 1.1.6

sentence-transformers: 5.1.2

sqlalchemy: 2.0.44

SQLAlchemy: 2.0.44

tenacity: 9.1.2

tiktoken: 0.12.0

tokenizers: 0.22.1

transformers: 4.57.1

types-requests: 2.32.4.20250913

typing-extensions: 4.15.0

vcrpy: Installed. No version info available.

zstandard: 0.25.0

---

## Post #4 by @heisenberg-7
*Posted on 2025-11-22 16:52:01*

I can see it was planned to be removed in 1.0.0, but not able to find the migrated import


```
`@deprecated(since=“0.3.3”,removal=“1.0.0”,message=("Please see the migration guide at: "“https://python.langchain.com/docs/versions/migrating_memory/”),)

class BaseMemory(Serializable, ABC):
“”"Abstract base class for memory in Chains.

Memory refers to state in Chains. Memory can be used to store information about
    past executions of a Chain and inject that information into the inputs of
    future executions of the Chain. For example, for conversational Chains Memory
    can be used to store conversations and automatically add them to future model
    prompts so that the model has the necessary context to respond coherently to
    the latest input.
`
```

---

## Post #5 by @mcavdar
*Posted on 2025-11-22 16:55:28*

`langchain_core: 1.0.3`

`langchain: 0.3.27`

that doesn’t look normal. Have you tried updating LangChain? with: `pip install -U langchain`

---

## Post #6 by @kiran
*Posted on 2025-11-27 15:04:38*

Hey. Many of functions have moved to langchain_classic.

Try this to run create react agent:   from langchain_classic.agents import create_react_agent

I hope it works

---
