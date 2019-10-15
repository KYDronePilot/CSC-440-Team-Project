import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router';
import * as PropTypes from 'prop-types';
import {setDataLoaded} from '../actions/commonActions';
import {fetchSemesters} from '../actions/semesterActions';
import {fetchCourses} from '../actions/courseActions';
import {fetchCourseInstances} from '../actions/courseInstanceActions';
import {fetchGradeEntries} from '../actions/gradeEntryActions';
import {fetchCategories} from '../actions/categoryActions';
import {fetchCSRs} from '../actions/csrActions';
import {forceDataReload, forceDataReloadReset} from '../actions/commonActions';

function mapStateToProps(state) {
    return {
        auth: state.auth,
        dataLoaded: state.common.dataLoaded,
        forceDataReloadState: state.common.forceDataReload
    };
}

class GradeTrackerRoute extends Component {
    static propTypes = {
        component: PropTypes.elementType.isRequired,
        auth: PropTypes.object.isRequired,
        setDataLoaded: PropTypes.func.isRequired,
        dataLoaded: PropTypes.bool.isRequired,
        fetchSemesters: PropTypes.func.isRequired,
        fetchCourses: PropTypes.func.isRequired,
        fetchCourseInstances: PropTypes.func.isRequired,
        fetchGradeEntries: PropTypes.func.isRequired,
        fetchCategories: PropTypes.func.isRequired,
        fetchCSRs: PropTypes.func.isRequired,
        forceDataReloadState: PropTypes.bool.isRequired,
        forceDataReload: PropTypes.func.isRequired,
        forceDataReloadReset: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
    }

    async loadData() {
        if (this.props.dataLoaded)
            return;
        await Promise.all([
            this.props.fetchSemesters(),
            this.props.fetchCourses(),
            this.props.fetchCourseInstances(),
            this.props.fetchGradeEntries(),
            this.props.fetchCategories(),
            this.props.fetchCSRs()
        ]);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.dataLoaded) {
            this.loadData()
                .then(() => {
                    this.props.setDataLoaded();
                    this.props.forceDataReloadReset();
                })
                .catch(err => console.log(`Error while loading data: ${err}`));
        }
    }

    render() {
        const {component: TheComponent, auth, ...other} = this.props;
        return (
            <Route
                {...other}
                render={props => {
                    if (auth.isLoading) {
                        return <h2>Loading...</h2>;
                    } else if (!auth.isAuthenticated) {
                        return <Redirect to={'/login'}/>;
                    } else if (!this.props.dataLoaded || this.props.forceDataReloadState) {
                        return <h2>Data loading</h2>;
                    } else {
                        return <TheComponent {...props}/>;
                    }
                }}
            />
        );
    }
}

export default connect(
    mapStateToProps,
    {
        setDataLoaded,
        fetchSemesters,
        fetchCourses,
        fetchCourseInstances,
        fetchGradeEntries,
        fetchCategories,
        fetchCSRs,
        forceDataReload,
        forceDataReloadReset
    }
)(GradeTrackerRoute);