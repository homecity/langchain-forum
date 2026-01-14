# Interrupts on LangGraph Platform

**Topic ID:** 151
**Created:** 2025-07-01 12:58:08
**URL:** https://forum.langchain.com/t/151

---

## Post #1 by @Ben
*Posted on 2025-07-01 12:58:08*

Hi,

I’ve been running into issues with interrupts on **LangGraph Platform**.

[#p-224-problem-summary-1]()Problem Summary
**Issue**:

LangGraph workflows with repeated `interrupt()` calls work correctly when running locally but fail to pause for user input on subsequent interrupts when deployed to **LangGraph Platform**.

**Expected Behavior**:


User provides feedback → workflow processes it → revises plan → shows revised plan → interrupts again for more feedback
This cycle should repeat until user explicitly approves

**Actual Behavior on Platform**:


First interrupt works correctly (pauses and waits for user input)
After revision, second interrupt call is made but the latest plan, provided during the interrupt by the user, isn’t shown (but the previous one).
Logs show that the new plan revision is correctly created (but not shown through the interrupt)

[#p-224-technical-details-2]()Technical Details
**Workflow Structure**:


```
`async def suggest_plan(state: DataSummaryState):
    current_plan = state.plan or initial_plan
    answer = interrupt(current_plan) # This should pause every time

    # Process feedback with LLM
    plan_feedback = await llm.with_structured_output(PlanFeedbackReply).ainvoke(...)

    if plan_feedback.plan_accepted:
        return {"plan_accepted": True, ...}
    else:
        return {"plan_accepted": False, "plan_feedback": answer, ...}

# Graph routing: suggest_plan → (if not accepted) → revise_plan → suggest_plan (loop)
`
```

[#p-224-solutions-attempted-3]()Solutions Attempted

**Node Structure Refactoring**: Split interrupt and processing logic into separate nodes - no improvement
**State Management**: Added explicit state clearing between iterations - no improvement
**Platform-Specific Guards**: Added checks for existing feedback to prevent re-execution issues - no improvement

[#p-224-key-research-findings-4]()Key Research Findings

Local execution works perfectly with the same code
LangGraph Platform has different node re-execution behavior after interrupts
Platform automatically handles state persistence (no manual checkpointer needed)
Issue appears specific to repeated interrupts in iterative workflows on the platform

[#p-224-current-status-5]()Current Status
The workflow correctly:


Makes the first interrupt call and pauses
Processes user feedback
Routes to revision logic
Returns to the interrupt node
Calls `interrupt()` again

But the second `interrupt()` does not send the updated state property to the user on **LangGraph Platform**, while the identical code works locally.

[#p-224-question-6]()Question
Is there a known difference in how repeated `interrupt()` calls behave on LangGraph Platform versus local execution? Are there platform-specific configurations or patterns required for iterative human-in-the-loop workflows?

---
