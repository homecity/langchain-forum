# Persistent New Threads for Cron Jobs

**Topic ID:** 1736
**Created:** 2025-10-03 17:04:41
**URL:** https://forum.langchain.com/t/1736

---

## Post #1 by @ericness
*Posted on 2025-10-03 17:04:41*

I recently built a LangGraph graph to summarize news on a daily basis to Slack and then wait for replies to the Slack message. When I run the graph from LG Studio in LGP it works great and the Slack replies the graph thread to restart. However, when the graph is run from a cron job, replying to the Slack message doesn’t restart the graph.

After some investigation I found out that there are two modes to set up cron jobs:


stateless - these don’t persist the thread after they finish
on an existing thread - add new runs to an existing thread

Stateless is the default and causes the behavior explained above. Running on an existing thread means that I won’t be able to have multiple graphs waiting on replies to different Slack threads.

Neither of these match what I want which is to start on new thread on a schedule and persist the thread after the thread is interrupted. Is this on the development roadmap or is there some reason it wasn’t implemented?

---

## Post #2 by @ericness
*Posted on 2025-10-05 14:23:06*

I solved this by adding a FastAPI deployed to Vercel with a cron scheduled that uses langgraph-sdk to create and run a persistent thread. I also looked at using Crontap to make a scheduled REST call to the LangGraph API, but I couldn’t get it to work. This would have been much easier if there was an option in the LGP UI / API to enable this behavior.

---

## Post #3 by @Josh
*Posted on 2025-10-06 14:09:05*

Hi Eric - Glad you found a workaround. You could do a similar thing using LGP crons and a graph that has a single node that creates a persistent thread and then executes the relevant graph on that, but fully agreed that’s clunky. I’ve added an item to our backlog to track this request and we’ll let you know when we’ve added it. Thanks for raising!

---

## Post #4 by @ericness
*Posted on 2025-10-07 16:14:12*

Thanks for adding it to the backlog!

---
