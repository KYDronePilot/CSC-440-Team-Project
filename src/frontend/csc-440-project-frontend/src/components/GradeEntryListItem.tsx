import React, {Component} from 'react';
import {MDBBtn, MDBListGroupItem} from 'mdbreact';
import TimeAgo from 'react-timeago';
import {formatScore} from '../api/gradeEntry';


interface GradeEntryListItemProps {
    name: string;
    id: number;
    points: number;
    maxPoints: number;
    lastUpdated: string;
    editGradeEntry: (gradeEntryId: number) => void;
}

class GradeEntryListItem extends Component<GradeEntryListItemProps, {}> {
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
                    <h6 className={'font-weight-bold'}>
                        {this.props.points} / {this.props.maxPoints}
                        = {formatScore(this.props.points / this.props.maxPoints)}
                    </h6>
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
