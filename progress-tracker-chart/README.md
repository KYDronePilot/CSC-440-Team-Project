# College Progress Tracker Helm Chart
A Helm chart for deploying the progress tracker application

## Configuration
Before installing the chart, a private values file should be created. This can be accomplished using `-f` flags when
installing the chart, but saving everything in a file makes it much easier to maintain, especially when upgrading.

A template file is provided in the same directory, `private_values_tpl.yaml` with comments explaining what should be set
for each value.

## Installation
First of all, you need to have a working Kubernetes cluster with Helm/tiller installed. You will also need to have
`kubectl` setup to access the cluster from the machine you will be using to install the chart.

### Cert Manager
This chart depends on `cert-manager`, a Helm chart for managing certificates. That installation requires extra steps
discussed [here](https://docs.cert-manager.io/en/latest/getting-started/install/kubernetes.html).

If you already have cert manager set up with an issuer, you can disable the automatic letsencrypt issuer which comes
with the chart.

### Ingress
This chart also uses Nginx ingress to route traffic to the application. If you already have ingress setup, you can skip
this section.

Ingress can easily be installed using Helm with the following commands:

```bash
kubectl create namespace ingress
helm install stable/nginx-ingress --namespace ingress --set controller.publishService.enabled=true
```

The namespace part is optional; it could just as well be installed into the current namespace without any issues. The
`--set controller.publishService.enabled=true` option allows you to access the load balancer IP from the ingress
resource.

### Main Chart
Before installing
