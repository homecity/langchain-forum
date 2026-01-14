# Automation Webhooks for Adding Tracing into AQ

**Topic ID:** 1233
**Created:** 2025-08-18 20:11:11
**URL:** https://forum.langchain.com/t/1233

---

## Post #1 by @sicktastic
*Posted on 2025-08-18 20:11:11*

I want to alert my team through Slack when some tracing is added to the annotation queue.  Is there a webhook or some kind of automation to do that?  I only see alerts that are related to latency or feedback scores.

---

## Post #2 by @AbdulBasit
*Posted on 2025-08-19 16:27:22*

LangSmith currently doesn’t have built in webhooks specifically for annotation queue additions. The existing alerts focus on performance metrics (latency, feedback scores) rather than workflow events like traces being added to queues.

**Potential workarounds:**



**Polling approach**: periodically check the annotation queue via LangSmith API and compare with previous state to detect new additions



**Custom integration**: if you’re programmatically adding traces to the queue add Slack notifications at that point in your code



**Feature request**: this would be a valuable automation feature to request from the LangSmith team



The polling method using the LangSmith SDK would be your best bet currently, though it’s not as elegant as a proper webhook system. You could set up a simple script that checks queue size/contents every few minutes and posts to Slack when new items are detected.

---

## Post #3 by @sicktastic
*Posted on 2025-08-21 20:49:26*

We’re currently running offline evaluations, with traces manually added to the annotation queue. Our non-technical SMEs have requested Slack notifications when this occurs. This could be a valuable feature request to enhance LangSmith’s automation capabilities, especially with various third-party integrations (Slack, Linear, etc)

---
