import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';
import {tokenConfig} from '../actions/auth';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import {addStudentSemesterRelationship, semesterToString} from '../actions/semesterActions';
import {objectIsEmpty} from '../utils';
import {SEMESTERS_URL} from '../api/urls';

function mapStateToProps(state) {
    return {
        state,
        student: state.auth.user
    };
}

class AddSemesterForm extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        toggleVisible: PropTypes.func.isRequired,
        state: PropTypes.object.isRequired,
        addStudentSemesterRelationship: PropTypes.func.isRequired,
        student: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            saveEnabled: false,
            semester: {}
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.loadSemesters = this.loadSemesters.bind(this);
        this.onSemesterSelectChange = this.onSemesterSelectChange.bind(this);
    }

    /**
     * Search for semester options asynchronously.
     */
    loadSemesters(inputValue, callback) {
        const config = tokenConfig(() => this.props.state);
        config.params = {
            search: inputValue,
            exclude_student_id: ''
        };
        axios.get(SEMESTERS_URL, config)
            .then(res => {
                const options = res.data.map(semester => ({
                    label: semesterToString(semester),
                    value: semester
                }));
                callback(options);
            })
            .catch(err => console.log('Error while searching semesters'));
    }

    /**
     * Handle submission of the form.
     * @param e {Event} - Submission event
     */
    handleFormSubmit(e) {
        e.preventDefault();

        // Add student to semester
        const semester = this.state.semester;
        semester.students.push(this.props.student.id);

        this.props.addStudentSemesterRelationship(semester, this.props.toggleVisible);
    }

    onSemesterSelectChange(option) {
        if (option === null)
            this.setState({semester: {}});
        else
            this.setState({semester: option.value});
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.visible} toggle={this.props.toggleVisible} size={'lg'}>
                    <form
                        noValidate onSubmit={this.handleFormSubmit}
                    >
                        <MDBModalHeader toggle={this.props.toggleVisible}>Add a Semester</MDBModalHeader>
                        <MDBModalBody>
                            <MDBContainer>
                                <AsyncSelect
                                    cacheOptions
                                    loadOptions={this.loadSemesters}
                                    defaultOptions
                                    onChange={this.onSemesterSelectChange}
                                />
                            </MDBContainer>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn
                                color={'primary'}
                                type={'submit'}
                                disabled={objectIsEmpty(this.state.semester)}
                            >
                                Save
                            </MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default connect(
    mapStateToProps,
    {addStudentSemesterRelationship}
)(AddSemesterForm);