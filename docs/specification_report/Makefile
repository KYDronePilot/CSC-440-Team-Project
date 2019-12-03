SHELL = /bin/bash

DOCUMENT=specification_report
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

# logout_sequence_diagram diagram info
LOGOUT_SEQUENCE_DIAGRAM_DIR=$(dir ${CURDIR})logout_sequence_diagram
LOGOUT_SEQUENCE_DIAGRAM_DIST=${LOGOUT_SEQUENCE_DIAGRAM_DIR}/dist

# concentration_progress_sequence_diagram diagram info
CONCENTRATION_PROGRESS_SEQUENCE_DIAGRAM_DIR=$(dir ${CURDIR})concentration_progress_sequence_diagram
CONCENTRATION_PROGRESS_SEQUENCE_DIAGRAM_DIST=${CONCENTRATION_PROGRESS_SEQUENCE_DIAGRAM_DIR}/dist

# view_semesters_sequence_diagram diagram info
VIEW_SEMESTERS_SEQUENCE_DIAGRAM_DIR=$(dir ${CURDIR})view_semesters_sequence_diagram
VIEW_SEMESTERS_SEQUENCE_DIAGRAM_DIST=${VIEW_SEMESTERS_SEQUENCE_DIAGRAM_DIR}/dist

# add_remove_semesters_sequence_diagram diagram info
ADD_REMOVE_SEMESTERS_SEQUENCE_DIAGRAM_DIR=$(dir ${CURDIR})add_remove_semesters_sequence_diagram
ADD_REMOVE_SEMESTERS_SEQUENCE_DIAGRAM_DIST=${ADD_REMOVE_SEMESTERS_SEQUENCE_DIAGRAM_DIR}/dist

# view_courses_sequence_diagram diagram info
VIEW_COURSES_SEQUENCE_DIAGRAM_DIR=$(dir ${CURDIR})view_courses_sequence_diagram
VIEW_COURSES_SEQUENCE_DIAGRAM_DIST=${VIEW_COURSES_SEQUENCE_DIAGRAM_DIR}/dist

# add_remove_courses_sequence_diagram diagram info
ADD_REMOVE_COURSES_SEQUENCE_DIAGRAM_DIR=$(dir ${CURDIR})add_remove_courses_sequence_diagram
ADD_REMOVE_COURSES_SEQUENCE_DIAGRAM_DIST=${ADD_REMOVE_COURSES_SEQUENCE_DIAGRAM_DIR}/dist

# view_course_details_sequence_diagram diagram info
VIEW_COURSE_DETAILS_SEQUENCE_DIAGRAM_DIR=$(dir ${CURDIR})view_course_details_sequence_diagram
VIEW_COURSE_DETAILS_SEQUENCE_DIAGRAM_DIST=${VIEW_COURSE_DETAILS_SEQUENCE_DIAGRAM_DIR}/dist

# add_edit_remove_grade_entries_sequence_diagram diagram info
ADD_EDIT_REMOVE_GRADE_ENTRIES_SEQUENCE_DIAGRAM_DIR=$(dir ${CURDIR})add_edit_remove_grade_entries_sequence_diagram
ADD_EDIT_REMOVE_GRADE_ENTRIES_SEQUENCE_DIAGRAM_DIST=${ADD_EDIT_REMOVE_GRADE_ENTRIES_SEQUENCE_DIAGRAM_DIR}/dist

# register_activity_diagram diagram info
REGISTER_ACTIVITY_DIAGRAM_DIR=$(dir ${CURDIR})register_activity_diagram
REGISTER_ACTIVITY_DIAGRAM_DIST=${REGISTER_ACTIVITY_DIAGRAM_DIR}/dist

# login_activity_diagram diagram info
LOGIN_ACTIVITY_DIAGRAM_DIR=$(dir ${CURDIR})login_activity_diagram
LOGIN_ACTIVITY_DIAGRAM_DIST=${LOGIN_ACTIVITY_DIAGRAM_DIR}/dist

# logout_activity_diagram diagram info
LOGOUT_ACTIVITY_DIAGRAM_DIR=$(dir ${CURDIR})logout_activity_diagram
LOGOUT_ACTIVITY_DIAGRAM_DIST=${LOGOUT_ACTIVITY_DIAGRAM_DIR}/dist

