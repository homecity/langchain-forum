# LangSmith Dashboard Issue

**Topic ID:** 1678
**Created:** 2025-09-29 08:18:49
**URL:** https://forum.langchain.com/t/1678

---

## Post #1 by @daniel
*Posted on 2025-09-29 08:18:49*

When analysing traces in the project section I filter using `Feedback`  and it works more or less properly.

However when I use the exact same filters in dashboards they do not filter traces properly i.e. show me traces that have feedback that should be filtered out.

---

## Post #2 by @daniel
*Posted on 2025-10-03 07:00:35*

Hi,

Can I get assistance on this issue?

---

## Post #3 by @tanushree-sharma
*Posted on 2025-10-10 23:40:03*

daniel:

However when I use the exact same filters in dashboards they do not filter traces properly i.e. show me traces that have feedback that should be filtered out.



Sorry for the delay here [/u/daniel](@daniel)

Can you share exactly which filters you’re using and the metric for your chart so that we can investigate here.

---

## Post #4 by @daniel
*Posted on 2025-10-17 10:50:22*

It seems to be issue in general with the filters.

For example my metadata contains `email` lets say I have two type of users [mailto:user@gmail.com](user@gmail.com) and [mailto:user@yahoo.com](user@yahoo.com). If I try to filter traces as such:

[/uploads/short-url/lS2snvdZ9fTNQjLDxPnLbho0fBk.png?dl=1](image1222×690 44.6 KB)

It simplify doesnt work - I get traces that contain that email anyway

---
