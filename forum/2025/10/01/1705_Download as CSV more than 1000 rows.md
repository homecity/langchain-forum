# Download as CSV more than 1000 rows

**Topic ID:** 1705
**Created:** 2025-10-01 13:14:53
**URL:** https://forum.langchain.com/t/1705

---

## Post #1 by @teamIC
*Posted on 2025-10-01 13:14:53*

Good morning, I ran an experiment on a dataset of 2,500 rows. Downloading as CSV only allows me to download 1,000 rows. How can I download them all? Thank You

---

## Post #2 by @EugeneJinXin
*Posted on 2025-10-01 18:08:04*

hi, currently we don’t currently support large experiment results download yet due to size limit but plan to enhance it further. For now I think you can use langsmith SDK client’s get_experiment_results() method to download essentially same data with even more.

Here is a quick link [https://github.com/langchain-ai/langsmith-sdk/blob/main/python/langsmith/client.py#L8330](langsmith-sdk/python/langsmith/client.py at main · langchain-ai/langsmith-sdk · GitHub)

---
