import React, {Component, FormEvent} from 'react';
import {MDBInput} from 'mdbreact';
import check from 'check-types';

interface TextInputProps<Field> {
    /** HTML autocomplete tag for browser value prediction */
    autoComplete?: string;
    /** Classes passed to input component */
    className?: string;
    /** Whether to display feedback */
    displayFeedback: boolean;
    /** Faded text that appears inside the input field */
    hint?: string;
    /** Feedback if field is invalid. Assumed valid if no return */
    invalidFeedback?: (value: string) => (string | undefined);
    /** Temporary override of invalid feedback (useful for a server validation response) */
    invalidFeedbackOverride?: string;
    /** Label of input field displayed */
    label: string;
    /** Name of the field */
    name: string;
    /** Change handler */
    onChange: (name: Field, value: string) => void;
    /** Whether the field is a password field */
    password: boolean;
    /** Explicitly pass field validity */
    valid?: boolean | ((value: string) => boolean);
    /** Feedback when field is valid */
    validFeedback?: string;
    /** Value of field */
    value: string;
    /** Classes passed to the input wrapper div */
    wrapperClassName?: string;
}

interface TextInputState {
}

interface FormInputElement<Field extends string> extends HTMLInputElement {
    name: Field;
}

class TextInput<Field extends string> extends Component<TextInputProps<Field>, TextInputState> {
    static defaultProps = {
        password: false
    };

    constructor(props: TextInputProps<Field>) {
        super(props);

        this.feedbackClass = this.feedbackClass.bind(this);
        this.cleanedValue = this.cleanedValue.bind(this);
        this.onChange = this.onChange.bind(this);
        this.invalidFeedbackElement = this.invalidFeedbackElement.bind(this);
        this.validFeedbackElement = this.validFeedbackElement.bind(this);
        this.feedbackElement = this.feedbackElement.bind(this);
        this.isValid = this.isValid.bind(this);
        this.invalidFeedback = this.invalidFeedback.bind(this);
    }

    /**
     * Get bootstrap class for controlling visibility of field feedback.
     */
    feedbackClass() {
        if (!this.props.displayFeedback)
            return '';
        return this.isValid() ? 'is-valid' : 'is-invalid';
    }

    /**
     * Clean value to ensure it is not null.
     * @return Cleaned value prop
     */
    cleanedValue() {
        return check.null(this.props.value) ? undefined : this.props.value;
    }

    /**
     * Pass field changes to the change handler prop.
     * @param e - Input field change event
     */
    onChange(e: FormEvent<FormInputElement<Field>>) {
        this.props.onChange(e.currentTarget.name, e.currentTarget.value);
    }

    /**
     * Get invalid feedback element.
     * @return Invalid feedback element or empty element if no feedback
     */
    invalidFeedbackElement() {
        const feedback = this.invalidFeedback();

        if (check.undefined(feedback))
            return <></>;

        return (
            <div className={'invalid-feedback text-left'}>
                {this.invalidFeedback()}
            </div>
        );
    }

    /**
     * Get valid feedback element.
     * @return Valid feedback element or empty element if no feedback
     */
    validFeedbackElement() {
        if (check.undefined(this.props.validFeedback))
            return <></>;

        return (
            <div className={'valid-feedback text-left'}>
                {this.props.validFeedback}
            </div>
        );
    }

    /**
     * Get feedback element, if any, to display.
     * @return Feedback element, if any, to display
     */
    feedbackElement() {
        // No feedback if specified
        if (!this.props.displayFeedback)
            return <></>;

        // Choose type of feedback based on validity
        if (this.isValid())
            return this.validFeedbackElement();
        else
            return this.invalidFeedbackElement();
    }

    render() {
        const props = this.props;
        return (
            <div className={props.wrapperClassName}>
                <MDBInput
                    name={props.name}
                    label={props.label}
                    // @ts-ignore
                    onChange={this.onChange}
                    type={props.password ? 'password' : 'text'}
                    className={`form-control ${this.feedbackClass()} ${props.className}`}
                    value={this.cleanedValue()}
                    hint={props.hint}
                    autoComplete={props.autoComplete}
                >
                    {this.feedbackElement()}
                </MDBInput>
            </div>
        );
    }

    /**
     * Determine if field is valid.
     * @return Whether field is valid or not
     */
    private isValid(): boolean {
        const props = this.props;

        // If an invalid feedback override is specified, field must be invalid
        if (!check.undefined(props.invalidFeedbackOverride))
            return false;

        // If validity is explicitly set, use it
        if (!check.undefined(props.valid))
            return check.boolean(props.valid) ? props.valid : props.valid(props.value);

        // If invalid feedback, use it to determine validity
        if (!check.undefined(props.invalidFeedback))
            return check.undefined(props.invalidFeedback(props.value));

        // If no means of determining validity provided, field is always valid
        return true;
    }

    /**
     * Get invalid feedback for field, if any.
     * @return Invalid feedback if available, else undefined
     */
    private invalidFeedback(): string | undefined {
        const props = this.props;

        // If override, use it
        if (!check.undefined(props.invalidFeedbackOverride))
            return props.invalidFeedbackOverride;

        // If invalid feedback function, use it
        if (!check.undefined(props.invalidFeedback))
            return props.invalidFeedback(props.value);
    }
}

export default TextInput;
