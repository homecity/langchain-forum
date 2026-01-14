# Langsmith forced logout (EU domain; 500 error resolved)

**Topic ID:** 1495
**Created:** 2025-09-10 09:31:39
**URL:** https://forum.langchain.com/t/1495

---

## Post #1 by @erjak
*Posted on 2025-09-10 09:31:39*

Hi! First, I love LangSmith—it’s been very helpful for me as a junior AI developer.

Since Monday (September 8), I’ve been experiencing an issue: I log in to my account and everything looks normal at first, but after a moment I’m suddenly logged out.

I initially thought it was related to the 500 errors, so I switched to the EU domain (I’m in Europe), but It doesn’t change anything. The status page indicates the 500s were resolved today, but the forced logouts are still happening—even on the EU domain.

What I’ve tried:



Allowing third-party cookies in the browser



Creating two additional accounts



Testing multiple browsers

Despite these steps, the issue persists.



Has anyone seen this or found a workaround? Any help would be appreciated

---

## Post #2 by @marco
*Posted on 2025-09-12 10:51:18*

Hi [/u/erjak](@erjak) ! Is this issue still persisting? Can you confirm whether you are logging in using username + password or using google/github oauth?

---

## Post #3 by @erjak
*Posted on 2025-09-12 12:41:49*

Hi [/u/marco](@marco) ! Thanks for responding!. Yes, the issue persists. I’m using Google authentication.

---

## Post #4 by @lc-chad
*Posted on 2025-09-12 13:53:11*

Hi [/u/erjak](@erjak),

Can you please check the time on your system clock to ensure it’s in sync? We’ve seen this previously where the authentication token gets immediately invalidated after login if your clock is out of sync.

---

## Post #5 by @erjak
*Posted on 2025-09-15 06:53:41*

That was it! Thanks so much! My PC clock was 3 minutes fast and the problem is gone now.

---
