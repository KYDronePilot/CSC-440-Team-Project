import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import {MDBListGroupItem} from 'mdbreact';

function mapStateToProps(state) {
    return {};
}

/**
 * Category Score Requirement entry component.
 */
class CsrListItem extends Component {
    static propTypes = {
        csr: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <MDBListGroupItem>
                <div className={'d-flex w-100 justify-content-between'}>
                    <h5 className={'mb-1'}>{this.props.csr.name}</h5>
                    <small>
                        <TimeAgo date={this.props.csr.last_updated}/>
                    </small>
                </div>
                <div className={'d-flex w-100 justify-content-between'}>
                    {/*<a onClick={this.editGradeEntryEH}>Edit</a>*/}
                </div>
            </MDBListGroupItem>
        );
    }
}

export default connect(
    mapStateToProps
)(CsrListItem);