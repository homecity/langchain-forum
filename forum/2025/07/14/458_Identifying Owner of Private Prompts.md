# Identifying Owner of Private Prompts

**Topic ID:** 458
**Created:** 2025-07-14 22:52:00
**URL:** https://forum.langchain.com/t/458

---

## Post #1 by @drew
*Posted on 2025-07-14 22:52:00*

I am attempting to pull in my prompts from langsmith, but am encountering an error due to not providing an owner. However, I am the owner of the prompts. I’ve tried various different things as the “owner”.

Client.get_prompt seems to want one, but Im not sure what to provide as the workplace ID, organization ID, nor the langsmith account email seemed to work as the owner and I continue to get errors.

Surely I dont need to provide an owner for private prompts when Im using my own API key? Is the API of the a project different than an Personal Access Token for this context? When is either/or necessary?

for example if my prompt was named “github_agent”

and I send client.get_prompt(github_agent) I’d expect it to return with my prompt, but instead I get:

Failed to retrieve prompt github_agent: Failed to GET /repos/-/github_agent in LangSmith API. HTTPError(‘400 Client Error: Bad Request for url: [https://api.smith.langchain.com/repos/-/github_agent](https://api.smith.langchain.com/repos/-/github_agent)’, ‘{“detail”:“No prompt owner specified”}’)

I understand Im not providing an owner, but I need to figure out what the owner value is that it wants so that it can get my own prompts 

Thanks for the help!

---

## Post #2 by @madams0013
*Posted on 2025-07-15 00:39:54*

Hi Drew!

You should be able to fetch private prompts using only the name (ex. `client.pull_prompt("github_agent")`) so long as your API key belongs to the same workspace as the private prompt. Having a mismatch of authentication is usually the cause of this error.

Either type of API key should work, and [https://docs.smith.langchain.com/administration/concepts#api-keys](here are some docs) explaining the difference.

Let me know if you’re still having this issue after confirming!

---

## Post #3 by @drew
*Posted on 2025-07-15 16:18:28*

Hey Maddy,

Thank you for the info! I’m all set here.

Appreciate you!

---
