import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Base from './Base';

class Text extends Base {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.onChange = this.onChange.bind(this);
    }

    static propTypes = {
        name: PropTypes.string
    };

    // Styles for the text input
    static inputStyles = {
        className: 'test'
    };
    // Type of input tag
    static type = 'text';

    /**
     * Handle changes to the field.
     * @param e: Change event
     */
    onChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <div>
                <label>
                    <input type={Text.type} style={Text.inputStyles} name={this.props.name}
                           onChange={this.onChange} value={this.state.value}/>
                </label>
            </div>
        );
    }
}

export default Text;