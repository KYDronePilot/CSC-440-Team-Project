import React, {Component} from 'react';
import PropTypes from 'prop-types';
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

class TextInput extends Component {
    static propTypes = {
        invalidFeedback: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string
        ]),
        validFeedback: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string
        ]),
        valid: PropTypes.bool,
        displayFeedback: PropTypes.bool,
        name: PropTypes.string,
        label: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        hint: PropTypes.string
    };
    static type = 'text';

    constructor(props) {
        super(props);

        this.feedbackClass = this.feedbackClass.bind(this);
        this.formatFeedback = this.formatFeedback.bind(this);
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
    formatFeedback(feedback) {
        if (typeof feedback !== typeof [] || feedback === null)
            return [feedback];
        console.log(typeof feedback !== typeof []);
        return feedback;
    }

    render() {
        return (
            <MDBInput
                name={this.props.name} label={this.props.label}
                onChange={this.props.onChange} type={TextInput.type}
                className={`form-control ${this.feedbackClass()}`}
                value={this.props.value} hint={this.props.hint}
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