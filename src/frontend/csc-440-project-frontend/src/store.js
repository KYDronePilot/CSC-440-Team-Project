import {applyMiddleware, createStore} from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import axios from 'axios';

const initialState = {};
const middleware = [thunk];
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

axios.interceptors.request.use(config => {
    const token = store.getState().auth.token;
    config.headers = {
        'Content-Type': 'application/json',
        ...config.headers
    };

    // Add token if available
    if (token)
        config.headers.Authorization = `Token ${token}`;

    return config;
});

export default store;