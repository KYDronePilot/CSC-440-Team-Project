import axios from 'axios';
import {
    AUTH_ERROR,
    DATA_NOT_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    USER_LOADING
} from './types';
import {LOGIN_URL, LOGOUT_URL, REGISTER_URL, USER_URL} from '../api/urls';
import {clearState} from './commonActions';

/**
 * Check token and load user
 */
export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    axios.get(USER_URL, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('Auth error: CHANGE THIS MESSAGE!!!');
            dispatch({
                type: AUTH_ERROR
            });
        });
};

/**
 * Login user
 * @return {Function}
 */
export const login = (username, password) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({username, password});

    axios.post(LOGIN_URL, body, config)
        .then(res => {
            // Force state reload
            dispatch({
                type: DATA_NOT_LOADED
            });

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('Auth error: CHANGE THIS MESSAGE!!!');
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

/**
 * Register user
 * @param username
 * @param password
 * @return {Function}
 */
export const register = ({firstName, lastName, username, email, password}) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({first_name: firstName, last_name: lastName, username, email, password});
    console.log(body);

    axios.post(REGISTER_URL, body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('Register fail: CHANGE THIS MESSAGE!!!');
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

/**
 * Logout user
 */
export const logout = () => (dispatch, getState) => {
    axios.post(LOGOUT_URL, null, tokenConfig(getState))
        .then(res => {
            // Clear state
            dispatch({
                type: LOGOUT_SUCCESS
            });

            clearState()(dispatch);
        })
        .catch(err => {
            console.log('Auth error: CHANGE THIS MESSAGE!!!');
        });
};

/**
 * Setup config with token
 */
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // If token, add to headers config
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }

    return config;
};
