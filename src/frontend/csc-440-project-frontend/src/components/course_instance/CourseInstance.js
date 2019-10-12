import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import {MDBBtn, MDBListGroupItem} from 'mdbreact';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import DeleteWarning from '../common/DeleteWarning';
import {removeStudentCourseInstanceRelationship} from '../../actions/courseInstanceActions';

function mapStateToProps(state) {
    return {
        courses: state.course.courses
    };
}

class CourseInstance extends Component {
    static propTypes = {
        courseInstance: PropTypes.object.isRequired,
        courses: PropTypes.object.isRequired,
        removeStudentCourseInstanceRelationship: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            deleteWarningVisible: false
        };

        // this.handleCourseInstanceSelected = this.handleCourseInstanceSelected.bind(this);
        this.course = this.course.bind(this);
        this.toggleDeleteWarningVisible = this.toggleDeleteWarningVisible.bind(this);
        this.deleteCourseInstance = this.deleteCourseInstance.bind(this);
    }

    // handleCourseInstanceSelected(e) {
    //     e.preventDefault();
    //     // Set as active course instance
    //     this.props.setActiveCourseInstance(this.props.courseInstance);
    //     // Redirect to course
    //     this.props.history.push('/course');
    // }

    /**
     * Gets the corresponding course for this course instance.
     */
    course() {
        return this.props.courses[this.props.courseInstance.course];
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
        this.props.removeStudentCourseInstanceRelationship(this.props.courseInstance);
    }

    render() {
        const course = this.course();

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
                        <Link to={`/course/${this.props.courseInstance.id}`}>{course.name}</Link>
                        {/*<a onClick={this.handleCourseInstanceSelected}>{course.name}</a>*/}
                    </h5>
                    <small>
                        <TimeAgo date={this.props.courseInstance.last_updated}/>
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

export default connect(
    mapStateToProps,
    {removeStudentCourseInstanceRelationship}
)(withRouter(CourseInstance));