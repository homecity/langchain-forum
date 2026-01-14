# LS Prompt

### **Background**

We want to see how you think like a builder and support engineer — how you learn tools, experiment with features, and communicate technical feedback. This task is designed to assess your ability to understand and work with **LangSmith and LangGraph**.

**LangGraph** is a library for building stateful, multi-step applications powered by LLMs. It enables the creation of agents and workflows that can manage memory, looping, conditional branching, and other logic needed for more sophisticated applications.

**LangSmith** experiments allow users to test and evaluate those applications — including LangGraph-powered agents — using datasets and scoring functions like LLM-as-a-judge.

We’re not looking for perfection or polish — we’re looking for signal in your thinking:

- How do you reason about LangGraph’s design model (nodes, edges, states)?
- How do you connect LangGraph applications with LangSmith evaluation tools?
- Can you identify what’s working, what’s confusing, and how it could improve?

-----

### **What You’ll Be Doing**

Your task is to build a simple **agent** of your choice using **LangGraph** and then **run an evaluation experiment in LangSmith**, using both the **SDK** and the **UI**.

LangGraph provides low-level infrastructure for long-running, stateful workflows and agents. LangSmith lets you evaluate these workflows using test datasets, custom metrics, and LLM-based scoring to measure attributes like correctness, helpfulness, or hallucination.

This simulates a realistic developer scenario: testing and refining a LangGraph application with LangSmith’s tools.

### **Task**

1. Design and build a simple LangGraph-based agent or workflow (e.g., retrieval-augmented agent, multi-step QA, or tool-using planner).
1. Create or select a small dataset (can be synthetic) to test your app.
1. Run a LangSmith evaluation experiment using both:
- The **LangSmith UI**, and
- The **LangSmith SDK** (programmatically)
1. Focus on realism — debug or improve your agent like a real user would.

### Resources

- 🔧 [LangGraph Docs](https://docs.langchain.com/langgraph/)
- 📘 [LangSmith Evaluation Docs](https://docs.smith.langchain.com/evaluation)
- 🎓 [LangSmith Academy](https://academy.langchain.com/courses/intro-to-langsmith)

### **What to Share**

- A **short walkthrough (~15 min)** on our next call covering:
  - What you built using LangGraph
  - How you evaluated it with LangSmith
  - What you learned or found surprising
  - What might confuse a new user
- A link to your **code snippets or repo**
- Optionally, a **“friction log”** — anything unclear, buggy, or unintuitive you’d flag to the team if you were already on the job