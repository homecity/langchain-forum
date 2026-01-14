# Add our own custom postgres server

**Topic ID:** 150
**Created:** 2025-07-01 12:46:33
**URL:** https://forum.langchain.com/t/150

---

## Post #1 by @dheeraj.spotdraft
*Posted on 2025-07-01 12:46:33*

Hey Team,

According to the documentation, we are adding POSTGRES_DATABASE_URI env variable. But still we are not seeing any kind of data flow into the our database. We also whitelisted public IP as given here


  
      

      [https://docs.smith.langchain.com/reference/cloud_architecture_and_scalability?utm_source=chatgpt.com#whitelisting-ip-addresses](docs.smith.langchain.com)
  

  
    

[https://docs.smith.langchain.com/reference/cloud_architecture_and_scalability?utm_source=chatgpt.com#whitelisting-ip-addresses](Cloud architecture and scalability | 🦜️🛠️ LangSmith)

  This section is only relevant for the cloud-managed LangSmith services available at https//eu.smith.langchain.com.



  

  
    
    
  

  


please help any kind of additional step we need to do

---

## Post #2 by @andrew
*Posted on 2025-07-01 23:11:29*

Is this question about `LangGraph Platform` or `LangSmith`? The link you shared is documentation for `LangSmith`. This section of the forum is for `LangGraph Platform`.

For a `LangGraph Platform` deployment, you can set the `POSTGRES_URI_CUSTOM` environment variable to configure a custom Postgres instance. See the docs [https://langchain-ai.github.io/langgraph/cloud/reference/env_var/#postgres_uri_custom](here). This configuration is only available for self-hosted deployments.

---
