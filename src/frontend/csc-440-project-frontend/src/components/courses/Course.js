import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
    return {};
}

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {};

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default connect(
    mapStateToProps
)(Course);