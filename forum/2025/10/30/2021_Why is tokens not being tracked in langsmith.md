# Why is tokens not being tracked in langsmith

**Topic ID:** 2021
**Created:** 2025-10-30 08:38:36
**URL:** https://forum.langchain.com/t/2021

---

## Post #1 by @Najiya
*Posted on 2025-10-30 08:38:36*

When using LangSmith to track my `create_agent`, I’ve noticed that the token count now shows as zero. It used to track tokens correctly before — why is it no longer doing so?

---

## Post #2 by @marco
*Posted on 2025-10-30 12:01:22*

Can you share a snippet of code on how you’re defining the LLM? Also, can you check in Settings>Model Pricing if your model name is defined there and matches the one in the trace?

---

## Post #3 by @aerickson-clt
*Posted on 2025-10-30 18:20:37*

I’m not sure if this is your issue, but I had to enable `stream_usage` on the LLM I was passing to my graph because my graph is streaming its output.

[/uploads/short-url/2dI4xzQS2XPKZC7h5xslDDw01ZZ.png?dl=1](Screenshot 2025-10-24 132947616×523 40.3 KB)

---

## Post #4 by @Najiya
*Posted on 2025-10-31 05:26:41*

[/u/marco](@marco)


```
`llm = ChatGoogleGenerativeAI(model=model_name, google_api_key=api_key )
agent_node = create_agent(
            model=llm,
            prompt=system_prompt,
            tools=tools,
            debug=True,
            name="react_new_agent"
        )
`
```

This is how I’m enabling the LLM — I used to be able to track its usage, but I’m not sure why it’s not working now.

langchain_google_genai == 2.1.12 , this the version of package i am using.

[/u/aerickson-clt](@aerickson-clt) which is your package version? I am still not able to track even after providing stream_uasage=True

---

## Post #5 by @Najiya
*Posted on 2025-10-31 05:39:46*

[/u/marco](@marco)

i am using model as gemini 2.5 flash and it is present in the settings>models

[/uploads/short-url/lH1ctJ8q2CpFGZgjHpsLch3JVGV.png?dl=1](image1774×802 114 KB)

can you also tell me what is the use of   **Clone**

---
