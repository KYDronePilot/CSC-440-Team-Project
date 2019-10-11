import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';
import AsyncSelect from 'react-select/async';
import {objectIsEmpty} from '../../actions/utils';
import {tokenConfig} from '../../actions/auth';
import axios from 'axios';
import {loadData} from '../../actions/common';
import {setDataLoaded, setDataNotLoaded} from '../../actions/commonActions';

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
        setDataLoaded: PropTypes.func.isRequired,
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
        this.reloadState = this.reloadState.bind(this);
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
     * @param callback {Function} - Callback when the response is received
     */
    getCourseInstance(courseInstanceId, callback) {
        axios.get(
            `http://localhost:8000/api/course-instances/${courseInstanceId}/`,
            tokenConfig(() => this.props.state))
            .then(res => callback(res.data))
            .catch(err => {
                console.log('Failed to fetch course instance');
            });
    }

    /**
     * Update a course instance.
     * @param courseInstance {Object} - Course instance to update
     * @param callback {Function} - Callback when the response is received
     */
    updateCourseInstance(courseInstance, callback) {
        const config = tokenConfig(() => this.props.state);
        const body = {
            id: courseInstance.id,
            students: courseInstance.students
        };
        axios.patch(`http://localhost:8000/api/course-instances/${courseInstance.id}/`, body, config)
            .then(res => callback(res.data))
            .catch(err => {
                console.log('Failed to update course instance');
            });
    }

    /**
     * Reload all state.
     */
    reloadState() {
        this.props.setDataNotLoaded();
        loadData().then(() => this.props.setDataLoaded());
    }

    /**
     * Handle submission of the form.
     * @param e {Event} - Submission event
     */
    handleFormSubmit(e) {
        e.preventDefault();

        // Get and update the course instance
        this.getCourseInstance(this.state.courseInstanceId, courseInstance => {
            courseInstance.students.push(this.props.student.id);
            this.updateCourseInstance(courseInstance, () => {
                this.props.toggleVisible();
                this.reloadState();
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
        setDataLoaded,
        setDataNotLoaded
    }
)(AddCourseInstanceForm);