# concentration_progress_activity_diagram diagram info
CONCENTRATION_PROGRESS_ACTIVITY_DIAGRAM_DIR=$(dir ${CURDIR})concentration_progress_activity_diagram
CONCENTRATION_PROGRESS_ACTIVITY_DIAGRAM_DIST=${CONCENTRATION_PROGRESS_ACTIVITY_DIAGRAM_DIR}/dist

# view_semesters_activity_diagram diagram info
VIEW_SEMESTERS_ACTIVITY_DIAGRAM_DIR=$(dir ${CURDIR})view_semesters_activity_diagram
VIEW_SEMESTERS_ACTIVITY_DIAGRAM_DIST=${VIEW_SEMESTERS_ACTIVITY_DIAGRAM_DIR}/dist

# add_remove_semesters_activity_diagram diagram info
ADD_REMOVE_SEMESTERS_ACTIVITY_DIAGRAM_DIR=$(dir ${CURDIR})add_remove_semesters_activity_diagram
ADD_REMOVE_SEMESTERS_ACTIVITY_DIAGRAM_DIST=${ADD_REMOVE_SEMESTERS_ACTIVITY_DIAGRAM_DIR}/dist

# view_courses_activity_diagram diagram info
VIEW_COURSES_ACTIVITY_DIAGRAM_DIR=$(dir ${CURDIR})view_courses_activity_diagram
VIEW_COURSES_ACTIVITY_DIAGRAM_DIST=${VIEW_COURSES_ACTIVITY_DIAGRAM_DIR}/dist

# add_remove_courses_activity_diagram diagram info
ADD_REMOVE_COURSES_ACTIVITY_DIAGRAM_DIR=$(dir ${CURDIR})add_remove_courses_activity_diagram
ADD_REMOVE_COURSES_ACTIVITY_DIAGRAM_DIST=${ADD_REMOVE_COURSES_ACTIVITY_DIAGRAM_DIR}/dist

# view_course_details_activity_diagram diagram info
VIEW_COURSE_DETAILS_ACTIVITY_DIAGRAM_DIR=$(dir ${CURDIR})view_course_details_activity_diagram
VIEW_COURSE_DETAILS_ACTIVITY_DIAGRAM_DIST=${VIEW_COURSE_DETAILS_ACTIVITY_DIAGRAM_DIR}/dist

# add_edit_remove_grade_entries_activity_diagram diagram info
ADD_EDIT_REMOVE_GRADE_ENTRIES_ACTIVITY_DIAGRAM_DIR=$(dir ${CURDIR})add_edit_remove_grade_entries_activity_diagram
ADD_EDIT_REMOVE_GRADE_ENTRIES_ACTIVITY_DIAGRAM_DIST=${ADD_EDIT_REMOVE_GRADE_ENTRIES_ACTIVITY_DIAGRAM_DIR}/dist

# state_diagram diagram info
STATE_DIAGRAM_DIR=$(dir ${CURDIR})state_diagram
STATE_DIAGRAM_DIST=${STATE_DIAGRAM_DIR}/dist

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

