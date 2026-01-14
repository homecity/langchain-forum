# Full-text search doesn't work

**Topic ID:** 140
**Created:** 2025-07-01 11:28:20
**URL:** https://forum.langchain.com/t/140

---

## Post #1 by @lukanarrative
*Posted on 2025-07-01 11:28:21*

Hi,

I’ve noticed that full text search through traces fails if I search for a sequence containing only digits.

I’ve searched for `1073468334324728` and that didn’t get applied, the search returned all the traces from the last 7 days:

[/uploads/short-url/rXn2qlKo8TiXmjB2R6WHdRy0mXz.jpeg?dl=1](image2976×836 176 KB)

---

## Post #2 by @lukanarrative
*Posted on 2025-07-01 11:28:57*

If I search without full text search, I get the same number of rows, which means the previous full text filter doesn’t get applied:

[/uploads/short-url/ezCCwtw6Wgw3tVpw1uO7Z6eWS2V.jpeg?dl=1](image2904×692 149 KB)

---

## Post #3 by @lukanarrative
*Posted on 2025-07-01 11:29:48*

If I use full text search to with some text that contains not only digits, it works as expected - returning 6 results

[/uploads/short-url/fmnS28G52cebitQs6MmKSbDXzsz.jpeg?dl=1](image1920×757 62.9 KB)

(sorry for posting 3 messages instead of one, but as a “new forum user” I wasn’t able to submit multiple images in a single post)

---

## Post #4 by @eric-langchain
*Posted on 2025-07-01 17:01:58*

we’re able to reproduce and looking into it

---
