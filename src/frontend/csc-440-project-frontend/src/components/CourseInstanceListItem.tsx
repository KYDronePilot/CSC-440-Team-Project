import React, {Component} from 'react';
import TimeAgo from 'react-timeago';
import {MDBBtn, MDBCol, MDBListGroupItem, MDBRow} from 'mdbreact';
import {Link} from 'react-router-dom';
import DeleteWarning from './DeleteWarning';
import {COURSE_URL} from '../routes/urls';
import {GradeEntry} from '../api/types';
import {formatScore, LetterGrade} from '../api/gradeEntry';

// function mapStateToProps(state: any) {
//     return {
//         courses: state.course.courses
//     };
// }

interface CourseInstanceListItemProps {
    name: string;
    code: string;
    courseInstanceId: number;
    lastUpdated: string;
    removeCourseInstance: (courseInstanceId: number) => void;
    gradeEntries: GradeEntry[];
    letterGrade: LetterGrade;
    score: number;
    points: number;
    maxPoints: number;
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
        const props = this.props;

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
                <MDBRow>
                    <MDBCol md={'8'} className={'d-flex w-100 justify-content-between'}>
                        <h5 className={'mb-1'}>
                            <Link to={`${COURSE_URL}${props.courseInstanceId}`}>{props.name}</Link>
                        </h5>
                    </MDBCol>
                    <MDBCol md={'4'} className={'text-left text-md-right'}>
                        <small>
                            <TimeAgo date={props.lastUpdated}/>
                        </small>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={'8'} className={'d-flex w-100 justify-content-between'}>
                        <p className={'mb-1 font-weight-bold'}>
                            Grade:&nbsp;{props.letterGrade}&nbsp;({formatScore(props.score)})
                            | Points:&nbsp;{props.points}&nbsp;/&nbsp;{props.maxPoints}
                        </p>
                    </MDBCol>
                    <MDBCol md={'4'} className={'text-left text-md-right'}>
                        <MDBBtn color={''} onClick={this.toggleDeleteWarningVisible} className={'btn-link p-1'}>
                            Delete
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <div className={'d-flex w-100 justify-content-between'}>
                    {/*<MDBBtn onClick={this.toggleDeleteWarningVisible}>Delete</MDBBtn>*/}
                </div>
                {/*<div className="d-flex w-100 justify-content-between">*/}
                {/*    /!*<a onClick={this.editGradeEntryEH}>Edit</a>*!/*/}
                {/*</div>*/}
            </MDBListGroupItem>
        );
    }
}

export default CourseInstanceListItem;
