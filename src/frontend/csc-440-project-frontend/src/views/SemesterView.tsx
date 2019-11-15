import React, {Component} from 'react';
import {connect} from 'react-redux';
import {allInstances} from '../utils/objectification_utils';
import {MDBBtn, MDBContainer, MDBListGroup} from 'mdbreact';
import CourseInstanceListItem from '../components/CourseInstanceListItem';
import AddCourseInstanceForm from '../containers/AddCourseInstanceForm';
import {SemesterBreadcrumb} from '../components/layout/breadcrumbs';
import {getSemesterCourseInstances} from '../api/courseInstance';
import {getCourseInstanceGradeEntries} from '../api/gradeEntry';
import {Course, CourseInstance, GradeEntry} from '../api/types';
import {RouteComponentProps} from 'react-router';
import {removeStudentCourseInstanceRelationship} from '../actions/courseInstanceActions';

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
}

interface SemesterViewProps extends RouteComponentProps<MatchParams>, mapStateToPropsTypes {
    removeStudentCourseInstanceRelationship: (courseInstanceId: number) => void;
}

interface SemesterViewState {
    addFormVisible: boolean;
}

function mapStateToProps(state: any, ownProps: SemesterViewProps): mapStateToPropsTypes {
    const semesterId = parseInt(ownProps.match.params.semesterId);
    const courseInstances = getSemesterCourseInstances(
        allInstances(state.courseInstance.courseInstances),
        semesterId
    );
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
        }))
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
        return (
            <div>
                <AddCourseInstanceForm
                    visible={this.state.addFormVisible}
                    toggleVisible={this.toggleAddFormVisible}
                    semesterId={this.props.semesterId}
                />
                <SemesterBreadcrumb semesterId={this.props.semesterId}/>
                <MDBContainer>
                    <MDBListGroup>
                        {this.props.courses.map(course => (
                            <CourseInstanceListItem
                                key={course.course.id}
                                code={course.course.code}
                                courseInstanceId={course.courseInstance.id}
                                name={course.course.name}
                                lastUpdated={course.courseInstance.last_updated}
                                removeCourseInstance={this.props.removeStudentCourseInstanceRelationship}
                                gradeEntries={course.gradeEntries}
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
