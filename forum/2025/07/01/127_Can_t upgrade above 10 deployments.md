# Can't upgrade above 10 deployments

**Topic ID:** 127
**Created:** 2025-07-01 08:05:25
**URL:** https://forum.langchain.com/t/127

---

## Post #1 by @Batiste
*Posted on 2025-07-01 08:05:25*

Hi,

We’re a startup at scaling stage. The issue is : we can’t upgrade LG Platform north of 10 deployed agents. The support does not answer (so far), and this is becoming a real threat to our growth.


Please tell the support ^^ Sorry to be pushy, but my clock runs at startup speed, I’m sure you understand.
May I suggest a feature where you’d let startups scale their number of deployed agents above 10, and get access to Pro/Enterprise features easily and fast ? I think it would be for the best for you and for us.

We love the product and look forward to growing with you,

Cheers,

---

## Post #2 by @Batiste
*Posted on 2025-07-01 08:18:32*

If it helps : we are on the EU server

---

## Post #3 by @lc-chad
*Posted on 2025-07-01 13:54:56*

Hi [/u/batiste](@Batiste),

Thank you for flagging this -  I just replied to your support ticket and bumped the number of available deployments for your organization.

Best,

Chad

---

## Post #4 by @wfh
*Posted on 2025-07-01 19:04:52*

You can also have multiple agents per deployment FYI

---

## Post #5 by @Batiste
*Posted on 2025-07-02 07:53:57*

[/u/wfh](@wfh) Thanks for sharing this tip. I already knew it was an option, but tbh I haven’t figured out a good way to use this feature. And maybe you can help here ?

Let’s say I have 3 environments (test/preprod/prod) and 3 clients (A/B/C). It means having 9 distinct agents, which correspond to 3 Github repositories (repo_A, repo_B, repo_C). How should we group them to avoid having 9 deployments, but maybe have 3 ?

Option 1 : group by platform


it means any change to one client needs redeployment for all 3
it means having to “merge” my 3 github repos

Option 2 : group by client

3) it means having to have my github branch combine 3 versions of the bot : test/preprod/prod

Both seem pretty confusing to me, and if you have a better workflow to suggest, I’m really interested !

Cheers,

---

## Post #6 by @Batiste
*Posted on 2025-07-02 07:55:05*

It means a lot. Thanks for being the partner we need to grow.

---

## Post #7 by @wfh
*Posted on 2025-07-02 14:31:04*

Good question! And also for context, we should be supporting up to 100 per user by default so we’ll definitely look into this one.

It’s pretty common for teams to build many agents in a single repo, but the pattern you have should also work.

---

## Post #8 by @Tvara
*Posted on 2025-07-25 09:40:22*

Hey Batiste! Tvara this side, we are a startup as well, I would love to know how do you deploy an agent which is on GitHub, with CI/CD on LangGraph Platform via LangSmith

---
