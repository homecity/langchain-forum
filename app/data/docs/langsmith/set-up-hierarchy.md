---
title: "Set up hierarchy"
url: "https://docs.langchain.com/langsmith/set-up-hierarchy"
section: "langsmith"
last_modified: "2026-01-09T13:35:47.803Z"
---
This page describes setting up and managing your LangSmith [_organization_](/langsmith/administration-overview#organizations) and [_workspaces_](/langsmith/administration-overview#workspaces):

-   [Set up an organization](#set-up-an-organization): Create and manage organizations for team collaboration, including user management and role assignments.
-   [Set up a workspace](#set-up-a-workspace): Set up and configure workspaces to organize your LangSmith resources, manage workspace members, and configure settings for team collaboration.
-   [Set up applications](#set-up-applications): Set up applications within a workspace to further organize LangSmith resources, and take advantage of ABAC permissioning.

You may find it helpful to refer to the [overview on LangSmith resource hierarchy](/langsmith/administration-overview) before you read this setup page.

## 

[​

](#set-up-an-organization)

Set up an organization

If you’re interested in managing your organization and workspaces programmatically, see [this how-to guide](/langsmith/manage-organization-by-api).

### 

[​

](#create-an-organization)

Create an organization

When you log in for the first time, LangSmith will create a personal organization for you automatically. If you’d like to collaborate with others, you can create a separate organization and invite your team members to join. To do this, open the Organizations drawer by clicking your profile icon in the bottom left and click **\+ New**. Shared organizations require a credit card before they can be used. You will need to [set up billing](/langsmith/billing#set-up-billing-for-your-account) to proceed.

### 

[​

](#manage-and-navigate-workspaces)

Manage and navigate workspaces

Once you’ve subscribed to a plan that allows for multiple users per organization, you can set up [workspaces](/langsmith/administration-overview#workspaces) to collaborate more effectively and isolate LangSmith resources between different groups of users. To navigate between workspaces and access the resources within each workspace (trace projects, annotation queues, etc.), select the desired workspace from the picker in the bottom left of LangSmith.

### 

[​

](#manage-users)

Manage users

Manage membership in your shared organization in the **Members and roles** tabs on the [Settings page](https://smith.langchain.com/settings). Here you can:

-   Invite new users to your organization, selecting workspace membership and (if RBAC is enabled) workspace role.
-   Edit a user’s organization role.
-   Remove users from your organization.

![Organization members and roles](https://mintcdn.com/langchain-5e9cc07a/H9jA2WRyA-MV4-H0/langsmith/images/organization-members-and-roles.png?fit=max&auto=format&n=H9jA2WRyA-MV4-H0&q=85&s=7f6b85051e5dcca2f074ba0ef4801ddd) Organizations on the Enterprise plan may set up custom workspace roles in the **Roles** tab. For more details, refer to the [access control setup guide](/langsmith/user-management).

#### 

[​

](#organization-roles)

Organization roles

Organization-scoped roles are used to determine access to organization settings. The role selected also impacts workspace membership:

-   `Organization Admin` grants full access to manage all organization configuration, users, billing, and workspaces. Any `Organization Admin` has `Admin` access to all workspaces in an organization.

-   `Organization User` may read organization information, but cannot execute any write actions at the organization level. You can add an `Organization User` to a subset of workspaces and assigned workspace roles as usual (if RBAC is enabled), which specify permissions at the workspace level.

The `Organization User` role is only available in organizations on plans with multiple workspaces. In organizations limited to a single workspace, all users are `Organization Admins`. Custom organization-scoped roles are not available.

For a full list of permissions associated with each role, refer to the [Administration overview](/langsmith/administration-overview#organization-roles) page.

## 

[​

](#set-up-a-workspace)

Set up a workspace

When you log in for the first time, a default [workspace](/langsmith/administration-overview#workspaces) will be created for you in your personal organization. Workspaces are often used to separate resources between different teams or business units to establish clear trust boundaries between them. Within each workspace, Role-Based Access Control (RBAC) manages permissions and access levels, which ensures that users only have access to the resources and settings necessary for their role. Most LangSmith activity happens in the context of a workspace, each of which has its own settings and access controls. For guidance on choosing the right workspace organization model for your team (single workspace per team, multiple teams per workspace, or multiple workspaces per team), refer to [Workload isolation](/langsmith/workload-isolation).

### 

[​

](#create-a-workspace)

Create a workspace

To create a new workspace, navigate to the [Settings page](https://smith.langchain.com/settings) **Workspaces** tab in your shared organization and click **Add Workspace**. Once you have created your workspace, you can manage its members and other configuration by selecting it on this page. ![Create workspace](https://mintcdn.com/langchain-5e9cc07a/aKRoUGXX6ygp4DlC/langsmith/images/create-workspace.png?fit=max&auto=format&n=aKRoUGXX6ygp4DlC&q=85&s=a26994889b28911c59daa8de557c7271)

Different plans have different limits placed on the number of workspaces that can be used in an organization. For more information, refer to the [pricing page](https://www.langchain.com/pricing-langsmith).

### 

[​

](#manage-users-2)

Manage users

Only workspace `Admins` can manage workspace membership and, if RBAC is enabled, change a user’s workspace role.

For users that are already members of an organization, a workspace `Admin` may add them to a workspace in the **Workspace members** tab under [Workspaces settings page](https://smith.langchain.com/settings/workspaces). Users may also be invited directly to one or more workspaces when they are [invited to an organization](#manage-users).

### 

[​

](#configure-workspace-settings)

Configure workspace settings

Workspace configuration exists in the [Workspaces settings page](https://smith.langchain.com/settings/workspaces) tab. Select the workspace to configure and then the desired configuration sub-tab. The following example shows the **API keys**, and other configuration options including secrets, models, and shared URLs are available here as well. ![Workspace settings](https://mintcdn.com/langchain-5e9cc07a/1RIJxfRpkszanJLL/langsmith/images/workspace-settings.png?fit=max&auto=format&n=1RIJxfRpkszanJLL&q=85&s=0b95739c014bc31f2950d9d586303cbb)

### 

[​

](#delete-a-workspace)

Delete a workspace

Deleting a workspace will permanently delete the workspace and all associated data. This action cannot be undone.

You can delete a workspace through the LangSmith UI or via [API](https://api.smith.langchain.com/redoc?#tag/workspaces/operation/delete_workspace_api_v1_workspaces__workspace_id__delete). You must be a workspace `Admin` in order to delete a workspace.

### 

[​

](#delete-a-workspace-via-the-ui)

Delete a workspace via the UI

1.  Navigate to **Settings**.
2.  Select the workspace you want to delete.
3.  Click **Delete** in the top-right corner of the screen.

![Delete a workspace](https://mintcdn.com/langchain-5e9cc07a/aKRoUGXX6ygp4DlC/langsmith/images/delete-workspace.png?fit=max&auto=format&n=aKRoUGXX6ygp4DlC&q=85&s=33038784e813f06dae3c87e5d34a3dc1)

## 

[​

](#set-up-applications)

Set up applications

Applications can be created within a workspace to further organize resources, such as tracing projects and datasets, within a workspace.A workspace may have zero or more applications. You can view all resources within a workspace by selecting `Show all applications`; resources may be tagged to multiple applications by adding them to the `Application` tag under Resource Tags within the settings page. ![Sample Application Selector](https://mintcdn.com/langchain-5e9cc07a/CxwZomSRGiBmNIp6/langsmith/images/sample-application-selector.png?fit=max&auto=format&n=CxwZomSRGiBmNIp6&q=85&s=18a3b44a31569d299f6c04b11b32a46b)

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/set-up-hierarchy.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.