import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {allInstances} from '../utils/objectification_utils';
import {MDBBtn, MDBContainer, MDBListGroup} from 'mdbreact';
import CourseInstance from '../components/CourseInstanceListItem';
import AddCourseInstanceForm from '../containers/AddCourseInstanceForm';
import {SemesterBreadcrumb} from '../components/layout/breadcrumbs';
import {getSemesterCourseInstances} from '../api/courseInstance';
import {getCourseInstanceGradeEntries} from '../api/gradeEntry';

function mapStateToProps(state, ownProps) {
    const courseInstances = getSemesterCourseInstances(
        allInstances(state.courseInstance.courseInstances),
        parseInt(ownProps.match.params.semesterId)
    );
    for (const courseInstance of courseInstances) {
        courseInstance.gradeEntries = getCourseInstanceGradeEntries(
            allInstances(state.gradeEntry.gradeEntries),
            allInstances(state.category.categories),
            courseInstance.id
        );
    }
    return {
        courseInstances
    };
}

class SemesterView extends Component {
    static propTypes = {
        courseInstances: PropTypes.array.isRequired
        // activeSemesterID: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            addFormVisible: false
        };

        this.semesterId = this.semesterId.bind(this);
        this.toggleAddFormVisible = this.toggleAddFormVisible.bind(this);
    }

    /**
     * Current semester ID for this view (from URL).
     */
    semesterId() {
        return parseInt(this.props.match.params.semesterId);
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
                        {this.props.courseInstances.map(item => (
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
