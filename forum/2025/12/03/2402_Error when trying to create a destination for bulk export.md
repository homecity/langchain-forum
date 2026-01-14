# Error when trying to create a destination for bulk export

**Topic ID:** 2402
**Created:** 2025-12-03 08:17:04
**URL:** https://forum.langchain.com/t/2402

---

## Post #1 by @ralph-insify
*Posted on 2025-12-03 08:17:04*

When calling the API endpoint to create a bulk export according to the docs I get an error: “detail”: “Failed to validate S3 destination: Access Denied”. I confirmed that when using the same AWS credentials on my local machine I can succesfully connect to the bucket and get / upload files.


```
`curl --request POST \
  --url 'https://eu.api.smith.langchain.com/api/v1/bulk-exports/destinations' \
  --header 'Content-Type: application/json' \
  --header "X-API-Key: ${LANGSMITH_API_KEY}" \
  --header "X-Tenant-Id: ${LANGSMITH_TENANT_ID}" \
  --data '{
    "destination_type": "s3",
    "display_name": "Funnel Chat Prod History Export",
    "config": {
      "bucket_name": "prod-langsmith-history.insify.io",
      "prefix": "traces",
      "region": "eu-west-1"
    },
    "credentials": {
      "access_key_id": "***",
      "secret_access_key": "***"
    }
  }'
`
```

I’m hoping to get in touch with someone from langsmith to help me out.

Thanks,

Ralph

---

## Post #2 by @ramon
*Posted on 2025-12-08 12:28:49*

Please try the solution in [https://forum.langchain.com/t/cannot-create-s3-bulk-export-destination-kms-generatedatakey-error/2412/2](Cannot create S3 bulk export destination - KMS GenerateDataKey error - #2 by ramon)

---

## Post #3 by @ralph-insify
*Posted on 2025-12-09 07:50:09*

Hey Ramon, thanks for your reply, this worked! I see the docs have been updated as well

---

## Post #4 by @system
*Posted on 2025-12-09 19:51:09*

This topic was automatically closed 12 hours after the last reply. New replies are no longer allowed.

---
