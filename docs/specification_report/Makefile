SHELL = /bin/bash

DOCUMENT=specification_report
DIST=dist
CI_DIST=${DIST}
BUILD=build
DIAGRAM_BUILD=${BUILD}/diagrams
TEXLIVE_PATH=/tmp/texlive/bin/x86_64-linux
SELENIUM_SCREENSHOTS_DIR=../../e2e/screenshots
SCREENSHOTS_BUILD=${BUILD}/screenshots

# Database diagram info
DATABASE_DESIGN_DIR=$(dir ${CURDIR})database_design
DATABASE_DESIGN_DIST=${DATABASE_DESIGN_DIR}/dist

# Use case diagram info
USE_CASE_DIAGRAM_DIR=$(dir ${CURDIR})use_case_diagram
USE_CASE_DIAGRAM_DIST=${USE_CASE_DIAGRAM_DIR}/dist

# Level 0 DFD diagram info
LEVEL_0_DFD_DIR=$(dir ${CURDIR})level_0_dfd
LEVEL_0_DFD_DIST=${LEVEL_0_DFD_DIR}/dist

# level_1_dfd diagram info
LEVEL_1_DFD_DIR=$(dir ${CURDIR})level_1_dfd
LEVEL_1_DFD_DIST=${LEVEL_1_DFD_DIR}/dist

# level_2_dfd_p4 diagram info
LEVEL_2_DFD_P4_DIR=$(dir ${CURDIR})level_2_dfd_p4
LEVEL_2_DFD_P4_DIST=${LEVEL_2_DFD_P4_DIR}/dist

# level_3_dfd_p4-4 diagram info
LEVEL_3_DFD_P4-4_DIR=$(dir ${CURDIR})level_3_dfd_p4-4
LEVEL_3_DFD_P4-4_DIST=${LEVEL_3_DFD_P4-4_DIR}/dist

prepare:
	mkdir -p ${DIST} ${BUILD} ${DIAGRAM_BUILD} ${SCREENSHOTS_BUILD}

build-use-case-diagram:
	$(MAKE) -C ${USE_CASE_DIAGRAM_DIR} clean build
	cp ${USE_CASE_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-database-diagram:
	$(MAKE) -C ${DATABASE_DESIGN_DIR} clean build
	cp ${DATABASE_DESIGN_DIST}/* ${DIAGRAM_BUILD}

build-level-0-dfd-diagram:
	$(MAKE) -C ${LEVEL_0_DFD_DIR} clean build
	cp ${LEVEL_0_DFD_DIST}/* ${DIAGRAM_BUILD}

clean-selenium-screenshots:
	rm -f ${SCREENSHOTS_BUILD}/*

copy-selenium-screenshots: clean-selenium-screenshots
	cp ${SELENIUM_SCREENSHOTS_DIR}/* ${SCREENSHOTS_BUILD}

build-level-1-dfd:
	$(MAKE) -C ${LEVEL_1_DFD_DIR} clean build
	cp ${LEVEL_1_DFD_DIST}/* ${DIAGRAM_BUILD}

build-level-2-dfd-p4:
	$(MAKE) -C ${LEVEL_2_DFD_P4_DIR} clean build
	cp ${LEVEL_2_DFD_P4_DIST}/* ${DIAGRAM_BUILD}

build-level-3-dfd-p4-4:
	$(MAKE) -C ${LEVEL_3_DFD_P4-4_DIR} clean build
	cp ${LEVEL_3_DFD_P4-4_DIST}/* ${DIAGRAM_BUILD}

build-diagrams: prepare build-level-3-dfd-p4-4 build-level-2-dfd-p4 build-level-1-dfd build-use-case-diagram build-database-diagram build-level-0-dfd-diagram

build-docx: prepare
	pandoc -s ${DOCUMENT}.tex -o ${DIST}/${DOCUMENT}.docx --toc --reference-doc reference.docx

build-latex: prepare copy-selenium-screenshots
	for i in {1..2}; do pdflatex -output-directory=${BUILD} ${DOCUMENT}.tex; done
	cp ${BUILD}/${DOCUMENT}.pdf ${DIST}

build-latex-ci: prepare copy-selenium-screenshots
	for i in {1..2}; do ${TEXLIVE_PATH}/pdflatex -output-directory=${BUILD} ${DOCUMENT}.tex; done
	cp ${BUILD}/${DOCUMENT}.pdf ${DIST}

build: build-diagrams build-latex build-docx

build-ci: build-diagrams build-latex-ci build-docx
	cp ${DIST}/* ${CI_DIST}

clean:
	rm -rf ${BUILD} ${DIST}
