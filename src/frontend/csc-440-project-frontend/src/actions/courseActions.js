import {FETCH_COURSES} from '../actions/types';
import {tokenConfig} from './auth';
import axios from 'axios';

export const fetchCourses = () => (dispatch, getState) => {
    return axios.get('http://localhost:8000/api/courses/', tokenConfig(getState))
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
