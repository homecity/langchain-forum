# How to use Checkpointer (PostgresSaver)

**Topic ID:** 187
**Created:** 2025-07-02 03:17:05
**URL:** https://forum.langchain.com/t/187

**Tags:** python-help, self-hosted

---

## Post #1 by @patrickcteng
*Posted on 2025-07-02 03:17:05*

Hi, I’m building a Python LangGraph backend, where we have custom tools that can be called to create a ToolMessage which “commands” the UI to perform actions.

Currently, the idea is that we’d put the UI action command in a ToolMessage.artifact field. The UI would read the ToolMessage.artifact in the message history and perform the action. However, I want to prevent the action from being run again, so I need a way to update the `response_metadata` field of the ToolMessage; to let the UI know now to perform the action the 2nd time around when the messages reloaded again.

However, I can’t seem to figure out how to change the messages in a checkpoint using AsyncPostgresSaver or PostgresSaver.  I know to use the get/aget to get the checkpoint from a thread. But I can’t figure out how to save a new checkpoint with the updated Message.

Finally, we have multiple agents running, so I’m trying to manipulate the Checkpoints without recreating the graph.

Any help in the right direction would be much appreciated. Code, document, technique.  Am I thinking  about this in the wrong way?

Thanks in advance!

---

## Post #2 by @Isaac
*Posted on 2025-07-03 20:22:27*

Hi Patrick, welcome to the community! If you are using the FE to act on these tool messages, here is a potential solution that I can think of:

If you just want to save a new checkpoint you need to reinvoke the graph (checkpoints are created after each “step” of the graph). So what I would suggest is that you store the message ids that have been acted on (you could do this either in the BE or the FE). Basically you could have a key in your state that contains the acted on message ids and you could just add to that when reinvoking the graph. When you get the checkpoint, you can then compare the tool messages against the list of already acted upon messages to make sure you don’t act on the same message twice.

---

## Post #3 by @patrickcteng
*Posted on 2025-07-07 21:48:01*

Thank you! I will try this method today.

---
