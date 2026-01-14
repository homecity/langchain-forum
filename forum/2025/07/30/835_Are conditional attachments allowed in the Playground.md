# Are conditional attachments allowed in the Playground

**Topic ID:** 835
**Created:** 2025-07-30 17:37:10
**URL:** https://forum.langchain.com/t/835

---

## Post #1 by @mattView
*Posted on 2025-07-30 17:37:10*

I have a workflow wherein I sometimes want to attach a pdf to my prompt and other times I want to include text from prompt variables. The prompt is otherwise the same. My application code handles this just fine but I’ve struggled with the conditional pdf attachment in the playground. I’d like to use just one prompt to handle both cases and be able to run experiments in the playground in which a single datasets contains some examples with pdf attachments and some with text from the prompt variables. I can conditional insert the text using mustache syntax but the pdf attachment doesn’t respect the mustache conditional. Is there some other way to do this?

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-31 11:59:29*

LangSmith Playground does not support conditionally including or excluding file attachments using mustache logic. Attachments are always sent if present in the example schema, regardless of prompt variables.

**Solutions:**



**Separate dataset examples**: create some examples with PDF attachments and others without, rather than trying to conditionally control attachments within a single example type



**Use a control variable**: add a variable like `{{has_pdf}}` to your dataset and use mustache logic in your prompt text to adapt behavior: `{{#has_pdf}}Analyze the attached PDF{{/has_pdf}}{{^has_pdf}}Analyze this text: {{text_content}}{{/has_pdf}}`



**Mixed example structure**: structure your dataset so PDF examples always have attachments (even if unused) and text examples populate text variables, letting your prompt logic determine which to process



The attachment system treats files as static elements that can’t be conditionally controlled through prompt variables.

---

## Post #3 by @tanushree-sharma
*Posted on 2025-07-31 18:45:35*

Expanding on #3 from [/u/abdulbasit](@AbdulBasit) you could set up your evaluation so that:


In your dataset, the text variable exists but its value is blank for those examples that don’t have text
When running your prompt in the playground, you’re using the “All Attachments” option. The all attachments option will show up when you click on the paperclip icon after loading a dataset with attachments into the playground.
Add instruction in your prompt about what to do when variables are blank

This should allow you to have some examples with a PDF and others with text. Here’s an example:

[/uploads/short-url/geptejLfUkWOWJiRoxR9RXFiWzi.png?dl=1](image1613×1175 134 KB)

---
