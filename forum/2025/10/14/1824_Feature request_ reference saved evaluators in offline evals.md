# Feature request: reference saved evaluators in offline evals

**Topic ID:** 1824
**Created:** 2025-10-14 18:02:15
**URL:** https://forum.langchain.com/t/1824

---

## Post #1 by @benjamin.ellis
*Posted on 2025-10-14 18:02:15*

The LangSmith docs suggest there are 2 separate ways to manage evaluators.


For Offline Evaluations: manage via code, evaluators run locally.
For Online Evaluations: manage via UI, evaluators run server-side.

I’d like to define evaluators that can be used for both cases. But I don’t find a clean way to do this.

The Python SDK does not offer a way to fetch rules or evaluators.

Ideally, I’d want to do something like


```
`client.evaluate(target,
   data=dataset_name,
   evaluators=[evaluator_id, ...])
`
```

passing in the id of a saved evaluator (similar to how `data` allows me to refer to a saved dataset by name or id).

And likewise it’d be great to be able to create/edit/fetch an evaluator programmatically via SDK.

The API allows me to fetch rules, and the response body includes the evaluator config:


  
      

      [https://api.smith.langchain.com/docs#/run/list_rules_api_v1_runs_rules_get](api.smith.langchain.com)
  

  
    

[https://api.smith.langchain.com/docs#/run/list_rules_api_v1_runs_rules_get](LangSmith - Swagger UI)



  

  
    
    
  

  


but that would at best allow me to create a local copy of an evaluator. I’d prefer instead to have my offline evaluation invoke an evaluator that runs server-side.

The Prompt hub lets me edit a prompt via UI, and then interact with it programmatically via the SDK. It would be great if that same flexibility was available for evaluators. And the convenience of running evaluators server-side would be enhanced if that could be made available for offline evaluations too.

---
