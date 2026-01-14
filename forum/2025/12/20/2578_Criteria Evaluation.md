# Criteria Evaluation

**Topic ID:** 2578
**Created:** 2025-12-20 20:50:59
**URL:** https://forum.langchain.com/t/2578

---

## Post #1 by @darthShana
*Posted on 2025-12-20 20:50:59*

HI team im getting this output from Anthropoid which is pretty strange

my code is


```
`class CriteriaGrade(BaseModel):
    """Score the response against specific criteria."""
    grade: bool = Field(description="True if ALL criteria are met, False if ANY criteria are not met. MUST match your conclusion in the justification.")
    justification: str = Field(description="The justification for the grade and score, including specific examples from the response. MUST end with a clear statement that matches the grade field.")


criteria_eval_structured_llm = llm.with_structured_output(CriteriaGrade)
eval_result = criteria_eval_structured_llm.invoke([
        {"role": "system", "content": RESPONSE_CRITERIA_SYSTEM_PROMPT},
        {"role": "user", "content": f"""\n\n Response criteria: {criteria}"""},
        {"role": "user", "content": f"""\n\n Assistant's response: \n\n {json.dumps(transactions_json, indent=2)}"""},
        {"role": "user", "content": f"""\n\n Evaluate whether the assistant's response meets the criteria and provide justification for your evaluation."""}
    ])

    log.info(eval_result)
    assert eval_result.grade, eval_result.justification
`
```

output


```
`  - Transaction 4736861 ($760.00 rent): has "linked_transaction":{} - empty ✓
  - Transaction 4741838 ($760.00 rent): has "linked_transaction":{} - empty ✓
  - Transaction 4721332 ($23.00): has "linked_transaction":{} - empty ✓
  - Transaction 4721334 ($760.00): has "linked_transaction":{} - empty ✓
  - Transaction 4725687 ($338.00 Manukau Lock): has "linked_transaction":{} - empty ✓
  - Transaction 4730185 ($0.00): has "linked_transaction":{} - empty ✓
  - Transaction 4737710 ($23.00): has "linked_transaction":{} - empty ✓
  - Transaction 4737729 ($27.00): has "linked_transaction":{} - empty ✓
  - Transaction 4737812 ($57.50 Dass Cleaning): has "linked_transaction":{} - empty ✓
  - Transaction 4737815 ($402.50 TRS - Aro Electrical): has "linked_transaction":{} - empty ✓
  - Transaction 4738185 ($54.23 Veolia Water): has "linked_transaction":{} - empty ✓
  - Transaction 4725912 (Payment): has "linked_transaction":{} - empty ✓
  - Transaction 4741422 (Payment): has "linked_transaction":{} - empty ✓
  - Transaction 4746138 (Payment): has "linked_transaction":{} - empty ✓
  - Management fees and GST transactions: all have "linked_transaction":{} - empty ✓

  All criteria are satisfied:
  1. The specified 8 transactions have populated linked_transaction fields with references and dates
  2. Only those 8 transactions have populated linked_transaction fields
  3. Other transactions like Dass Cleaning Service Limited have empty linked_transaction objects

  All criteria are MET.
`
```

As you can see All criteria are MET but the grade is false. I have been using this pattern for my unit tests. but they are not working after i went from claude 3.5 to 4.5

---
