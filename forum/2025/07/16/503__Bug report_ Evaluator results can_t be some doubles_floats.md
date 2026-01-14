# [Bug report] Evaluator results can't be some doubles/floats

**Topic ID:** 503
**Created:** 2025-07-16 17:54:13
**URL:** https://forum.langchain.com/t/503

---

## Post #1 by @alexc
*Posted on 2025-07-16 17:54:13*

Some float values can’t be returned as an python evaluator results.

For instance this one never is able to be shown:


```
`def perform_eval(run, example):
  return { "test21": (1-10/14) }
`
```

However evaluator traces show successful evaluations

while this one is calculated and displayed just fine:


```
`def perform_eval(run, example):
  return { "test1": int((1-10/14)*1000)/1000 }
`
```

In the playground it looks like this. In the experiment page test21 column is just missing

[/uploads/short-url/bEFUYol4Wgh84aEpTYftDXbGkHW.png?dl=1](image1252×720 12.5 KB)

---
