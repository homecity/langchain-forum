# Test Plan Template - RAG Systems

## Test Case Structure

```markdown
## Test Case: [Name]

**ID:** TC-001
**Priority:** High/Medium/Low
**Category:** Happy Path / Sad Path / Edge Case

### Objective
What this test validates

### Prerequisites
- Vector store loaded
- LLM API key configured
- Test documents indexed

### Test Steps
1. Step 1
2. Step 2
3. Step 3

### Expected Results
- Assertion 1
- Assertion 2
- Metrics: faithfulness > 0.7, relevance > 0.7

### Actual Results
[To be filled during execution]

### Pass/Fail
[ ] Pass
[ ] Fail (Reason: ___)
```

---

## Example Test Cases

### TC-001: Simple Query (Happy Path)

**ID:** TC-001
**Priority:** High
**Category:** Happy Path

**Objective:** Validate RAG pipeline returns accurate answer for simple factual question

**Prerequisites:**
- Vector store with ML/AI documents loaded
- GPT-4 configured as LLM

**Test Steps:**
1. Send query: "What is machine learning?"
2. Wait for response
3. Validate answer contains "machine learning"
4. Check source documents returned
5. Calculate faithfulness score

**Expected Results:**
- Answer length > 50 characters
- Source documents count >= 3
- Faithfulness score > 0.8
- Latency < 1500ms

**LangSmith Trace:** [Link]

**Pass/Fail:** ✅ Pass

---

### TC-002: No Relevant Documents (Sad Path)

**ID:** TC-002
**Priority:** High
**Category:** Sad Path

**Objective:** Validate graceful handling when no relevant documents found

**Prerequisites:**
- Vector store without ancient history docs

**Test Steps:**
1. Send query: "Explain quantum computing in ancient Rome"
2. Wait for response
3. Check for "I don't know" or similar message

**Expected Results:**
- Answer acknowledges lack of information
- No hallucinated facts
- Faithfulness score > 0.9 (honest answer)

**Pass/Fail:** [ ] Pending

---

## Metrics Checklist

For each test case, collect:

- [ ] **Faithfulness:** 0-1 score
- [ ] **Context Relevance:** 0-1 score
- [ ] **Answer Relevance:** 0-1 score
- [ ] **Latency:** ms
- [ ] **Token Usage:** Input + output
- [ ] **Source Documents:** Count

---

**Version:** 1.0
**Last Updated:** 2025-12-04
