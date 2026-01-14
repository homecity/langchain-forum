# Where does cron work?

**Topic ID:** 1072
**Created:** 2025-08-11 17:14:51
**URL:** https://forum.langchain.com/t/1072

**Tags:** js-help, self-hosted

---

## Post #1 by @nigel
*Posted on 2025-08-11 17:14:51*

I was trying to create a cron task using the locally run cli based server but I could not get it to work as I could not create a cron task. It turns out crons are not supported on the locally run version. I’m trying the local hosted docker version but it could be the same issue. Does any one know ow where crons work and where this is documented?

---

## Post #2 by @Isaac
*Posted on 2025-08-11 22:10:45*

Hi Nigel! We currently do not support cron jobs for in memory checkpointers, so you would need to use postgres checkpointing for cron jobs to work. You can do so by changing the checkpointer in your locally running graph, or by hosting your graph on LangGraph platform which automatically uses the postgres checkpointer. You can find our docs about cron jobs [https://docs.langchain.com/langgraph-platform/cron-jobs](here).

---

## Post #3 by @nigel
*Posted on 2025-08-12 05:06:50*

Hi Isaac, thanks for getting back to me, the graph I have is not using a checkpoint. It simply fires input to another graph to collect gmail, it’s a JS version of the cron task in the Ambient Agents course. As far as I can tell the docker container version of LangSmith does fire up a Postgres container.

---
