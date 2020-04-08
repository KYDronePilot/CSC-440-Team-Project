# GradeTracker
[![Build Status](https://travis-ci.com/KYDronePilot/CSC-440-Team-Project.svg?token=UPpYeFG6qsnEPAAd486T&branch=master)](https://travis-ci.com/KYDronePilot/CSC-440-Team-Project)

Team project for CSC 440, Applied Software Engineering at Eastern Kentucky University
 - By Michael Galliers and James Miller

## Goal
The core goal of this project is to make a grade tracking web application using modern software engineering
technologies. These technologies include:
 - A React.js frontend with Redux state management
 - A Django backend
 - Fully automated build, test, and deployment process using Travis-CI
 - Containerized deployments with Kubernetes

The following is an excerpt from the requirements specification report:

Problem Statement
-----------------

As EKU college students, we the authors have firsthand experience with
the difficulties of grade/progress management. The tools already used by
the college for grade management have their flaws. Many professors
either do not setup the grading categories and weights properly, or they
choose to not use BlackBoard for tracking grades at all. Also,
BlackBoard does not have the ability to give advanced insights for
student grades other than simple weighted averages or totals.

Students can choose to manage their grades on their own, either using
technology, such as spreadsheets, or pen and paper. Students who do this
are able to gain more insights into their progress in courses, but it
can be very time consuming to setup spreadsheets or do computations by
hand, especially when predicting grades needed on an assignment.

Proposal
--------

As a solution to these problems, we propose a software system for grade
and progress tracking. The system shall have 2 main related components:
one for grade tracking and one for major/concentration progress
tracking. The grade tracking system will allow students to easily enter
and track their grades across colleges, semesters, courses, and
categories (homework, exams, etc.). Various views on the user interface
will display grades/scores using visual elements and animations, making
it easy for students to see how well they are doing.

The second component of the application is a progress tracker for majors
and concentrations. Information provided through the grade tracking
feature, coupled with course requirements structures will allow students
to view their progress across multiple majors and concentrations.

System Description
==================

The system shall have a user account management component to keep track
of students, including the ability to register, login, edit account, and
logout. When a student logs into the system, the student shall see a
dashboard containing the most relevant information and navigation links.
From there, the student will also be able to access the system menu,
allowing them to navigate to either the grade tracking component or the
progress tracking component.

Grade Tracking Component
------------------------

The grade tracking component shall have views for the following items:

1.  All semesters (root grade tracking view)
2.  Courses in a semester
3.  Details of a course (including categories and grade entries)

The *All Semesters* view shall allow the student to navigate to a
particular semester, add/remove a semester in which they are enrolled,
and view statistics about his/her grades in that semester.

The *Courses* view shall display the courses that are in a particular
semester. The student shall be able to add/remove/edit courses, view
statistics for grades in each course, and navigate to any of the
courses.

The *Course Detail* view shall display all remaining details for a
particular course. This includes the statistics of a student's grades in
the course, the grading categories of the course, and the grade entries
themselves. The student shall also have the ability to add/remove/edit
categories and grade entries.

Progress Tracking Component
---------------------------

The progress tracking component shall allow students to track their
progress across major concentrations. This component shall have the
following hierarchical views:

1.  Colleges (root progress tracking view)
2.  Majors
3.  Concentrations
4.  Concentration progress

The *Colleges* view shall display the colleges in which the student is
enrolled and allow him/her to navigate to the *Majors* view for that
college. The student shall also have the ability to add/remove colleges
which he/she is enrolled in.

The *Majors* view shall display the majors of the college which was
navigated from that the student is enrolled in. The student shall be
able to add/remove majors which he/she is enrolled in and also navigate
to the *Concentrations* view for a particular major.

The *Concentrations* view shall display **all** the concentrations of
the major which was navigated from, broken up into 2 sections: one for
the concentration(s) the student in enrolled in and one for all other
concentrations. The student shall be able to add/remove concentrations
which they are enrolled in and navigate to the *Concentration progress*
view.

The *Concentration progress* view shall display visuals for the
student's progress in the concentration, including overall progress and
individual courses completed. This view shall be based on courses the
student has entered through the grade tracking component.
