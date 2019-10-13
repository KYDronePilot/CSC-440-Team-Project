import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL, DATA_NOT_LOADED, FORCE_DATA_RELOAD
} from './types';


/**
 * Check token and load user
 */
export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    axios.get('http://localhost:8000/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({type: USER_LOADED,
            payload: res.data})
        })
        .catch(err => {
            console.log('Auth error: CHANGE THIS MESSAGE!!!');
            dispatch({
                type: AUTH_ERROR
            })
        })
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

    axios.post('http://localhost:8000/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            // Force state reload
            dispatch({
                type: FORCE_DATA_RELOAD
            });
        })
        .catch(err => {
            console.log('Auth error: CHANGE THIS MESSAGE!!!');
            dispatch({
                type: LOGIN_FAIL
            })
        })
};

/**
 * Register user
 * @param username
 * @param password
 * @return {Function}
 */
export const register = ({username, email, password}) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({username, email, password});

    axios.post('http://localhost:8000/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log('Register fail: CHANGE THIS MESSAGE!!!');
            dispatch({
                type: REGISTER_FAIL
            })
        })
};


/**
 * Logout user
 */
export const logout = () => (dispatch, getState) => {
    axios.post('http://localhost:8000/api/auth/logout/', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        })
        .catch(err => {
            console.log('Auth error: CHANGE THIS MESSAGE!!!');
        })
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
