# Struggling to pass metadata to LangSmith via Langflow components

**Topic ID:** 1658
**Created:** 2025-09-26 19:41:20
**URL:** https://forum.langchain.com/t/1658

---

## Post #1 by @slammytrees
*Posted on 2025-09-26 19:41:20*

I’m trying to pass metadata, specifically the “session_id” to LangSmith whenever I run a component in Langflow. My goal is to be able to use Langsmith (or any other observability platform) to observe, note, and improve my flows.

I have tried for an embarrassingly long time, but have been unable to figure out how to do this. Setting up LangSmith with langflow worked for basic tracing out of the box, but because it doesn’t pass through the session id you can’t see the traces as threads (so it treats every chat or component run as a distinct session).

LangSmith provides documentation on how to add metadata to your application, but I am a novice programmer and can’t get it to work or know where to insert this in langflow components: [https://docs.langchain.com/langsmith/add-metadata-tags](https://docs.langchain.com/langsmith/add-metadata-tags)

Feeling pretty blocked and demotivated by this; open to any suggestions or help!

---
