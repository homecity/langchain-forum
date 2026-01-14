# Stream reconnection and cancellation endpoints fail in production environment while working correctly in local development

**Topic ID:** 447
**Created:** 2025-07-14 18:00:19
**URL:** https://forum.langchain.com/t/447

**Tags:** js-help, cloud

---

## Post #1 by @keenanberry
*Posted on 2025-07-14 18:00:19*

[#p-714-stream-reconnection-and-cancellation-not-working-in-production-1]()Stream Reconnection and Cancellation Not Working in Production
[#p-714-environment-2]()Environment

**Framework**: Next.js (App Router)
**LangGraph SDK**: `@langchain/langgraph-sdk/react`
**Hosting**: Vercel
**Browser**: Chrome 138

[#p-714-issue-description-3]()Issue Description
In my Next.js application using the LangGraph React SDK, stream reconnection and cancellation work perfectly in local development but fail silently in the production environment.

Specifically:



**Working locally**:


Stream reconnection (via `reconnectOnMount: true`) successfully rejoins existing streams when reloading a tab
Cancellation (via the `stop()` function) successfully terminates running threads



**Not working in production**:


No API calls are made to the reconnection endpoint (`/threads/{id}/runs/{id}/stream`)
No API calls are made to the cancellation endpoint (`/threads/{id}/runs/{id}/cancel`)
No errors appear in the console



[#p-714-what-ive-tried-4]()What I’ve Tried

Verified environment variables are correctly set in production
Confirmed authentication is working (can create new threads and interact normally)
Added detailed logging to the custom fetch implementation
Confirmed the `stop()` function exists and is being called

[#p-714-code-example-5]()Code Example

```
`const { isLoading, messages, values, submit, stop } = useStream({
  apiUrl: LANGGRAPH_DEPLOYMENT_URL,
  assistantId: AGENT_NAME,
  messagesKey: 'messages',
  threadId: tab.threadId,
  onThreadId: (threadId) => onThreadIdChange(tab.id, threadId),
  callerOptions: {
    fetch: customFetch  // Custom fetch implementation with auth headers
  },
  reconnectOnMount: true,
});

// Stop handler
const handleStopBotResponse = useCallback(() => {
  stop();  // This works locally but not in production
  // Reset UI state...
}, [messages, stop]);
`
```

Any insights on why these specific endpoints might fail in production while other LangGraph API calls work correctly would be greatly appreciated!

---

## Post #2 by @keenanberry
*Posted on 2025-07-21 20:33:54*

The issue seems to be related to this section of the `useStream` code: [https://github.com/langchain-ai/langgraphjs/blob/main/libs/sdk/src/react/stream.tsx#L840-L847](langgraphjs/libs/sdk/src/react/stream.tsx at main · langchain-ai/langgraphjs · GitHub). The `runMetadataStorage` was always null in my vercel deployed environments… I never quite figured out why unfortunately, but I assumed it had something to do with Vercel’s SSR.

Anyway, I figured out a workaround that handles localStorage / sessionStorage in my own component and explicitly uses the `joinStream` to rejoin the stream when my component mounts.


```
`  const handleMetadataRunEvent = useCallback((run: { run_id: string }) => {
    if (typeof window !== 'undefined') {
      // Use tab.id (chat_id) as the localStorage key since it's unique per ChatWindow instance
      // NOTE: I use tab.id because its specific to my implementation but thread_id would make sense too
      const storageKey = `chat:${tab.id}:run`;
      window.localStorage.setItem(storageKey, run.run_id);
    }
  }, [tab.id]);

  const { isLoading, messages, values, submit, stop, getMessagesMetadata, joinStream } = useStream({
    apiUrl: LANGGRAPH_DEPLOYMENT_URL,
    assistantId: AGENT_NAME,
    messagesKey: 'messages',
    threadId: tab.threadId,
    onThreadId: (threadId: string) => {
      onThreadIdChange(tab.id, threadId);
    },
    onError(error: unknown) {
      console.error('Error in useStream:', error instanceof Error ? error.message : error);
      dispatch({ type: 'SET_ERROR_SNACKBAR', payload: true });
    },
    onMetadataEvent: (metadata) => {
      if (metadata.run_id) {
        handleMetadataRunEvent({ run_id: metadata.run_id });
      }
    },
    onFinish: (result) => {
      handleResponseFinish(result);
    },
    callerOptions: {
      fetch: customFetch
    },
  })
`
```

Since the `stop()` callback also relies on this `runMetadataStorage` object to hit the `threads/{thread_id}/runs/{run_id}/cancel` endpoint, I ended up calling `stop()` to abort the stream and then handling the `client.runs.cancel(threadId, runId)` in a server action.


```
`  const handleStopBotResponse = useCallback(() => {
    // Bug: stop() doesn't call langgraph /cancel endpoint, but it does abort the stream
    stop();
    // Handle thread run cancel
    const runId = window.localStorage.getItem(`chat:${tab.id}:run`);
    if (tab.threadId && runId) {
      cancelLanggraphRun(tab.threadId, runId);
    }
    window.localStorage.removeItem(`chat:${tab.id}:run`);
    // rest of callback
}, [messages, stop, tab.threadId, tab.id]
`
```

Figured I’d share in case this helps someone else. Also open to better ideas here if anyone’s got any!

Thanks

---
