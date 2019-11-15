import {DATA_NOT_LOADED, FETCH_COURSE_INSTANCES} from './types';
import {tokenConfig} from './auth';
import axios from 'axios';
import {COURSE_INSTANCES_URL} from '../api/urls';

export const fetchCourseInstances = () => (dispatch, getState) => {
    return axios.get(COURSE_INSTANCES_URL, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: FETCH_COURSE_INSTANCES,
                payload: res.data
            })
        )
        .catch(err => {
            console.log('Failed to fetch course instances');
        });
};

export const removeStudentCourseInstanceRelationship = (courseInstanceId) => (dispatch, getState) => {
    const config = tokenConfig(getState);
    config.params = {
        student_relationship: ''
    };

    axios.delete(`${COURSE_INSTANCES_URL}${courseInstanceId}/`, config)
        .then(res => {
            // Trigger state reload
            dispatch({
                type: DATA_NOT_LOADED
            });
        })
        .catch(err => {
            console.log(`Error occurred when removing student semester relationship:`);
            console.log(err.response);
        });
};
