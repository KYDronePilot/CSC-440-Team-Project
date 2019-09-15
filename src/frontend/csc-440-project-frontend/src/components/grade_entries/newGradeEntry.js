import React, {Component} from 'react';
// import BaseForm from './BaseForm';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBInput} from 'mdbreact';
import TextInput from '../form/Items/TextInput';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createGradeEntry} from '../../actions/gradeEntryActions';

function mapStateToProps(state) {
    return {
        activeCategory: state.category.activeCategory
    };
}

class NewGradeEntry extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        toggleVisible: PropTypes.func.isRequired,
        createGradeEntry: PropTypes.func.isRequired,
        activeCategory: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            displayValidation: false,
            name: {
                value: '',
                valid: false
            },
            points: {
                value: '',
                valid: false
            },
            max_points: {
                value: '',
                valid: false
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.close = this.close.bind(this);

        /**
         * Validation functions for inputs.
         */
        this.inputValidators = {
            name: value => value.length > 0,
            points: value => value.length > 0,
            max_points: value => value.length > 0
        };
    }

    /**
     * Handle closing of the modal.
     */
    close() {
        this.setState({
            displayValidation: false,
            name: {
                value: '',
                valid: false
            },
            points: {
                value: '',
                valid: false
            },
            max_points: {
                value: '',
                valid: false
            }
        });
        this.props.toggleVisible();
    }

    /**
     * Handle changes to any of the input items.
     *  - Updates the value and validity of the input's state
     * @param e Event
     */
    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(state => ({
            ...state,
            [name]: {
                value: value,
                valid: this.inputValidators[name](value)
            }
        }));
        // console.log(this.state);
        // console.log(name);
        // console.log(value);
    }

    /**
     * Handle submissions of the form.
     *  - Displays validation info
     */
    submitHandler() {
        if (!(this.state.name.valid && this.state.points.valid && this.state.max_points.valid))
            this.setState({displayValidation: true});
        this.props.createGradeEntry(
            this.state.name.value,
            this.state.points.value,
            this.state.max_points.value,
            this.props.activeCategory.id
        );
        this.close();
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.visible} toggle={this.props.toggleVisible} size={'lg'}>
                    <MDBModalHeader toggle={this.close}>Add a Semester</MDBModalHeader>
                    <MDBModalBody>
                        <MDBContainer>
                            <TextInput
                                name={'name'} label={'Name'} onChange={this.handleChange}
                                displayFeedback={this.state.displayValidation}
                                invalidFeedback={'Invalid grade entry name'}
                                valid={this.state.name.valid} value={this.state.name.value}
                            />
                            <TextInput
                                name={'points'} label={'Points'} onChange={this.handleChange}
                                displayFeedback={this.state.displayValidation}
                                invalidFeedback={'Please enter a valid number of points obtained'}
                                hint={'Number of points obtained'}
                                valid={this.state.points.valid} value={this.state.points.value}
                            />
                            <TextInput
                                name={'max_points'} label={'Max Points'} onChange={this.handleChange}
                                displayFeedback={this.state.displayValidation}
                                invalidFeedback={'Please enter a valid number for the max number of points'}
                                hint={'Max points obtainable'} valid={this.state.max_points.valid}
                                value={this.state.max_points.value}
                            />
                        </MDBContainer>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color={'primary'} onClick={this.submitHandler}>Submit</MDBBtn>
                        {/*<MDBBtn color={'secondary'} onClick={this.toggleVisible}>Close</MDBBtn>*/}
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default connect(
    mapStateToProps,
    {createGradeEntry}
)(NewGradeEntry);