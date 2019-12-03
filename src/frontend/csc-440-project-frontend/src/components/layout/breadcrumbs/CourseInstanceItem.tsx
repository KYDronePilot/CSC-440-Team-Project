import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BreadcrumbItem} from './common';
import {Course, CourseInstance} from '../../../api/types';
import {COURSE_URL} from '../../../routes/urls';

function mapStateToProps(state: any) {
    return {
        courseInstances: state.courseInstance.courseInstances,
        courses: state.course.courses
    };
}

interface CourseInstanceItemProps {
    courseInstanceId: number,
    courseInstances: {
        [key: number]: CourseInstance
    },
    courses: {
        [key: number]: Course
    },
    active: boolean
}

class CourseInstanceItem extends Component<CourseInstanceItemProps, {}> {
    constructor(props: CourseInstanceItemProps) {
        super(props);

        this.courseInstance = this.courseInstance.bind(this);
    }

    /**
     * Get course instance for given course instance ID.
     */
    courseInstance() {
        return this.props.courseInstances[this.props.courseInstanceId];
    }

    /**
     * Get course related to given course instance ID.
     */
    course() {
        return this.props.courses[this.courseInstance().course];
    }

    render() {
        return (
            <BreadcrumbItem
                link={`${COURSE_URL}${this.props.courseInstanceId}/`}
                active={this.props.active}
                key={'courseInstance'}
            >
                {this.course().name}
            </BreadcrumbItem>
        );
    }
}

export default connect(
    mapStateToProps
)(CourseInstanceItem);
