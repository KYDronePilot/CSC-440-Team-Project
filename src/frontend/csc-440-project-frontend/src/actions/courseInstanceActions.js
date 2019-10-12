import {DATA_NOT_LOADED, FETCH_COURSE_INSTANCES} from './types';
import {tokenConfig} from './auth';
import axios from 'axios';
// import {loadData} from './common';


export const fetchCourseInstances = () => (dispatch, getState) => {
    return axios.get('http://localhost:8000/api/course-instances/', tokenConfig(getState))
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

export const removeStudentCourseInstanceRelationship = (courseInstance) => (dispatch, getState) => {
    const config = tokenConfig(getState);
    config.params = {
        student_relationship: ''
    };

    axios.delete(`http://localhost:8000/api/course-instances/${courseInstance.id}/`, config)
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
