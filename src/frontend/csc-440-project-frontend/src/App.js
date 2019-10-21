import React, {Component, Fragment} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './views/LoginView';
import Register from './views/RegisterView';
import {loadUser} from './actions/auth';
import Header from './components/layout/Header';
import SemestersView from './views/SemestersView';
import SemesterView from './views/SemesterView';
import CourseInstanceView from './views/CourseInstanceView';
import GradeTrackerRoute from './routes/GradeTrackerRoute';
import ConcentrationProgressView from './views/ConcentrationProgressView';

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
                                    <GradeTrackerRoute exact path={'/'} component={SemestersView}/>
                                    {/*<PrivateRoute path={'/courses'} component={CourseInstances}/>*/}
                                    <GradeTrackerRoute path={'/semester/:semesterId'} component={SemesterView}/>
                                    <GradeTrackerRoute path={'/course/:courseId'} component={CourseInstanceView}/>
                                    <GradeTrackerRoute path={'/concentration-progress'} component={ConcentrationProgressView}/>
                                    <Route exact path={'/register'} component={Register}/>
                                    <Route exact path={'/login'} component={Login}/>
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
