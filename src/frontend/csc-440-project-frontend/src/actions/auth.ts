import axios, {AxiosRequestConfig} from 'axios';
import {
    ADD_SEMESTER_TO_STUDENT,
    AUTH_ERROR,
    DATA_NOT_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REMOVE_SEMESTER_FROM_STUDENT,
    USER_LOADED,
    USER_LOADING
} from './types';
import {LOGIN_URL, LOGOUT_URL, REGISTER_URL, USER_URL} from '../api/urls';
import {clearState} from './commonActions';
import {UserSubState} from '../reducers/auth';
import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {User} from '../api/types';

/**
 * Returned result when a user is authenticated
 */
interface AuthenticatedUserResult {
    user: User;
    token: string;
}

interface UserLoadedAction {
    type: typeof USER_LOADED;
    payload: UserSubState;
}

interface AuthErrorAction {
    type: typeof AUTH_ERROR;
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: AuthenticatedUserResult;
}

interface LoginFailAction {
    type: typeof LOGIN_FAIL;
}

interface RegisterSuccessAction {
    type: typeof REGISTER_SUCCESS;
    payload: AuthenticatedUserResult;
}

interface RegisterFailAction {
    type: typeof REGISTER_FAIL;
}

interface DataNotLoadedAction {
    type: typeof DATA_NOT_LOADED;
}

interface LogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS;
}

interface AddSemesterToStudentAction {
    type: typeof ADD_SEMESTER_TO_STUDENT;
    payload: number;
}

interface RemoveSemesterFromStudentAction {
    type: typeof REMOVE_SEMESTER_FROM_STUDENT;
    payload: number;
}

interface UserLoadingAction {
    type: typeof USER_LOADING;
}

export type AuthActionTypes = UserLoadedAction | AuthErrorAction | LoginSuccessAction | LoginFailAction
    | RegisterSuccessAction | RegisterFailAction | DataNotLoadedAction | LogoutSuccessAction
    | AddSemesterToStudentAction | RemoveSemesterFromStudentAction | UserLoadingAction;


type RootState = any;
type ThunkResult<R> = ThunkAction<R, RootState, {}, Action>;

/**
 * Check token and load user
 */
export const loadUser = (): ThunkResult<void> => (dispatch, getState) => {
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
 */
export const login = (username: string, password: string): ThunkResult<void> => dispatch => {
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
 */
export const register = (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
): ThunkResult<void> => dispatch => {
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
export const logout = (): ThunkResult<void> => (dispatch, getState) => {
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
export const tokenConfig = (getState: () => RootState) => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config: AxiosRequestConfig = {
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
