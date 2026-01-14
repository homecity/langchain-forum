# Intermittent "peer closed connection" error when using RemoteGraph with long-running graphs

**Topic ID:** 1595
**Created:** 2025-09-19 15:24:06
**URL:** https://forum.langchain.com/t/1595

---

## Post #1 by @adrian337
*Posted on 2025-09-19 15:24:06*

Hi,

I’m using Remote Graph from LangGraph SDK` `to connect to a graph endpoint running in LangGraph Cloud. About 70% of the time this particular task works fine, but I’m running into an intermittent issue with longer-running graphs.

When the graph finishes, I sometimes get this error client side:

“peer closed connection without sending complete message body (incomplete chunked read)”

On the server side, the logs confirm that the graph completed successfully, but sometimes (not always) they also show a warning message before the end like: “Client disconnected after 250 seconds. Consider adjusting the client or network timeouts if this is unexpected.”

The number of seconds shown here varies, and when I initialise Remote Client, the httpx timeout specified is much higher. Interestingly, I’ve had graphs that take >800 seconds complete without this issue, so it’s not purely a duration problem. I see the same behaviour whether I use invoke or stream when calling the Remote Graph

Any idea what is happening here? Is there some client/network timeout I can adjust somewhere, I couldn’t find anything else documented

Thanks,

Adrian

---
