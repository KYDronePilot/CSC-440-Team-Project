import React, {Component, Fragment} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './views/LoginView';
import Register from './views/RegisterView';
import {loadUser} from './actions/auth';
import Header from './components/layout/Header';
import SemestersView from './views/GradeTrackerView';
import SemesterView from './views/SemesterView';
import CourseInstanceView from './views/CourseInstanceView';
import GradeTrackerRoute from './routes/GradeTrackerRoute';
import ConcentrationProgressView from './views/ConcentrationProgressView';
import {
    CONCENTRATION_PROGRESS_URL_DEF,
    COURSE_URL_DEF,
    LOGIN_URL_DEF,
    REGISTER_URL_DEF,
    ROOT_URL,
    SEMESTER_URL_DEF
} from './routes/urls';

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Router>
                        <Fragment>
                            <Header/>
                            <div>
                                <Switch>
                                    {/*<PrivateRoute exact path={'/'} component={CategoryView}/>*/}
                                    <GradeTrackerRoute exact path={ROOT_URL} component={SemestersView}/>
                                    {/*<PrivateRoute path={'/courses'} component={CourseInstances}/>*/}
                                    <GradeTrackerRoute path={SEMESTER_URL_DEF} component={SemesterView}/>
                                    <GradeTrackerRoute path={COURSE_URL_DEF} component={CourseInstanceView}/>
                                    <GradeTrackerRoute path={CONCENTRATION_PROGRESS_URL_DEF}
                                                       component={ConcentrationProgressView}/>
                                    <Route exact path={REGISTER_URL_DEF} component={Register}/>
                                    <Route exact path={LOGIN_URL_DEF} component={Login}/>
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </div>
            </Provider>
        );
    }
}

export default App;
