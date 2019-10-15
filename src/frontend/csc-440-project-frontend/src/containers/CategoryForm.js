import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import validator from 'validator';
import {
    createCategory,
    deleteCategory,
    toggleForm,
    updateCategory,
    updateFormField,
    updateFormState
} from '../actions/categoryActions';
import {CATEGORY_FORM_CREATE_MODE, CATEGORY_FORM_EDIT_MODE, POINT_BASED} from '../actions/types';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';
import TextInput from '../components/TextInput';
import {allInstances} from '../utils/objectification_utils';
import Select from 'react-select';
import {csrName} from '../actions/csrActions';
import {DeleteButtonWithConfirmation} from '../components/forms';

function mapStateToProps(state) {
    const categoryForm = state.category.form;

    return {
        visible: categoryForm.isOpen,
        displayValidation: categoryForm.displayValidation,
        fields: categoryForm.fields,
        mode: categoryForm.mode,
        editCategoryId: categoryForm.editCategoryId,
        activeCourseInstanceId: categoryForm.activeCourseInstanceId,
        categories: state.category.categories,
        courseInstances: state.courseInstance.courseInstances,
        csrs: state.csr.csrs
    };
}

const blankStringToNull = value => value.length === 0 ? null : value;

class CategoryForm extends Component {
    static propTypes = {
        // Mapped state
        visible: PropTypes.bool.isRequired,
        displayValidation: PropTypes.bool.isRequired,
        fields: PropTypes.object.isRequired,
        mode: PropTypes.string.isRequired,
        editCategoryId: PropTypes.number.isRequired,
        activeCourseInstanceId: PropTypes.number.isRequired,
        categories: PropTypes.object.isRequired,
        courseInstances: PropTypes.object.isRequired,
        csrs: PropTypes.object.isRequired,
        // Redux functions
        createCategory: PropTypes.func.isRequired,
        updateFormField: PropTypes.func.isRequired,
        updateFormState: PropTypes.func.isRequired,
        toggleForm: PropTypes.func.isRequired,
        updateCategory: PropTypes.func.isRequired,
        deleteCategory: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.editCategory = this.editCategory.bind(this);
        this.areFieldsValid = this.areFieldsValid.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.courseInstance = this.courseInstance.bind(this);
        this.courseInstanceCsrs = this.courseInstanceCsrs.bind(this);
        this.csrOptions = this.csrOptions.bind(this);
        this.csrCategories = this.csrCategories.bind(this);
        this.handleCsrSelectChange = this.handleCsrSelectChange.bind(this);
        this.toCsrOption = this.toCsrOption.bind(this);
        this.toCsr = this.toCsr.bind(this);
        this.selectedCsrs = this.selectedCsrs.bind(this);
        this.pointWeightInput = this.pointWeightInput.bind(this);

        // Input validators
        this.inputValidators = {
            name: this.validateName,
            weight: this.validateWeight,
            max_points: this.validateMaxPoints,
            category_score_requirements: () => true
        };

        // Input cleaners
        this.inputCleaners = {
            name: blankStringToNull,
            weight: blankStringToNull,
            max_points: value => value,
            category_score_requirements: value => value
        };
    }

    validateName(value) {
        if (value.length === 0)
            return 'Please enter a name for the category';
        return '';
    }

    validateWeight(value) {
        if (value.length === 0) {
            return 'Please enter the weight for the category';
        }
        if (!validator.isInt(value) && !validator.isFloat(value))
            return 'Value must be a number';

        const valFloat = parseFloat(value);
        if (valFloat <= 0.0 || valFloat > 1.0)
            return 'Weight must be in decimal format, between 0 and 1';
        return '';
    }

    validateMaxPoints(value) {
        if (value.length === 0) {
            return 'Please enter the max points obtainable in the category';
        }
        if (!validator.isInt(value) && !validator.isFloat(value))
            return 'Value must be a number';
        // TODO: Check if the number of points plus other category points would be greater than the course's
        return '';
    }

    /**
     * Get the course instance this category is being added to.
     */
    courseInstance() {
        return this.props.courseInstances[this.props.activeCourseInstanceId];
    }

    /**
     * Get CSRs for the active course instance.
     */
    courseInstanceCsrs() {
        return allInstances(this.props.csrs).filter(csr => csr.course_instance === this.props.activeCourseInstanceId);
    }

    /**
     * Get categories for a particular CSR.
     * @param csr {Object} - CSR to match categories with
     * @return {Array} Categories related to the CSR
     */
    csrCategories(csr) {
        return allInstances(this.props.categories).filter(category => (
            category.category_score_requirements.includes(csr.id)
        ));
    }

    /**
     * Convert CSR to select option.
     */
    toCsrOption(csr) {
        return {
            value: csr.id,
            label: csrName(csr, this.csrCategories(csr))
        };
    }

    /**
     * Convert CSR ID to CSR
     * @param csrId
     */
    toCsr(csrId) {
        return this.props.csrs[csrId];
    }

