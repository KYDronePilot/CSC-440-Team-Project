# College Progress Tracker Helm Chart
A Helm chart for deploying the progress tracker application

## Configuration
Before installing the chart, a custom private values file should be created from the template
`private_values.tpl.yaml` file. The contents should reflect your own setup environment.

## Dependencies
This chart has the following non-bundled dependencies:
 - Helm/Tiller
 - Cert Manager
 - Ingress

### Helm/Tiller
To install the helm client to your machine, following the instructions [here](https://helm.sh/docs/intro/install/).

Once the Helm client is installed, install Tiller (the server-side component of Helm) by running the following commands:
```bash
kubectl -n kube-system create serviceaccount tiller

kubectl create clusterrolebinding tiller \
  --clusterrole=cluster-admin \
  --serviceaccount=kube-system:tiller

helm init --service-account tiller
```

More information can be found [here](https://rancher.com/docs/rancher/v2.x/en/installation/ha/helm-init/).

### Cert Manager
Cert manager is used for managing cluster certificates. Specifically in this application, it is used for automatically
obtaining and setting up letsencrypt certs. To install, follow the Helm installation instructions
[here](https://docs.cert-manager.io/en/latest/getting-started/install/kubernetes.html#steps).

Once installed, do **not** configure a new issuer. This chart will do it for you.

### Ingress
Ingress is used for routing network traffic to the application.

To install with Helm, use the following commands:
```bash
# Create a separate namespace to create the controller in
kubectl create namespace ingress

helm install stable/nginx-ingress --set controller.publishService.enabled=true --namespace ingress
```

Creating a separate namespace is not required, just a matter of preference.

## Install, Upgrade, and Clean
A Makefile is provided to simplify the chart installation management tasks. Before installing, check the Makefile and
override any user-defined variables as needed. For instance, to install into a different namespace:
```bash
make install -e NAMESPACE=some-namespace
```

### Main Make Targets
 - install: Install the chart
 - upgrade: Upgrade the chart installation
 - clean: Delete and purge the chart (does not delete postgresql PVCs)
