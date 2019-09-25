SHELL = /bin/bash

DIAGRAM_FILE="Database ERD.drawio.xml"

DATABASE_ERD_I=1
DATABASE_ERD_FILE=database_erd
DATABASE_ERD_FORMAT=svg

DOCUMENT=requirements_specification_report
DIST=dist
CI_DIST=${DIST}
BUILD=build
TEXLIVE_PATH=/tmp/texlive/bin/x86_64-linux

prepare:
	mkdir -p ${DIST} ${BUILD}

build-erd:
	draw.io -x -p ${DATABASE_ERD_I} -f ${DATABASE_ERD_FORMAT} -o ${DIST}/${DATABASE_ERD_FILE}.${DATABASE_ERD_FORMAT} \
		${DIAGRAM_FILE}

build-docx: prepare
	pandoc -s ${DOCUMENT}.tex -o ${DIST}/${DOCUMENT}.docx --toc --reference-doc reference.docx

build-latex: prepare
	for i in {1..2}; do pdflatex -output-directory=${BUILD} ${DOCUMENT}.tex; done
	cp ${BUILD}/${DOCUMENT}.pdf ${DIST}

build-latex-ci: prepare
	for i in {1..2}; do ${TEXLIVE_PATH}/pdflatex -output-directory=${BUILD} ${DOCUMENT}.tex; done
	cp ${BUILD}/${DOCUMENT}.pdf ${DIST}

build: build-latex build-docx

build-ci: build-latex-ci build-docx
	cp ${DIST}/* ${CI_DIST}

clean:
	rm -rf ${BUILD} ${DIST}
