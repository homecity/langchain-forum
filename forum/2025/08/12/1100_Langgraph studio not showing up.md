# Langgraph studio not showing up

**Topic ID:** 1100
**Created:** 2025-08-12 17:29:27
**URL:** https://forum.langchain.com/t/1100

---

## Post #1 by @jonathan1
*Posted on 2025-08-12 17:29:27*

I don’t see anymore the Langgraph studio platform (was working up to yesterday).

I tried with a fresh version of the api and sdk and a basic graph

I ran `langgraph dev` and go the url ([https://smith.langchain.com/studio/?baseUrl=http://127.0.0.1:2024](LangSmith)) as usual, but it only returns a blank screen.

I do see the api docs though.

I tried on firefox and chrome


```
`langchain-core          0.3.74
langgraph               0.6.4
langgraph-api           0.2.129
langgraph-checkpoint    2.1.1
langgraph-cli           0.3.6
langgraph-prebuilt      0.6.4
langgraph-runtime-inmem 0.6.12
langgraph-sdk           0.2.0
langsmith               0.4.13
python 3.12
`
```

[/uploads/short-url/wpn0o1bpVB22jVii2BoUP84f8HR.jpeg?dl=1](Screenshot 2025-08-12 at 10.26.28 AM2784×2044 205 KB)

thanks for any help

---

## Post #2 by @arjun
*Posted on 2025-08-12 17:34:36*

[/u/jonathan1](@jonathan1) Thanks for flagging, I’m able to reproduce this issue and we’ll put up a fix asap. Do you have a LangSmith account? It appears that this happens if you are not logged in, so would recommend logging in to your account for now if you have one

---

## Post #3 by @jonathan1
*Posted on 2025-08-12 17:37:41*

I do not have a LangSmith account. Is it required or advised to have one ?

It was working w/o an account

---

## Post #4 by @arjun
*Posted on 2025-08-12 18:26:21*

[/u/jonathan1](@jonathan1) we just pushed a fix for this, can you please try again

---

## Post #5 by @jonathan1
*Posted on 2025-08-12 18:33:32*

[/uploads/short-url/lSgFL5ihRU66myHdInt6xaRiKu6.jpeg?dl=1](Screenshot 2025-08-12 at 11.30.28 AM3616×2242 356 KB)

thanks ! it seems to have been fixed

---

## Post #6 by @emanuele3004
*Posted on 2025-08-23 09:00:23*

Hi both, since yesterday (08/22), I’ve been experiencing this bug again. LangGraph Studio returns a blank screen, regardless of whether I’m logged into my LangSmith account (EU West data region) or not. Any hints or suggestions? TIA!

---
