SHELL := /bin/bash
# Makefile for running common Helm tasks

#####  User defined variables  #####
HELM=helm
KUBECTL=kubectl
PRIVATE_VALUES=private_values.yaml
INSTALLATION_NAME=progress-tracker
NAMESPACE=csc-440-test
CHART_PATH=.


# Check if installation namespace exists
check-namespace:
	@if ! $(KUBECTL) get namespaces | grep -q -E "^${NAMESPACE} +"; then \
		echo "Namespace '${NAMESPACE}' does not exist"; \
		exit 2; \
	fi

# Check if private values file exists
check-private-values:
	@if [[ ! -f ${PRIVATE_VALUES} ]]; then \
		echo "Custom private values file doesn't exist"; \
		exit 2; \
	fi

install-chart:
	$(HELM) install ${INSTALLATION_NAME} ${CHART_PATH} \
		--namespace ${NAMESPACE} --values ${PRIVATE_VALUES}

upgrade-chart:
	$(HELM) upgrade ${INSTALLATION_NAME} ${CHART_PATH} \
		--namespace ${NAMESPACE} --values ${PRIVATE_VALUES}

delete-chart:
	$(HELM) delete ${INSTALLATION_NAME} --namespace ${NAMESPACE}


precheck: check-namespace check-private-values
install: precheck install-chart
upgrade: precheck upgrade-chart
clean: delete-chart
