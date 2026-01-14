# Problem with importing datasets from JSONL

**Topic ID:** 651
**Created:** 2025-07-23 09:32:51
**URL:** https://forum.langchain.com/t/651

---

## Post #1 by @igor-jauk
*Posted on 2025-07-23 09:32:51*

Hello everyone! I have experienced a weird issue with importing test datasets through the UI on LangSmith.

I export an existing dataset from LangSmith as JSONL. I try to import that same file and it doesn’t work (on a Mac machine). The error message is `you must specify at least one input key` (the error appears in a pop-up and disappears after a few seconds). When my colleague tries to import that same file (on a Windows machine), it works just fine. When he exports his dataset, he can import his own exported dataset, but I can not import his neither, with the same error message.

Now, we first thought that it was some Mac/Windows issue. But, when I logged in to my account on my colleague’s Windows machine and tried to import the same file to my account, again it didn’t work. It is literally the same file, one LangSmith account can import it, the other can not. On the same machine. Can it be some configuration issue?

On the other hand, if I import the dataset through the Python SDK, it works just fine. Also, importing of CSV files works fine. The problem only appears when importing JSONL files through the UI.

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-24 08:46:16*

This sounds like a LangSmith UI bug specific to certain accounts or permissions rather than a file format issue, since the same JSONL file works via SDK and on your colleague’s account. The “you must specify at least one input key” error suggests the UI isn’t properly parsing your JSONL schema, even though the file is valid.

Try clearing your browser cache/cookies for LangSmith, or test in an incognito window to rule out browser-specific issues. Since the Python SDK works fine, this is likely a frontend parsing bug. Contact LangSmith support with your account details and a sample JSONL file - they’ll need to investigate why the UI validation differs between accounts for the same file format.

---

## Post #3 by @eric-langchain
*Posted on 2025-07-24 16:29:56*

hi there, we’re improving the dataset creation ui in a current sprint. We’ll take this issue into account

---

## Post #4 by @mikesteich
*Posted on 2025-07-25 21:11:40*

FWIW, I can reproduce this exactly the same as OP.

I initially assumed the problem was with my code (as it always is). But, as an experiment, I made a dataset manually in the LangSmith UI, added one example manually, downloaded the JSONL file. Then, I attempted to upload that exact same JSONL file to langsmith and I got `you must specify at least one input key`

---

## Post #5 by @tanushree-sharma
*Posted on 2025-07-25 23:56:50*

[/u/igor-jauk](@igor-jauk) [/u/mikesteich](@mikesteich) our UI expects a very specific format for the JSONL file today (we should make it more flexible). We don’t document this very well either, but your file needs to have this format with `inputs` and `outputs` as top level keys. Eg:


```
`{"inputs":{"subject":"Project Update","content":"I've updated the report and it's ready for your review.","sender":"baga@foobar.com","recipient":"hana@foobar.com"},"outputs":{"response_content":"Thanks, I'll take a look later today."}}````
```

---

## Post #6 by @mikesteich
*Posted on 2025-07-28 14:19:19*

Thanks so much for the reply! I’m definitely on board with more documentation!

That said, the part that really tripped me up while troubleshooting was this specific flow (performed **all through the UI**):


Created a dummy dataset
Added one example
Downloaded that dataset as a `*.jsonl`
Created a second dummy dataset
Uploaded the `*.jsonl`  (from Step 3) into the new dataset

**What I expected:** That the JSONL I downloaded would be in the correct format to re-upload (sort of a round-trip workflow).

**What I got:** `you must specify at least one input key`

FWIW, I do notice that the CSV one works as expected. Thanks and happy bug-hunting!

---

## Post #7 by @hubdev
*Posted on 2025-07-29 10:13:01*

I had the same problem. Suddenly from one day to another the same jsonl file started showing this error. I was forced to create the dataset via sdk.

---

## Post #8 by @tanushree-sharma
*Posted on 2025-07-30 22:25:43*

Can repro that we have a bug here. We’re going to fix this. Thank you all for reporting!

---

## Post #9 by @madams0013
*Posted on 2025-08-04 16:30:01*

We’ve fixed this issue! Let us know if you’re facing any other blockers.

---
