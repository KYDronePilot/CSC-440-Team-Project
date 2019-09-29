import {FETCH_SEMESTERS, GET_SEMESTERS, SET_ACTIVE_SEMESTER} from '../actions/types';
import {tokenConfig} from './auth';
import axios from 'axios';

export const fetchSemesters = () => (dispatch, getState) => {
    return axios.get('http://localhost:8000/api/semesters/', tokenConfig(getState))
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

// export const setActiveSemester = semester => dispatch => {
//     dispatch({
//         type: SET_ACTIVE_SEMESTER,
//         payload: semester
//     })
// };
