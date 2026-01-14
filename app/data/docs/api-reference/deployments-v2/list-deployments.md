---
title: "List Deployments"
url: "https://docs.langchain.com/api-reference/deployments-v2/list-deployments"
section: "api-reference/deployments-v2"
last_modified: "2026-01-08T04:05:34.682Z"
---
 

[Skip to main content](#content-area)

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

LangSmith

Search...

⌘K

-   [Support](https://support.langchain.com/)
-   [GitHub](https://github.com/langchain-ai)
-   [Try LangSmith](https://smith.langchain.com/)
-   [
    
    Try LangSmith
    
    ](https://smith.langchain.com/)

Search...

Navigation

Deployments (v2)

List Deployments

[Get started

](/langsmith/home)[Observability

](/langsmith/observability)[Evaluation

](/langsmith/evaluation)[Prompt engineering

](/langsmith/prompt-engineering)[Deployment

](/langsmith/deployments)[Platform setup

](/langsmith/platform-setup)[Reference

](/langsmith/reference)

-   [
    
    Overview
    
    
    
    ](/langsmith/reference)

-   [
    
    LangSmith Python SDK
    
    
    
    ](https://reference.langchain.com/python/langsmith/observability/sdk/)

-   [
    
    LangSmith JS/TS SDK
    
    
    
    ](https://reference.langchain.com/javascript/modules/langsmith.html)

-   [
    
    LangGraph Python SDK
    
    
    
    ](https://reference.langchain.com/python/langgraph/)

-   [
    
    LangGraph JS/TS SDK
    
    
    
    ](https://reference.langchain.com/javascript/modules/_langchain_langgraph-sdk.html)

-   [
    
    LangSmith API
    
    
    
    ](https://api.smith.langchain.com/redoc)

##### LangSmith Deployment

-   Agent Server API
    
-   Control Plane API
    
    -   [
        
        Overview
        
        
        
        ](/langsmith/api-ref-control-plane)
    -   Integrations (v1)
        
    -   Deployments (v2)
        
        -   [GET
            
            List Deployments
            
            
            
            ](/api-reference/deployments-v2/list-deployments)
        -   [POST
            
            Create Deployment
            
            
            
            ](/api-reference/deployments-v2/create-deployment)
        -   [GET
            
            Get Deployment
            
            
            
            ](/api-reference/deployments-v2/get-deployment)
        -   [DEL
            
            Delete Deployment
            
            
            
            ](/api-reference/deployments-v2/delete-deployment)
        -   [PATCH
            
            Patch Deployment
            
            
            
            ](/api-reference/deployments-v2/patch-deployment)
        -   [GET
            
            List Revisions
            
            
            
            ](/api-reference/deployments-v2/list-revisions)
        -   [GET
            
            Get Revision
            
            
            
            ](/api-reference/deployments-v2/get-revision)
        -   [POST
            
            Redeploy Revision
            
            
            
            ](/api-reference/deployments-v2/redeploy-revision)
    -   Listeners (v2)
        
    -   Auth Service (v2)
        
-   [
    
    LangGraph CLI
    
    
    
    ](/langsmith/cli)
-   [
    
    RemoteGraph
    
    
    
    ](https://reference.langchain.com/python/langsmith/deployment/remote_graph/)
-   [
    
    Agent Server environment variables
    
    
    
    ](/langsmith/env-var)

##### Releases

-   [
    
    Agent Server changelog
    
    
    
    ](/langsmith/agent-server-changelog)
-   [
    
    Self-hosted changelog
    
    
    
    ](/langsmith/self-hosted-changelog)
-   [
    
    Release versions
    
    
    
    ](/langsmith/release-versions)

List Deployments

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/v2/deployments
```

200

422

Copy

```
{
  "resources": [
    {
      "name": "<string>",
      "source": "github",
      "source_config": {
        "integration_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
        "repo_url": "<string>",
        "deployment_type": "dev_free",
        "build_on_push": true,
        "custom_url": "<string>",
        "resource_spec": {
          "min_scale": 123,
          "max_scale": 123,
          "cpu": 123,
          "cpu_limit": 123,
          "memory_mb": 123,
          "memory_limit_mb": 123,
          "queue_min_scale": 123,
          "queue_max_scale": 123,
          "queue_cpu": 123,
          "queue_cpu_limit": 123,
          "queue_memory_mb": 123,
          "queue_memory_limit_mb": 123,
          "orchestrator_cpu": 123,
          "orchestrator_cpu_limit": 123,
          "orchestrator_memory_mb": 123,
          "orchestrator_memory_limit_mb": 123,
          "orchestrator_min_scale": 123,
          "orchestrator_max_scale": 123,
          "executor_cpu": 123,
          "executor_cpu_limit": 123,
          "executor_memory_mb": 123,
          "executor_memory_limit_mb": 123,
          "redis_memory_mb": 123,
          "labels": {},
          "annotations": {},
          "service_account_name": "<string>",
          "image_pull_secrets": [
            {
              "name": "<string>"
            }
          ],
          "volumes": [
            {
              "name": "<string>",
              "configMap": {},
              "secret": {},
              "emptyDir": {},
              "persistentVolumeClaim": {},
              "nfs": {},
              "projected": {},
              "downwardAPI": {},
              "csi": {}
            }
          ],
          "volume_mounts": [
            {
              "name": "<string>",
              "mountPath": "<string>",
              "subPath": "<string>",
              "mountPropagation": "<string>",
              "readOnly": true,
              "subPathExpr": "<string>"
            }
          ],
          "init_containers": [
            {
              "name": "<string>",
              "image": "<string>",
              "imagePullPolicy": "<string>",
              "command": [
                "<string>"
              ],
              "args": [
                "<string>"
              ],
              "workingDir": "<string>",
              "env": [
                {
                  "name": "<string>",
                  "value": "<string>",
                  "valueFrom": {}
                }
              ],
              "envFrom": [
                {}
              ],
              "resources": {
                "limits": {},
                "requests": {}
              },
              "volumeMounts": [
                {
                  "name": "<string>",
                  "mountPath": "<string>",
                  "subPath": "<string>",
                  "mountPropagation": "<string>",
                  "readOnly": true,
                  "subPathExpr": "<string>"
                }
              ],
              "securityContext": {},
              "restartPolicy": "<string>"
            }
          ],
          "sidecars": [
            {
              "name": "<string>",
              "image": "<string>",
              "imagePullPolicy": "<string>",
              "command": [
                "<string>"
              ],
              "args": [
                "<string>"
              ],
              "workingDir": "<string>",
              "env": [
                {
                  "name": "<string>",
                  "value": "<string>",
                  "valueFrom": {}
                }
              ],
              "envFrom": [
                {}
              ],
              "resources": {
                "limits": {},
                "requests": {}
              },
              "volumeMounts": [
                {
                  "name": "<string>",
                  "mountPath": "<string>",
                  "subPath": "<string>",
                  "mountPropagation": "<string>",
                  "readOnly": true,
                  "subPathExpr": "<string>"
                }
              ],
              "securityContext": {},
              "restartPolicy": "<string>"
            }
          ],
          "db_cpu": 123,
          "db_cpu_limit": 123,
          "db_memory_mb": 123,
          "db_memory_limit_mb": 123,
          "db_storage_gi": 123,
          "db_max_connections": 123
        },
        "listener_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
        "listener_config": {
          "k8s_namespace": "<string>"
        },
        "install_command": "<string>",
        "build_command": "<string>"
      },
      "source_revision_config": {
        "repo_ref": "<string>",
        "langgraph_config_path": "<string>",
        "image_uri": "<string>",
        "repo_commit_sha": "<string>"
      },
      "secrets": [
        {
          "name": "<string>",
          "value": "<string>"
        }
      ],
      "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "created_at": "2023-11-07T05:31:56Z",
      "updated_at": "2023-11-07T05:31:56Z",
      "status": "AWAITING_DATABASE",
      "latest_revision_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "active_revision_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "image_version": "<string>"
    }
  ],
  "offset": 123
}
```

[LangSmith Deployment](/langsmith/server-api-ref)

[Control Plane API](/langsmith/api-ref-control-plane)

[Deployments (v2)](/api-reference/deployments-v2/list-deployments)

# List Deployments

Copy page

List all deployments.

Copy page

GET

/

v2

/

deployments

Try it

List Deployments

cURL

Copy

```
curl --request GET \
  --url https://api.example.com/v2/deployments
```

200

422

Copy

```
{
  "resources": [
    {
      "name": "<string>",
      "source": "github",
      "source_config": {
        "integration_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
        "repo_url": "<string>",
        "deployment_type": "dev_free",
        "build_on_push": true,
        "custom_url": "<string>",
        "resource_spec": {
          "min_scale": 123,
          "max_scale": 123,
          "cpu": 123,
          "cpu_limit": 123,
          "memory_mb": 123,
          "memory_limit_mb": 123,
          "queue_min_scale": 123,
          "queue_max_scale": 123,
          "queue_cpu": 123,
          "queue_cpu_limit": 123,
          "queue_memory_mb": 123,
          "queue_memory_limit_mb": 123,
          "orchestrator_cpu": 123,
          "orchestrator_cpu_limit": 123,
          "orchestrator_memory_mb": 123,
          "orchestrator_memory_limit_mb": 123,
          "orchestrator_min_scale": 123,
          "orchestrator_max_scale": 123,
          "executor_cpu": 123,
          "executor_cpu_limit": 123,
          "executor_memory_mb": 123,
          "executor_memory_limit_mb": 123,
          "redis_memory_mb": 123,
          "labels": {},
          "annotations": {},
          "service_account_name": "<string>",
          "image_pull_secrets": [
            {
              "name": "<string>"
            }
          ],
          "volumes": [
            {
              "name": "<string>",
              "configMap": {},
              "secret": {},
              "emptyDir": {},
              "persistentVolumeClaim": {},
              "nfs": {},
              "projected": {},
              "downwardAPI": {},
              "csi": {}
            }
          ],
          "volume_mounts": [
            {
              "name": "<string>",
              "mountPath": "<string>",
              "subPath": "<string>",
              "mountPropagation": "<string>",
              "readOnly": true,
              "subPathExpr": "<string>"
            }
          ],
          "init_containers": [
            {
              "name": "<string>",
              "image": "<string>",
              "imagePullPolicy": "<string>",
              "command": [
                "<string>"
              ],
              "args": [
                "<string>"
              ],
              "workingDir": "<string>",
              "env": [
                {
                  "name": "<string>",
                  "value": "<string>",
                  "valueFrom": {}
                }
              ],
              "envFrom": [
                {}
              ],
              "resources": {
                "limits": {},
                "requests": {}
              },
              "volumeMounts": [
                {
                  "name": "<string>",
                  "mountPath": "<string>",
                  "subPath": "<string>",
                  "mountPropagation": "<string>",
                  "readOnly": true,
                  "subPathExpr": "<string>"
                }
              ],
              "securityContext": {},
              "restartPolicy": "<string>"
            }
          ],
          "sidecars": [
            {
              "name": "<string>",
              "image": "<string>",
              "imagePullPolicy": "<string>",
              "command": [
                "<string>"
              ],
              "args": [
                "<string>"
              ],
              "workingDir": "<string>",
              "env": [
                {
                  "name": "<string>",
                  "value": "<string>",
                  "valueFrom": {}
                }
              ],
              "envFrom": [
                {}
              ],
              "resources": {
                "limits": {},
                "requests": {}
              },
              "volumeMounts": [
                {
                  "name": "<string>",
                  "mountPath": "<string>",
                  "subPath": "<string>",
                  "mountPropagation": "<string>",
                  "readOnly": true,
                  "subPathExpr": "<string>"
                }
              ],
              "securityContext": {},
              "restartPolicy": "<string>"
            }
          ],
          "db_cpu": 123,
          "db_cpu_limit": 123,
          "db_memory_mb": 123,
          "db_memory_limit_mb": 123,
          "db_storage_gi": 123,
          "db_max_connections": 123
        },
        "listener_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
        "listener_config": {
          "k8s_namespace": "<string>"
        },
        "install_command": "<string>",
        "build_command": "<string>"
      },
      "source_revision_config": {
        "repo_ref": "<string>",
        "langgraph_config_path": "<string>",
        "image_uri": "<string>",
        "repo_commit_sha": "<string>"
      },
      "secrets": [
        {
          "name": "<string>",
          "value": "<string>"
        }
      ],
      "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "created_at": "2023-11-07T05:31:56Z",
      "updated_at": "2023-11-07T05:31:56Z",
      "status": "AWAITING_DATABASE",
      "latest_revision_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "active_revision_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "image_version": "<string>"
    }
  ],
  "offset": 123
}
```

#### Query Parameters

[​

](#parameter-limit)

limit

integer

default:20

Maximum number of resources to return.

Required range: `1 <= x <= 100`

[​

](#parameter-offset)

offset

integer

default:0

Pagination offset. Pass this value to subsequent requests to fetch the next page of resources.

Required range: `x >= 0`

[​

](#parameter-one-of-0)

name\_contains

string | null

Name of the deployment to filter by.

[​

](#parameter-one-of-0)

status

string | null

`status` of the deployment to filter by.

[​

](#parameter-one-of-0)

remote\_reconciled

boolean | null

Flag to filter by remote reconciled deployments.

[​

](#parameter-one-of-0)

tag\_value\_ids

string | null

Comma separated list of tag value IDs of the deployment to filter by.

[​

](#parameter-one-of-0)

image\_version

string | null

Image version to filter by.

[​

](#parameter-one-of-0)

deployment\_type

enum<string> | null

Deployment type to filter by.

Available options:

`dev_free`,

`dev`,

`prod`

[​

](#parameter-one-of-0)

deployment\_ids

string | null

Comma separated list of deployment IDs to filter by.

#### Response

200

application/json

Successful Response

[​

](#response-resources)

resources

Deployment · object\[\]

required

Show child attributes

[​

](#response-offset)

offset

integer

required

Pagination offset. Pass this value to subsequent requests to fetch the next page.

Was this page helpful?

YesNo

[

List GitHub Repositories

Previous



](/api-reference/integrations-v1/list-github-repositories)[

Create Deployment

Next



](/api-reference/deployments-v2/create-deployment)

⌘I

[Docs by LangChain home page![light logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-teal.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=16111530672bf976cb54ef2143478342)![dark logo](https://mintcdn.com/langchain-5e9cc07a/Xbr8HuVd9jPi6qTU/images/brand/langchain-docs-lilac.svg?fit=max&auto=format&n=Xbr8HuVd9jPi6qTU&q=85&s=b70fb1a2208670492ef94aef14b680be)](/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

Resources

[Forum](https://forum.langchain.com/)[Changelog](https://changelog.langchain.com/)[LangChain Academy](https://academy.langchain.com/)[Trust Center](https://trust.langchain.com/)

Company

[About](https://langchain.com/about)[Careers](https://langchain.com/careers)[Blog](https://blog.langchain.com/)

[github](https://github.com/langchain-ai)[x](https://x.com/LangChain)[linkedin](https://www.linkedin.com/company/langchain/)[youtube](https://www.youtube.com/@LangChain)

[Powered by](https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral&utm_source=langchain-5e9cc07a)