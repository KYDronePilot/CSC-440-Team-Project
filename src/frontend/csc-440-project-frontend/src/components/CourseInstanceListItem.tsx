import React, {Component} from 'react';
import TimeAgo from 'react-timeago';
import {MDBBtn, MDBCol, MDBListGroupItem, MDBRow} from 'mdbreact';
import {Link} from 'react-router-dom';
import DeleteWarning from './DeleteWarning';
import {COURSE_URL} from '../routes/urls';
import {formatScore, LetterGrade} from '../api/gradeEntry';


interface CourseInstanceListItemProps {
    name: string;
    code: string;
    courseInstanceId: number;
    lastUpdated: string;
    removeCourseInstance?: (courseInstanceId: number) => void;
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

        this.toggleDeleteWarningVisible = this.toggleDeleteWarningVisible.bind(this);
        this.deleteCourseInstance = this.deleteCourseInstance.bind(this);
        this.deleteButton = this.deleteButton.bind(this);
        this.gradeDetails = this.gradeDetails.bind(this);
    }

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
        if (this.props.removeCourseInstance !== undefined)
            this.props.removeCourseInstance(this.props.courseInstanceId);
    }

    deleteButton() {
        if (this.props.removeCourseInstance === undefined)
            return null;
        return (
            <MDBBtn
                color={''}
                onClick={this.toggleDeleteWarningVisible}
                className={'btn-link p-1'}
                id={'delete-course-button'}
            >
                Delete
            </MDBBtn>
        );
    }

    gradeDetails() {
        const props = this.props;
        if (props.maxPoints === 0)
            return <></>;
        return (
            <p className={'mb-1 font-weight-bold'} id={'grade-details'}>
                Grade:&nbsp;{props.letterGrade}&nbsp;({formatScore(props.score)})
                | Points:&nbsp;{props.points}&nbsp;/&nbsp;{props.maxPoints}
            </p>
        );
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
                        {this.gradeDetails()}
                    </MDBCol>
                    <MDBCol md={'4'} className={'text-left text-md-right'}>
                        {this.deleteButton()}
                    </MDBCol>
                </MDBRow>
            </MDBListGroupItem>
        );
    }
}

export default CourseInstanceListItem;
