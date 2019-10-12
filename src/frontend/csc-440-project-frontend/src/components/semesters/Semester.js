import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MDBBtn, MDBListGroupItem} from 'mdbreact';
import TimeAgo from 'react-timeago';
// import {setActiveSemester} from '../../actions/semesterActions';
import {withRouter} from 'react-router';
import {Link, Redirect} from 'react-router-dom';
import DeleteWarning from '../common/DeleteWarning';
import {removeStudentSemesterRelationship} from '../../actions/semesterActions';
import {setDataNotLoaded} from '../../actions/commonActions';
import {setDataLoaded} from '../../actions/commonActions';

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

function mapStateToProps(state) {
    return {
        dataLoaded: state.common.dataLoaded
    };
}

class Semester extends Component {
    static propTypes = {
        semester: PropTypes.object,
        removeStudentSemesterRelationship: PropTypes.func.isRequired,
        dataLoaded: PropTypes.bool.isRequired,
        setDataNotLoaded: PropTypes.func.isRequired,
        setDataLoaded: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            deleteWarningVisible: false,
            redirectSemester: false
        };

        this.name = this.name.bind(this);
        this.toggleDeleteWarningVisible = this.toggleDeleteWarningVisible.bind(this);
        this.deleteSemester = this.deleteSemester.bind(this);
        // this.handleSemesterSelect = this.handleSemesterSelect.bind(this);
    }

    /**
     * Name of semester.
     */
    name() {
        return `${seasonNames[this.props.semester.season]}, ${this.props.semester.year}`;
    }

    toggleDeleteWarningVisible() {
        this.setState(state => ({deleteWarningVisible: !state.deleteWarningVisible}));
    }

    deleteSemester() {
        this.props.removeStudentSemesterRelationship(this.props.semester, () => {
            // // this.setState({redirectSemester: true})
            // this.props.setDataNotLoaded();
            // // TODO: This shouldn't be done here
            // loadData().then(() => this.props.setDataLoaded());
        });
    }

    render() {
        if (this.state.redirectSemester)
            return <Redirect to={'/'}/>;
        return (
            <MDBListGroupItem>
                <DeleteWarning
                    toggleVisible={this.toggleDeleteWarningVisible}
                    visible={this.state.deleteWarningVisible}
                    onConfirmation={this.deleteSemester}
                >
                    This will delete all courses in this semester and all information about
                    each course. This action is irreversible.
                </DeleteWarning>
                <div className={'d-flex w-100 justify-content-between'}>
                    <h5 className={'mb-1'}>
                        <Link to={`/semester/${this.props.semester.id}`}>{this.name()}</Link>
                        {/*<a onClick={this.handleSemesterSelect}>{this.name()}</a>*/}
                    </h5>
                    <small>
                        <TimeAgo date={this.props.semester.last_updated}/>
                    </small>
                    <MDBBtn onClick={this.toggleDeleteWarningVisible}>Delete</MDBBtn>
                </div>
                <div className="d-flex w-100 justify-content-between">
                    {/*<a onClick={this.editGradeEntryEH}>Edit</a>*/}
                </div>
            </MDBListGroupItem>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        removeStudentSemesterRelationship,
        setDataNotLoaded,
        setDataLoaded
    }
)(withRouter(Semester));