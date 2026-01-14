# Configuring self-hosted n8n to send traces to LangSmith

**Topic ID:** 989
**Created:** 2025-08-06 18:52:53
**URL:** https://forum.langchain.com/t/989

---

## Post #1 by @biowestDataGuy
*Posted on 2025-08-06 18:52:53*

HI there, I’m building an n8n self-hosted instance on Container Apps. I heard about LangSmith and thought I’d try to set it up and see what comes out. I added the environment variables to the container but no traces get logged. If someone has successfully configured their n8n instance to send traces to LangSmith, please let me know how you got it working. Also, there is discrepancy between what to call the environment variables. If you go to the LangSmith App, it names them LANGSMITH_ but when I ask GPT to search for details, it asserts that the variables should be named LANGCHAIN_.

The LangSmith docs also refer to “LANGSMITH_TRACING”  but GPT said to use “LANGCHAIN_TRACING_V2”

Any guidance would be greatly appreciated! THanks for your consideration.

---

## Post #2 by @niilooy
*Posted on 2025-08-08 06:54:12*

Hey! We use LANGSMITH_TRACING flag while using LangSmith SDK in the codebase. Since this is n8n we’re talking about, which largely uses LangChain under the hood, the LANGCHAIN_TRACING_V2 flag is expected here. You can check this guide right here:


  
      

      [https://www.youtube.com/watch?si=eSHcTzHwWdR1vIDL&v=bvNQyAoGA5I&feature=youtu.be](YouTube)
  

  
    

[https://www.youtube.com/watch?si=eSHcTzHwWdR1vIDL&v=bvNQyAoGA5I&feature=youtu.be](n8n Tracing to LangSmith)

  Learn how to quickly set up tracing from n8n to LangSmith!Docs: https://docs.n8n.io/advanced-ai/langchain/langsmith/Sign up for LangSmith: https://smith.lang...



  

  
    
    
  

  


Here’s the docs as well:


  
      

      [https://docs.n8n.io/advanced-ai/langchain/langsmith/](docs.n8n.io)
  

  
    

[https://docs.n8n.io/advanced-ai/langchain/langsmith/](Use LangSmith with n8n | n8n Docs)

  How to enable LangSmith for your self-hosted n8n instance.

---

## Post #3 by @biowestDataGuy
*Posted on 2025-08-09 17:12:00*

THank you sir. Can you comment on timing? How quickly from the time of running an n8n agent to the time the LangSmith Dashboard reports on it?

Have a great weekend!

---

## Post #4 by @niilooy
*Posted on 2025-08-11 10:26:14*

Welcome, and hope you’ve had a great weekend too! Typically within a few seconds post execution completion.

---
