import React, {Component} from 'react';
import {MDBBtn, MDBContainer, MDBListGroup} from 'mdbreact';
import PropTypes from 'prop-types';
import GradeEntry from './GradeEntry';
import NewGradeEntry from './GradeEntryForm';
import {connect} from 'react-redux';
import {openGradeEntryForm, closeGradeEntryForm} from '../../actions/gradeEntryActions';


function mapStateToProps(state) {
    return {
        gradeEntryFormVisible: state.gradeEntry.form.isOpen
    };
}

/**
 * List view for grade entries.
 */
class GradeEntries extends Component {
    static propTypes = {
        gradeEntries: PropTypes.arrayOf(PropTypes.object),
        gradeEntryFormVisible: PropTypes.bool.isRequired,
        openGradeEntryForm: PropTypes.func.isRequired,
        closeGradeEntryForm: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div>
                <NewGradeEntry/>
                <MDBContainer>
                    <MDBListGroup>
                        {this.props.gradeEntries.map(item => <GradeEntry key={item.id} gradeEntry={item}/>)}
                    </MDBListGroup>
                    <div className={'d-flex w-100'}>
                        <MDBBtn color={'secondary'} onClick={this.props.openGradeEntryForm} className={'ml-auto'}>
                            Add Grade Entry
                        </MDBBtn>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        openGradeEntryForm,
        closeGradeEntryForm
    }
)(GradeEntries);