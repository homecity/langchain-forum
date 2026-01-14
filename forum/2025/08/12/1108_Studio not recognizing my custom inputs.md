# Studio not recognizing my custom inputs

**Topic ID:** 1108
**Created:** 2025-08-12 19:47:10
**URL:** https://forum.langchain.com/t/1108

**Tags:** js-help, langsmith-studio

---

## Post #1 by @pedronikolaidesanota
*Posted on 2025-08-12 19:47:10*

[#p-1770-need-help-with-langgraphjs-ui-regression-after-update-1]() Need Help with LangGraphJS UI Regression after Update 
Hey everyone,

I’m currently developing a **LangGraph** application using **LangGraphJS**, and I’ve run into a strange bug after upgrading the CLI version.

On **version `0.0.50`**, my graph in LangGraph Studio rendered perfectly — my **Input** section was **highly structured** with proper field types (dropdowns for enums, text fields, JSON editors, etc.), just like in this screenshot:

However, after updating to **version `0.0.58`** and launching LangGraph Studio via the CLI, **the exact same graph** now renders with **all inputs converted into “base message” types**, losing all the nice structured controls:

[/uploads/short-url/usCasq43EuHDFn8jsS31x9ngDfl.png?dl=1](inputs1640×856 106 KB)

This happens **without any changes** to my code, only the CLI upgrade. My inputs are still defined in the same format, but the Studio doesn’t seem to recognize them anymore.

[#p-1770-my-questions-2]() My questions:

Has anyone else experienced this after upgrading?
Was there a breaking change in how input schemas are defined in newer versions?
Is there a migration guide or changelog entry I might have missed?

I’d appreciate any pointers, as I’d love to keep the structured inputs rather than fallback to raw message types.

Thanks in advance!

---

## Post #2 by @arjun
*Posted on 2025-08-12 21:12:46*

Hi [/u/pedronikolaidesanota](@pedronikolaidesanota)

This certainly looks like a bug! I did some digging and this seems to have been introduced in version `0.0.56` . The team is investigating a fix, but in the meantime you can revert to version `0.0.55`  (set ` "@langchain/langgraph-cli": "^0.0.55",` in your `package.json`).

---

## Post #3 by @dqbd
*Posted on 2025-08-12 22:27:28*

Hello! Would it be possible to provide your package lockfile as well as your `tsconfig.json` file? Since 0.0.57 we’ve started honoring `tsconfig.json` from the project.

---
