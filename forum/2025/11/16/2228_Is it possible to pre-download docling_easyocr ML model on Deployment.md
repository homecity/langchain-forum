# Is it possible to pre-download docling/easyocr ML model on Deployment

**Topic ID:** 2228
**Created:** 2025-11-16 21:52:12
**URL:** https://forum.langchain.com/t/2228

**Tags:** cloud

---

## Post #1 by @febbraro
*Posted on 2025-11-16 21:52:12*

My agent is processing PDF documents into Markdown using docling.  Some of these PDF contain images and docling can use OCR to perform those actions.  I have easyocr installed and docling configured to use it, however on each agent run the code calls out to docling and that+easyocr appear to be downlaoding the ML model to perform the OCR.  Is there a way that I can have it download that on deployment so it is always available to each agent run?  Does the deployment process have any post deployment script hooks that I can configure? Or some other mechanism?

---
