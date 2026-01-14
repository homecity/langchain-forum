# Socket error after 60s

**Topic ID:** 448
**Created:** 2025-07-14 18:02:14
**URL:** https://forum.langchain.com/t/448

**Tags:** cloud

---

## Post #1 by @lukanarrative
*Posted on 2025-07-14 18:02:14*

Hi,

We are encountering an issue when invoking agents on the langgraph platform.

The agents finish successfully -  we can see that in the Langsmith logs, but the sdk requests we make fail after 60s:

We create a run with this code in typescript:


```
`try {
      // Create and start a new run
      const run = await this.client.runs.create(threadId, assistantID, {
        input,
      });

      // Wait for the run to complete and gather the response
      const response = await this.client.runs.join(threadId, run.run_id);

      this.logger.log(`Received response from LangChain Graph: ${JSON.stringify(response)}`);

      // Return the response as a JSON object
      return response as T;
    } catch (error) {
      this.logger.error(`Error during LangChain Graph request: ${JSON.stringify(error)}`);
      throw error;
    }
`
```

The run is successfully created, we can see that in langgraph platform and on Langsmith.

After 60s, we get this error (I’ve just changed my ip address with ‘*’).


```
`{
  "cause": {
    "name": "SocketError",
    "code": "UND_ERR_SOCKET",
    "socket": {
      "localAddress": "**.**.**.**",
      "localPort": 49588,
      "remoteAddress": "35.230.68.103",
      "remotePort": 443,
      "remoteFamily": "IPv4",
      "bytesWritten": 1346,
      "bytesRead": 430
    }
  }
}
`
```

The run successfully finishes on the langgraph platform - we can see the output in langsmith logs.

Any ideas why this is happening?

This is happening in environemnt with deployment id `36ce7f06-2950-4fb9-8295-da9a24c7a789`

---

## Post #2 by @hari
*Posted on 2025-07-15 05:26:37*

Hi [/u/lukanarrative](@lukanarrative), can you try setting a longer timeout on your client instance? Requests to  /threads/{thread_id}/runs/{run_id}/join may take longer than 60 seconds

---

## Post #3 by @lukanarrative
*Posted on 2025-07-15 12:08:25*

Found the core issue → our service’s VPN was silently killing requests longer than 60s, that caused this issue 

Nothing wrong on the LangGraph’s side!

---