    /**
     * Get CSR options for select input.
     */
    csrOptions() {
        return this.courseInstanceCsrs().map(csr => this.toCsrOption(csr));
    }

    /**
     * Get selected CSRs.
     */
    selectedCsrs() {
        return this.props.fields.category_score_requirements.value.map(csrId => (
            this.toCsrOption(this.toCsr(csrId))
        ));
    }

    /**
     * Handle changes to input items.
     * @param e {Event} - Change event
     */
    handleInputChange(e) {
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
     * Handle changes to the CSR multi select.
     * @param selectedIds {[number]} - Selected CSR IDs
     */
    handleCsrSelectChange(selectedIds) {
        if (selectedIds === null)
            this.props.updateFormField('category_score_requirements', {value: []});
        else
            this.props.updateFormField('category_score_requirements', {
                value: selectedIds.map(option => option.value)
            });
    }

    /**
     * Get edit category from ID.
     */
    editCategory() {
        return this.props.categories[this.props.editCategoryId];
    }

    /**
     * Check if form was edited.
     *  - Returns true if not in edit mode.
     *  @return {boolean} Whether the form has been edited
     */
    isEdited() {
        if (this.props.mode !== CATEGORY_FORM_EDIT_MODE)
            return true;

        const editCategory = this.editCategory();
        let changed = false;
        for (const field of Object.keys(this.props.fields)) {
            changed = changed || (this.props.fields[field] !== editCategory[field]);
        }
        return changed;
    }

    /**
     * Check if all fields are valid.
     */
    areFieldsValid() {
        return Object.keys(this.props.fields)
            .map(field => this.props.fields[field].valid)
            .reduce((valid, fieldValid) => {
                valid = valid && fieldValid;
                return valid;
            }, true);
    }

    /**
     * Handle form submissions.
     * @param e {Event} - Form submit event
     */
    submitHandler(e) {
        e.preventDefault();

        // Ensure fields are valid
        if (!this.areFieldsValid())
            return;

        // Create new category if in create mode
        if (this.props.mode === CATEGORY_FORM_CREATE_MODE) {
            this.props.createCategory(
                this.inputCleaners.name(this.props.fields.name.value),
                this.inputCleaners.weight(this.props.fields.weight.value),
                this.inputCleaners.max_points(this.props.fields.max_points.value),
                this.props.activeCourseInstanceId,
                this.inputCleaners.category_score_requirements(
                    this.props.fields.category_score_requirements.value)
            );
        } else if (this.props.mode === CATEGORY_FORM_EDIT_MODE && this.isEdited()) {
            // Update if in edit mode and form was edited
            this.props.updateCategory({
                ...this.editCategory(),
                name: this.inputCleaners.name(this.props.fields.name.value),
                weight: this.inputCleaners.weight(this.props.fields.weight.value),
                max_points: this.inputCleaners.max_points(this.props.fields.max_points.value),
                category_score_requirements: this.inputCleaners.category_score_requirements(
                    this.props.fields.category_score_requirements.value)
            });
        } else {
            // Close form if not edited
            this.props.toggleForm();
        }
    }

    /**
     * Handle deleting a category.
     */
    handleDelete() {
        this.props.deleteCategory(this.editCategory());
    }

    /**
     * Get either the points or weight input depending on the course grading strategy.
     */
    pointWeightInput() {
        const courseInstance = this.courseInstance();
        if (courseInstance === undefined)
            return;

        const weightInput = <TextInput
            name={'weight'} label={'Weight'} onChange={this.handleInputChange}
            displayFeedback={this.props.displayValidation}
            invalidFeedback={this.props.fields.weight.invalidFeedback}
            hint={'Weight in decimal format (40% = 0.40)'}
            valid={this.props.fields.weight.valid} value={this.props.fields.weight.value}
        />;
        const maxPointsInput = <TextInput
            name={'max_points'} label={'Max Points'} onChange={this.handleInputChange}
            displayFeedback={this.props.displayValidation}
            invalidFeedback={this.props.fields.max_points.invalidFeedback}
            hint={'Max points obtainable'} valid={this.props.fields.max_points.valid}
            value={this.props.fields.max_points.value}
        />;

        if (courseInstance.grading_strategy === POINT_BASED)
            return maxPointsInput;
        return weightInput;
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
                                    name={'name'} label={'Name'} onChange={this.handleInputChange}
                                    displayFeedback={this.props.displayValidation}
                                    invalidFeedback={this.props.fields.name.invalidFeedback}
                                    valid={this.props.fields.name.valid} value={this.props.fields.name.value}
                                />
                                {this.pointWeightInput()}
                                <Select
                                    isMulti name={'category_score_requirements'}
                                    options={this.csrOptions()} onChange={this.handleCsrSelectChange}
                                    value={this.selectedCsrs()}
                                />
                            </MDBContainer>
                        </MDBModalBody>
                        <MDBModalFooter>
                            {this.props.mode === CATEGORY_FORM_EDIT_MODE &&
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
        createCategory,
        updateFormField,
        updateFormState,
        toggleForm,
        updateCategory,
        deleteCategory
    }
)(CategoryForm);