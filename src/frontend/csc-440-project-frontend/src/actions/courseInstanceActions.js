import {FETCH_COURSE_INSTANCES, SET_ACTIVE_COURSE_INSTANCE} from './types';
import {tokenConfig} from './auth';
import axios from 'axios';


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

export const fetchCourseInstanceById = courseInstanceId => (dispatch, getState) => {
    return axios.get(`http://localhost:8000/api/course-instances/${courseInstanceId}/`, tokenConfig(getState))
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


// export const setActiveCourseInstance = courseInstance => dispatch => {
//     dispatch({
//         type: SET_ACTIVE_COURSE_INSTANCE,
//         payload: courseInstance
//     });
// };
