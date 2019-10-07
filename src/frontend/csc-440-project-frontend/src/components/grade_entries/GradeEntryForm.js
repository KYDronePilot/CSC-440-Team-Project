import React from 'react';
import BaseForm from '../form/BaseForm';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';
import TextInput from '../form/Items/TextInput';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    createGradeEntry,
    deleteGradeEntry,
    toggleForm,
    updateFormField,
    updateFormState,
    updateGradeEntry
} from '../../actions/gradeEntryActions';
import validator from 'validator';
import {GRADE_ENTRY_FORM_CREATE_MODE, GRADE_ENTRY_FORM_EDIT_MODE} from '../../actions/types';
import {DeleteButtonWithConfirmation} from '../common/forms';

function mapStateToProps(state) {
    return {
        visible: state.gradeEntry.form.isOpen,
        displayValidation: state.gradeEntry.form.displayValidation,
        fields: state.gradeEntry.form.fields,
        mode: state.gradeEntry.form.mode,
        editedGradeEntry: state.gradeEntry.editedGradeEntry,
        categoryId: state.gradeEntry.form.activeCategoryId
    };
}

class GradeEntryForm extends BaseForm {
    static propTypes = {
        createGradeEntry: PropTypes.func.isRequired,
        visible: PropTypes.bool.isRequired,
        displayValidation: PropTypes.bool.isRequired,
        fields: PropTypes.object.isRequired,
        updateFormField: PropTypes.func.isRequired,
        updateFormState: PropTypes.func.isRequired,
        toggleForm: PropTypes.func.isRequired,
        mode: PropTypes.oneOf([GRADE_ENTRY_FORM_CREATE_MODE, GRADE_ENTRY_FORM_EDIT_MODE]),
        updateGradeEntry: PropTypes.func.isRequired,
        deleteGradeEntry: PropTypes.func.isRequired,
        categoryId: PropTypes.number.isRequired,
        editedGradeEntry: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.isEdited = this.isEdited.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        /**
         * Validation functions for inputs.
         */
        this.inputValidators = {
            name: this.validateName,
            points: this.validatePoints,
            max_points: this.validateMaxPoints
        };
    }

    /**
     * Validate the grade entry name.
     * @param value {string} - Value to check
     * @return {string} Validation feedback if invalid, else empty string
     */
    validateName(value) {
        if (value.length === 0) {
            return 'Please enter a name for the grade entry';
        }
        return '';
    }

    /**
     * Validate points.
     * @param value {string} - Value to check
     * @return {string} Validation feedback if invalid, else empty string
     */
    validatePoints(value) {
        if (value.length === 0) {
            return 'Please enter the number of points obtained';
        }
        if (!validator.isInt(value) && !validator.isFloat(value))
            return 'Value must be a number';
        return '';
    }

    /**
     * Validate max points.
     * @param value {string} - Value to check
     * @return {string} Validation feedback if invalid, else empty string
     */
    validateMaxPoints(value) {
        if (value.length === 0) {
            return 'Please enter the max number of points obtainable';
        }
        if (!validator.isInt(value) && !validator.isFloat(value))
            return 'Value must be a number';
        return '';
    }

    /**
     * Handle changes to any of the input items.
     *  - Updates the value, validity, and invalid feedback (if any) of the input
     * @param e Event
     */
    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const validationFeedback = this.inputValidators[name](value);

        // Update info
        this.props.updateFormField(name, {
            value,
            valid: validationFeedback === '',
            invalidFeedback: validationFeedback
        });
    }

    /**
     * Check if the edit form was changed with respect to the active grade entry.
     *  - Returns true if not in edit mode.
     * @return {boolean} Whether the edit form has been changed
     */
    isEdited() {
        if (!(this.props.mode === GRADE_ENTRY_FORM_EDIT_MODE))
            return true;
        return (!(
            this.props.fields.name.value === this.props.editedGradeEntry.name
            && this.props.fields.points.value === this.props.editedGradeEntry.points
            && this.props.fields.max_points.value === this.props.editedGradeEntry.max_points
        ));
    }

    /**
     * Validate and submit the form.
     *  - If invalid, validation feedback is enabled
     * @param e {Event} - Form submit event
     */
    submitHandler(e) {
        e.preventDefault();

        // Ensure fields are valid
        if (!(this.props.fields.name.valid && this.props.fields.points.valid && this.props.fields.max_points.valid)) {
            this.props.updateFormState({displayValidation: true});
            return;
        }

        // Create new entry if in create mode
        if (this.props.mode === GRADE_ENTRY_FORM_CREATE_MODE) {
            this.props.createGradeEntry(
                this.props.fields.name.value,
                this.props.fields.points.value,
                this.props.fields.max_points.value,
                this.props.categoryId
            );
        } else if (this.props.mode === GRADE_ENTRY_FORM_EDIT_MODE && this.isEdited()) {
            // Update the entry if in edit mode and the form was edited
            const entry = {
                ...this.props.editedGradeEntry,
                name: this.props.fields.name.value,
                points: this.props.fields.points.value,
                max_points: this.props.fields.max_points.value
            };

            this.props.updateGradeEntry(entry);
        } else {
            // Close the form if they didn't edit it
            this.props.toggleForm();
        }
    }

    /**
     * Handle delete confirmation button.
     */
    handleDelete() {
        this.props.deleteGradeEntry(this.props.editedGradeEntry);
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.visible} toggle={this.props.toggleForm} size={'lg'}>
                    <form
                        noValidate onSubmit={this.submitHandler}
                    >
                        <MDBModalHeader toggle={this.props.toggleForm}>Add a Grade Entry</MDBModalHeader>
                        <MDBModalBody>
                            <MDBContainer>
                                <TextInput
                                    name={'name'} label={'Name'} onChange={this.handleChange}
                                    displayFeedback={this.props.displayValidation}
                                    invalidFeedback={this.props.fields.name.invalidFeedback}
                                    valid={this.props.fields.name.valid} value={this.props.fields.name.value}
                                />
                                <TextInput
                                    name={'points'} label={'Points'} onChange={this.handleChange}
                                    displayFeedback={this.props.displayValidation}
                                    invalidFeedback={this.props.fields.points.invalidFeedback}
                                    hint={'Number of points obtained'}
                                    valid={this.props.fields.points.valid} value={this.props.fields.points.value}
                                />
                                <TextInput
                                    name={'max_points'} label={'Max Points'} onChange={this.handleChange}
                                    displayFeedback={this.props.displayValidation}
                                    invalidFeedback={this.props.fields.max_points.invalidFeedback}
                                    hint={'Max points obtainable'} valid={this.props.fields.max_points.valid}
                                    value={this.props.fields.max_points.value}
                                />
                            </MDBContainer>
                        </MDBModalBody>
                        <MDBModalFooter>
                            {this.props.mode === GRADE_ENTRY_FORM_EDIT_MODE &&
                            <DeleteButtonWithConfirmation handleDelete={this.handleDelete}/>
                            }
                            <MDBBtn color={'primary'} type={'submit'}>Save</MDBBtn>
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
        createGradeEntry,
        updateFormField,
        updateFormState,
        toggleForm,
        updateGradeEntry,
        deleteGradeEntry
    }
)(GradeEntryForm);