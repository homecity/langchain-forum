# Bring Your Own Cloud Setup - Can't find where to configure IAM Roles

**Topic ID:** 253
**Created:** 2025-07-04 17:37:29
**URL:** https://forum.langchain.com/t/253

**Tags:** self-hosted

---

## Post #1 by @adrianmf94
*Posted on 2025-07-04 17:37:29*

Hello,

I was following [https://langchain-ai.github.io/langgraphjs/concepts/bring_your_own_cloud/#how-it-works](this) documentation in order to configure BYOC (Bring Your Own Cloud) for LangGraph, but I cannot find the configuration options mentioned in the documentation within the LangGraph Platform UI.

**What I’ve done:**


Set up AWS infrastructure using Terraform (IAM roles, ECR repository, ECS cluster, VPC configuration)
Built and pushed my LangGraph application to ECR using `langgraph build`
Have a LangSmith account with access to LangGraph Platform

**What I’m looking for:**


How to configure IAM role ARN and ECR repository URI in the deployment setup
Whether BYOC is still available through the UI or requires contacting support

**What I see:**

When creating a new deployment, I only see standard options with GitHub repository selection, but no BYOC configuration fields.


Am I looking at the wrong place?
Should this be configured through environment variables?
Is BYOC still available through the UI, or has the process changed?

Thanks!

---

## Post #2 by @AbdulBasit
*Posted on 2025-07-04 18:23:57*

BYOC (Bring Your Own Cloud) for LangGraph Platform typically requires enterprise-tier access and isn’t available through the standard UI. The documentation you’re following likely refers to enterprise features that need to be enabled by LangChain support. You’ll need to contact LangChain sales/support to enable BYOC functionality on your account - it’s not a self-service feature. Once enabled, you should see additional deployment options in the UI for configuring your AWS infrastructure details like IAM roles and ECR repositories.

---

## Post #3 by @andrew
*Posted on 2025-07-04 20:17:15*

BYOC (Bring Your Own Cloud) for LangGraph Platform is no longer being offered as a deployment option for new customers.

---

## Post #4 by @adrianmf94
*Posted on 2025-07-04 21:23:01*

I see, thank you both your replies, this is helpful. We will contact Langchain team on Monday since we have been customers since last year and we discussed about BYOC deployment a while ago.

---
