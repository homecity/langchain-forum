---
title: "Create an Ingress for installations (Kubernetes)"
url: "https://docs.langchain.com/langsmith/self-host-ingress"
section: "langsmith"
last_modified: "2026-01-08T16:42:32.422Z"
---
By default, LangSmith will provision a LoadBalancer service for the `langsmith-frontend`. Depending on your cloud provider, this may result in a public IP address being assigned to the service. If you would like to use a custom domain or have more control over the routing of traffic to your LangSmith installation, you can configure an Ingress, Gateway API, or Istio Gateway.

## 

[​

](#requirements)

Requirements

-   An existing Kubernetes cluster
-   One of the following installed in your Kubernetes cluster:
    -   An Ingress Controller (for standard Ingress)
    -   Gateway API CRDs and a Gateway resource (for Gateway API)
    -   Istio (for Istio Gateway)

## 

[​

](#parameters)

Parameters

You may need to provide certain parameters to your LangSmith installation to configure the Ingress. Additionally, we will want to convert the `langsmith-frontend` service to a ClusterIP service.

-   _Hostname (optional)_: The hostname that you would like to use for your LangSmith installation. E.g `"langsmith.example.com"`. If you leave this empty, the ingress will serve all traffic to the LangSmith installation.
-   _BasePath (optional)_: If you would like to serve LangSmith under a URL basePath, you can specify it here. For example, adding `"langsmith"` will serve the application at `"example.hostname.com/langsmith"`. This will apply to UI paths as well as API endpoints.
-   _IngressClassName (optional)_: The name of the Ingress class that you would like to use. If not set, the default Ingress class will be used.
-   _Annotations (optional)_: Additional annotations to add to the Ingress. Certain providers like AWS may use annotations to control things like TLS termination. For example, you can add the following annotations using the AWS ALB Ingress Controller to attach an ACM certificate to the Ingress:
    
    Copy
    
    ```
    annotations:
      alb.ingress.kubernetes.io/certificate-arn: "<your-certificate-arn>"
    ```
    
-   _Labels (optional)_: Additional labels to add to the Ingress.
-   _TLS (optional)_: If you would like to serve LangSmith over HTTPS, you can add TLS configuration here (many Ingress controllers may have other ways of controlling TLS so this is often not needed). This should be an array of TLS configurations. Each TLS configuration should have the following fields:
    -   hosts: An array of hosts that the certificate should be valid for. E.g \[“langsmith.example.com”\]
    -   secretName: The name of the Kubernetes secret that contains the certificate and private key. This secret should have the following keys:
        -   tls.crt: The certificate
        -   tls.key: The private key
    -   You can read more about creating a TLS secret [here](https://kubernetes.io/do/langsmith/observability-concepts/services-networking/ingress/#tls).

## 

[​

](#configuration)

Configuration

You can configure your LangSmith instance to use one of three routing options: standard Ingress, Gateway API, or Istio Gateway. Choose the option that best fits your infrastructure.

### 

[​

](#option-1:-standard-ingress)

Option 1: Standard ingress

With these parameters in hand, you can configure your LangSmith instance to use an Ingress. You can do this by modifying the `config.yaml` file for your LangSmith Helm Chart installation.

Copy

```
config:
  hostname: "" # Main domain for LangSmith
  basePath: "" # If you want to serve langsmith under a URL base path (e.g., /langsmith)
ingress:
  enabled: true
  hostname: "" # Deprecated: Use config.hostname instead after v0.12.0
  subdomain: "" # Deprecated: Use config.hostname instead after v0.12.0
  ingressClassName: "" # If not set, the default ingress class will be used
  annotations: {} # Add annotations here if needed
  labels: {} # Add labels here if needed
  tls: [] # Add TLS configuration here if needed
frontend:
  service:
    type: ClusterIP
```

Once configured, you will need to update your LangSmith installation. If everything is configured correctly, your LangSmith instance should now be accessible via the Ingress. You can run the following to check the status of your Ingress:

Copy

```
kubectl get ingress
```

You should see something like this in the output:

Copy

```
NAME                         CLASS   HOSTS    ADDRESS          PORTS     AGE
langsmith-ingress            nginx   <host>   35.227.243.203   80, 443   95d
```

If you do not have automated DNS setup, you will need to add the IP address to your DNS provider manually.

### 

[​

](#option-2:-gateway-api)

Option 2: Gateway API

Gateway API support is available as of LangSmith v0.12.0

If your cluster uses the [Kubernetes Gateway API](https://gateway-api.sigs.k8s.io/), you can configure LangSmith to provision HTTPRoute resources. This will create an HTTPRoute for LangSmith and an HTTPRoute for each [agent deployment](/langsmith/deployments).

#### 

[​

](#parameters-2)

Parameters

-   _name (required)_: The name of the Gateway resource to reference
-   _namespace (required)_: The namespace where the Gateway resource is located
-   _hostname (optional)_: The hostname that you would like to use for your LangSmith installation. E.g `"langsmith.example.com"`
-   _basePath (optional)_: If you would like to serve LangSmith under a base path, you can specify it here. E.g “example.com/langsmith”
-   _sectionName (optional)_: The name of a specific listener section in the Gateway to use
-   _annotations (optional)_: Additional annotations to add to the HTTPRoute resources
-   _labels (optional)_: Additional labels to add to the HTTPRoute resources

#### 

[​

](#configuration-2)

Configuration

Copy

```
config:
  hostname: "" # Main domain for LangSmith
  basePath: "" # If you want to serve langsmith under a base path. E.g "example.com/langsmith"
gateway:
  enabled: true
  name: "my-gateway" # Name of your Gateway resource
  namespace: "gateway-system" # Namespace of your Gateway resource
  sectionName: "" # Optional: specific listener section name
  annotations: {} # Add annotations here if needed
  labels: {} # Add labels here if needed
frontend:
  service:
    type: ClusterIP
```

Once configured, you can check the status of your HTTPRoutes:

Copy

```
kubectl get httproute
```

### 

[​

](#option-3:-istio-gateway)

Option 3: Istio Gateway

Istio Gateway support is available as of LangSmith v0.12.0

If your cluster uses [Istio](https://istio.io/), you can configure LangSmith to provision VirtualService resources. This will create a VirtualService for LangSmith and a VirtualService for each [agent deployment](/langsmith/deployments).

#### 

[​

](#parameters-3)

Parameters

-   _name (optional)_: The name of the Istio Gateway resource to reference. Defaults to `"istio-gateway"`
-   _namespace (optional)_: The namespace where the Istio Gateway resource is located. Defaults to `"istio-system"`
-   _hostname (optional)_: The hostname that you would like to use for your LangSmith installation. E.g `"langsmith.example.com"`
-   _basePath (optional)_: If you would like to serve LangSmith under a base path, you can specify it here. E.g “example.com/langsmith”
-   _annotations (optional)_: Additional annotations to add to the VirtualService resources
-   _labels (optional)_: Additional labels to add to the VirtualService resources

#### 

[​

](#configuration-3)

Configuration

Copy

```
config:
  hostname: "" # Main domain for LangSmith
  basePath: "" # If you want to serve langsmith on a separate basePath. E.g "example.com/langsmith"
istioGateway:
  enabled: true
  name: "istio-gateway" # Name of your Istio Gateway resource
  namespace: "istio-system" # Namespace of your Istio Gateway resource
  annotations: {} # Add annotations here if needed
  labels: {} # Add labels here if needed
frontend:
  service:
    type: ClusterIP
```

Once configured, you can check the status of your VirtualServices:

Copy

```
kubectl get virtualservice
```

* * *

[Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/langsmith/self-host-ingress.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).

[Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.