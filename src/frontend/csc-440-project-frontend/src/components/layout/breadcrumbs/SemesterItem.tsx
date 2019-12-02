import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BreadcrumbItem} from './common';
import {Semester} from '../../../api/types';
import {SEMESTER_URL} from '../../../routes/urls';
import {semesterToString} from '../../../api/semester';

function mapStateToProps(state: any) {
    return {
        semesters: state.semester.semesters
    };
}

interface SemesterItemProps {
    semesterId: number,
    semesters: {
        [key: number]: Semester
    },
    active: boolean
}

/**
 * Semester breadcrumb item.
 */
class SemesterItem extends Component<SemesterItemProps, {}> {
    constructor(props: SemesterItemProps) {
        super(props);
        this.semester = this.semester.bind(this);
    }

    semester() {
        return this.props.semesters[this.props.semesterId];
    }

    render() {
        return (
            <BreadcrumbItem
                link={`${SEMESTER_URL}${this.props.semesterId}/`}
                active={this.props.active}
                key={'semester'}
            >
                {semesterToString(this.semester())}
            </BreadcrumbItem>
        );
    }
}

export default connect(
    mapStateToProps
)(SemesterItem);
