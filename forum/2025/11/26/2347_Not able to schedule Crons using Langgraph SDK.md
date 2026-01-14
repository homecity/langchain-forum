# Not able to schedule Crons using Langgraph SDK

**Topic ID:** 2347
**Created:** 2025-11-26 10:12:51
**URL:** https://forum.langchain.com/t/2347

**Tags:** js-help

---

## Post #1 by @amitchaudharyc
*Posted on 2025-11-26 10:12:51*

I am trying to use Langgraph SDK and using client.crons.create() method. It asks me to pass assistantId where I pass my graph name “agent”, as shown in docs [https://docs.langchain.com/langsmith/cron-jobs#javascript-4](Use cron jobs - Docs by LangChain) .  But it throws an error that it expects UUID. I assume the default assistant is created based on graph, but when I try to get the list of assistants, it returns empty .

Also when creating stateless jobs, I don’t want to pass threadId, but it still forces me to do so. My purpose is to create new thread on every cron run.

---

## Post #2 by @Josh
*Posted on 2025-11-26 19:52:28*

Hey! Thanks for raising these concerns and sorry for the pain here. I’m looking into these issues and will let you know when resolved.

To confirm, you’re hitting a postgres server (not in memory) when running these commands correct? Crons aren’t yet supported on the in memory implementation and might be more out of date as a result with some of the validation issues.

---

## Post #3 by @amitchaudharyc
*Posted on 2025-11-27 04:34:16*

Thanks Josh. I have been trying on local (in-memory). So if it is not available on local, how to test things? Any other ways?

Also can you confirm why I am getting empty assistants in in-memory? Do we really need to pass UUID or graph name should be enough?

One more thing, I tried to test it on deployed version, and it is able to create cron. But I don’t see it running anywhere. Is there a way at least where I can check if it ran or not or if there are any errors. In server logs I can just see it created the cron successfully, but where to check whether it has triggered or not?

---

## Post #4 by @amitchaudharyc
*Posted on 2025-11-28 09:48:26*

Updates:


I am able to schedue cron using deployed version
I was trying to schedule it in non-UTC time so I could not see it run. After fixing this, I can see it gets triggered.

But now the issue I am facing is that when it starts running, I see below error:

28/11/2025, 15:10:04

[ERROR] Error scheduling cron run cron_id=019ac9d3-a644-7719-b577-2b89264cb4e8

Traceback (most recent call last):

File “/api/langgraph_api/cron_scheduler.py”, line 38, in cron_scheduler

File “/api/langgraph_api/models/run.py”, line 305, in create_valid_run

starlette.exceptions.HTTPException: 404: Thread or assistant not found.

Below is the value I see in authorization handler:

[DEBUG] [LangGraph Auth] Value: {

“thread_id”: “955779ac-66b8-4a40-81e0-90f54ea2dfe2”,

“assistant_id”: “a2193a9d-c81f-5f9e-8fb5-76310a5fd9e5”,

“run_id”: “019ac9d5-83f4-733c-8b71-0413ca0f1c40”,

“status”: “pending”,

“metadata”: {

“userId”: “”,

“accountId”: “”,

“scheduledTaskTitle”: “list in progress work orders”,

“assistant_id”: “a2193a9d-c81f-5f9e-8fb5-76310a5fd9e5”

},

“prevent_insert_if_inflight”: false,

“multitask_strategy”: “enqueue”,

“if_not_exists”: “reject”,

“after_seconds”: 0,

“kwargs”: {

“input”: {

“messages”: [

{

“role”: “user”,

“content”: “in progress work orders”

}

]

},

“command”: null,

“config”: {

“configurable”: {

“cron_id”: “019ac9d3-a644-7719-b577-2b89264cb4e8”,

“langgraph_auth_user”: {

“identity”: “Kt8AR2w8ls”,

“is_authenticated”: true,

“display_name”: “Kt8AR2w8ls”

},

“langgraph_auth_user_id”: “Kt8AR2w8ls”,

“langgraph_auth_permissions”: ,

“langgraph_request_id”: null,

“_*after_seconds*_”: 0

},

“recursion_limit”: 200

},

“context”: {

“cron_id”: “019ac9d3-a644-7719-b577-2b89264cb4e8”

},

“stream_mode”: [

“values”

],

“interrupt_before”: null,

“interrupt_after”: null,

“webhook”: null,

“feedback_keys”: null,

“temporary”: false,

“subgraphs”: false,

“resumable”: false,

“checkpoint_during”: true,

“durability”: “async”

}

}

---

## Post #5 by @Josh
*Posted on 2025-11-28 17:52:30*

Hey! Thanks for the updates and glad you were able to get them created. To your questions:


So if it is not available on local, how to test things? Any other ways?


You should be able to run `npx ￼/langgraph-cli up` to start up the postgres server locally, however trying that myself, I’m also running into issues with crons. Apologies and working on a fix for that.


Also can you confirm why I am getting empty assistants in in-memory? Do we really need to pass UUID or graph name should be enough?


Graph name should be fine. The validation in the in-memory version for crons is just out of date. Are you running into issues when calling the assistants search API ( [https://langchain-ai.github.io/langgraph/cloud/reference/api/api_ref.html#tag/assistants/post/assistants](LangGraph Platform API Reference) )? Just tried that myself with the graph_id parameter and was able to find a local graph. Can you share structure of the call you’re making there?


starlette.exceptions.HTTPException: 404: Thread or assistant not found.


Can you share the request that you’re making to create cron ( [https://langchain-ai.github.io/langgraph/cloud/reference/api/api_ref.html#tag/crons-plus-tier/post/runscrons](LangGraph Platform API Reference) )? We just added support (apologies not yet documented) for the ability to create a new persisted thread for each cron run with this endpoint by passing the parameter `on_run_completed` set to `keep`. For example:


```
`curl https://langchain-ai.github.io/runs/crons 
  –request POST 
  –header 'Content-Type: application/json'
  –data '{
    "schedule": "*/5 * * * *",
    "assistant_id": "agent",
    "on_run_completed": "keep"
}'
`
```

Hopefully that helps and hope to have fixes for the other issues raised by next week.

---

## Post #6 by @amitchaudharyc
*Posted on 2025-11-29 11:13:27*

Hi Josh,

Thanks for the quick reply. It really means a lot as it blocks my prod deployment.

Right now I am able to create stateless crons. They do get executed and I can see the run in Langsmith. Interesting thing is how to access the thread it created (in stateless).  I can see the thread in Langsmith but if I try to access it in my application, it says not found.

Is this related to “on_run_completed”: “keep” ?

By the way I am using JS SDK (not python), and in the SDK, for the onCompletion, I see only 2 options: **complete** and **continue**. There is no “**keep**” option.

[/uploads/short-url/lrJ6xXis6E58sOkCcoCX4SpXcKZ.png?dl=1](image874×424 29.1 KB)

Also could you please help me understand one thing:

I want to create “**new**” thread for “**each**” run, so is creating stateless crons the option? Because if I use stateful cron, it uses single thread for each execution, which is not what I want. Reading the docs about stateless, I am not that sure what fulfills my scenario. Ultimately I want each new thread to be created on each run and user should be able to access that thread to resume conversation from there.

Also because there is no documentation, I would like you to confirm below:

I have custom auth implemented. So I have **authenticate** method and **on** handler. If I start thread manually it hits both authenticate and on handler, but if cron executes the run, it bypasses authenticate method. It hits **on** handler though. Is this the way it should work?

---

## Post #7 by @amitchaudharyc
*Posted on 2025-12-01 11:06:43*

Just to add more, I also tried calling the API directly as you suggested where I have set on_run_completed: ‘keep’. I can see the thread is created by the cron and visible in Langsmith. But I can’t see the thread tied to the user. How does this work behind the scenes?

[/uploads/short-url/sMJ85OtATZM7MGAhspw32nbWaIb.png?dl=1](image1209×1085 148 KB)

---
