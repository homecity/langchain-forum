# Tracing reports the model used is gpt-3.5-turbo when my prompt seems to be configured to utilize gpt-4.1-mini

**Topic ID:** 379
**Created:** 2025-07-10 14:14:22
**URL:** https://forum.langchain.com/t/379

---

## Post #1 by @mikepmunroe
*Posted on 2025-07-10 14:14:22*

I can’t figure out why tracing reports the model used is gpt-3.5-turbo when my prompt seems to be configured to utilize gpt-4.1-mini.

I’m calling hub.pull in JS with .invoke. Langsmith prompt config and langsmith prompt calling code is in the screenshot. I’m guessing I need to explicitly define the model when calling invoke?

(first screenshot of setup and code, 2nd screenshot of trace ouput from the run, showing model gpt-3.5-turbo)

[/uploads/short-url/k2SvD3znYetmcRWyM38LvDESFnn.jpeg?dl=1](CleanShot 2025-07-09 at 18.13.34@2x1920×2165 180 KB)

[/uploads/short-url/zQpLHAJgCiPwoFLSQdD7Fd7Yu9k.png?dl=1](CleanShot 2025-07-09 at 18.22.27@2x2594×1542 307 KB)

---
