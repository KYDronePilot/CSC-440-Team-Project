import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import {MDBListGroupItem} from 'mdbreact';
// import {setActiveCourseInstance} from '../../actions/courseInstanceActions';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

function mapStateToProps(state) {
    return {
        courses: state.course.courses
    };
}

class CourseInstance extends Component {
    static propTypes = {
        courseInstance: PropTypes.object.isRequired,
        courses: PropTypes.object.isRequired,
        // setActiveCourseInstance: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};

        // this.handleCourseInstanceSelected = this.handleCourseInstanceSelected.bind(this);
        this.course = this.course.bind(this);
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

    render() {
        const course = this.course();

        return (
            <MDBListGroupItem>
                <div className={'d-flex w-100 justify-content-between'}>
                    <h5 className={'mb-1'}>
                        <Link to={`/course/${this.props.courseInstance.id}`}>{course.name}</Link>
                        {/*<a onClick={this.handleCourseInstanceSelected}>{course.name}</a>*/}
                    </h5>
                    <small>
                        <TimeAgo date={this.props.courseInstance.last_updated}/>
                    </small>
                </div>
                {/*<div className="d-flex w-100 justify-content-between">*/}
                {/*    /!*<a onClick={this.editGradeEntryEH}>Edit</a>*!/*/}
                {/*</div>*/}
            </MDBListGroupItem>
        );
    }
}

export default connect(
    mapStateToProps
)(withRouter(CourseInstance));