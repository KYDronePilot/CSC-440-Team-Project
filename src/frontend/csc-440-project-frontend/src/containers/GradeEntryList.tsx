import React, {Component} from 'react';
import {MDBListGroup} from 'mdbreact';
import GradeEntryListItem from '../components/GradeEntryListItem';
import {GradeEntry} from '../api/types';
import {GradeEntryStats} from '../api/courseInstance';
import {GradeTrackerButton} from '../components/Common';


interface GradeEntryListProps {
    gradeEntries: GradeEntry[];
    openCreateGradeEntryForm: () => void;
    editGradeEntry: (gradeEntryId: number) => void;
    gradeEntryStats: GradeEntryStats[];
}

/**
 * List view for grade entries.
 */
class GradeEntryList extends Component<GradeEntryListProps, {}> {
    render() {
        return (
            <div>
                <MDBListGroup>
                    {this.props.gradeEntries.map((gradeEntry, i) => (
                        <GradeEntryListItem
                            key={gradeEntry.id}
                            name={gradeEntry.name}
                            id={gradeEntry.id}
                            lastUpdated={gradeEntry.last_updated}
                            stats={this.props.gradeEntryStats[i]}
                            editGradeEntry={this.props.editGradeEntry}
                        />
                    ))}
                </MDBListGroup>
                <div className={'text-right mt-2'}>
                    <GradeTrackerButton
                        onClick={() => this.props.openCreateGradeEntryForm()}
                        className={'mr-0'}>
                        Add Grade Entry
                    </GradeTrackerButton>
                </div>
            </div>
        );
    }
}

export default GradeEntryList;
