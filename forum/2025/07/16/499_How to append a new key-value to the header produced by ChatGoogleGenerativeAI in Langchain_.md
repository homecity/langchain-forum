# How to append a new key-value to the header produced by ChatGoogleGenerativeAI in Langchain?

**Topic ID:** 499
**Created:** 2025-07-16 14:26:23
**URL:** https://forum.langchain.com/t/499

**Tags:** js-help

---

## Post #1 by @agn-7
*Posted on 2025-07-16 14:26:23*

I want to use my proxy server with `ChatGoogleGenerativeAI` method in langchain.

I changed the baseUrl by `baseUrl` parameter, however, I couldn’t find a parameter or a manner to append a new pair of key-value into the header for `authorization` to pass my proxy API authentication.

here is what I have done so far, but it doesn’t add the authorization attribute to the request header:


```
`import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

      // Prepare configuration with custom headers if proxy auth is available
      const modelConfig: any = {
        apiKey: apiKey,
        model: this.modelName,
        maxOutputTokens: llmConfig.maxOutputTokens,
        temperature: llmConfig.temperature,
        topK: 1,
        topP: 0.90,
        safetySettings: safetySettings,
        streaming: true,
        baseUrl: llmConfig.baseUrl // Use configured baseURL for custom proxy support
      };

      // Add custom headers for proxy authentication if available
      if (llmConfig.baseUrl && proxyAuthToken) {
        modelConfig.requestOptions = {
          customHeaders: {
            'authorization': `Bearer ${proxyAuthToken}`
          }
        };
      }

      // Initialize the LangChain model
      this.model = new ChatGoogleGenerativeAI(modelConfig);
`
```


But with `@google/generativeai` it is doable using `requestOptions.customHeaders` and works properly:


```
`import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

  initialize(
    apiKey: string,
    modelName?: string,
    enableLogging?: boolean,
    baseUrl?: string,
    proxyAuthToken?: string
  ): void {
    if (!apiKey) {
      throw new Error('Gemini API key is required');
    }

    this.loggingEnabled = enableLogging || false;
    this.currentModel = modelName || 'gemini-2.0-flash';
    this.baseUrl = baseUrl;

    this.genAI = new GoogleGenerativeAI(apiKey);

    // Prepare request options with baseUrl and proxy auth if provided
    const requestOptions: any = {};

    if (this.baseUrl) {
      requestOptions.baseUrl = this.baseUrl;
    }

    if (proxyAuthToken) {
      requestOptions.customHeaders = {
        'authorization': `Bearer ${proxyAuthToken}`
      };
    }

    this.model = this.genAI.getGenerativeModel({
      model: this.currentModel,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: this.getWorkflowSchema()
      }
    }, Object.keys(requestOptions).length > 0 ? requestOptions : undefined);

    logger.info('GeminiAnalyzerService initialized');
  }
`
```

---

## Post #2 by @Yuchaocheng
*Posted on 2025-12-14 04:32:04*

Hi! I ran into the exact same issue and did a deep dive into the source code. Here’s what I found:

### Root Cause

You’re right that `@google/generative-ai` SDK supports `customHeaders` via `RequestOptions`. However, `ChatGoogleGenerativeAI` in `@langchain/google-genai` **does not expose this option**.

Looking at the source code ([chat_models.ts, lines 727-730]( [https://github.com/langchain-ai/langchainjs/blob/main/libs/providers/langchain-google-genai/src/chat_models.ts#L727-L730](langchainjs/libs/providers/langchain-google-genai/src/chat_models.ts at main · langchain-ai/langchainjs · GitHub) )):

```typescript

this.client = new GenerativeAI(this.apiKey).getGenerativeModel(

{ /* modelParams */ },

{


```
`apiVersion: fields.apiVersion,

baseUrl: fields.baseUrl,

// ❌ customHeaders is NOT passed here

// ❌ customFetch is NOT passed here
`
```

}

);

```

Only `apiVersion` and `baseUrl` are forwarded to the SDK. The `requestOptions` parameter you’re trying to use is simply ignored.

### Workaround: Global Fetch Interception

Until LangChain adds native support, you can intercept `globalThis.fetch`:

```typescript

import { ChatGoogleGenerativeAI } from ‘[/u/langchain](@langchain)/google-genai’;

const PROXY_HOST = ‘[http://your-proxy-host.com](your-proxy-host.com)’; // Replace with your proxy hostname

const PROXY_AUTH_TOKEN = ‘your-token’;

// Intercept fetch before creating the model

const originalFetch = globalThis.fetch;

if (!(globalThis.fetch as any).__proxyPatched) {

globalThis.fetch = async (input, init) => {


```
`const url = typeof input === 'string' 

  ? input 

  : input instanceof URL 

    ? input.href 

    : (input as Request).url;

// Only intercept requests to your proxy

if (url.includes(PROXY_HOST)) {

  const headers = new Headers(init?.headers);

  // Remove SDK's default auth header, add your Bearer token

  headers.delete('x-goog-api-key');

  headers.set('Authorization', \`Bearer ${PROXY_AUTH_TOKEN}\`);

  return originalFetch(input, { ...init, headers });

}

return originalFetch(input, init);
`
```

};

(globalThis.fetch as any).__proxyPatched = true;

}

// Now create the model - requests will be intercepted

const model = new ChatGoogleGenerativeAI({

apiKey: ‘your-api-key’, // Still required by SDK, but will be replaced

model: ‘gemini-2.0-flash’,

baseUrl: ‘[https://your-proxy-host.com/api/path](https://your-proxy-host.com/api/path)’,

// … other options

});

```

### Feature Request

This is a missing feature, not a bug. I’ve prepared an issue/PR request for LangChain to add `customFetch` and `customHeaders` support. The fix is straightforward - just pass these options through to the underlying SDK.

If you’d like to help push this forward, consider:

1.  Upvoting any existing feature request

2. Opening a new feature request if none exists

3. Submitting a PR - the change is minimal (just add 2 fields to the interface and pass them to the SDK)

### Alternative: Use the SDK Directly

If you don’t need LangChain’s Agent/Chain features, using `@google/generative-ai` directly (as you’ve already discovered) is the cleanest solution for now.

Hope this helps!

---
