import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {allInstances} from '../utils/objectification_utils';
import {MDBBtn, MDBContainer, MDBListGroup} from 'mdbreact';
import CourseInstance from '../components/CourseInstanceListItem';
import AddCourseInstanceForm from '../containers/AddCourseInstanceForm';
import {SemesterBreadcrumb} from '../components/layout/breadcrumbs';

function mapStateToProps(state) {
    return {
        courseInstances: state.courseInstance.courseInstances
    };
}

class SemesterView extends Component {
    static propTypes = {
        courseInstances: PropTypes.object.isRequired
        // activeSemesterID: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            addFormVisible: false
        };

        this.activeCourseInstances = this.activeCourseInstances.bind(this);
        this.semesterId = this.semesterId.bind(this);
        this.toggleAddFormVisible = this.toggleAddFormVisible.bind(this);
    }

    /**
     * Current semester ID for this view (from URL).
     */
    semesterId() {
        return parseInt(this.props.match.params.semesterId);
    }

    /**
     * Get course instances related to the current semester.
     */
    activeCourseInstances() {
        const instances = allInstances(this.props.courseInstances);
        return instances.filter(instance => instance.semester === this.semesterId());
    }

    toggleAddFormVisible() {
        this.setState(state => ({
            addFormVisible: !state.addFormVisible
        }));
    }

    render() {
        return (
            <div>
                <AddCourseInstanceForm
                    visible={this.state.addFormVisible}
                    toggleVisible={this.toggleAddFormVisible}
                    semesterId={this.semesterId()}
                />
                <SemesterBreadcrumb semesterId={this.semesterId()}/>
                <MDBContainer>
                    <MDBListGroup>
                        {this.activeCourseInstances().map(item => (
                            <CourseInstance key={item.id} courseInstance={item}/>
                        ))}
                    </MDBListGroup>
                </MDBContainer>
                <MDBBtn onClick={this.toggleAddFormVisible} className={'primary'}>Add Course Instance</MDBBtn>
            </div>
        );
    }
}

export default connect(
    mapStateToProps
)(SemesterView);