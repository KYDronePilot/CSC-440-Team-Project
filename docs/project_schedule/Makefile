SHELL = /bin/bash

DOCUMENT=project_schedule
DOCUMENT_EXT=.md
DIST=dist
CI_DIST=${DIST}
BUILD=build

prepare:
	mkdir -p ${DIST} ${BUILD}

build-docx: prepare
	pandoc -s ${DOCUMENT}${DOCUMENT_EXT} -o ${DIST}/${DOCUMENT}.docx

build-md: prepare
	pandoc -s ${DOCUMENT}${DOCUMENT_EXT} -o ${DIST}/${DOCUMENT}.pdf

build: build-md build-docx

build-ci: build-md build-docx
	cp ${DIST}/* ${CI_DIST}

clean:
	rm -rf ${BUILD} ${DIST}
