import React, {Component} from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from 'mdbreact';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago'

class GradeEntry extends Component {
    constructor(props) {
        super(props);
        this.getPercentCorrect = this.getPercentCorrect.bind(this);
    }


    static propTypes = {
        gradeEntry: PropTypes.object
    };

    /**
     * Format the percentage of answers that are correct.
     * @return {string} Formatted percentage of points obtained
     */
    getPercentCorrect() {
        return `${((this.props.gradeEntry.points / this.props.gradeEntry.max_points) * 100).toFixed(1)}%`
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
                <p className={'mb-1'}>
                    {this.props.gradeEntry.points} / {this.props.gradeEntry.max_points} = {this.getPercentCorrect()}
                </p>
            </MDBListGroupItem>
        );
    }
}

export default GradeEntry;