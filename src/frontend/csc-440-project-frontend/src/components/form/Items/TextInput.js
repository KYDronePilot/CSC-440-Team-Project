import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MDBInput, MDBInputGroup} from 'mdbreact';

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
        invalidFeedback: PropTypes.string,
        validFeedback: PropTypes.string,
        valid: PropTypes.bool,
        displayFeedback: PropTypes.bool,
        name: PropTypes.string,
        label: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.string,
        hint: PropTypes.string
    };
    static type = 'text';

    constructor(props) {
        super(props);

        this.feedbackClass = this.feedbackClass.bind(this);
    }

    /**
     * Get bootstrap class for controlling visibility of field feedback.
     */
    feedbackClass() {
        if (!this.props.displayFeedback || (this.props.valid && !this.props.validFeedback))
            return '';
        return this.props.valid ? 'is-valid' : 'is-invalid';
    }

    render() {
        return (
            <MDBInput
                name={this.props.name} label={this.props.label}
                onChange={this.props.onChange} type={TextInput.type}
                className={`form-control ${this.feedbackClass()}`}
                value={this.props.value} hint={this.props.hint}
            >
                {this.props.invalidFeedback &&
                <div className={'invalid-feedback text-left'}>
                    {this.props.invalidFeedback}
                </div>}
                <div className={'valid-feedback text-left'}>
                    {this.props.validFeedback}
                </div>
            </MDBInput>
        );
    }
}

export default TextInput;