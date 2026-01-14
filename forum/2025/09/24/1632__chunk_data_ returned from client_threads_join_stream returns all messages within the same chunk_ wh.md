# `chunk.data` returned from client.threads.join_stream returns all messages within the same chunk, what is `last-event-id`?

**Topic ID:** 1632
**Created:** 2025-09-24 15:48:26
**URL:** https://forum.langchain.com/t/1632

---

## Post #1 by @salmonsteak
*Posted on 2025-09-24 15:48:26*

Hello, I am trying to determine new messages from a thread that I join via `client.threads.join_stream`, but it seems like each chunk returns all messages from the start of the thread up till the latest message.

I see that `join_stream` takes in a `last_event_id` parameter based off the SDK docs [https://langchain-ai.github.io/langgraph/cloud/reference/sdk/python_sdk_ref/#langgraph_sdk.client.ThreadsClient.join_stream](here) which I thought would be helpful in returning the correct set of messages, but I can’t seem to find any documentation or information regarding what that `last_event_id` is supposed to be. When trying with IDs like the `checkpoint_id`, it returns this error: `Invalid last-event-id: must be a valid Redis stream ID`

Does anyone know where I can retrieve this `last-event-id`? TIA!

---
