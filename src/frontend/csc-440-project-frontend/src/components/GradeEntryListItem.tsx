import React, {Component} from 'react';
import {MDBBtn, MDBListGroupItem} from 'mdbreact';
import TimeAgo from 'react-timeago';
import {formatScore} from '../api/gradeEntry';
import {GradeEntryStats} from '../api/courseInstance';


interface GradeEntryListItemProps {
    name: string;
    id: number;
    lastUpdated: string;
    stats: GradeEntryStats;
    editGradeEntry: (gradeEntryId: number) => void;
}

class GradeEntryListItem extends Component<GradeEntryListItemProps, {}> {
    /**
     * Component for displaying the points/score of the grade entry.
     */
    scoreComponent() {
        const pointsFraction = `${this.props.stats.points} / ${this.props.stats.maxPoints}`;
        const formattedScore = formatScore(this.props.stats.score);

        return (
            <h6 className={'font-weight-bold'}>
                {pointsFraction} = {formattedScore}
            </h6>
        );
    }

    render() {
        return (
            <MDBListGroupItem>
                <div className={'d-flex w-100 justify-content-between'}>
                    <h5 className={'mb-1'}>{this.props.name}</h5>
                    <small>
                        <TimeAgo date={this.props.lastUpdated}/>
                    </small>
                </div>
                <div className="d-flex w-100 justify-content-between">
                    {this.scoreComponent()}
                    <MDBBtn
                        className={'btn-link p-0'}
                        color={''}
                        onClick={() => this.props.editGradeEntry(this.props.id)}>
                        Edit
                    </MDBBtn>
                </div>
            </MDBListGroupItem>
        );
    }
}

export default GradeEntryListItem;
