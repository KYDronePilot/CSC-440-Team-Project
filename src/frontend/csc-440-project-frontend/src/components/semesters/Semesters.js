import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchSemesters} from '../../actions/semesterActions';
import {MDBContainer, MDBListGroup} from 'mdbreact';
import {indexInstances} from '../../actions/utils';
import Semester from './Semester';
import {fetchCourses} from '../../actions/courseActions';
import {fetchCourseInstances} from '../../actions/courseInstanceActions';
import {fetchGradeEntries} from '../../actions/gradeEntryActions';
import {fetchCategories} from '../../actions/categoryActions';

function mapStateToProps(state) {
    return {
        semesters: state.semester.semesters,
        userSemesterIDs: state.auth.user.semesters
    };
}

class Semesters extends Component {
    static propTypes = {
        fetchSemesters: PropTypes.func.isRequired,
        semesters: PropTypes.object,
        userSemesterIDs: PropTypes.arrayOf(PropTypes.number),
        fetchCourses: PropTypes.func.isRequired,
        fetchCourseInstances: PropTypes.func.isRequired,
        fetchGradeEntries: PropTypes.func.isRequired,
        fetchCategories: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};

        this.userEnrolledSemesters = this.userEnrolledSemesters.bind(this);
    }

    componentDidMount() {
        // TEMP: load in everything
        this.props.fetchSemesters();
        this.props.fetchCourses();
        this.props.fetchCourseInstances();
        this.props.fetchGradeEntries();
        this.props.fetchCategories();
    }

    /**
     * Semesters in which the user is enrolled in.
     * @return {Array} Semesters the user is enrolled in
     */
    userEnrolledSemesters() {
        return indexInstances(this.props.semesters, this.props.userSemesterIDs);
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBListGroup>
                        {this.userEnrolledSemesters().map(item => <Semester key={item.id} semester={item}/>)}
                    </MDBListGroup>
                </MDBContainer>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        fetchSemesters,
        fetchCourses,
        fetchCourseInstances,
        fetchGradeEntries,
        fetchCategories
    }
)(Semesters);