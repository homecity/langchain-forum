# Caching in CI for LangSmith Unit Tests – Best Practices?

**Topic ID:** 1703
**Created:** 2025-10-01 12:04:58
**URL:** https://forum.langchain.com/t/1703

**Tags:** js-help

---

## Post #1 by @SujayPrabhu
*Posted on 2025-10-01 12:04:58*

Hi folks,

I see that LangSmith provides support for adding unit tests for evals using `langsmith/jest`, `vitest`, and also `pytest` in Python. The docs briefly mention caching, but from what I understand, caching in CI is only implemented for pytest.

My question is: if unit tests only retrieve cached responses instead of making fresh API calls, doesn’t that somewhat defeat the purpose of testing? I get that cost is a concern, but is there a recommended way to periodically invalidate the cache? Or are there any guidelines from the package on how caching should be used in CI?

---

## Post #2 by @Jake
*Posted on 2025-10-08 16:01:55*

Hi [/u/sujayprabhu](@SujayPrabhu) ,

Thank you for the note! Whilst the docs don’t explicitly mention it, typical best practices for dealing with caches whilst unit testing apply here, so you should periodically clear the cache or also whenever making significant changes. Please let me know if you have any additional questions or would like more specific details.

Best,

Jake

---

## Post #3 by @SujayPrabhu
*Posted on 2025-10-08 16:37:31*

Hi [/u/jake](@Jake)

Thank you for your reply.

I am curious if the caching feature present in pytest is also (or will be) available in JavaScript packages like langsmith/jest and langsmith/vitest

---

## Post #4 by @Jake
*Posted on 2025-10-08 18:36:38*

Hi [/u/sujayprabhu](@SujayPrabhu),

Thanks for following up! Currently, the HTTP request caching feature is only implemented in the Python langsmith[pytest] package and is not yet available in the

JavaScript packages (langsmith/jest and langsmith/vitest).

For now, the JS packages support standard Jest/Vitest features like mocks and watch mode, but don’t have the built-in caching mechanism that the pytest integration

offers.

I’ll flag this with the team as a potential feature request for the JavaScript packages. In the meantime, you could use standard Jest/Vitest mocking patterns as a

workaround to avoid fresh API calls during testing.

Best,

Jake

---

## Post #5 by @SujayPrabhu
*Posted on 2025-10-09 08:19:10*

Sure, thank you [/u/jake](@Jake)

---
