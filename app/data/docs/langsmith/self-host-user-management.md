---
title: "Customize user management"
url: "https://docs.langchain.com/langsmith/self-host-user-management"
section: "langsmith"
last_modified: "2026-01-08T16:42:32.428Z"
---
This guide assumes you have read the [admin guide](/langsmith/administration-overview) and [organization setup guide](/langsmith/set-up-hierarchy#set-up-an-organization).

LangSmith offers additional customization features for user management using feature flags.

## 

[​

](#features)

Features

### 

[​

](#workspace-level-invites-to-an-organization)

Workspace level invites to an organization

The default behavior in LangSmith requires a user to be an Organization Admin in order to invite new users to an organization. For self-hosted customers that would like to delegate this responsibility to workspace Admins, a feature flag may be set that enables workspace Admins to invite new users to the organization as well as their specific workspace **at the workspace level**. Once this feature is enabled via the configuration option below, workspace Admins may add new users in the `Workspace members` tab under `Settings` > `Workspaces`. Both of the following cases are supported when inviting at the workspace level, while the organization level invite functions the same as before.

1.  Invite users who are NOT already active in the organization: this will add the users as pending to the organization and specific workspace
2.  Invite users who ARE already active in the organization: adds the users directly to the workspace as an active member (no pending state).

Admins may invite users for both cases at the same time.

#### 

[​

](#configuration)

Configuration

Helm

Docker

Copy

```
config:
  workspaceScopeOrgInvitesEnabled: true
```

### 

[​

](#sso-new-member-login-flow)

SSO new member login flow

As of helm **v0.11.10**, self-hosted deployments using OAuth SSO will no longer need to manually add members in LangSmith settings for them to join. Deployments will have a **default** organization, to which new users will automatically be added upon their first login to LangSmith. For your **default** organization, you can set which workspace(s) and workspace role is assigned to new members. For **non-default** organizations, the invitation flow remains the same. Once a user joins an organization, any changes to their workspaces or roles beyond the default organization settings must be managed either through LangSmith settings (as before) or via SCIM.

By default, all new users are added to the organization’s initially provisioned workspace (**Workspace 1** by default) with the **Workspace Editor** role.

![Update SSO Member Settings](https://mintcdn.com/langchain-5e9cc07a/QEp_iTXiY5U9rQvE/langsmith/images/sso-member-settings-update.png?fit=max&auto=format&n=QEp_iTXiY5U9rQvE&q=85&s=e7274ed7fdd47fe7c4c1f514d78f3ac7)

To change your default organization, use **Set Default Organization** in the organization selector dropdown. (Org Admin permissions required in both the source and target organization.)

### 

[​

](#disabling-organization-creating)

Disabling organization creating

By default, any user can create an organization in LangSmith. For self-hosted customers, an admin may want to restrict this ability after setting up initial organizations. This feature flag allows an admin to disable the ability for users to create new organizations.

#### 

[​

](#configuration-2)

Configuration

The `userOrgCreationDisabled` feature flag is set to `true` by default for organizations using [basic auth](/langsmith/self-host-basic-auth) or [SSO](/langsmith/self-host-sso).

Helm

Docker

Copy

```
config:
  userOrgCreationDisabled: true
```

### 

[​

](#disabling-personal-organizations)

Disabling personal organizations

By default, any user who logs in to LangSmith will have a personal organization created for them. For self-hosted customers, an admin may want to restrict this ability. This feature flag allows an admin to disable the ability for users to create personal organizations.

#### 

[​

](#configuration-3)

Configuration

The `personalOrgsDisabled` feature flag is set to `true` by default for organizations using [basic auth](/langsmith/self-host-basic-auth) or [SSO](/langsmith/self-host-sso).

Helm

Docker

Copy

```
config:
  personalOrgsDisabled: true
```

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/self-host-user-management.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.