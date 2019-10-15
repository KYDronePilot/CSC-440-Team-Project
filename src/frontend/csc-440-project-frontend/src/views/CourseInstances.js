import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCourseInstances} from '../actions/courseInstanceActions';

function mapStateToProps(state) {
    return {
        courseInstances: state.courseInstances.items
    };
}

class CourseInstances extends Component {
    componentWillMount() {
        this.props.fetchCourseInstances();
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    fetchCourseInstances
)(CourseInstances);