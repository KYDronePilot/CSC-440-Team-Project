import React, {Component, FormEvent} from 'react';
import {MDBInput} from 'mdbreact';

// /**
//  * Filter by the keys of an object.
//  * @param obj {Object} - Object to filter
//  * @param keys {Array} - Keys to filter by
//  * @param inclusive {boolean} - Whether to include or exclude the specified keys
//  * @return {Object} Filtered object
//  */
// function filterObject(obj, keys, inclusive = false) {
//     return Object.keys(obj).filter(key => inclusive === keys.includes(key))
//         .reduce((newObj, key) => {
//             newObj[key] = obj[key];
//             return newObj;
//         }, {});
// }

type input = string | number | null;

interface TextInputProps {
    invalidFeedback: string[] | string;
    validFeedback: string[] | string;
    valid: boolean;
    displayFeedback: boolean;
    name: string;
    label: string;
    onChange: (e: FormEvent<HTMLInputElement>) => void;
    value: input | null;
    hint?: string;
    password: boolean;
    autoComplete?: string;
}

interface TextInputState {

}

class TextInput extends Component<TextInputProps, TextInputState> {
    static defaultProps = {
        invalidFeedback: [],
        validFeedback: [],
        password: false
    };

    constructor(props: TextInputProps) {
        super(props);

        this.feedbackClass = this.feedbackClass.bind(this);
        this.formatFeedback = this.formatFeedback.bind(this);
        this.cleanValue = this.cleanValue.bind(this);
    }

    /**
     * Get bootstrap class for controlling visibility of field feedback.
     */
    feedbackClass() {
        if (!this.props.displayFeedback || (this.props.valid && !this.props.validFeedback))
            return '';
        return this.props.valid ? 'is-valid' : 'is-invalid';
    }

    /**
     * Ensure feedback is always wrapped in an array.
     * @param feedback - Feedback to wrap
     * @return Wrapped feedback
     */
    formatFeedback(feedback: string[] | string): string[] {
        if (!Array.isArray(feedback))
            return [feedback];
        return feedback;
    }

    /**
     * Clean the value prop.
     *  - Ensure a null value is not passed
     */
    cleanValue() {
        return this.props.value === null ? '' : this.props.value;
    }

    render() {
        const props = this.props;
        return (
            <MDBInput
                name={props.name} label={props.label}
                onChange={props.onChange} type={props.password ? 'password' : 'text'}
                className={`form-control ${this.feedbackClass()}`}
                value={this.cleanValue()} hint={props.hint} autoComplete={props.autoComplete}
            >
                {this.formatFeedback(this.props.invalidFeedback).map((feedback, i) => (
                    <div key={i} className={'invalid-feedback text-left'}>
                        {feedback}
                    </div>
                ))}
                {this.formatFeedback(this.props.validFeedback).map((feedback, i) => (
                    <div key={i} className={'valid-feedback text-left'}>
                        {feedback}
                    </div>
                ))}
            </MDBInput>
        );
    }
}

export default TextInput;
