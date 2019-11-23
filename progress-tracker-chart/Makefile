SHELL := /bin/bash
# Makefile for running common Helm tasks

#####  User defined variables  #####
HELM=helm
KUBECTL=kubectl
PRIVATE_VALUES=private_values.yaml
INSTALLATION_NAME=progress-tracker
NAMESPACE=csc-440-test
CHART_PATH=.


check-namespace:
	@if ! $(KUBECTL) get namespaces | grep -q -E "^${NAMESPACE} +"; then \
		echo "Namespace '${NAMESPACE}' does not exist"; \
		exit 2; \
	fi

check-private-values:
	@if [[ ! -f ${PRIVATE_VALUES} ]]; then \
		echo "Custom private values file doesn't exist"; \
		exit 2; \
	fi

install-chart:
	$(HELM) install ${CHART_PATH} --name ${INSTALLATION_NAME} \
		--namespace ${NAMESPACE} --values ${PRIVATE_VALUES}

upgrade-chart:
	$(HELM) upgrade ${INSTALLATION_NAME} ${CHART_PATH} \
		--namespace ${NAMESPACE} --values ${PRIVATE_VALUES}

delete-chart:
	$(HELM) delete --purge ${INSTALLATION_NAME}


precheck: check-namespace check-private-values
install: precheck install-chart
upgrade: precheck upgrade-chart
clean: delete-chart
