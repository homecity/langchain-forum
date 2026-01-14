---
title: "Connect to an external PostgreSQL database"
url: "https://docs.langchain.com/langsmith/self-host-external-postgres"
section: "langsmith"
last_modified: "2026-01-08T16:42:32.362Z"
---
LangSmith uses a PostgreSQL database as the primary data store for transactional workloads and operational data (almost everything besides runs). By default, LangSmith Self-Hosted will use an internal PostgreSQL database. However, you can configure LangSmith to use an external PostgreSQL database. By configuring an external PostgreSQL database, you can more easily manage backups, scaling, and other operational tasks for your database.

## 

[​

](#requirements)

Requirements

-   A provisioned PostgreSQL database that your LangSmith instance will have network access to. We recommend using a managed PostgreSQL service like:
    -   [Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html)
    -   [Google Cloud SQL](https://cloud.google.com/curated-resources/cloud-sql#section-1)
    -   [Azure Database for PostgreSQL](https://azure.microsoft.com/en-us/products/postgresql#features)
-   Note: We only officially support PostgreSQL versions >= 14.
-   We support password and [IAM/Workload Identity](#iam-authentication) authentication.
-   A user with admin access to the PostgreSQL database. This user will be used to create the necessary tables, indexes, and schemas.
-   This user will also need to have the ability to create extensions in the database. We use/will try to install the `btree_gin`, `btree_gist`, `pgcrypto`, `citext`, `ltree`, and `pg_trgm` extensions.
-   If using a schema other than public, ensure that you do not have any other schemas with the extensions enabled, or you must include that in your search path.
-   Support for pgbouncer and other connection poolers is community-based. Community members have reported that pgbouncer has worked with `pool_mode` = `session` and a suitable setting for `ignore_startup_parameters` (as of writing, `search_path` and `lock_timeout` need to be ignored). Care is needed to avoid polluting connection pools; some level of PostgreSQL expertise is advisable. LangChain Inc currently does not have roadmap plans for formal test coverage or commercial support of pgbouncer or amazon rds proxy or any other poolers, but the community is welcome to discuss and collaborate on support through GitHub issues.
-   By default, we recommend an instance with **at least 2 vCPUs and 8GB of memory**. However, the actual requirements will depend on your workload and the number of users you have. We recommend monitoring your PostgreSQL instance and scaling up as needed.

## 

[​

](#connection-string)

Connection string

You will need to provide a connection string to your PostgreSQL database. This connection string should include the following information:

-   Host
-   Port
-   Database
-   Username
-   Password (Make sure to url encode this if there are any special characters) - **Note:** When using IAM authentication, the password is not required in the connection string. More below.
-   URL params

This will take the form of:

Copy

```
username:password@host:port/database?<url_params>
```

An example connection string might look like:

Copy

```
myuser:mypassword@myhost:5432/mydatabase?sslmode=disable
```

Without url parameters, the connection string would look like:

Copy

```
myuser:mypassword@myhost:5432/mydatabase
```

For IAM authentication, omit the password and use the identity name as the username:

Copy

```
my-workload-identity@myhost:5432/mydatabase?sslmode=require
```

## 

[​

](#configuration)

Configuration

With your connection string in hand, you can configure your LangSmith instance to use an external PostgreSQL database. You can do this by modifying the `values` file for your LangSmith Helm Chart installation or the `.env` file for your Docker installation.

Helm

Docker

Copy

```
postgres:
  external:
    enabled: true
    connectionUrl: "Your connection url"
```

Once configured, you should be able to reinstall your LangSmith instance. If everything is configured correctly, your LangSmith instance should now be using your external PostgreSQL database.

## 

[​

](#tls-with-postgresql)

TLS with PostgreSQL

Use this section to configure TLS for PostgreSQL connections. For mounting internal/public CAs so LangSmith trusts your PostgreSQL server certificate, see [Configure custom TLS certificates](/langsmith/self-host-custom-tls-certificates#mount-internal-cas-for-tls).

### 

[​

](#server-tls-one-way)

Server TLS (one-way)

To validate the PostgreSQL server certificate:

-   Provide a CA bundle using `config.customCa.secretName` and `config.customCa.secretKey`.
-   Use `sslmode=require` or `sslmode=verify-full`, as well as `sslrootcert=system` to your connection URL.

Mount a custom CA only when your PostgreSQL server uses an internal or private CA. Publicly trusted CAs do not require this configuration.

Helm (server TLS)

Kubernetes Secret (CA bundle)

Copy

```
config:
  customCa:
    secretName: "langsmith-custom-ca"  # Secret containing your CA bundle
    secretKey: "ca.crt"    # Key in the Secret with the CA bundle
postgres:
  external:
    enabled: true
    connectionUrl: "myuser:mypassword@myhost:5432/mydatabase?sslmode=verify-full&sslrootcert=system"
    customTls: true
```

### 

[​

](#mutual-tls-with-client-auth-mtls)

Mutual TLS with client auth (mTLS)

As of LangSmith helm chart version **0.12.29**, we support mTLS for PostgreSQL clients. For server-side authentication in mTLS, use the [Server TLS steps](#server-tls-one-way) (custom CA) in addition to the following client certificate configuration. If your PostgreSQL server requires client certificate authentication:

-   Provide a Secret with your client certificate and key.
-   Reference it via `postgres.external.clientCert.secretName` and specify the keys with `certSecretKey` and `keySecretKey`.
-   Use `sslmode=verify-full` and `sslrootcert=system` in your connection URL.

Helm (client Auth)

Kubernetes Secret (client cert/key)

Copy

```
postgres:
  external:
    enabled: true
    connectionUrl: "myuser:mypassword@myhost:5432/mydatabase?sslmode=verify-full&sslrootcert=system"
    customTls: true
    clientCert:
      secretName: "postgres-mtls-secret"
      certSecretKey: "tls.crt"
      keySecretKey: "tls.key"
```

#### 

[​

](#pod-security-context-for-certificate-volumes)

Pod security context for certificate volumes

The certificate volumes mounted for mTLS are protected by file access restrictions. To ensure all LangSmith pods can read the certificate files, you must set `fsGroup: 1000` in the pod security context. You can configure this in one of two ways: **Option 1: Use `commonPodSecurityContext`** Set the `fsGroup` at the top level to apply it to all pods:

Copy

```
commonPodSecurityContext:
  fsGroup: 1000
```

**Option 2: Add to individual pod security contexts** If you need more granular control, add the `fsGroup` to each pod’s security context individually. See the [mTLS configuration example](https://github.com/langchain-ai/helm/blob/main/charts/langsmith/examples/mtls_config.yaml) for a complete reference.

## 

[​

](#iam-authentication)

IAM authentication

As of LangSmith helm chart version **0.12.34**, we support IAM authentication for PostgreSQL. This allows you to use cloud provider workload identity instead of static passwords.

### 

[​

](#supported-providers)

Supported providers

Provider

Database Service

Documentation

AWS

RDS PostgreSQL

[IAM database authentication](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html)

GCP

Cloud SQL

[IAM authentication](https://cloud.google.com/sql/docs/postgres/iam-authentication)

Azure

Azure Database for PostgreSQL

[Microsoft Entra authentication](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-azure-ad-authentication)

### 

[​

](#prerequisites)

Prerequisites

IAM authentication only handles connection authentication. You may still need to run SQL commands in your database to create the IAM user/role and grant it the necessary permissions and privileges to access the LangSmith schema.

1.  **Configure workload identity** in your Kubernetes cluster. See your cloud provider’s documentation:
    -   [AWS IRSA](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) or [EKS Pod Identity](https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html)
    -   [GCP Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity)
    -   [Azure Workload Identity](https://learn.microsoft.com/en-us/azure/aks/workload-identity-overview)
2.  **Enable IAM authentication** on your PostgreSQL instance and grant access to your workload identity. Refer to your cloud provider’s documentation linked above.
3.  **Annotate your Kubernetes ServiceAccounts and Deployments/Jobs** with the workload identity binding per your cloud provider’s requirements.

### 

[​

](#configuration-2)

Configuration

If you switch to a new IAM user after LangSmith has already run initial migrations, you may need to transfer ownership of existing tables to the new IAM user. Otherwise, migrations may fail due to insufficient privileges on tables owned by the previous user.

To enable IAM authentication, set the `iamAuthProvider` field and use an IAM-compatible connection string (without password):

Helm

Copy

```
postgres:
  external:
    enabled: true
    existingSecretName: "postgres-secret"
    iamAuthProvider: "azure"  # or "gcp" or "aws"
```

Kubernetes Secret

Copy

```
apiVersion: v1
kind: Secret
metadata:
  name: postgres-secret
type: Opaque
stringData:
  # IAM connection URL - note no password, username is the identity name
  connection_url: "<identity-name>@<host>:5432/<database>?sslmode=require"
```

IAM authentication requires TLS. You must include `sslmode=require` in your connection string.

### 

[​

](#required-annotations)

Required annotations

You must apply the ServiceAccount annotations and pod labels required by your cloud provider’s workload identity to all LangSmith components that connect to PostgreSQL. This includes: **Deployments:** `backend`, `queue`, `platformBackend`, `hostBackend` **Jobs:** `migrations`, `authBootstrap`, `feedbackConfigMigration`, `feedbackDataMigration`, `e2eTest`

All jobs listed above (except `e2eTest`) use the `backend` service account. For these jobs, you only need to configure pod labels if your cloud provider requires them (e.g., Azure requires `azure.workload.identity/use: "true"` on pods). The `e2eTest` job uses its own service account and requires separate annotation configuration.

Example for the backend service (repeat for other services listed above):

AWS

GCP

Azure

Copy

```
backend:
  serviceAccount:
    annotations:
      eks.amazonaws.com/role-arn: "arn:aws:iam::<account-id>:role/<role-name>"
...
```

See the [Helm values reference](https://github.com/langchain-ai/helm/blob/main/charts/langsmith/values.yaml) for the full list of configurable services and their annotation/label options.

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/self-host-external-postgres.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.