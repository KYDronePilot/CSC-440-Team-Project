import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MDBListGroupItem} from 'mdbreact';
import TimeAgo from 'react-timeago';

// Semester constants
const FALL = 'fall';
const WINTER = 'winter';
const SPRING = 'spring';
const SUMMER = 'summer';
const seasonNames = {
    [FALL]: 'Fall',
    [WINTER]: 'Winter',
    [SPRING]: 'Spring',
    [SUMMER]: 'Summer'
};

function mapStateToProps(state) {
    return {};
}

class Semester extends Component {
    static propTypes = {
        semester: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {};

        this.name = this.name.bind(this);
        this.handleSemesterSelect = this.handleSemesterSelect.bind(this);
    }

    /**
     * Name of semester.
     */
    name() {
        return `${seasonNames[this.props.semester.season]}, ${this.props.semester.year}`;
    }

    /**
     * Handle selection of a semester.
     */
    handleSemesterSelect(e) {
        e.preventDefault();
        console.log('You clicked a semester link!');
    }

    render() {
        return (
            <MDBListGroupItem>
                <div className={'d-flex w-100 justify-content-between'}>
                    <h5 className={'mb-1'}>
                        <a onClick={this.handleSemesterSelect}>{this.name()}</a>
                    </h5>
                    <small>
                        <TimeAgo date={this.props.semester.last_updated}/>
                    </small>
                </div>
                <div className="d-flex w-100 justify-content-between">
                    {/*<a onClick={this.editGradeEntryEH}>Edit</a>*/}
                </div>
            </MDBListGroupItem>
        );
    }
}

export default connect(
    mapStateToProps
)(Semester);