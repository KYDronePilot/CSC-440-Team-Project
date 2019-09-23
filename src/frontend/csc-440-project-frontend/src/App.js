import React, {Component, Fragment} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import PrivateRoute from './components/common/PrivateRoute';
import {loadUser} from './actions/auth';
import Header from './components/layout/Header';
import CategoryView from './components/views/CategoryView';
import Semesters from './components/semesters/Semesters';

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
                                    <PrivateRoute exact path={'/'} component={CategoryView}/>
                                    <PrivateRoute exact path={'/semesters'} component={Semesters}/>
                                    <Route exact path={'/register'} component={Register}/>
                                    <Route exact path={'/login'} component={Login}/>
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                    {/*<header className="App-header">*/}
                    {/*  <img src={logo} className="App-logo" alt="logo" />*/}
                    {/*  <p>*/}
                    {/*    Edit <code>src/App.js</code> and save to reload.*/}
                    {/*  </p>*/}
                    {/*  <a*/}
                    {/*    className="App-link"*/}
                    {/*    href="https://reactjs.org"*/}
                    {/*    target="_blank"*/}
                    {/*    rel="noopener noreferrer"*/}
                    {/*  >*/}
                    {/*    Learn React*/}
                    {/*  </a>*/}
                    {/*</header>*/}
                    {/*<Text label={'Some Label'}/>*/}
                    {/*<NewSemesterForm/>*/}
                    {/*<Register/>*/}
                </div>
            </Provider>
        );
    }
}

export default App;
