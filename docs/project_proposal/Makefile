SHELL = /bin/bash

DOCUMENT=project_proposal
DIST=dist
CI_DIST=${DIST}
BUILD=build

prepare:
	mkdir -p ${DIST} ${BUILD}

build-docx: prepare
	pandoc -s ${DOCUMENT}.tex -o ${DIST}/${DOCUMENT}.docx --toc --reference-doc reference.docx

build-latex: prepare
	for i in {1..2}; do pdflatex -output-directory=${BUILD} ${DOCUMENT}.tex; done
	cp ${BUILD}/${DOCUMENT}.pdf ${DIST}

build: build-latex build-docx

build-ci: build
	cp ${DIST}/* ${CI_DIST}

clean:
	rm -rf ${BUILD} ${DIST}
