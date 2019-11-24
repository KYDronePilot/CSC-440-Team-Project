# College Progress Tracker Helm Chart
A Helm chart for deploying the progress tracker application

## Configuration
Before installing the chart, a custom `private_values.yaml` file should be created from the template
`private_values.tpl.yaml` file. The contents should reflect your own setup environment.

## Dependencies
This chart has the following non-bundled dependencies:
 - Helm
 - Cert Manager
 - Ingress

### Helm
**Note: Helm version 3+ is required**

To install the helm client to your machine, follow the instructions [here](https://helm.sh/docs/intro/install/).

### Cert Manager
**Note: Some of the commands on the cert manager site may need to be adjusted to work with Helm 3+**

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

helm install stable/nginx-ingress --set controller.publishService.enabled=true --generate-name --namespace ingress
```

Creating a separate namespace is not required, just a matter of preference.

### Download Dependencies
To download the chart dependencies, run `helm dependency update`. This will need to be run only on the first install and
not again till the dependency version is updated.

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

## Generate Example Data
To test out the application and see how it works, there is a Django manage.py command `create_dummy_data` which
generates example data. This should only be run once after installation since the postgresql PVC remains even when the
chart is deleted. If the PVC is ever deleted, the command should be run again.

To run this command, first find the name of one of the application pods (doesn't matter which one if multiple replicas
are configured):
```bash
kubectl get pods -n <deployment namespace>
```

The pod name(s) should look something like `progress-tracker-progress-tracker-chart-*`, but can vary depending on
deployment name.

Once you have a pod name, run the following command, substituting in the pod name and deployment namespace.
```bash
kubectl exec <pod name> --container csc-440-backend python3.7 /src/manage.py create_dummy_data -n <deployment namespace>
```

You should now be able to login to the example account:
 - Username: william.smith
 - Password: somereallyreallysecurepassword

**Note**: Before running in production, the chart and postgresql PVC should be deleted to purge the example accounts and
other information.
