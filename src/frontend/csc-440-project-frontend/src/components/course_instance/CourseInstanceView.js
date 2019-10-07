import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {allInstances} from '../../actions/utils';
import CategoryView from '../categories/CategoryView';
import GradeEntryForm from '../grade_entries/GradeEntryForm';
import CategoryForm from '../categories/CategoryForm';
import {openCreateCategoryForm} from '../../actions/categoryActions';
import {MDBBtn} from 'mdbreact';

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
        categories: PropTypes.object.isRequired,
        openCreateCategoryForm: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};

        this.courseInstanceId = this.courseInstanceId.bind(this);
        this.courseInstance = this.courseInstance.bind(this);
        this.course = this.course.bind(this);
        this.categories = this.categories.bind(this);
        this.openCreateCategoryForm = this.openCreateCategoryForm.bind(this);
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

    /**
     * Open form for creating new category.
     */
    openCreateCategoryForm(e) {
        e.preventDefault();
        this.props.openCreateCategoryForm(this.courseInstanceId());
    }

    render() {
        const courseInstance = this.courseInstance();
        const course = this.course();

        return (
            <div>
                <GradeEntryForm/>
                <CategoryForm/>
                <h1>{course.name}</h1>
                <MDBBtn color={'secondary'} onClick={this.openCreateCategoryForm}>
                    Add Category
                </MDBBtn>
                {this.categories().map(category => <CategoryView key={category.id} category={category}/>)}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {openCreateCategoryForm}
)(CourseInstanceView);