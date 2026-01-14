# Can't change the password of our langsmith account

**Topic ID:** 1619
**Created:** 2025-09-23 16:18:22
**URL:** https://forum.langchain.com/t/1619

---

## Post #1 by @francisco
*Posted on 2025-09-23 16:18:22*

Hey!

For some reason we cannot reset the password of our users and this is what we’re seeing when trying to edit the user:

[/uploads/short-url/6AIHcyFkiqRCpRMOv3qjiMAbtXX.png?dl=1](image904×108 11.4 KB)

I checked in the docs and didn’t find what’s the suggested way to change the password, should we be doing it in any other another way?

---

## Post #2 by @lc-chad
*Posted on 2025-09-23 20:59:09*

Hi [/u/francisco](@francisco),

If you’re seeing that banner it would indicate the user is registered with social auth, e.g. Google or Github so the password is not maintained on our end. Have they tried logging in with one of those methods?

If they are registered with E-Mail/Password authentication, once they incorrect password is entered the Forgot Password flow will appear on the form.

If they’re still blocked - can you please submit a ticket to us at [https://support.langchain.com/](https://support.langchain.com/) with their E-Mail address? If they were running into any specific issues or errors trying to log in please include those as well.

Best,

Chad

---

## Post #3 by @francisco
*Posted on 2025-09-24 14:33:11*

hey Chad,

the user is logged in via password, not via google or github

if they use an incorrect password, no forgot password flow appears

i’ll send an email to support, thanks!

---

## Post #4 by @arjun
*Posted on 2025-09-24 15:51:09*

[/u/francisco](@francisco) currently we show the “forgot password” button after two failed login attempts. Can you try that? And we can work to make this UX easier

---

## Post #5 by @francisco
*Posted on 2025-09-24 18:59:37*

This worked! def think it can be made a bit easier or clearly documented for cases like this.

Thanks Arjun!

---
