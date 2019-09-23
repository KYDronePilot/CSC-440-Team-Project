import {FETCH_COURSE_INSTANCES} from './types';
import {tokenConfig} from './auth';
import axios from 'axios';


export const fetchCourseInstances = category_id => (dispatch, getState) => {
    axios.get('http://localhost:8000/api/grade-entries/', tokenConfig(getState))
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
