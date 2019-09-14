import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Base from './Base';
import {MDBInput} from 'mdbreact';


class Text extends MDBInput {
    constructor(props) {
        super(props);
        // this.state = {value: ''};

        // this.onChange = this.onChange.bind(this);
    }

    // static propTypes = {
    //     name: PropTypes.string,
    //     label: PropTypes.string,
    //     size: PropTypes.oneOf(['sm', 'md', 'lg'])
    // };

    // Styles for the text input
    // static inputStyles = {
    //     className: 'test'
    // };
    // Type of input tag
    static type = 'text';

    // /**
    //  * Handle changes to the field.
    //  * @param e: Change event
    //  */
    // onChange(e) {
    //     this.setState({value: e.target.value});
    //     console.log(e.target.value)
    // }

    render() {
        return (
            <MDBInput type={Text.type} {...this.props}/>
        );
    }
}

export default Text;