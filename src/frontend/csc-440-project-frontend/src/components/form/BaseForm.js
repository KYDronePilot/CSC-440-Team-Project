import React, {Component} from 'react';

class BaseForm extends Component {
    /**
     * Check if value is an integer.
     * @param value {Any} - Value to check
     * @return {boolean} Whether the value is an integer
     */
    isInt(value) {
        return !isNaN(value) &&
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value, 10));
    }
}

export default BaseForm;