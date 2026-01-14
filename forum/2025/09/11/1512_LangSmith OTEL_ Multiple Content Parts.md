# LangSmith OTEL: Multiple Content Parts

**Topic ID:** 1512
**Created:** 2025-09-11 16:28:05
**URL:** https://forum.langchain.com/t/1512

---

## Post #1 by @jackHedaya
*Posted on 2025-09-11 16:28:05*

Hi all

We’re working on a LangSmith OTEL implementation in Golang are having trouble specifying multiple parts for a single message. For example:


```
`inputsMessages := []responses.ResponseInputItemUnionParam{
		{
			OfInputMessage: &responses.ResponseInputItemMessageParam{
				Role: string(responses.ResponseInputMessageItemRoleUser),
				Content: responses.ResponseInputMessageContentListParam{
					{
						OfInputText: &responses.ResponseInputTextParam{
							Text: "What is in this picture?",
						},
					},
					{
						OfInputImage: &responses.ResponseInputImageParam{
							ImageURL: param.NewOpt("https://cdn.creatureandcoagency.com/uploads/2014/06/Bottlenose-Dolphin-Facts-2.jpg"),
						},
					},
				},
			},
		},
	}
`
```

I’ve tried passing the entire messages array as JSON to gen_ai.prompt and sending content like so:


```
`providerInvokeSpan.SetAttributes(attribute.Key("gen_ai.prompt.0.content").String(`[{ "type": "text", "text": "What is in this picture?" }, { "type": "input_image", "image_url": "https://cdn.creatureandcoagency.com/uploads/2014/06/Bottlenose-Dolphin-Facts-2.jpg" }]`))
`
```

Is this something the LangSmith OTEL integration supports?

I’ve also checked the Run struct in the OTEL collector but Inputs / Outputs are still weakly typed unfortunately


```
`https://github.com/langchain-ai/langsmith-collector-proxy/blob/352bc8645a0345908ab03f0180716ece9d065d1b/internal/model/run.go#L4
`
```

---

## Post #2 by @angus
*Posted on 2025-09-11 17:44:33*

Hi [/u/jackhedaya](@jackHedaya)  super excited to hear you are building this, something I’ve wanted to do for a while!!

Here are our current supported OTEL attributes; generally we try to follow the genAI semantic conventions. [https://docs.smith.langchain.com/observability/how_to_guides/trace_with_opentelemetry#supported-opentelemetry-attribute-and-event-mapping](Trace with OpenTelemetry | 🦜️🛠️ LangSmith)

---

## Post #3 by @angus
*Posted on 2025-09-11 18:01:36*

Looking at your example further, I should clarify that The LangSmith OTEL integration currently treats multi-part JSON content as a plain string. It doesn’t parse or recognize the multi-part structure - it just stores the entire JSON as literal text content. The converter in the langsmith-collector-proxy is pretty similar to our backend parser if that helps to serve as a reference: [https://github.com/langchain-ai/langsmith-collector-proxy/blob/main/internal/translator/otel_converter.go](langsmith-collector-proxy/internal/translator/otel_converter.go at main · langchain-ai/langsmith-collector-proxy · GitHub) .

If there are improvements to JSON parsing you’d like to see, lmk and I can look into updating it. Very excited to see someone work on this so would love to assist in any way I can!

---

## Post #4 by @jackHedaya
*Posted on 2025-09-11 21:49:29*

Thank you! Saw success with using gen_ai.prompt and passing in the raw response body from OpenAI / Anthropic.

Friendly recommendation –– perhaps the integrations should follow the “parts” convention as described here?


  
      

      [https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/#gen-ai-input-messages](OpenTelemetry)
  

  
    

[https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/#gen-ai-input-messages](Gen AI)

  GenAI Attributes Deprecated GenAI Attributes Deprecated OpenAI GenAI Attributes GenAI Attributes This document defines the attributes used to describe telemetry in the context of Generative Artificial Intelligence (GenAI) Models requests and...

---
