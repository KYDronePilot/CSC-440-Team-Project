import React, {Component, Fragment} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import PrivateRoute from './components/routes/PrivateRoute';
import {loadUser} from './actions/auth';
import Header from './components/layout/Header';
import CategoryView from './components/views/CategoryView';
import Semesters from './components/semesters/Semesters';
import CourseInstances from './components/course_instance/CourseInstances';
import CourseInstanceView from './components/course_instance/CourseInstanceView';
import GradeTrackerRoute from './components/routes/GradeTrackerRoute';

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Router>
                        <Fragment>
                            <Header/>
                            <div>
                                <Switch>
                                    {/*<PrivateRoute exact path={'/'} component={CategoryView}/>*/}
                                    <GradeTrackerRoute exact path={'/'} component={Semesters}/>
                                    {/*<PrivateRoute path={'/courses'} component={CourseInstances}/>*/}
                                    <GradeTrackerRoute path={'/semester/:semesterId'} component={CourseInstances}/>
                                    <GradeTrackerRoute path={'/course/:courseId'} component={CourseInstanceView}/>
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
