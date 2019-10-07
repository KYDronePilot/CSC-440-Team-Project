import React, {Component} from 'react';
import {MDBBtn, MDBContainer, MDBListGroup} from 'mdbreact';
import PropTypes from 'prop-types';
import GradeEntry from './GradeEntry';
import {connect} from 'react-redux';
import {closeGradeEntryForm, openCreateGradeEntryForm, openGradeEntryForm} from '../../actions/gradeEntryActions';


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
        openCreateGradeEntryForm: PropTypes.func.isRequired,
        category: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.openCreateForm = this.openCreateForm.bind(this);
    }

    /**
     * Open form for creating new grade entry.
     */
    openCreateForm(e) {
        e.preventDefault();
        this.props.openCreateGradeEntryForm(this.props.category.id);
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBListGroup>
                        {this.props.gradeEntries.map(item => (
                            <GradeEntry key={item.id} gradeEntry={item}/>
                        ))}
                    </MDBListGroup>
                    <div className={'d-flex w-100'}>
                        <MDBBtn color={'secondary'} onClick={this.openCreateForm} className={'ml-auto'}>
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
        closeGradeEntryForm,
        openCreateGradeEntryForm
    }
)(GradeEntries);