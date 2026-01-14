# Langsmith memory error

**Topic ID:** 1267
**Created:** 2025-08-20 07:03:37
**URL:** https://forum.langchain.com/t/1267

---

## Post #1 by @Jing
*Posted on 2025-08-20 07:03:37*

Hi,

I’m tracing my agents with Langsmith, my agents deploy on GCP cloud run, and the cloud run keeps showing the following error:

Traceback (most recent call last):   File “/opt/venv/lib/python3.11/site-packages/langsmith/_internal/_background_thread.py”, line 113, in _tracing_thread_drain_compressed_buffer     client.compressed_traces.compressor_writer.flush() zstd.ZstdError: zstd compress error: Allocation error : not enough memory

Could you help with this issue?

Thanks

---

## Post #2 by @Jing
*Posted on 2025-08-22 07:20:28*

Hi,

any updates?

---

## Post #3 by @angus
*Posted on 2025-08-22 08:22:29*

How much memory are you provisioning in your GCP cloud run?

---

## Post #4 by @Jing
*Posted on 2025-08-22 09:13:40*

Thanks for the reply.

Memory is 16GB, and its utilization is 30+% when the issue is occurred.

After we restart the instance, we did not see the error.

The same happened again today.

[/uploads/short-url/lnGN74WDVEyR6Difz3QQixpVIFZ.png?dl=1](image1007×257 19.9 KB)

---

## Post #5 by @angus
*Posted on 2025-08-25 07:51:09*

Jing:

Memory is 16GB, and its utilization is 30+% when the issue is occurred.

After we restart the instance, we did not see the error.



[/u/jing](@jing) I will look into this on my end, maybe something to do with how we handle compression threading. In the meantime, you can set this env var to disable compression

`export LANGSMITH_DISABLE_RUN_COMPRESSION=true`

---

## Post #6 by @Jing
*Posted on 2025-08-26 01:42:10*

Thanks, I’ll try it.

---

## Post #7 by @angus
*Posted on 2025-08-27 21:25:36*

Hi [/u/jing](@Jing)

I added the ability to disable multi-threaded compression in the LangSmith sdk as well as making some memory optimizations which should fix the issue you were seeing.

If you want to give compression another go (which will generally benefit memory utilization and trace ingest latency) I would try upgrading the latest langsmith version *(>= 0.4.19), re-enabling compression, and then setting the following: `LANGSMITH_RUN_COMPRESSION_THREADS=0`

---

## Post #8 by @Jing
*Posted on 2025-08-28 01:39:01*

Thank you so much for the quick response and clear solution!

I really appreciate your help. I’ll try out your method right away.

---
