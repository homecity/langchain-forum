# Increasing recursion limit on deployment

**Topic ID:** 1887
**Created:** 2025-10-21 15:26:50
**URL:** https://forum.langchain.com/t/1887

---

## Post #1 by @rkauf
*Posted on 2025-10-21 15:26:50*

Hello, I can’t find the correct way to increase the recursion limit when running my app on a LangSmith deployment. The with_config call below is honored when locally, but on the deployment, it still errors out when hitting the default limit of 25.

app = builder.compile().with_config({“recursion_limit”: 100})

Any pointers? Thanks!

---

## Post #2 by @rkauf
*Posted on 2025-10-24 10:50:24*

Update: On reading the LangGraph code, it would seem that setting the environment variable **`LANGGRAPH_DEFAULT_RECURSION_LIMIT`** should do the trick; however, that is not the case either. If recursion_limit is not explicitly passed at invoke time, the env variable’s default is ignored/overwritten with `None`.

---

## Post #3 by @pawel-twardziak
*Posted on 2025-10-24 12:11:00*

hi [/u/rkauf](@rkauf)

have you passed through that post [https://forum.langchain.com/t/how-to-set-recursion-limit-for-create-agent-v1/1905](How to set recursion_limit for create_agent (v1)?)? Is that helpful?

---
