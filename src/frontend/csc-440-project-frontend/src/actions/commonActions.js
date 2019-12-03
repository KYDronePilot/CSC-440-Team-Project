import {
    CLEAR_CATEGORIES,
    CLEAR_COURSE_INSTANCES,
    CLEAR_COURSES, CLEAR_CSRS, CLEAR_GRADE_ENTRIES,
    CLEAR_SEMESTERS,
    DATA_LOADED,
    DATA_NOT_LOADED,
    FORCE_DATA_RELOAD,
    FORCE_DATA_RELOAD_RESET
} from './types';

export const setDataLoaded = () => dispatch => {
    dispatch({
        type: DATA_LOADED
    });
};

export const setDataNotLoaded = () => dispatch => {
    dispatch({
        type: DATA_NOT_LOADED
    });
};

export const forceDataReload = () => dispatch => {
    dispatch({
        type: FORCE_DATA_RELOAD
    });
};

export const forceDataReloadReset = () => dispatch => {
    dispatch({
        type: FORCE_DATA_RELOAD_RESET
    });
};

/**
 * Clear all state.
 */
export const clearState = () => dispatch => {
    dispatch({
        type: CLEAR_SEMESTERS
    });
    dispatch({
        type: CLEAR_COURSES
    });
    dispatch({
        type: CLEAR_COURSE_INSTANCES
    });
    dispatch({
        type: CLEAR_GRADE_ENTRIES
    });
    dispatch({
        type: CLEAR_CATEGORIES
    });
    dispatch({
        type: CLEAR_CSRS
    });
};