build-logout-sequence-diagram:
	$(MAKE) -C ${LOGOUT_SEQUENCE_DIAGRAM_DIR} clean build
	cp ${LOGOUT_SEQUENCE_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-concentration-progress-sequence-diagram:
	$(MAKE) -C ${CONCENTRATION_PROGRESS_SEQUENCE_DIAGRAM_DIR} clean build
	cp ${CONCENTRATION_PROGRESS_SEQUENCE_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-view-semesters-sequence-diagram:
	$(MAKE) -C ${VIEW_SEMESTERS_SEQUENCE_DIAGRAM_DIR} clean build
	cp ${VIEW_SEMESTERS_SEQUENCE_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-add-remove-semesters-sequence-diagram:
	$(MAKE) -C ${ADD_REMOVE_SEMESTERS_SEQUENCE_DIAGRAM_DIR} clean build
	cp ${ADD_REMOVE_SEMESTERS_SEQUENCE_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-view-courses-sequence-diagram:
	$(MAKE) -C ${VIEW_COURSES_SEQUENCE_DIAGRAM_DIR} clean build
	cp ${VIEW_COURSES_SEQUENCE_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-add-remove-courses-sequence-diagram:
	$(MAKE) -C ${ADD_REMOVE_COURSES_SEQUENCE_DIAGRAM_DIR} clean build
	cp ${ADD_REMOVE_COURSES_SEQUENCE_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-view-course-details-sequence-diagram:
	$(MAKE) -C ${VIEW_COURSE_DETAILS_SEQUENCE_DIAGRAM_DIR} clean build
	cp ${VIEW_COURSE_DETAILS_SEQUENCE_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-add-edit-remove-grade-entries-sequence-diagram:
	$(MAKE) -C ${ADD_EDIT_REMOVE_GRADE_ENTRIES_SEQUENCE_DIAGRAM_DIR} clean build
	cp ${ADD_EDIT_REMOVE_GRADE_ENTRIES_SEQUENCE_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-register-activity-diagram:
	$(MAKE) -C ${REGISTER_ACTIVITY_DIAGRAM_DIR} clean build
	cp ${REGISTER_ACTIVITY_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-login-activity-diagram:
	$(MAKE) -C ${LOGIN_ACTIVITY_DIAGRAM_DIR} clean build
	cp ${LOGIN_ACTIVITY_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-logout-activity-diagram:
	$(MAKE) -C ${LOGOUT_ACTIVITY_DIAGRAM_DIR} clean build
	cp ${LOGOUT_ACTIVITY_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-concentration-progress-activity-diagram:
	$(MAKE) -C ${CONCENTRATION_PROGRESS_ACTIVITY_DIAGRAM_DIR} clean build
	cp ${CONCENTRATION_PROGRESS_ACTIVITY_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-view-semesters-activity-diagram:
	$(MAKE) -C ${VIEW_SEMESTERS_ACTIVITY_DIAGRAM_DIR} clean build
	cp ${VIEW_SEMESTERS_ACTIVITY_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-add-remove-semesters-activity-diagram:
	$(MAKE) -C ${ADD_REMOVE_SEMESTERS_ACTIVITY_DIAGRAM_DIR} clean build
	cp ${ADD_REMOVE_SEMESTERS_ACTIVITY_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-view-courses-activity-diagram:
	$(MAKE) -C ${VIEW_COURSES_ACTIVITY_DIAGRAM_DIR} clean build
	cp ${VIEW_COURSES_ACTIVITY_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-add-remove-courses-activity-diagram:
	$(MAKE) -C ${ADD_REMOVE_COURSES_ACTIVITY_DIAGRAM_DIR} clean build
	cp ${ADD_REMOVE_COURSES_ACTIVITY_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-view-course-details-activity-diagram:
	$(MAKE) -C ${VIEW_COURSE_DETAILS_ACTIVITY_DIAGRAM_DIR} clean build
	cp ${VIEW_COURSE_DETAILS_ACTIVITY_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-add-edit-remove-grade-entries-activity-diagram:
	$(MAKE) -C ${ADD_EDIT_REMOVE_GRADE_ENTRIES_ACTIVITY_DIAGRAM_DIR} clean build
	cp ${ADD_EDIT_REMOVE_GRADE_ENTRIES_ACTIVITY_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-state-diagram:
	$(MAKE) -C ${STATE_DIAGRAM_DIR} clean build
	cp ${STATE_DIAGRAM_DIST}/* ${DIAGRAM_BUILD}

build-diagrams: prepare build-state-diagram build-add-edit-remove-grade-entries-activity-diagram build-view-course-details-activity-diagram build-add-remove-courses-activity-diagram build-view-courses-activity-diagram build-add-remove-semesters-activity-diagram build-view-semesters-activity-diagram build-concentration-progress-activity-diagram build-logout-activity-diagram build-login-activity-diagram build-register-activity-diagram build-add-edit-remove-grade-entries-sequence-diagram build-view-course-details-sequence-diagram build-add-remove-courses-sequence-diagram build-view-courses-sequence-diagram build-add-remove-semesters-sequence-diagram build-view-semesters-sequence-diagram build-concentration-progress-sequence-diagram build-logout-sequence-diagram build-use-case-diagram build-class-diagram build-login-sequence-diagram \
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
