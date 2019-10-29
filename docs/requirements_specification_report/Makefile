SHELL = /bin/bash

DOCUMENT=requirements_specification_report
DIST=dist
CI_DIST=${DIST}
BUILD=build
DIAGRAM_BUILD=${BUILD}/diagrams
TEXLIVE_PATH=/tmp/texlive/bin/x86_64-linux

# Database diagram info
DATABASE_DESIGN_DIR=$(dir ${CURDIR})database_design
DATABASE_DESIGN_DIST=${DATABASE_DESIGN_DIR}/dist

# Use case diagram info
USE_CASE_DIAGRAM_DIR=$(dir ${CURDIR})use_case_diagram
USE_CASE_DIAGRAM_DIST=${USE_CASE_DIAGRAM_DIR}/dist

# Class diagram info
CLASS_DIAGRAM_DIR=$(dir ${CURDIR})class_diagram
CLASS_DIAGRAM_DIST=${CLASS_DIAGRAM_DIR}/dist

# Login sequence diagram info
LOGIN_SEQUENCE_DIAGRAM_DIR=$(dir ${CURDIR})login_sequence_diagram
LOGIN_SEQUENCE_DIAGRAM_DIST=${LOGIN_SEQUENCE_DIAGRAM_DIR}/dist

# Register sequence diagram info
REGISTER_SEQUENCE_DIAGRAM_DIR=$(dir ${CURDIR})register_sequence_diagram
REGISTER_SEQUENCE_DIAGRAM_DIST=${REGISTER_SEQUENCE_DIAGRAM_DIR}/dist

prepare:
	mkdir -p ${DIST} ${BUILD} ${DIAGRAM_BUILD}

build-use-case-diagram:
	$(MAKE) -C ${USE_CASE_DIAGRAM_DIR} clean build
	cp ${USE_CASE_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-class-diagram:
	$(MAKE) -C ${CLASS_DIAGRAM_DIR} clean build
	cp ${CLASS_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-login-sequence-diagram:
	$(MAKE) -C ${LOGIN_SEQUENCE_DIAGRAM_DIR} clean build
	cp ${LOGIN_SEQUENCE_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-register-sequence-diagram:
	$(MAKE) -C ${REGISTER_SEQUENCE_DIAGRAM_DIR} clean build
	cp ${REGISTER_SEQUENCE_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-database-diagram:
	$(MAKE) -C ${DATABASE_DESIGN_DIR} clean build
	cp ${DATABASE_DESIGN_DIST}/* ${DIAGRAM_BUILD}

build-diagrams: prepare build-use-case-diagram build-class-diagram build-login-sequence-diagram \
	build-register-sequence-diagram build-database-diagram

build-docx: prepare
	pandoc -s ${DOCUMENT}.tex -o ${DIST}/${DOCUMENT}.docx --toc --reference-doc reference.docx

build-latex: prepare
	for i in {1..2}; do pdflatex -output-directory=${BUILD} ${DOCUMENT}.tex; done
	cp ${BUILD}/${DOCUMENT}.pdf ${DIST}

build-latex-ci: prepare
	for i in {1..2}; do ${TEXLIVE_PATH}/pdflatex -output-directory=${BUILD} ${DOCUMENT}.tex; done
	cp ${BUILD}/${DOCUMENT}.pdf ${DIST}

build: build-diagrams build-latex build-docx

build-ci: build-diagrams build-latex-ci build-docx
	cp ${DIST}/* ${CI_DIST}

clean:
	rm -rf ${BUILD} ${DIST}
