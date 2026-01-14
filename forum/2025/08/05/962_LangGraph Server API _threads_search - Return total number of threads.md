# LangGraph Server API /threads/search - Return total number of threads

**Topic ID:** 962
**Created:** 2025-08-05 16:18:24
**URL:** https://forum.langchain.com/t/962

---

## Post #1 by @dannytlake
*Posted on 2025-08-05 16:18:24*

Please include the total number of threads in each response from the /threads/search API.

Use case: Creating a dashboard for ambient agents where a user sees many threads in different states (different search filters on /threads/search). The user needs to be able to page through all of the threads. Right now there is no way to indicate the total number of threads in each state, and therefore inform the user of how many pages of threads exist. There is a manual hacky workaround that is unacceptable on an enterprise platform - it involves performing multiple requests of of increasing the page size and or offset and performing multiple fetch calls until we’ve retrieved all threads.

This should be a core feature.

---

## Post #2 by @arjun
*Posted on 2025-08-05 16:35:16*

We currently don’t return the total number of threads in the search api, however we do supply a `x-pagination-next` response header, which provides the value of the next offset to use (if one exists).

If you’re hoping to paginate through the list of threads, you should use this value. We are currently discussing with the team about adding a separate endpoint for getting the total counts.

---
