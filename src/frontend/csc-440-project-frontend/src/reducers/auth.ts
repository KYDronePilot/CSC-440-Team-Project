import {
    ADD_SEMESTER_TO_STUDENT,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REMOVE_SEMESTER_FROM_STUDENT,
    USER_LOADED,
    USER_LOADING
} from '../actions/types';
import produce from 'immer';
import {AuthActionTypes} from '../actions/auth';
import check from 'check-types';
import {User} from '../api/types';

export interface UserSubState extends User {
}

export interface AuthState {
    token?: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    user?: UserSubState;
}

/**
 * Get token from browser, returning undefined if no token.
 */
const getLocalToken = (key: string) => {
    const token = localStorage.getItem('token');
    return token === null ? undefined : token;
};

const initialState: AuthState = {
    token: getLocalToken('token'),
    isAuthenticated: false,
    isLoading: true,
    user: undefined
};

/**
 * Reducer for user operations.
 * @param action - Dispatched user action item
 * @param draft - Draft state
 */
function userReducer(action: AuthActionTypes, draft: UserSubState) {
    switch (action.type) {
        case ADD_SEMESTER_TO_STUDENT:
            draft.semesters.push(action.payload);
            break;
        case REMOVE_SEMESTER_FROM_STUDENT:
            const semesterIndex = draft.semesters.indexOf(action.payload);
            draft.semesters.splice(semesterIndex, 1);
            break;
        default:
            break;
    }
}

export default (state = initialState, action: AuthActionTypes) => produce(state, draft => {
    switch (action.type) {
        case USER_LOADING:
            draft.isLoading = true;
            break;
        case USER_LOADED:
            draft.isAuthenticated = true;
            draft.isLoading = false;
            draft.user = action.payload;
            break;
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            draft.user = action.payload.user;
            draft.token = action.payload.token;
            draft.isAuthenticated = true;
            draft.isLoading = false;
            break;
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            draft.token = undefined;
            draft.user = undefined;
            draft.isAuthenticated = false;
            draft.isLoading = false;
            break;
        default:
            if (!check.undefined(draft.user))
                userReducer(action, draft.user);
            break;
    }
});
