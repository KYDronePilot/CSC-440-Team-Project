import React, {Component} from 'react';
import {MDBBtn, MDBContainer, MDBInput, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';
import validator from 'validator';


class NewSemesterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            displayValidation: false,
            schoolName: {
                value: '',
                valid: false
            },
            year: {
                value: '',
                valid: false
            }
        };

        this.toggleVisible = this.toggleVisible.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.validateYear = this.validateYear.bind(this);

        /**
         * Validation functions for inputs.
         */
        this.inputValidators = {
            schoolName: value => value.length > 0,
            year: this.validateYear
        };
    }

    /**
     * Toggle if the form modal is visible.
     */
    toggleVisible() {
        this.setState(state => ({visible: !state.visible}));
    }

    /**
     * Handle changes to any of the input items.
     *  - Updates the value and validity of the input's state
     * @param e Event
     */
    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: {value: value, valid: this.inputValidators[name](value)}})
    }

    /**
     * Handle submissions of the form.
     *  - Displays validation info
     * @param e Event
     */
    submitHandler(e) {
        e.preventDefault();
        this.setState({displayValidation: true});
    }

    /**
     * Validate the inputted year.
     * @param year {Any} - Year value to validate
     * @return {boolean} Whether the year is valid
     */
    validateYear(year) {
        if (!validator.isInt(year))
            return false;
        const yearInt = parseInt(year);
        return yearInt >= 1900 && yearInt <= new Date().getFullYear() + 1;
    }

    /**
     * Get the validation class for an input.
     * @param isValid {boolean} - Whether the input is valid or not
     * @return {string} The validation class if one should be displayed; else, blank string
     */
    validationClass(isValid) {
        if (!this.state.displayValidation)
            return '';
        return isValid ? 'is-valid' : 'is-invalid';
    }

    render() {
        return (
            <MDBContainer>
                <MDBBtn onClick={this.toggleVisible}>Add Semester</MDBBtn>
                <MDBModal isOpen={this.state.visible} toggle={this.toggleVisible} size={'lg'}>
                    <MDBModalHeader toggle={this.toggleVisible}>Add a Semester</MDBModalHeader>
                    <MDBModalBody>
                        <form
                            onSubmit={this.submitHandler}
                            noValidate
                        >
                            <MDBContainer>
                                <MDBInput
                                    name={'schoolName'} label={'School Name'} type={'text'}
                                    onChange={this.handleChange}
                                    className={`form-control ${this.validationClass(this.state.schoolName.valid)}`}
                                >
                                    <div className={'invalid-feedback text-left'}>
                                        Please enter a valid school name.
                                    </div>
                                    <div className={'valid-feedback text-left'}>Looks good!</div>
                                </MDBInput>
                                <MDBInput
                                    name={'year'} label={'Year'} type={'text'}
                                    onChange={this.handleChange}
                                    className={`form-control ${this.validationClass(this.state.year.valid)}`}
                                >
                                    <div className={'invalid-feedback text-left'}>
                                        Please enter a valid, current school year.
                                    </div>
                                    <div className={'valid-feedback text-left'}>Looks good!</div>
                                </MDBInput>
                            </MDBContainer>
                            <MDBBtn color={'primary'} type={'submit'}>Submit</MDBBtn>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color={'secondary'} onClick={this.toggleVisible}>Close</MDBBtn>
                        {/*<MDBBtn color="primary" type={'submit'}>Save changes</MDBBtn>*/}
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default NewSemesterForm;