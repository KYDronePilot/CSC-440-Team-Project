import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {allInstances} from '../../actions/utils';
import {MDBContainer, MDBListGroup} from 'mdbreact';
import CourseInstance from './CourseInstance';

function mapStateToProps(state) {
    return {
        courseInstances: state.courseInstance.courseInstances,
        // activeSemesterID: state.semester.activeSemesterID
    };
}

class CourseInstances extends Component {
    static propTypes = {
        courseInstances: PropTypes.object.isRequired,
        // activeSemesterID: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {};

        this.activeCourseInstances = this.activeCourseInstances.bind(this);
        this.semesterId = this.semesterId.bind(this);
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

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBListGroup>
                        {this.activeCourseInstances().map(item => (
                            <CourseInstance key={item.id} courseInstance={item}/>
                        ))}
                    </MDBListGroup>
                </MDBContainer>
            </div>
        );
    }
}

export default connect(
    mapStateToProps
)(CourseInstances);