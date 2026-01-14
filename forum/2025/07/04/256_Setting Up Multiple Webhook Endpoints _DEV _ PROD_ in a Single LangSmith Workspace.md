# Setting Up Multiple Webhook Endpoints (DEV / PROD) in a Single LangSmith Workspace

**Topic ID:** 256
**Created:** 2025-07-04 20:57:03
**URL:** https://forum.langchain.com/t/256

---

## Post #1 by @tsunechan
*Posted on 2025-07-04 20:57:03*

Hello,

I have a question about configuring prompt webhooks.

According to the documentation, [https://docs.smith.langchain.com/prompt_engineering/how_to_guides/trigger_webhook](“You can only configure one webhook per workspace.”)

We would like to use different webhook endpoints for our DEV and PROD environments, but currently use a single workspace.

Is it possible to set up multiple webhooks for one workspace (for example, one for DEV and one for PROD) through custom support or an additional setup?

This would help us separate our environments without needing to duplicate workspaces.

Thanks for your guidance or any help you can provide!

---

## Post #2 by @tanushree-sharma
*Posted on 2025-07-07 21:23:23*

Hey [/u/tsunechan](@tsunechan)! This isn’t supported today but we do want to support more webhook endpoints per workspace.

A few questions:


Are you using [https://docs.smith.langchain.com/prompt_engineering/how_to_guides/prompt_tags](commit tags) to differentiate prompts in your prod and dev environments or are dev/prod different prompts?
Do you want the webhook endpoint that’s used to be configured up front per prompt (or per prompt commit tag if you’re using those)? Example: Prompt A is a dev prompt and any changes to prompt A should always trigger webhook endpoint A

---

## Post #3 by @tsunechan
*Posted on 2025-07-16 08:19:18*

[/u/tanushree-sharma](@tanushree-sharma)

Thank you for your replay!

Here are my answers




 tanushree-sharma:


Are you using [https://docs.smith.langchain.com/prompt_engineering/how_to_guides/prompt_tags](commit tags) to differentiate prompts in your prod and dev environments or are dev/prod different prompts?



Yes, we use commit tags (`dev` and `prod`) to differentiate prompts in our environments.




 tanushree-sharma:


Do you want the webhook endpoint that’s used to be configured up front per prompt (or per prompt commit tag if you’re using those)? Example: Prompt A is a dev prompt and any changes to prompt A should always trigger webhook endpoint A



Yes, that’s exactly what we want.

If prompt A has a new commit with a `dev` or `prod` tag, we’d like the change to trigger either endpoint A-dev or endpoint A-prod, depending on the tag.

---

## Post #4 by @tanushree-sharma
*Posted on 2025-07-16 23:56:31*

Got it, thanks for the details!

We’re going to be adding support for a webhook notification when prompt tags are changed this week actually. While that doesn’t completely satisfy your use case, for now, you could use this to get notified when tags change and then set up your own endpoint to route to dev/prod endpoints. Longer term we plan to add native support for this functionality!

---

## Post #5 by @tsunechan
*Posted on 2025-07-17 01:36:54*

Thanks for the update. We’ll use this function!

---

## Post #6 by @brandon_le4
*Posted on 2025-09-23 15:46:57*

[/u/tanushree-sharma](@tanushree-sharma)   Hi Tanushree! I’ve been attempting to use the Tag Create and Tag Update webhook triggers, but they don’t seem to work! I receive a request when a Commit is made, but not for tagging. The payload doesn’t contain any information on Tags so there is no way for me to take selective action downstream either! Is your team aware of this not working?  Running performance tests is too expensive to be executed on each commit, let me know if there is a plan in place to fix this critical CI/CD feature.

---

## Post #7 by @tanushree-sharma
*Posted on 2025-09-23 22:15:22*

[/u/brandon_le4](@brandon_le4) can you confirm that you have the Tag Create/Tag Update trigger selected? I just tested this out and was able to trigger the webhook. The tag name + event is sent along with the request body

[/uploads/short-url/pukDt7989fwnPPn30VbQFtViG5V.png?dl=1](image322×136 4.98 KB)

[/uploads/short-url/mmJDUaVRccFX1OZPS0nUAoUYHV.png?dl=1](image809×271 24.7 KB)

---

## Post #8 by @brandon_le4
*Posted on 2025-09-24 12:07:37*

[/u/tanushree-sharma](@tanushree-sharma) I see! I only want to trigger on Tag Create/Tag Update. With Commit selected I see the Tag field added to the payload, but without commit selected I receive nothing.

[/uploads/short-url/u5WR2jMdhpJwk2lzyrZzGGDDBpo.png?dl=1](Screenshot 2025-09-24 at 8.06.03 AM434×294 13.8 KB)

---

## Post #9 by @brandon_le4
*Posted on 2025-09-24 12:11:02*

It seems I can work around this by filtering on event. I was just confused because the test payload did not send. It works without commit being selected!

---
