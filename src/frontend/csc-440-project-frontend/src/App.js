import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux';
import Text from './components/form/Items/Text';
import store from './store';
import NewSemesterForm from './components/form/NewSemesterForm';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
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
                <NewSemesterForm/>
            </div>
        </Provider>
    );
}

export default App;
