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

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    user: null
};

/**
 * Reducer for user operations.
 * @param action {Object} - Dispatched action item
 * @param draft {Object} - Draft state
 */
function userReducer(action, draft) {
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

export default (state = initialState, action) => produce(state, draft => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            userReducer(action, draft.user);
            break;
    }
});
