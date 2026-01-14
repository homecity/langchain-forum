# Can you use LangSmith with a Personal Account?

**Topic ID:** 2524
**Created:** 2025-12-15 22:24:11
**URL:** https://forum.langchain.com/t/2524

---

## Post #1 by @fleebe
*Posted on 2025-12-15 22:24:11*

Keep getting this error simply trying to access the list of projects.

langsmith.utils.LangSmithAuthError: Authentication failed for /sessions. HTTPError(‘401 Client Error: Unauthorized for url: [https://api.smith.langchain.com/sessions?limit=100&offset=0%E2%80%99](https://api.smith.langchain.com/sessions?limit=100&offset=0’), ‘{“detail”:“UUID header value was not a valid UUID”}’)

---

## Post #2 by @wfh
*Posted on 2025-12-15 22:27:38*

Hello! Could you share an MRE for this?

And to confirm - this is the output of a call you are making from the LangSmith SDK? So it is related to the observability product rather than the Deployment product?

---

## Post #3 by @fleebe
*Posted on 2025-12-15 22:29:53*

This line of code…

print(*‘’*, len(list(client.list_projects())), *‘projects found’*)

---

## Post #4 by @wfh
*Posted on 2025-12-15 22:30:19*

And how are you generating your api key?

And thanks for confirming. So indeed this would be better filed under observability & evals.

---

## Post #5 by @fleebe
*Posted on 2025-12-15 22:32:41*

Using LangSmith

client = Client(api_key="lsv2_sk_

[/uploads/short-url/Apd9Gew2xz6t5nZnKv3kXKuh9xN.png?dl=1](image1714×337 21.2 KB)

---

## Post #6 by @wfh
*Posted on 2025-12-15 22:39:26*

Thanks! Tagging in someone from the langsmith team

---

## Post #7 by @eric-langchain
*Posted on 2025-12-15 22:46:11*

How are you setting your api key for the client? the error makes me think it may not be set correctly

---

## Post #8 by @fleebe
*Posted on 2025-12-15 22:48:53*

fleebe:

client = Client(api_key="lsv2_sk_



In python code like this

***from*** langsmith ***import*** Client

client = Client(api_key="lsv2_sk_

and it is a env variable. in LANGCHAIN_API_KEY

---

## Post #9 by @eric-langchain
*Posted on 2025-12-15 23:01:40*

fleebe:

len(list(client.list_projects()))



can you try making a new key? i can’t seem to repro what you’re seeing with a valid key

---

## Post #10 by @fleebe
*Posted on 2025-12-16 01:44:04*

Made a new key.

Here is the code.

***from*** langsmith ***import*** Client

client = Client(api_key=*“lsv2_sk_”*)

print(*‘’*, len(list(client.list_projects())), *‘projects found’*)

This worked now. Created service key again for a workspace.

---

## Post #11 by @fleebe
*Posted on 2025-12-16 01:53:58*

Made a new key.

Here is the code.

***from*** langsmith ***import*** Client

client = Client(api_key=*“lsv2_sk_”*)

print(*‘’*, len(list(client.list_projects())), *‘projects found’*)

This worked now. Created service key again for a workspace.

Do not include an environment variable LANGCHAIN_WORKSPACE_ID=1

---
