# Missing items from state, after resuming thread

**Topic ID:** 406
**Created:** 2025-07-11 22:28:10
**URL:** https://forum.langchain.com/t/406

---

## Post #1 by @darthShana
*Posted on 2025-07-11 22:28:10*

Hi team..

Im facing an issue, im hoping i can get some help on.. Most probably something i have done to break things..

so..

I have an interrupted thread.. Waiting on human confirmation

TraceID: 1f05e9d4-136a-6daa-97a4-89a4622938c1

RunID: 5bce9361-7b42-4cd6-87de-814e3150133d

as seen in the screenshot bellow

[/uploads/short-url/fy7no1SQw48PAFBumVkEtoom5Hb.jpeg?dl=1](Screenshot 2025-07-12 at 10.21.27 AM1920×1305 190 KB)

its stopped on should continue and the state has a user and transactions.

and my state wrapper is


```
`class State(MessagesState):
    transactions: dict[str, list[dict]]
    statement_filter: dict
    user: dict
`
```

however on my typescript client when i do


```
`    console.log("thread")
    console.log(await this.client.runs.get(threadId, runId));
    let finalResult = await this.client.threads.getState(threadId);
    console.log("finalResult");
    console.log(finalResult);

    console.log('transactions');
    // @ts-ignore
    let finalResultElementElement = finalResult['values']['transactions'];
    console.log(finalResultElementElement);
`
```

i get


```
`[Log] Object (main-4SARQMJM.js, line 25)

checkpoint: {checkpoint_id: "1f05e9d4-39ca-6368-8002-b716387382cf", thread_id: "098ce3b9-90e2-4e6c-bb65-31a0a8403777", checkpoint_ns: ""}

checkpoint_id: "1f05e9d4-39ca-6368-8002-b716387382cf"

created_at: "2025-07-11T21:23:18.570057+00:00"

metadata: {step: 2, run_id: "1f05e9d4-136a-6daa-97a4-89a4622938c1", source: "loop", writes: {triage_router: null}, parents: {}, …}

next: ["document_and_email_processing_agent"] (1)

parent_checkpoint: {checkpoint_id: "1f05e9d4-1de7-6989-8001-cfa8b1838e31", thread_id: "098ce3b9-90e2-4e6c-bb65-31a0a8403777", checkpoint_ns: ""}

parent_checkpoint_id: "1f05e9d4-1de7-6989-8001-cfa8b1838e31"

tasks: [Object] (1)

values: Object

messages: [Object] (1)

user: {user_id: "2564cde7-1570-4e35-bb44-ea34d535345d", email: "darthShana@gmail.com", first_name: "Ronak", last_name: "Khatri", company_name: null, …}

Object Prototype

Object Prototype

`
```

while i can see user and messages, transactions are missing

If it helps at all.. Things used to work until i changed this transaction processing to a sub-agent

but im using a shared state object between the parent and sub agents

The parent populates the user which seems to be present, the sub agent adds the transactions which seem to be missing when resuming an interrupted thread

Oh also im using the webhook method get notified when the execution gets interrupted..

---

## Post #2 by @darthShana
*Posted on 2025-07-16 08:21:09*

okey after some research i discovered checkpointing

---
