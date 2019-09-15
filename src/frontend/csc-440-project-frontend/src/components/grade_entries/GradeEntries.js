import React, {Component} from 'react';
import {MDBBtn, MDBContainer, MDBListGroup} from 'mdbreact';
import PropTypes from 'prop-types';
import GradeEntry from './GradeEntry';
import NewGradeEntry from './newGradeEntry';


/**
 * List view for grade entries.
 */
class GradeEntries extends Component {
    static propTypes = {
        gradeEntries: PropTypes.arrayOf(PropTypes.object)
    };

    constructor(props) {
        super(props);
        this.state = {
            addGradeEntryVisible: false
        };
        this.toggleAddGradeEntryVisible = this.toggleAddGradeEntryVisible.bind(this);
    }

    /**
     * Toggle visibility of add grade entry form.
     */
    toggleAddGradeEntryVisible() {
        this.setState(state => ({addGradeEntryVisible: !state.addGradeEntryVisible}));
    }

    render() {
        return (
            <div>
                <NewGradeEntry
                    visible={this.state.addGradeEntryVisible}
                    toggleVisible={this.toggleAddGradeEntryVisible}
                />
                <MDBContainer>
                    <MDBListGroup>
                        {this.props.gradeEntries.map(item => <GradeEntry key={item.id} gradeEntry={item}/>)}
                    </MDBListGroup>
                    <div className={'d-flex w-100'}>
                        <MDBBtn color={'secondary'} onClick={this.toggleAddGradeEntryVisible} className={'ml-auto'}>
                            Add Grade Entry
                        </MDBBtn>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default GradeEntries;