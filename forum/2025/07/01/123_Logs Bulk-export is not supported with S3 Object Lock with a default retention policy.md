# Logs Bulk-export is not supported with S3 Object Lock with a default retention policy

**Topic ID:** 123
**Created:** 2025-07-01 07:21:09
**URL:** https://forum.langchain.com/t/123

---

## Post #1 by @Ayman
*Posted on 2025-07-01 07:21:10*

I’m trying to use **bulk-exports** to push our traces to an S3 bucket that has **Object Lock with a default retention policy**.

Because of this, Amazon S3 requires either a `Content-MD5` header *or* the pair `x-amz-sdk-checksum-algorithm` / `x-amz-checksum-*` on the final **PutObject** call. Otherwise it throws:


```
`{"detail":"Failed to validate S3 destination: [Errno 22] Content-MD5 OR x-amz-checksum- HTTP header is required for Put Object requests with Object Lock parameters"}
`
```

The endpoint POST /api/v1/bulk-exports/destinations doesn’t appear to expose any field for passing that checksum, so the destination creation fails.

is there a solution to the problem ?

---

## Post #2 by @lc-chad
*Posted on 2025-07-01 16:10:44*

Hi [/u/ayman](@Ayman),

Welcome to the community and thank you for posting! I believe we had discussed a bit in the corresponding support ticket, but sharing here as well for anyone else who may run into this error.

We don’t support the usage of the Content-MD5 header currently, but our team is looking at the possibility of adding it to our roadmap for a future release. The [https://docs.smith.langchain.com/observability/how_to_guides/data_export#exporting-data](functionality) should still be usable without the header. It would need to be an S3 bucket that doesn’t have the content-md5 constraint if possible, otherwise it will fail during the validation stage.

Best,

Chad

---
