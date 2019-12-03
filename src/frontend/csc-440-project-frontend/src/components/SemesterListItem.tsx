import React, {Component} from 'react';
import {MDBBtn, MDBCol, MDBListGroupItem, MDBRow} from 'mdbreact';
import TimeAgo from 'react-timeago';
import {Link, Redirect} from 'react-router-dom';
import DeleteWarning from './DeleteWarning';
import {SEMESTER_URL} from '../routes/urls';
import {formatGpa, NO_GPA} from '../api/semester';

// Semester constants
const FALL = 'fall';
const WINTER = 'winter';
const SPRING = 'spring';
const SUMMER = 'summer';
const seasonNames = {
    [FALL]: 'Fall',
    [WINTER]: 'Winter',
    [SPRING]: 'Spring',
    [SUMMER]: 'Summer'
};

export type Season = typeof FALL | typeof WINTER | typeof SPRING | typeof SUMMER;

interface SemesterListItemProps {
    id: number;
    lastUpdated: string;
    season: Season;
    year: number;
    removeSemester: (semesterId: number) => void;
    gpa: number;
}

interface SemesterListItemState {
    deleteWarningVisible: boolean;
    redirectSemester: boolean;
}

class SemesterListItem extends Component<SemesterListItemProps, SemesterListItemState> {
    constructor(props: SemesterListItemProps) {
        super(props);
        this.state = {
            deleteWarningVisible: false,
            redirectSemester: false
        };

        this.name = this.name.bind(this);
        this.toggleDeleteWarningVisible = this.toggleDeleteWarningVisible.bind(this);
        this.formatGpa = this.formatGpa.bind(this);
    }

    /**
     * Name of semester.
     */
    name() {
        return `${seasonNames[this.props.season]}, ${this.props.year}`;
    }

    toggleDeleteWarningVisible() {
        this.setState(state => ({deleteWarningVisible: !state.deleteWarningVisible}));
    }

    /**
     * Format GPA info.
     */
    private formatGpa() {
        if (this.props.gpa === NO_GPA)
            return '';
        return <>GPA:&nbsp;{formatGpa(this.props.gpa)}</>
    }

    render() {
        const props = this.props;

        if (this.state.redirectSemester)
            return <Redirect to={'/'}/>;

        return (
            <MDBListGroupItem>
                <DeleteWarning
                    toggleVisible={this.toggleDeleteWarningVisible}
                    visible={this.state.deleteWarningVisible}
                    onConfirmation={() => props.removeSemester(props.id)}
                >
                    This will delete all courses in this semester and all information about
                    each course. This action is irreversible.
                </DeleteWarning>
                <MDBRow>
                    <MDBCol md={'8'} className={'d-flex w-100 justify-content-between'}>
                        <h5 className={'mb-1'}>
                            <Link to={`${SEMESTER_URL}${props.id}`}>{this.name()}</Link>
                        </h5>
                    </MDBCol>
                    <MDBCol md={'4'} className={'text-left text-md-right'}>
                        <small>
                            <TimeAgo date={props.lastUpdated}/>
                        </small>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={'8'} className={'d-flex w-100 justify-content-between'}>
                        <p className={'mb-1 font-weight-bold'}>
                            {this.formatGpa()}
                        </p>
                    </MDBCol>
                    <MDBCol md={'4'} className={'text-left text-md-right'}>
                        <MDBBtn color={''} onClick={this.toggleDeleteWarningVisible} className={'btn-link p-1'}>
                            Delete
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                {/*<div className="d-flex w-100 justify-content-between">*/}
                {/*    <a onClick={this.editGradeEntryEH}>Edit</a>*/}
                {/*</div>*/}
            </MDBListGroupItem>
        );
    }
}

export default SemesterListItem;
