import axios from 'axios';
import {
    APPEND_GRADE_ENTRY,
    DELETE_GRADE_ENTRY,
    FETCH_GRADE_ENTRIES,
    GRADE_ENTRY_FORM_CLEAR,
    GRADE_ENTRY_FORM_CLOSE,
    GRADE_ENTRY_FORM_ENABLE_CREATE_MODE,
    GRADE_ENTRY_FORM_ENABLE_EDIT_MODE,
    GRADE_ENTRY_FORM_ERROR,
    GRADE_ENTRY_FORM_LOAD_DATA,
    GRADE_ENTRY_FORM_OPEN,
    GRADE_ENTRY_FORM_SUBMITTED,
    GRADE_ENTRY_FORM_SUCCESS,
    GRADE_ENTRY_FORM_UPDATE_FIELD,
    GRADE_ENTRY_FORM_UPDATE_STATE,
    GRADE_ENTRY_SET_ACTIVE_CATEGORY_ID,
    REPLACE_GRADE_ENTRY,
    SET_EDITED_GRADE_ENTRY
} from './types';
import {tokenConfig} from './auth';
import {GRADE_ENTRIES_URL} from '../api/urls';

export const fetchGradeEntries = category_id => (dispatch, getState) => {
    const config = tokenConfig(getState);

    return axios.get(GRADE_ENTRIES_URL, config)
        .then(res =>
            dispatch({
                type: FETCH_GRADE_ENTRIES,
                payload: res.data
            })
        );
};

export const createGradeEntry = (name, points, max_points, category_id) => (dispatch, getState) => {
    dispatch({
        type: GRADE_ENTRY_FORM_SUBMITTED
    });

    const config = tokenConfig(getState);

    const body = JSON.stringify({
        name,
        points,
        max_points,
        category: category_id
    });

    axios.post(GRADE_ENTRIES_URL, body, config)
        .then(res => {
            dispatch({
                type: GRADE_ENTRY_FORM_SUCCESS
            });
            dispatch({
                type: GRADE_ENTRY_FORM_CLEAR
            });
            dispatch({
                type: APPEND_GRADE_ENTRY,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(`Error occurred when creating a grade entry:`);
            console.log(err.response);
            dispatch({
                type: GRADE_ENTRY_FORM_ERROR,
                payload: err.response
            });
        });
};

export const openGradeEntryForm = () => dispatch => {
    dispatch({
        type: GRADE_ENTRY_FORM_OPEN
    });
};

export const closeGradeEntryForm = () => dispatch => {
    dispatch({
        type: GRADE_ENTRY_FORM_CLOSE
    });
};

export const updateFormField = (field, newValues) => dispatch => {
    dispatch({
        type: GRADE_ENTRY_FORM_UPDATE_FIELD,
        payload: {field, newValues}
    });
};

export const updateFormState = newState => dispatch => {
    dispatch({
        type: GRADE_ENTRY_FORM_UPDATE_STATE,
        payload: newState
    });
};

export const clearForm = () => dispatch => {
    dispatch({
        type: GRADE_ENTRY_FORM_CLEAR
    });
};

export const toggleForm = () => (dispatch, getState) => {
    if (getState().gradeEntry.form.isOpen) {
        dispatch({
            type: GRADE_ENTRY_FORM_CLOSE
        });
        dispatch({
            type: GRADE_ENTRY_FORM_CLEAR
        });
    } else {
        dispatch({
            type: GRADE_ENTRY_FORM_OPEN
        });
    }
};

export const editGradeEntry = (gradeEntry, categoryId) => dispatch => {
    // Load data to edit in the form
    dispatch({
        type: GRADE_ENTRY_FORM_LOAD_DATA,
        payload: gradeEntry
    });

    // Set grade entry as active
    dispatch({
        type: SET_EDITED_GRADE_ENTRY,
        payload: gradeEntry
    });

    // Set the active category
    dispatch({
        type: GRADE_ENTRY_SET_ACTIVE_CATEGORY_ID,
        payload: categoryId
    });

    // Enable editing mode
    dispatch({
        type: GRADE_ENTRY_FORM_ENABLE_EDIT_MODE
    });

    // Open the form
    dispatch({
        type: GRADE_ENTRY_FORM_OPEN
    });
};

export const openCreateGradeEntryForm = categoryId => dispatch => {
    // Enable create mode
    dispatch({
        type: GRADE_ENTRY_FORM_ENABLE_CREATE_MODE
    });

    // Set the category ID
    dispatch({
        type: GRADE_ENTRY_SET_ACTIVE_CATEGORY_ID,
        payload: categoryId
    });

    // Open the form
    dispatch({
        type: GRADE_ENTRY_FORM_OPEN
    });
};

export const updateGradeEntry = gradeEntry => (dispatch, getState) => {
    dispatch({
        type: GRADE_ENTRY_FORM_SUBMITTED
    });

    const config = tokenConfig(getState);
    const body = JSON.stringify({
        id: gradeEntry.id,
        name: gradeEntry.name,
        points: gradeEntry.points,
        max_points: gradeEntry.max_points,
        student: gradeEntry.student,
        category: gradeEntry.category
    });

    axios.patch(`${GRADE_ENTRIES_URL}${gradeEntry.id}/`, body, config)
        .then(res => {
            dispatch({
                type: GRADE_ENTRY_FORM_SUCCESS
            });
            dispatch({
                type: GRADE_ENTRY_FORM_CLEAR
            });
            dispatch({
                type: REPLACE_GRADE_ENTRY,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(`Error occurred when updating a grade entry:`);
            console.log(err.response);
            dispatch({
                type: GRADE_ENTRY_FORM_ERROR,
                payload: err.response
            });
        });
};

/**
 * Delete a grade entry.
 * @param gradeEntry {Object} - Grade entry to delete
 */
export const deleteGradeEntry = gradeEntry => (dispatch, getState) => {
    dispatch({
        type: GRADE_ENTRY_FORM_SUBMITTED
    });

    axios.delete(`${GRADE_ENTRIES_URL}${gradeEntry.id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GRADE_ENTRY_FORM_SUCCESS
            });
            dispatch({
                type: GRADE_ENTRY_FORM_CLEAR
            });
            dispatch({
                type: DELETE_GRADE_ENTRY,
                payload: gradeEntry
            });
        })
        .catch(err => {
            console.log(`Error occurred when deleting a grade entry:`);
            console.log(err.response);
            dispatch({
                type: GRADE_ENTRY_FORM_ERROR,
                payload: err.response
            });
        });
};
