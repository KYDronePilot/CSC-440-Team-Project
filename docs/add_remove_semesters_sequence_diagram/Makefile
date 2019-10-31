SHELL = /bin/bash

# Common information
DIST=${CURDIR}/dist
CI_DIST=${DIST}
BUILD=${CURDIR}/build
DRAWIO_BUILDER_IMAGE=kydronepilot19/draw.io-builder
DIAGRAM_DIR=${CURDIR}

# Diagram info
DIAGRAM_FILE=add_remove_semesters_sequence_diagram.drawio
DIAGRAM_FILE_OUT=add_remove_semesters_sequence_diagram
DIAGRAM_FILE_FORMAT=pdf

define export_diagram
	docker run --rm -v "${DIAGRAM_DIR}:/diagrams" -v "${DIST}:/dist" ${DRAWIO_BUILDER_IMAGE} \
		"drawio --no-sandbox --crop -x -o /dist/$(1).$(2) $(3)"
endef

prepare:
	mkdir -p ${DIST} ${BUILD}

build-diagram:
	$(call export_diagram,${DIAGRAM_FILE_OUT},${DIAGRAM_FILE_FORMAT},${DIAGRAM_FILE})

build: prepare build-diagram

build-ci: build
	cp ${DIST}/* ${CI_DIST}

clean:
	rm -rf ${BUILD} ${DIST}
