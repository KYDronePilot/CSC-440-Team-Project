import React, {Fragment, Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux';
import TextInput from './components/form/Items/TextInput';
import store from './store';
import NewSemesterForm from './components/form/NewSemesterForm';
import GradeEntries from './components/grade_entries/GradeEntries';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import PrivateRoute from './components/common/PrivateRoute';
import {loadUser} from './actions/auth';
import Header from './components/layout/Header';
import CategoryView from './components/views/CategoryView';

class App extends Component{
    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Router>
                        <Fragment>
                            <Header />
                            <div>
                                <Switch>
                                    <PrivateRoute exact path={'/'} component={CategoryView}/>
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
