# `useStream` Hook + React Native - connection recovery after backgrounding

**Topic ID:** 882
**Created:** 2025-08-01 17:22:58
**URL:** https://forum.langchain.com/t/882

---

## Post #1 by @bolandrm
*Posted on 2025-08-01 17:22:58*

Hello,

We’re using the JavaScript SDK (`0.0.103`) with React Native.  A common pattern is that users will enter a message and then background the app while waiting for the response.  When the user re-opens the app, no response is displayed until you navigate away from the screen and back.  I think the issue here is that the operating system can sometimes cut off network access while the app is in the background.

We are setting `onDisconnect: ‘continue’` and `streamResumable: true` when calling `submit` from the `useThread` hook.

We’ve been trying to do the following:


When the app comes to foreground, re-fetch the message history  (without disrupting the current run/response)
If returning from background and a streamed response is in progress, continue showing the streamed response.

Is this use-case supported?  Any suggestions on how to handle this?

---
