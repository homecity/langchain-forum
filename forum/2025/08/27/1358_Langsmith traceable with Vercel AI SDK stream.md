# Langsmith traceable with Vercel AI SDK stream

**Topic ID:** 1358
**Created:** 2025-08-27 12:02:52
**URL:** https://forum.langchain.com/t/1358

**Tags:** js-help

---

## Post #1 by @georeith
*Posted on 2025-08-27 12:02:52*

I am using a Langsmith wrapper `traceable` around a complex agent with multiple different AI calls to group them, and using `thread_id` to merge agent responses in the UI. I need to teach the outer traceable how to process the final response for it to appear properly in the langsmith UI.

There are examples here for `generateText`: [https://docs.langchain.com/langsmith/trace-with-vercel-ai-sdk#with-traceable](Trace with the Vercel AI SDK (JS/TS only) - Docs by LangChain)

However there are no examples for `streamText` and by default Langsmith does not understand how to parse the output.

I believe I need to use a generator function as an `aggregator` like is implemented here: [https://github.com/langchain-ai/langsmith-sdk/blob/24c922f5cd995e398cea2101495ca6b3636824fb/js/src/wrappers/vercel.ts#L57-L85](langsmith-sdk/js/src/wrappers/vercel.ts at 24c922f5cd995e398cea2101495ca6b3636824fb · langchain-ai/langsmith-sdk · GitHub)

I tried using `process_outputs` and getting the content out of the stream but that blocks the result of `traceable` and therefore blocks my endpoint until the stream ends which defeats the purpose of streaming.

Do I need to reimplement the aggregator function above or is there a supplied easier way to handle this?

---

## Post #2 by @jacoblee93
*Posted on 2025-08-27 19:10:26*

Hey [/u/georeith](@georeith),

Yes we should have examples for this - if you are directly returning e.g. a final `streamText` response, can you try this?


  

      [https://github.com/langchain-ai/langsmith-sdk/blob/main/js/src/experimental/vercel/index.ts#L653](github.com/langchain-ai/langsmith-sdk)
  

  
    [https://github.com/langchain-ai/langsmith-sdk/blob/main/js/src/experimental/vercel/index.ts#L653](js/src/experimental/vercel/index.ts)


  [https://github.com/langchain-ai/langsmith-sdk/blob/main/js/src/experimental/vercel/index.ts#L653](`main`)




    
```
`
      
          ...resolvedLsConfig,
          metadata: {
            ai_sdk_method: "ai.streamText",
            ...resolvedLsConfig?.metadata,
          },
          processInputs: (inputs) => {
            const inputFormatter =
              resolvedLsConfig?.processInputs ?? _formatTracedInputs;
            return inputFormatter(inputs);
          },
          processOutputs: async (outputs) => {
            if (resolvedLsConfig?.processOutputs) {
              return resolvedLsConfig.processOutputs(outputs);
            }
            if (outputs.outputs == null || typeof outputs.outputs !== "object") {
              return outputs;
            }
            const content = await outputs.outputs.content;
            if (content == null || typeof content !== "object") {
              return outputs;
            }
      
    `
```




  

  
    
    
  

  


If you are returning a stream directly from `traceable`, then yes you will need to re-implement an aggregator function. If you have an example of what you’re currently trying, I can advise further.

---

## Post #3 by @georeith
*Posted on 2025-08-29 13:46:50*

[/u/jacoblee93](@jacoblee93) the issue with using `await` in `processOutputs` is it blocks the result of the `traceable` although ultimately this does work. Ultimately I ended up doing this:


```
` let traceablePromise: Promise, never> | undefined;

  }>;

const dataStreamResponsePromise: Promise = new Promise(

    (resolve) => {

traceablePromise = traceable(

// messages are passed in as an argument so langsmith knows what the input is

async (messages: Message[]) => {

let result: StreamTextResult, never> | undefined;

const dataStream = createDataStreamResponse({

execute: async (dataStream) => {

result = streamText({ ... });

result.mergeIntoDataStream(dataStream);

            },

          });

resolve(dataStream);

return { result };

        },

        {

processOutputs: async ({

result,

          }: {

result?: StreamTextResult, never>;

          }) => {

const messages = (await result?.response)?.messages;

return { messages };

          },

        },

      )(args.messages);

    },

  );
  // wait until the response is complete and for the traces to finish before shutting down the runtime
async function waitForTracesToFinish() {
  const { result } = await traceablePromise;
  await result?.response;
  await client.awaitPendingTraceBatches();
}
waitUntil(waitForTracesToFinish());

return dataStreamResponsePromise;
`
```

So I could return the data stream response before the traceable resolves (return the stream to client) and still have the traceable process the output correctly.

---
