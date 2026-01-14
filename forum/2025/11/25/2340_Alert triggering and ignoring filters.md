# Alert triggering and ignoring filters

**Topic ID:** 2340
**Created:** 2025-11-25 16:15:06
**URL:** https://forum.langchain.com/t/2340

---

## Post #1 by @davidfanggg
*Posted on 2025-11-25 16:15:06*

Hi,

We are configuring LangSmith Alerts to trigger based on a specific error threshold, filtered by error message.

However, we are receiving notifications when we shouldn’t. It seems the alert is not filtering errors correctly.

When setting up the alert, the simulation graph reflects the correct behavior: we can clearly see the difference in values when the filter is applied versus when it isn’t. But once the alert is enabled, it appears that the filter is not being applied properly.

Any ideas?

---

## Post #2 by @arian
*Posted on 2025-11-25 21:28:53*

I’d like to investigate this -  can you message me your organization id or workspace id? You can access them by clicking on Settings in the sidebar then clicking one of these buttons:

[/uploads/short-url/jTvvVg90cYO9qOhRjlw4PFSg0lF.png?dl=1](image621×177 16.4 KB)

---

## Post #3 by @davidfanggg
*Posted on 2025-11-26 09:18:27*

Hi Arian, thanks for looking into it.

Workspace ID is 68c9ba3b-7f66-42fd-99b3-7167fa082003

---

## Post #4 by @arian
*Posted on 2025-11-26 19:50:31*

Great, thank you! Was able to repro and root cause. Fix should be shipping later today, will comment here when it’s live.

edit: I pushed an update - there was an issue with text normalization being inconsistently applied for the `contains`/`does not contain` filters. Please let me know if you still see your alert getting triggered incorrectly.

---

## Post #5 by @davidfanggg
*Posted on 2025-12-01 12:02:14*

Hi Arian,

Thanks for looking into it. We are still experiencing the issue.

---

## Post #6 by @arian
*Posted on 2025-12-01 16:04:53*

Sorry to hear that - I will continue investigating this issue today.

---

## Post #7 by @davidfanggg
*Posted on 2025-12-02 14:22:49*

One detail that might help to debug: the error message has multiple lines



And we are filtering by “Error: Abort”

Best regards,

David

---

## Post #8 by @davidfanggg
*Posted on 2025-12-02 14:31:52*

We noticed that just filtering by “Abort”, the alert filters correctly and doesnt’ trigger.

If the filter for “does not contain” is “Error: Abort”, then the filtering fails.

---

## Post #9 by @arian
*Posted on 2025-12-02 18:22:01*

I am seeing some abort related errors on your runs that would get properly filtered by just “Abort” but not “Error: Abort” e.g.

`This operation was aborted`

`AbortError: This operation was aborted`

`... stacktrace ...`

which would explain what you are encountering.

---
