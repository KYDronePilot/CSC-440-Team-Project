import React, {Component, ComponentType} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router';
import {clearState, forceDataReload, forceDataReloadReset, setDataLoaded} from '../actions/commonActions';
import {fetchSemesters} from '../actions/semesterActions';
import {fetchCourses} from '../actions/courseActions';
import {fetchCourseInstances} from '../actions/courseInstanceActions';
import {fetchGradeEntries} from '../actions/gradeEntryActions';
import {fetchCategories} from '../actions/categoryActions';
import {fetchCSRs} from '../actions/csrActions';
import {LOGIN_URL} from './urls';
import {AuthState} from '../reducers/auth';

interface StateProps {
    auth: AuthState;
    dataLoaded: boolean;
    forceDataReloadState: boolean;
}

interface DispatchProps {
    clearState: () => void;
    setDataLoaded: () => void;
    fetchSemesters: () => void;
    fetchCourses: () => void;
    fetchCourseInstances: () => void;
    fetchGradeEntries: () => void;
    fetchCategories: () => void;
    fetchCSRs: () => void;
    forceDataReload: () => void;
    forceDataReloadReset: () => void;
}

function mapStateToProps(state: any) {
    return {
        auth: state.auth,
        dataLoaded: state.common.dataLoaded,
        forceDataReloadState: state.common.forceDataReload
    };
}

interface GradeTrackerRouteProps extends StateProps, DispatchProps {
    component: ComponentType<{ [key: string]: any }>;
}

interface GradeTrackerRoutState {

}

class GradeTrackerRoute extends Component<GradeTrackerRouteProps, GradeTrackerRoutState> {
    constructor(props: GradeTrackerRouteProps) {
        super(props);

        this.loadData = this.loadData.bind(this);
        this.ensureDataLoaded = this.ensureDataLoaded.bind(this);
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

    ensureDataLoaded() {
        if (!this.props.dataLoaded) {
            this.loadData()
                .then(() => {
                    this.props.setDataLoaded();
                    this.props.forceDataReloadReset();
                })
                .catch(err => console.log(`Error while loading data: ${err}`));
        }
    }

    componentDidUpdate(prevProps: GradeTrackerRouteProps, prevState: GradeTrackerRoutState) {
        this.ensureDataLoaded();
    }

    componentDidMount() {
        this.ensureDataLoaded();
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
                        return <Redirect to={LOGIN_URL}/>;
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
        clearState,
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
