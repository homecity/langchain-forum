# Cannot create S3 bulk export destination - KMS GenerateDataKey error

**Topic ID:** 2412
**Created:** 2025-12-04 07:35:57
**URL:** https://forum.langchain.com/t/2412

---

## Post #1 by @OrDan
*Posted on 2025-12-04 07:35:57*

Hi all,

When trying to create a new S3 bulk export destination using the API, I’m getting a KMS permission error even though my S3 bucket doesn’t use KMS encryption.

400 Bad Request - POST [https://api.smith.langchain.com/api/v1/bulk-exports/destinations](https://api.smith.langchain.com/api/v1/bulk-exports/destinations)

{

“detail”: “Failed to validate S3 destination: User: arn:aws:sts::XXXX:assumed-role/AWSReservedSSO_AdministratorAccess_XXX/user@example.com is not authorized to perform: kms:GenerateDataKey on this resource because the resource does not exist in this Region, no resource-based policies allow access, or a resource-based policy explicitly denies access”

}

I verified the following about my bucket that it exists in right region,  the encryption is **SSE-S3 (AES256)**, NOT KMS,  no bucket policy exists, and AWS managed KMS key (alias/aws/s3) exists in my account.

---

## Post #2 by @ramon
*Posted on 2025-12-04 18:40:45*

Can you share your invocation (With redacted creds)?

And can you also try invoking with the new parameter `"include_bucket_in_prefix": true`?

---

## Post #3 by @OrDan
*Posted on 2025-12-07 16:05:39*

Tried it with the new parameter and it worked, thank you!

---
