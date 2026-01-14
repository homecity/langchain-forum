# Vercel + LangSmith Deployment Issue

**Topic ID:** 247
**Created:** 2025-07-04 12:03:32
**URL:** https://forum.langchain.com/t/247

---

## Post #1 by @engagepy
*Posted on 2025-07-04 12:03:32*

Hi,

**Context :**



I’ve deployed the following code with all .env variables in place.



Locally same config is able to communicate with LangSmith deployed (plus plan) graph.



Repo link : [https://github.com/engagepy/LangGraph-Multi-Tool-Agent](GitHub - engagepy/LangGraph-Multi-Tool-Agent)



**Issue :**


However via Vercel, it is not reachable, no responses in my UI. No errors either.

---

## Post #2 by @jacoblee93
*Posted on 2025-07-07 21:07:56*

Hey [/u/engagepy](@engagepy),

Gave your repo a quick scan -  from the `langgraph.json` in it, it looks like you’re trying to deploy an app with LangGraph API endpoints onto Vercel - I don’t think they support this spec.

You’ll need to recreate your own endpoints that wrap your graph if you want to do this, but note that there are some stateful aspects of the API that don’t translate well to serverless environments:


  
      

      [https://langchain-ai.github.io/langgraph/concepts/langgraph_standalone_container/?h=serverless#overview](langchain-ai.github.io)
  

  
    

[https://langchain-ai.github.io/langgraph/concepts/langgraph_standalone_container/?h=serverless#overview](Standalone Container)

  Build reliable, stateful AI systems, without giving up control



  

  
    
    
  

  


I’d recommend you deploy your backend on platform and call out to your deployment from your Vercel app.

---

## Post #3 by @engagepy
*Posted on 2025-07-08 07:52:16*

Thanks for responding Jacob,

By deploying on platform do you mean LangSmith ? Because I have.

I tried an EC2 with TMUX, calling both back-end and front-end. Same issue, no responses coming to front-end.


**Zorawar Purohit**

[/uploads/short-url/xoSRKWTGmUzuvdyEXop3bKWgNJw.jpeg?dl=1](XN6MxSlUldntGpkzgnNjI2SDp98maHS-n6kTKWzJ_EZe5A4Eg5Usb2FmbqziBRmo7cbwzJqnfsTCyOIsyFioh4OcvSreoxDcORpMEazH7MeViWtwQDqKVpbkI7d8JnrJDeoGj6txbiDHnfJOPQZFtKI0CCsD6g8KWSdyFiBowRyVa6H1l4e9l3Jb74wwh8RB0yGS0iShdJmP_-XOlw=s0-d-e1-ft.jpeg681×374 11.9 KB)

Asia | North America | MEA | UK

Site : [https://astratechz.com/](ASTRA TECHZ)

Disclaimer: The information contained in this communication (including any attachment(s) hereto) is intended solely for the use of the individual or entity to whom it is addressed and others authorized to receive it. If you received this message by mistake, please reply to this message and follow with its deletion, so that such a mistake does not occur in the future. Sender and all entities are not liable for the improper transmission of this communication or for any damages sustained as a result of this communication.

---

## Post #4 by @jacoblee93
*Posted on 2025-07-10 22:21:12*

Oh, you are saying your backend is unreachable from your Vercel-hosted frontend?

What is the error you’re seeing?

---

## Post #5 by @engagepy
*Posted on 2025-07-11 11:42:21*

Just did not connect, so I’ve removed the deployment in all fairness within a week.

Haven’t used it in prod. Looking at alternate deployments while sticking with LangGraph, love it.

Mail trail is to revoke the invoice that is being raised to me for 30$ + approx.

Happy to clear, but in fairness if marked void would help.

Do let me know.

Thanks !


**Zorawar Purohit**

[/uploads/short-url/xoSRKWTGmUzuvdyEXop3bKWgNJw.jpeg?dl=1](XN6MxSlUldntGpkzgnNjI2SDp98maHS-n6kTKWzJ_EZe5A4Eg5Usb2FmbqziBRmo7cbwzJqnfsTCyOIsyFioh4OcvSreoxDcORpMEazH7MeViWtwQDqKVpbkI7d8JnrJDeoGj6txbiDHnfJOPQZFtKI0CCsD6g8KWSdyFiBowRyVa6H1l4e9l3Jb74wwh8RB0yGS0iShdJmP_-XOlw=s0-d-e1-ft.jpeg681×374 11.9 KB)

Asia | North America | MEA | UK

Site : [https://astratechz.com/](ASTRA TECHZ)

Disclaimer: The information contained in this communication (including any attachment(s) hereto) is intended solely for the use of the individual or entity to whom it is addressed and others authorized to receive it. If you received this message by mistake, please reply to this message and follow with its deletion, so that such a mistake does not occur in the future. Sender and all entities are not liable for the improper transmission of this communication or for any damages sustained as a result of this communication.

---
