# Data export to S3 to redshift query

**Topic ID:** 1826
**Created:** 2025-10-14 20:12:17
**URL:** https://forum.langchain.com/t/1826

**Tags:** cloud

---

## Post #1 by @DahanDv
*Posted on 2025-10-14 20:12:17*

[#p-3315-i-exported-parquet-files-to-s3-successfully-using-the-bulk-export-api-1]()I exported parquet files to S3 successfully using the bulk export API
but from there - trying to query the data from Redshift things got tough , very tough.

I couldnt find a method that will query theentire run entry succesfully.

What I tried:


using the copy command and define the table manually in redshift like the docs suggests (broken link there to AWS redshift copy command, btw).
defining a Glue Crawler and Database and query those using Redshift spectrum, the schema should not be manually defined this way - that didnt work with an unhelpful error msg (if u ever worked with Redshift u know what kind of error msgs imtalking about)

[#p-3315-my-question-is-have-anyone-got-thru-this-process-succesfuly-and-was-able-to-query-the-entire-enrty-from-redshift-2]()My question is have anyone got thru this process succesfuly and was able to query the entire enrty from Redshift?
I suspect a few things



could be that the spark version Glue is using under the hood is too old for some data types exported by langsmith.



I try to buld the schema with the hive partitions (created by design by the langsmith exported, these are the folder tree of project/year/month/day - this is imoportant since the user must be able to filter by project which is not part of the langsmith’s run entry schema

---
