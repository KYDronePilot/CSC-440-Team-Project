import axios from 'axios';
import {
    APPEND_CATEGORY,
    CATEGORY_FORM_CHANGE_MODE,
    CATEGORY_FORM_CLEAR,
    CATEGORY_FORM_CLOSE,
    CATEGORY_FORM_CREATE_MODE,
    CATEGORY_FORM_EDIT_MODE,
    CATEGORY_FORM_ERROR,
    CATEGORY_FORM_LOAD_DATA,
    CATEGORY_FORM_OPEN,
    CATEGORY_FORM_SET_COURSE_INSTANCE_ID,
    CATEGORY_FORM_SET_EDIT_ID,
    CATEGORY_FORM_SUBMITTED,
    CATEGORY_FORM_UPDATE_FIELD,
    CATEGORY_FORM_UPDATE_STATE,
    DELETE_CATEGORY,
    FETCH_CATEGORIES,
    REPLACE_CATEGORY
} from './types';
import {tokenConfig} from './auth';

export const createCategory = (name, weight, max_points, course_instance_id,
                               category_score_requirements) => (dispatch, getState) => {
    dispatch({
        type: CATEGORY_FORM_SUBMITTED
    });

    const config = tokenConfig(getState);

    const body = JSON.stringify({
        name,
        weight,
        max_points,
        course_instance: course_instance_id,
        category_score_requirements
    });

    axios.post('http://localhost:8000/api/categories/', body, config)
        .then(res => {
            dispatch({
                type: CATEGORY_FORM_CLOSE
            });
            dispatch({
                type: CATEGORY_FORM_CLEAR
            });
            dispatch({
                type: APPEND_CATEGORY,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(`Error occurred when creating a category:`);
            console.log(err.response);
            dispatch({
                type: CATEGORY_FORM_ERROR,
                payload: err.response
            });
        });
};

export const fetchCategories = () => (dispatch, getState) => {
    return axios.get('http://localhost:8000/api/categories/', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: FETCH_CATEGORIES,
                payload: res.data
            })
        )
        .catch(err => console.log('Failed to fetch categories'));
};

export const updateCategory = category => (dispatch, getState) => {
    dispatch({
        type: CATEGORY_FORM_SUBMITTED
    });

    const config = tokenConfig(getState);
    const body = {
        ...category
    };

    axios.patch(`http://localhost:8000/api/categories/${category.id}/`, body, config)
        .then(res => {
            dispatch({
                type: CATEGORY_FORM_CLOSE
            });
            dispatch({
                type: CATEGORY_FORM_CLEAR
            });
            dispatch({
                type: REPLACE_CATEGORY,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(`Error occurred when updating a category:`);
            console.log(err.response);
            dispatch({
                type: CATEGORY_FORM_ERROR,
                payload: err.response
            });
        });
};

export const deleteCategory = category => (dispatch, getState) => {
    dispatch({
        type: CATEGORY_FORM_SUBMITTED
    });

    axios.delete(`http://localhost:8000/api/categories/${category.id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CATEGORY_FORM_CLOSE
            });
            dispatch({
                type: CATEGORY_FORM_CLEAR
            });
            dispatch({
                type: DELETE_CATEGORY,
                payload: category
            });
        })
        .catch(err => {
            console.log(`Error occurred when deleting a category:`);
            console.log(err.response);
            dispatch({
                type: CATEGORY_FORM_ERROR,
                payload: err.response
            });
        });
};

export const openCategoryForm = () => dispatch => {
    dispatch({
        type: CATEGORY_FORM_OPEN
    });
};

export const closeCategoryForm = () => dispatch => {
    dispatch({
        type: CATEGORY_FORM_CLOSE
    });
};

export const updateFormField = (field, newValues) => dispatch => {
    dispatch({
        type: CATEGORY_FORM_UPDATE_FIELD,
        payload: {field, newValues}
    });
};

export const updateFormState = newState => dispatch => {
    dispatch({
        type: CATEGORY_FORM_UPDATE_STATE,
        payload: newState
    });
};

export const toggleForm = () => (dispatch, getState) => {
    if (getState().category.form.isOpen) {
        dispatch({
            type: CATEGORY_FORM_CLOSE
        });
        dispatch({
            type: CATEGORY_FORM_CLEAR
        });
    } else {
        dispatch({
            type: CATEGORY_FORM_OPEN
        });
    }
};

export const editCategory = (category, courseInstanceId) => dispatch => {
    // Load data to edit in the form
    dispatch({
        type: CATEGORY_FORM_LOAD_DATA,
        payload: category
    });

    // Set category as active
    dispatch({
        type: CATEGORY_FORM_SET_EDIT_ID,
        payload: category.id
    });

    // Set the active course instance
    dispatch({
        type: CATEGORY_FORM_SET_COURSE_INSTANCE_ID,
        payload: courseInstanceId
    });

    // Enable editing mode
    dispatch({
        type: CATEGORY_FORM_CHANGE_MODE,
        payload: CATEGORY_FORM_EDIT_MODE
    });

    // Open the form
    dispatch({
        type: CATEGORY_FORM_OPEN
    });
};

export const openCreateCategoryForm = courseInstanceId => dispatch => {
    // Enable create mode
    dispatch({
        type: CATEGORY_FORM_CHANGE_MODE,
        payload: CATEGORY_FORM_CREATE_MODE
    });

    // Set the course instance ID
    dispatch({
        type: CATEGORY_FORM_SET_COURSE_INSTANCE_ID,
        payload: courseInstanceId
    });

    // Open the form
    dispatch({
        type: CATEGORY_FORM_OPEN
    });
};
