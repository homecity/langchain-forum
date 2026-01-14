# Langsmith platform traces infinite loading

**Topic ID:** 794
**Created:** 2025-07-29 09:30:30
**URL:** https://forum.langchain.com/t/794

**Tags:** python-help

---

## Post #1 by @willleeney
*Posted on 2025-07-29 09:30:30*

[https://github.com/langchain-ai/langsmith-sdk/issues/1875](github.com/langchain-ai/langsmith-sdk)
  

  
    
  
	  
  

  
    
      [https://github.com/langchain-ai/langsmith-sdk/issues/1875](Langsmith platform traces infinite loading)
    

    
      
        opened 04:23PM - 28 Jul 25 UTC
      


      
        [https://github.com/willleeney](
          
          willleeney
        )
      
    

    
        
          sdk
        
    
  


  
    the icon on the platform is shown as loading infinitely, even though the functio[](…)n has long since finished executing. I have this deployed as a lambda on aws via Docker. 

env variables tracing as 

LANGSMITH_TRACING="true"

  

  

  
    
    
  

  


the icon on the platform is shown as loading infinitely, even though the function has long since finished executing. This also means that I’m not getting the final output of the last traceable function. I have this deployed as a lambda on aws via Docker. This works perfectly with docker on my local machine.

---
