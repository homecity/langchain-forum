# Error uploading JSONL dataset for NER: "you should specify at least an input key"

**Topic ID:** 854
**Created:** 2025-07-31 11:47:26
**URL:** https://forum.langchain.com/t/854

---

## Post #1 by @emerson-diego
*Posted on 2025-07-31 11:47:26*

Hi everyone,

I’m trying to upload a dataset to LangSmith via the UI to evaluate a Named Entity Recognition (NER) model, but I consistently run into the same error: `"you should specify at least an input key"`.

I have followed the documentation and tried several JSONL formats without success. My latest attempt uses a nested structure with both inputs and outputs, which seems correct for an NER task, but it still fails.

Here is a sample line from my `.jsonl` file:

{“inputs”: {“text”: “PODER JUDICIÁRIO JUSTIÇA DO TRABALHO Araújo Ltda. - Casa Grande Exmº. Senhor Desembargador Presidente, venho perante V. Exª requerer: […]”}, “outputs”: {“entities”: [{“text”: “Araújo Ltda. - Casa Grande”, “label”: “Organização”}, {“text”: “Diego Canto Melo”, “label”: “Pessoa”}, {“text”: “11/05/2023”, “label”: “Data”}, {“text”: “VARA DO TRABALHO DE JOÃO PESSOA”, “label”: “Organização”}]}}

---

## Post #2 by @madams0013
*Posted on 2025-07-31 18:15:09*

We’ve identified a bug with JSONL dataset uploads and are working on a fix! Thanks for reporting.

---
