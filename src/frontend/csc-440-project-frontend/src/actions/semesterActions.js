import {
    APPEND_SEMESTER,
    CATEGORY_FORM_CLEAR,
    CATEGORY_FORM_CLOSE, CATEGORY_FORM_ERROR,
    CATEGORY_FORM_SUBMITTED,
    FETCH_SEMESTERS,
    GET_SEMESTERS, REPLACE_CATEGORY,
    SET_ACTIVE_SEMESTER
} from '../actions/types';
import {tokenConfig} from './auth';
import axios from 'axios';

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

// export const fetchSemesters = () => _fetchSemesters({student_id: });

const _fetchSemestersRequest = (config, onFulfilled, onCatch) => {
    return axios.get('http://localhost:8000/api/semesters/', config)
        .then(onFulfilled)
        .catch(onCatch);
};

export const fetchSemesters = () => (dispatch, getState) => {
    const config = {
        ...tokenConfig(getState),
        params: {
            student_id: getState().auth.user.id
        }
    };
    return axios.get('http://localhost:8000/api/semesters/', config)
        .then(res => {
            console.log(res.data);
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

    axios.patch(`http://localhost:8000/api/semesters/${semester.id}/`, body, config)
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

    axios.patch(`http://localhost:8000/api/semesters/${semester.id}/`, semester, config)
        .then(res => {
            dispatch({
                type: APPEND_SEMESTER,
                payload: res.data
            });
            callback();
        })
        .catch(err => {
            console.log(`Error occurred when adding student-semester relationship:`);
            console.log(err.response);
        });
};


// export const setActiveSemester = semester => dispatch => {
//     dispatch({
//         type: SET_ACTIVE_SEMESTER,
//         payload: semester
//     })
// };
