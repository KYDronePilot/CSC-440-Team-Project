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

interface TextInputProps {
    invalidFeedback: string | string[];
    validFeedback: string | string[];
    valid: boolean;
    displayFeedback: boolean;
    name: string;
    label: string;
    onChange: (e: FormEvent<HTMLInputElement>) => void;
    value: string | number | null;
    hint: string;
}

class TextInput extends Component<TextInputProps, {}> {
    static type = 'text';

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
     * @param feedback {Any} - Feedback to wrap
     * @return {*[]|*} Wrapped feedback
     */
    formatFeedback(feedback: string | string[] | number | null) {
        if (!Array.isArray(feedback) || feedback === null)
            return [feedback];
        return feedback;
    }

    /**
     * Clean the value prop.
     *  - Ensure it is a blank string instead of null.
     */
    cleanValue() {
        return this.props.value === null ? '' : this.props.value;
    }

    render() {
        return (
            <MDBInput
                name={this.props.name} label={this.props.label}
                onChange={this.props.onChange} type={TextInput.type}
                className={`form-control ${this.feedbackClass()}`}
                value={this.cleanValue()} hint={this.props.hint}
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
