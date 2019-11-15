import React, {Component} from 'react';
import TimeAgo from 'react-timeago';
import {MDBBtn, MDBListGroupItem} from 'mdbreact';
import {RouteComponentProps, withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import DeleteWarning from './DeleteWarning';
import {COURSE_URL} from '../routes/urls';
import {GradeEntry} from '../api/types';

// function mapStateToProps(state: any) {
//     return {
//         courses: state.course.courses
//     };
// }

interface CourseInstanceListItemProps extends RouteComponentProps {
    name: string;
    code: string;
    courseInstanceId: number;
    lastUpdated: string;
    removeCourseInstance: (courseInstanceId: number) => void;
    gradeEntries: GradeEntry[];
}

interface CourseInstanceListItemState {
    deleteWarningVisible: boolean;
}

class CourseInstanceListItem extends Component<CourseInstanceListItemProps, CourseInstanceListItemState> {
    constructor(props: CourseInstanceListItemProps) {
        super(props);
        this.state = {
            deleteWarningVisible: false
        };

        // this.handleCourseInstanceSelected = this.handleCourseInstanceSelected.bind(this);
        // this.course = this.course.bind(this);
        this.toggleDeleteWarningVisible = this.toggleDeleteWarningVisible.bind(this);
        this.deleteCourseInstance = this.deleteCourseInstance.bind(this);
    }

    /**
     * Gets the corresponding course for this course instance.
     */
    // course() {
    //     return this.props.courses[this.props.courseInstance.course];
    // }

    /**
     * Toggle visibility of delete warning message.
     */
    toggleDeleteWarningVisible() {
        this.setState(state => ({deleteWarningVisible: !state.deleteWarningVisible}));
    }

    /**
     * Delete relationship between course instance and student.
     */
    deleteCourseInstance() {
        this.props.removeCourseInstance(this.props.courseInstanceId);
    }

    render() {
        return (
            <MDBListGroupItem>
                <DeleteWarning
                    toggleVisible={this.toggleDeleteWarningVisible}
                    visible={this.state.deleteWarningVisible}
                    onConfirmation={this.deleteCourseInstance}
                >
                    This will delete all grade entries for this course. This action
                    is irreversible.
                </DeleteWarning>
                <div className={'d-flex w-100 justify-content-between'}>
                    <h5 className={'mb-1'}>
                        <Link to={`${COURSE_URL}${this.props.courseInstanceId}`}>{this.props.name}</Link>
                    </h5>
                    <small>
                        <TimeAgo date={this.props.lastUpdated}/>
                    </small>
                    <MDBBtn onClick={this.toggleDeleteWarningVisible}>Delete</MDBBtn>
                </div>
                {/*<div className="d-flex w-100 justify-content-between">*/}
                {/*    /!*<a onClick={this.editGradeEntryEH}>Edit</a>*!/*/}
                {/*</div>*/}
            </MDBListGroupItem>
        );
    }
}

export default withRouter<CourseInstanceListItemProps, typeof CourseInstanceListItem>(CourseInstanceListItem);
