import React, {Component} from 'react';
import {connect} from 'react-redux';
import {allInstances} from '../utils/objectification_utils';
import {MDBBtn, MDBContainer, MDBListGroup} from 'mdbreact';
import CourseInstanceListItem from '../components/CourseInstanceListItem';
import AddCourseInstanceForm from '../containers/AddCourseInstanceForm';
import {SemesterBreadcrumb} from '../components/layout/breadcrumbs';
import {
    CourseInstanceStats,
    generateRawSemesterStructure,
    getSemesterCourseInstances,
    getSemesterStats,
    SemesterStats
} from '../api/courseInstance';
import {getCourseInstanceGradeEntries} from '../api/gradeEntry';
import {Category, Course, CourseInstance, GradeEntry, Semester} from '../api/types';
import {RouteComponentProps} from 'react-router';
import {removeStudentCourseInstanceRelationship} from '../actions/courseInstanceActions';
import {zip} from '../utils';

/**
 * Denormalized course instance info.
 */
interface CourseInfo {
    courseInstance: CourseInstance;
    course: Course;
    gradeEntries: GradeEntry[];
}

/**
 * React router URL match parameters.
 */
interface MatchParams {
    semesterId: string;
}

interface mapStateToPropsTypes {
    semesterId: number;
    courses: CourseInfo[];
    semesterStats: SemesterStats;
}

interface SemesterViewProps extends RouteComponentProps<MatchParams>, mapStateToPropsTypes {
    removeStudentCourseInstanceRelationship: (courseInstanceId: number) => void;
}

interface SemesterViewState {
    addFormVisible: boolean;
}

function mapStateToProps(state: any, ownProps: SemesterViewProps): mapStateToPropsTypes {
    // Get the semester ID and instance
    const semesterId = parseInt(ownProps.match.params.semesterId);
    const semester: Semester = state.semester.semesters[semesterId];
    const courseInstances = getSemesterCourseInstances(
        allInstances(state.courseInstance.courseInstances),
        semesterId
    );
    // TODO: Shrinking scope of categories and grade entries could give a speed improvement
    const categories: Category[] = allInstances(state.category.categories);
    const gradeEntries: GradeEntry[] = allInstances(state.gradeEntry.gradeEntries);
    const courses = state.course.courses;

    // Merge courses, course instances, and grade entries
    return {
        semesterId,
        courses: courseInstances.map(courseInstance => ({
            courseInstance: courseInstance,
            course: courses[courseInstance.course],
            gradeEntries: getCourseInstanceGradeEntries(
                allInstances(state.gradeEntry.gradeEntries),
                allInstances(state.category.categories),
                courseInstance.id
            )
        })),
        semesterStats: getSemesterStats(generateRawSemesterStructure(
            semester,
            courseInstances,
            categories,
            gradeEntries
        ))
    };
}

class SemesterView extends Component<SemesterViewProps, SemesterViewState> {
    constructor(props: SemesterViewProps) {
        super(props);
        this.state = {
            addFormVisible: false
        };

        this.toggleAddFormVisible = this.toggleAddFormVisible.bind(this);
    }

    toggleAddFormVisible() {
        this.setState(state => ({
            addFormVisible: !state.addFormVisible
        }));
    }

    render() {
        const props = this.props;
        // @ts-ignore
        const course_instance__stats: [CourseInfo, CourseInstanceStats][] = zip([props.courses, props.semesterStats.courseInstanceStats]);

        return (
            <div>
                <AddCourseInstanceForm
                    visible={this.state.addFormVisible}
                    toggleVisible={this.toggleAddFormVisible}
                    semesterId={props.semesterId}
                />
                <SemesterBreadcrumb semesterId={props.semesterId}/>
                <MDBContainer>
                    <MDBListGroup>
                        {course_instance__stats.map(([course, stats]) => (
                            <CourseInstanceListItem
                                key={course.course.id}
                                code={course.course.code}
                                courseInstanceId={course.courseInstance.id}
                                name={course.course.name}
                                lastUpdated={course.courseInstance.last_updated}
                                removeCourseInstance={props.removeStudentCourseInstanceRelationship}
                                gradeEntries={course.gradeEntries}
                                letterGrade={stats.letterGrade}
                                score={stats.score}
                                points={stats.points}
                                maxPoints={stats.maxPoints}
                            />
                        ))}
                    </MDBListGroup>
                </MDBContainer>
                <MDBBtn onClick={this.toggleAddFormVisible} className={'primary'}>Add Course Instance</MDBBtn>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {removeStudentCourseInstanceRelationship}
)(SemesterView);
