import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import {objectIsEmpty} from '../../actions/utils';

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
        student: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            saveEnabled: false,
            courseInstance: {}
        };
    }

    /**
     * Search for course instance options for the current semester.
     * @returns {*}
     */
    loadCourseInstances(inputValue, callback) {

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
    mapStateToProps
)(AddCourseInstanceForm);