---
title: "Manage prompts"
url: "https://docs.langchain.com/langsmith/manage-prompts"
section: "langsmith"
last_modified: "2025-12-16T22:07:24.491Z"
---
LangSmith provides several tools to help you manage your [_prompts_](/langsmith/prompt-engineering-concepts) effectively. This page describes the following features:

-   [Commit tags](#commit-tags) for version control and environment management.
-   [Webhook triggers](#trigger-a-webhook-on-prompt-commit) for automating workflows when prompts are updated.
-   [Public prompt hub](#public-prompt-hub) for discovering and using community-created prompts.

## 

[​

](#commit-tags)

Commit tags

[_Commit tags_](/langsmith/prompt-engineering-concepts#tags) are labels that reference a specific [_commit_](/langsmith/prompt-engineering-concepts#commits) in your prompt’s version history. They help you mark significant versions and control which versions run in different environments. By referencing tags rather than commit IDs in your code, you can update which version is being used without modifying the code itself. Each tag references exactly one commit, though you can reassign a tag to point to a different commit.

**Not to be confused with resource tags**: Commit tags are specific to prompt versioning and reference individual commits in a prompt’s history. [Resource tags](/langsmith/set-up-resource-tags) are key-value pairs used to organize workspace resources like projects, datasets, and prompts. While both can use similar naming conventions (like `prod` or `staging`), commit tags control **which version** of a prompt runs, while resource tags help you **organize and filter** resources across your workspace.

### 

[​

](#create-a-tag)

Create a tag

To create a tag, navigate to the **Commits** tab for a prompt. Click on the tag icon next to the commit you want to tag. Click **New Tag** and enter a name for the tag. ![Commits tab](https://mintcdn.com/langchain-5e9cc07a/aKRoUGXX6ygp4DlC/langsmith/images/commits-tab.png?fit=max&auto=format&n=aKRoUGXX6ygp4DlC&q=85&s=b0cb7961f70d5c0bab9af960041bc54f) ![Create new prompt tag](https://mintcdn.com/langchain-5e9cc07a/aKRoUGXX6ygp4DlC/langsmith/images/create-new-prompt-tag.png?fit=max&auto=format&n=aKRoUGXX6ygp4DlC&q=85&s=cc27df9c5392a9b71319969c14924c61)

### 

[​

](#move-a-tag)

Move a tag

To point a tag to a different commit, click on the tag icon next to the destination commit, and select the tag you want to move. This will automatically update the tag to point to the new commit. ![Move prompt tag](https://mintcdn.com/langchain-5e9cc07a/4kN8yiLrZX_amfFn/langsmith/images/move-prompt-tag.png?fit=max&auto=format&n=4kN8yiLrZX_amfFn&q=85&s=3cb3c6218961cbdd8f6f1fb6d06b50e3)

### 

[​

](#delete-a-tag)

Delete a tag

To delete a tag, click on the delete icon next to the tag you want to delete. This will delete the tag altogether and it will no longer be associated with any commit.

### 

[​

](#use-tags-in-code)

Use tags in code

Tags provide a stable way to reference specific versions of your prompts in code. Instead of using commit hashes directly, you can reference tags that can be updated without changing your code. Here is an example of pulling a prompt by tag in Python:

Copy

```
prompt = client.pull_prompt("joke-generator:prod")
# If prod tag points to commit a1b2c3d4, this is equivalent to:
prompt = client.pull_prompt("joke-generator:a1b2c3d4")
```

For more information on how to use prompts in code, refer to [Managing prompts programmatically](/langsmith/manage-prompts-programmatically).

## 

[​

](#trigger-a-webhook-on-prompt-commit)

Trigger a webhook on prompt commit

You can configure a webhook to be triggered whenever a commit is made to a prompt. Some common use cases of this include:

-   Triggering a CI/CD pipeline when prompts are updated.
-   Synchronizing prompts with a GitHub repository.
-   Notifying team members about prompt modifications.

### 

[​

](#configure-a-webhook)

Configure a webhook

Navigate to the **Prompts** section in the left-hand sidebar or from the application homepage. In the top right corner, click on the `+ Webhook` button. Add a webhook URL and any required headers.

You can only configure one webhook per workspace. If you want to configure multiple per workspace or set up a different webhook for each prompt, let us know in the [LangChain Forum](https://forum.langchain.com/).

To test out your webhook, click the **Send test notification** button. This will send a test notification to the webhook URL you provided with a sample payload. The sample payload is a JSON object with the following fields:

-   `prompt_id`: The ID of the prompt that was committed.
-   `prompt_name`: The name of the prompt that was committed.
-   `commit_hash`: The commit hash of the prompt.
-   `created_at`: The date of the commit.
-   `created_by`: The author of the commit.
-   `manifest`: The manifest of the prompt.

### 

[​

](#trigger-the-webhook)

Trigger the webhook

Commit to a prompt to trigger the webhook you’ve configured.

#### 

[​

](#use-the-playground)

Use the Playground

If you do this in the Playground, you’ll be prompted to deselect the webhooks you’d like to avoid triggering. ![Commit prompt playground](https://mintcdn.com/langchain-5e9cc07a/aKRoUGXX6ygp4DlC/langsmith/images/commit-prompt-playground.png?fit=max&auto=format&n=aKRoUGXX6ygp4DlC&q=85&s=84f487c929ab7894bbd1e2c8922b6a9e)

#### 

[​

](#using-the-api)

Using the API

If you commit via the API, you can specify to skip triggering the webhook by setting the `skip_webhooks` parameter to `true` or to an array of webhook ids to ignore. Refer to the [API docs](https://api.smith.langchain.com/redoc#tag/commits/operation/create_commit_api_v1_commits__owner___repo__post) for more information.

## 

[​

](#public-prompt-hub)

Public prompt hub

LangSmith’s public prompt hub is a collection of prompts that have been created by the LangChain community that you can use for reference.

Note that prompts are user-generated and unverified. LangChain does not review or endorse public prompts, use these at your own risk. Use of Prompt Hub is subject to our [Terms of Service](https://www.langchain.com/terms-of-service).

Navigate to the **Prompts** section of the left-hand sidebar and click on **Browse all Public Prompts in the LangChain Hub**. Here you’ll find all of the publicly listed prompts in the LangChain Hub. You can search for prompts by name, handle, use cases, descriptions, or models. You can fork prompts to your personal organization, view the prompt’s details, and run the prompt in the Playground. You can [pull any public prompt into your code](/langsmith/manage-prompts-programmatically) using the SDK. To view prompts tied to your workspace, visit the **Prompts** tab in the sidebar. ![Prompts tab](https://mintcdn.com/langchain-5e9cc07a/H9jA2WRyA-MV4-H0/langsmith/images/prompts-tab.png?fit=max&auto=format&n=H9jA2WRyA-MV4-H0&q=85&s=d689013c2158309249c547086e145783)

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/manage-prompts.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.