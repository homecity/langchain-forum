# Setting an experiment with messages list

**Topic ID:** 1560
**Created:** 2025-09-17 12:41:30
**URL:** https://forum.langchain.com/t/1560

**Tags:** cloud

---

## Post #1 by @vivaperon
*Posted on 2025-09-17 12:41:30*

Hi! I’m trying to set up an experiment where my input consists of a list of messages. This is perfectly possible from the playground. In fact there is an editor as well for this kind of input. BUT when I get into Evaluate mode there it’s no longer possible to add messages in this format.

[/uploads/short-url/9wBboxpQm69GVHsz3BbuBCKxsdr.png?dl=1](image1151×383 35.7 KB)

I don’t know how to create Langchain base messages from the UI.

I don’t know how to set up a dataset like this from the Datasets & Experiments section either.

Any help?

---

## Post #2 by @Jameskanyiri
*Posted on 2025-09-17 13:00:34*

Looks like your dict is missing the } closing tag.

[{“role”:“human”, “content”:“hi”}]

Kindly confirm if that could be the issue

else convert the messages objects eg `HumanMessage`

---

## Post #3 by @vivaperon
*Posted on 2025-09-23 19:13:32*

Jameskanyiri:

[{“role”:“human”, “content”:“hi”}]



Nope, this doesn’t work. Apparently it is expecting a [https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html](BaseMessage object) but it won’t instantiate one with my string. Note the difference between the Evaluate Mode and the playground mode where an interface like this pops up:

[/uploads/short-url/iJ7V8mpKM3YqMUt2Np2y6IdQtoF.png?dl=1](image1808×309 11 KB)

I don’t think I can convert the messages objects either because my strings won’t run as code. Probably I could set up a valid dataset from Python but I’d love to this from the GUI as well.

---
