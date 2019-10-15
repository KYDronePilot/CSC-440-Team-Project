import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';
import AsyncSelect from 'react-select/async';
import {tokenConfig} from '../actions/auth';
import axios from 'axios';
import {setDataNotLoaded} from '../actions/commonActions';
import {objectIsEmpty} from '../utils';

function mapStateToProps(state) {
    return {
        state,
        student: state.auth.user
    };
}

class AddCourseInstanceForm extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        toggleVisible: PropTypes.func.isRequired,
        state: PropTypes.object.isRequired,
        student: PropTypes.object.isRequired,
        semesterId: PropTypes.number.isRequired,
        setDataNotLoaded: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            saveEnabled: false,
            courseInstanceId: -1
        };

        this.resultToString = this.resultToString.bind(this);
        this.loadCourseInstances = this.loadCourseInstances.bind(this);
        this.onCourseInstanceSelectChange = this.onCourseInstanceSelectChange.bind(this);
        this.getCourseInstance = this.getCourseInstance.bind(this);
        this.updateCourseInstance = this.updateCourseInstance.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Get a string representation of a course instance search result.
     * @param
     */
    resultToString(result) {
        return `${result.course.code} - ${result.course.name}, section ${result.section}`;
    }

    /**
     * Search for course instance options for the current semester.
     * @returns {*}
     */
    loadCourseInstances(inputValue, callback) {
        const config = tokenConfig(() => this.props.state);
        config.params = {
            search: inputValue,
            exclude_self: '',
            semester_id: this.props.semesterId
        };

        axios.get('http://localhost:8000/api/course-instance-search/', config)
            .then(res => {
                const options = res.data.map(result => ({
                    label: this.resultToString(result),
                    value: result.id
                }));
                callback(options);
            })
            .catch(err => console.log('Error while searching course instances'));
    }

    /**
     * Get course instance from ID.
     * @param courseInstanceId {number} - ID of course instance
     */
    async getCourseInstance(courseInstanceId) {
        return axios.get(
            `http://localhost:8000/api/course-instances/${courseInstanceId}/`,
            tokenConfig(() => this.props.state))
            .catch(err => console.log(err))
    }

    /**
     * Update a course instance.
     * @param courseInstance {Object} - Course instance to update
     */
    async updateCourseInstance(courseInstance) {
        const config = tokenConfig(() => this.props.state);
        const body = {
            id: courseInstance.id,
            students: courseInstance.students
        };
        return axios.patch(`http://localhost:8000/api/course-instances/${courseInstance.id}/`, body, config)
            .catch(err => {
                console.log('Failed to update course instance');
            });
    }

    /**
     * Handle submission of the form.
     * @param e {Event} - Submission event
     */
    handleFormSubmit(e) {
        e.preventDefault();

        this.getCourseInstance(this.state.courseInstanceId)
            .then(res => res.data)
            .then(courseInstance => {
                courseInstance.students.push(this.props.student.id);
                this.updateCourseInstance(courseInstance)
                    .then(() => {
                        // Reload data
                        this.props.setDataNotLoaded();
                    });
            });
    }

    onCourseInstanceSelectChange(option) {
        if (option === null)
            this.setState({courseInstanceId: -1});
        else
            this.setState({courseInstanceId: option.value});
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
                                    loadOptions={this.loadCourseInstances}
                                    defaultOptions
                                    onChange={this.onCourseInstanceSelectChange}
                                />
                            </MDBContainer>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn
                                color={'primary'}
                                type={'submit'}
                                disabled={this.state.courseInstanceId === -1}
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
    {
        setDataNotLoaded
    }
)(AddCourseInstanceForm);