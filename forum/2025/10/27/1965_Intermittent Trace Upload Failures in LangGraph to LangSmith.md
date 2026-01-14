# Intermittent Trace Upload Failures in LangGraph to LangSmith

**Topic ID:** 1965
**Created:** 2025-10-27 16:00:17
**URL:** https://forum.langchain.com/t/1965

---

## Post #1 by @magic-hya
*Posted on 2025-10-27 16:00:17*

**Description:**

We are experiencing intermittent issues with uploading trace data from LangGraph to LangSmith. Specifically, data uploads occasionally fail, and on August 20th, uploads ceased entirely.

**Steps Taken:**



After modifying the `project_name` environment variable, uploads resumed successfully.



However, after a few days, the uploads stopped again.



**Environment:**



Deployed in Kubernetes containers.



Test scripts confirm that uploads are functional.



Production services are currently unable to upload trace data.

---
