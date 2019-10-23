import {
    ADD_SEMESTER_TO_STUDENT,
    APPEND_SEMESTER,
    CATEGORY_FORM_ERROR,
    FETCH_SEMESTERS,
    REPLACE_CATEGORY
} from '../actions/types';
import {tokenConfig} from './auth';
import axios from 'axios';
import {SEMESTERS_URL} from '../api/urls';

const FALL = 'fall';
const WINTER = 'winter';
const SPRING = 'spring';
const SUMMER = 'summer';
const SEASON_LABELS = {
    [FALL]: 'Fall',
    [WINTER]: 'Winter',
    [SPRING]: 'Spring',
    [SUMMER]: 'Summer'
};

/**
 * String representation of semester.
 * @param semester {Object} - Semester to represent
 * @return {string} String representation
 */
export function semesterToString(semester) {
    return `${SEASON_LABELS[semester.season]}, ${semester.year}`;
}

export const fetchSemesters = () => (dispatch, getState) => {
    const config = {
        ...tokenConfig(getState),
        params: {
            student_id: ''
        }
    };
    return axios.get(SEMESTERS_URL, config)
        .then(res => {
            dispatch({
                type: FETCH_SEMESTERS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(`Error while fetching semesters: ${err}`);
        });
};

export const updateSemester = (semester, callback = () => null) => (dispatch, getState) => {
    const config = tokenConfig(getState);
    const body = {
        ...semester
    };

    axios.patch(`${SEMESTERS_URL}${semester.id}/`, body, config)
        .then(res => {
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

export const addStudentSemesterRelationship = (semester, callback = () => null) => (dispatch, getState) => {
    const config = tokenConfig(getState);

    axios.patch(`${SEMESTERS_URL}${semester.id}/`, semester, config)
        .then(res => {
            // Add semester to state
            dispatch({
                type: APPEND_SEMESTER,
                payload: res.data
            });

            // Add relationship to student
            dispatch({
                type: ADD_SEMESTER_TO_STUDENT,
                payload: res.data.id
            });
            callback();
        })
        .catch(err => {
            console.log(`Error occurred when adding student-semester relationship:`);
            console.log(err.response);
        });
};

export const removeStudentSemesterRelationship = (semester, callback = () => null) => (dispatch, getState) => {
    const config = tokenConfig(getState);
    config.params = {
        student_relationship: ''
    };

    axios.delete(`${SEMESTERS_URL}${semester.id}/`, config)
        .then(res => {
            // Trigger entire state reload
            callback();
        })
        .catch(err => {
            console.log(`Error occurred when removing student semester relationship:`);
            console.log(err.response);
        });
};
