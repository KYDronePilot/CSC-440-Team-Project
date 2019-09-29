import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import GradeEntries from '../grade_entries/GradeEntries';
import {allInstances} from '../../actions/utils';
import CategoryView from '../categories/CategoryView';

function mapStateToProps(state) {
    return {
        // courseInstanceID: state.courseInstance.activeCourseInstanceID,
        courseInstances: state.courseInstance.courseInstances,
        courses: state.course.courses,
        categories: state.category.categories
    };
}

class CourseInstanceView extends Component {
    static propTypes = {
        // courseInstanceID: PropTypes.number.isRequired,
        courseInstances: PropTypes.object.isRequired,
        courses: PropTypes.object.isRequired,
        categories: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};

        this.courseInstanceId = this.courseInstanceId.bind(this);
        this.courseInstance = this.courseInstance.bind(this);
        this.course = this.course.bind(this);
        this.categories = this.categories.bind(this);
    }

    /**
     * Current course instance ID for this view (from URL).
     */
    courseInstanceId() {
        return parseInt(this.props.match.params.courseId);
    }

    /**
     * Get the course instance to display.
     */
    courseInstance() {
        return this.props.courseInstances[this.courseInstanceId()];
    }

    /**
     * Get the course related to the active course instance.
     */
    course() {
        return this.props.courses[this.courseInstance().course];
    }

    /**
     * Get the categories associated with this course instance.
     */
    categories() {
        const categories = allInstances(this.props.categories);
        return categories.filter(category => category.course_instance === this.courseInstanceId());
    }

    render() {
        const courseInstance = this.courseInstance();
        const course = this.course();

        return (
            <div>
                <h1>{course.name}</h1>
                {this.categories().map(category => <CategoryView key={category.id} category={category}/>)}
            </div>
        );
    }
}

export default connect(
    mapStateToProps
)(CourseInstanceView);