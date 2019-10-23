import {FETCH_COURSES} from '../actions/types';
import {tokenConfig} from './auth';
import axios from 'axios';
import {COURSES_URL} from '../api/urls';

export const fetchCourses = () => (dispatch, getState) => {
    return axios.get(COURSES_URL, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: FETCH_COURSES,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(`Error while fetching courses: ${err}`);
        });
};
