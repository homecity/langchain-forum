# LangSmith OTEL: Few Questions

**Topic ID:** 1548
**Created:** 2025-09-16 14:18:11
**URL:** https://forum.langchain.com/t/1548

---

## Post #1 by @jackHedaya
*Posted on 2025-09-16 14:18:11*

Hi

I’ve made some progress on an LangSmith integration for our Go LLM abstraction but have a few questions:


My original implementation relied on picking OTEL fields and structuring the payload manually. It was difficult to format the messages correctly (having LangSmith recognize different content parts, for example), so I opted to send the entire request payloads. I do the same for responses as well. This was before reading the OTEL converter that [/u/angus](@angus) sent my way; is this recommended / discouraged?


```
`// Example: Our OpenAI implementation
var params *responses.ResponseNewParams

paramsJSON, err := json.Marshal(params)
...

toolsJSON, err := json.Marshal(params.Tools)
...

invokeCtx, span := p.Instrumentor.InstrumentProviderInvoke(invokeCtx, "openai", config.Model.String(), paramsJSON, toolsJSON)


func (o *OTELInstrumentor) InstrumentProviderInvoke(ctx context.Context, provider string, model string, bodyBytes []byte, toolsBytes []byte) (context.Context, trace.Span) {
	ctx, span := o.tracer.Start(ctx, fmt.Sprintf("invoke.%s.%s", provider, model),
		trace.WithAttributes(
			LangsmithSpanKindKey.String(LangSmithSpanKindLLM.String()), // langsmith.span.kind
			GenAIOperationNameKey.String(GenAIOperationNameChat.String()), // gen_ai.operation.name
			GenAISystemKey.String(provider), // gen_ai.system
			GenAIRequestModelKey.String(model), // gen_ai.request.model
			GenAIPromptKey.String(string(bodyBytes)), // gen_ai.prompt
			ToolsDefinitionKey.String(string(toolsBytes)), // tools
		),
		trace.WithSpanKind(trace.SpanKindClient),
	)

	return ctx, span
}

func (o *OTELInstrumentor) InstrumentProviderResponse(span trace.Span, responseBytes []byte) {
	span.SetAttributes(
		GenAICompletionKey.String(string(responseBytes)), // gen_ai.completion
	)

	span.SetStatus(codes.Ok, "success")
}

func (o *OTELInstrumentor) InstrumentToolResult(span trace.Span, result any, err error) {
	if err != nil {
		span.RecordError(err)
		span.SetStatus(codes.Error, err.Error())
		span.SetAttributes(
			ToolErrorKey.String(err.Error()),
		)
		return
	}

	if result != nil {
		if resultBytes, marshalErr := json.Marshal(result); marshalErr == nil {
			// Truncate large results to avoid span bloat
			resultStr := string(resultBytes)
			span.SetAttributes(
				ToolResultKey.String(resultStr), // tool.result

				// Specific to LangSmith
				GenAICompletionKey.String(resultStr), // gen_ai.completion
			)
		}
	}
	span.SetStatus(codes.Ok, "success")
}
`
```


Given the implementation above, I haven’t been able to get LangSmith to parse the tools **without** manually specifying the tools separately from the rest of the gen_ai.prompt. This feels a little “hacky” … wondering if there’s a more elegant solution.
Also in the realm of tools, I can’t get the tool result to be populated in the viewer unless I provide the tool result as a gen_ai.completion. Is this correct?
This implementation seems to works in the trace viewer but once I attempt to use the playground, things start breaking (only for OpenAI, Anthropic works well). Is this due to LangSmith playground not supporting the Responses API? (Notice the prompts are lost –– the response defaults to the response of the original request)

[/uploads/short-url/poqEFePXXUm57MbjIhDtDMjpYWe.jpeg?dl=1](Screenshot 2025-09-16 at 10.15.49 AM1698×1419 200 KB)


Much of these questions, I realize, are intended to make our implementation more robust and correct. Any other recommendations?

---

## Post #2 by @angus
*Posted on 2025-09-17 18:32:52*

Hey! Your implementation looks solid overall.

**Re: sending full payloads vs manual field picking**: The OTEL converter is designed to handle JSON strings like you’re doing. It tries to parse them as JSON first, then falls back to treating them as strings. Manual field picking is way more error-prone and you lose fidelity, especially with complex message structures.

**Tools handling**: I wouldn’t say what you’re doing is hacky. The converter expects tools as a separate attribute from the prompt. And yes, you’re correct about needing `gen_ai.completion` for tool results to show up in the viewer.

**Playground issues**: We do support Responses API but there are some caveats here. Tagging in [/u/madams0013](@madams0013) to help here

---
