import React, {Component} from 'react';
import {MDBListGroupItem} from 'mdbreact';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import {editGradeEntry} from '../../actions/gradeEntryActions';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {};
}

class GradeEntry extends Component {
    static propTypes = {
        gradeEntry: PropTypes.object,
        editGradeEntry: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.getPercentCorrect = this.getPercentCorrect.bind(this);
        this.editGradeEntryEH = this.editGradeEntryEH.bind(this);
    }

    /**
     * Format the percentage of answers that are correct.
     * @return {string} Formatted percentage of points obtained
     */
    getPercentCorrect() {
        return `${((this.props.gradeEntry.points / this.props.gradeEntry.max_points) * 100).toFixed(1)}%`;
    }

    /**
     * Event handler wrapper for the grade entry edit link.
     * @param e {Event} - Event from click
     */
    editGradeEntryEH(e) {
        e.preventDefault();
        this.props.editGradeEntry(this.props.gradeEntry);
    }

    render() {
        return (
            <MDBListGroupItem>
                <div className={'d-flex w-100 justify-content-between'}>
                    <h5 className={'mb-1'}>{this.props.gradeEntry.name}</h5>
                    <small>
                        <TimeAgo date={this.props.gradeEntry.last_updated}/>
                    </small>
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <h6 className={'font-weight-bold'}>
                        {this.props.gradeEntry.points} / {this.props.gradeEntry.max_points} = {this.getPercentCorrect()}
                    </h6>
                    <a onClick={this.editGradeEntryEH}>Edit</a>
                </div>
            </MDBListGroupItem>
        );
    }
}

export default connect(
    mapStateToProps,
    {editGradeEntry}
)(GradeEntry);