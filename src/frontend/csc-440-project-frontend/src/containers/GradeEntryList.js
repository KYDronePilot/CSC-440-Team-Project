import React, {Component} from 'react';
import {MDBBtn, MDBContainer, MDBListGroup} from 'mdbreact';
import * as PropTypes from 'prop-types';
import GradeEntry from '../components/GradeEntryListItem';
import {connect} from 'react-redux';
import {closeGradeEntryForm, openCreateGradeEntryForm, openGradeEntryForm} from '../actions/gradeEntryActions';


function mapStateToProps(state) {
    return {
        gradeEntryFormVisible: state.gradeEntry.form.isOpen
    };
}

/**
 * List view for grade entries.
 */
class GradeEntryList extends Component {
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
                <MDBListGroup>
                    {this.props.gradeEntries.map(item => (
                        <GradeEntry key={item.id} gradeEntry={item}/>
                    ))}
                </MDBListGroup>
                <div className={'text-right mt-2'}>
                    <MDBBtn
                        color={'secondary'}
                        onClick={this.openCreateForm}
                        className={'mr-0 btn heavy-rain-gradient'}
                        style={{fontSize: '16px', color: 'black'}}
                    >
                        Add Grade Entry
                    </MDBBtn>
                </div>
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
)(GradeEntryList);
