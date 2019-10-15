import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MDBBtn, MDBContainer, MDBListGroup} from 'mdbreact';
import GradeEntry from '../components/GradeEntryListItem';

function mapStateToProps(state) {
    return {
        csrs: state.csr.csrs
    };
}

class CsrList extends Component {
    static propTypes = {
        csrs: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <MDBContainer>
                <MDBListGroup>
                    {this.props.csr.map(item => (
                        <GradeEntry key={item.id} gradeEntry={item}/>
                    ))}
                </MDBListGroup>
                <div className={'d-flex w-100'}>
                    <MDBBtn color={'secondary'} onClick={this.openCreateForm} className={'ml-auto'}>
                        Add Grade Entry
                    </MDBBtn>
                </div>
            </MDBContainer>
        );
    }
}

export default connect(
    mapStateToProps
)(CsrList);