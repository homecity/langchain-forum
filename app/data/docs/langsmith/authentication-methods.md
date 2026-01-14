---
title: "Authentication methods"
url: "https://docs.langchain.com/langsmith/authentication-methods"
section: "langsmith"
last_modified: "2026-01-08T16:42:32.175Z"
---
LangSmith supports multiple authentication methods for easy sign-up and login.

## 

[​

](#cloud)

Cloud

### 

[​

](#email/password)

Email/Password

Users can use an email address and password to sign up and login to LangSmith.

### 

[​

](#social-providers)

Social providers

Users can alternatively use their credentials from GitHub or Google.

### 

[​

](#saml-sso)

SAML SSO

Enterprise customers can configure [SAML SSO](/langsmith/user-management) and [SCIM](/langsmith/user-management)

## 

[​

](#self-hosted)

Self-Hosted

Self-hosted customers have more control over how their users can login to LangSmith. For more in-depth coverage of configuration options, see [the self-hosting docs](/langsmith/self-hosted) and [Helm chart](https://github.com/langchain-ai/helm/tree/main/charts/langsmith).

### 

[​

](#sso-with-oauth-2-0-and-oidc)

SSO with OAuth 2.0 and OIDC

Production installations should configure SSO in order to use an external identity provider. This enables users to login through an identity platform like Auth0/Okta. LangSmith supports almost any OIDC-compliant provider. Learn more about configuring SSO in the [SSO configuration guide](/langsmith/self-host-sso)

### 

[​

](#email/password-a-k-a-basic-auth)

Email/Password a.k.a. basic auth

This auth method requires very little configuration as it does not require an external identity provider. It is most appropriate to use for self-hosted trials. Learn more in the [basic auth configuration guide](/langsmith/self-host-basic-auth)

### 

[​

](#none)

None

This authentication mode will be removed after the launch of Basic Auth.

If zero authentication methods are enabled, a self-hosted installation does not require any login/sign-up. This configuration should only be used for verifying installation at the infrastructure level, as the feature set supported in this mode is restricted with only a single organization and workspace.

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/authentication-methods.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.