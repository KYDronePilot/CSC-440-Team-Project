import axios from 'axios';
import {FETCH_GRADE_ENTRIES, ADD_GRADE_ENTRY} from './types';
import {tokenConfig} from './auth';

export const fetchGradeEntries = category_id => (dispatch, getState) =>  {
    const config = tokenConfig(getState);
    config.params = {
        category_id
    };

    axios.get('http://localhost:8000/api/grade-entries/', config)
        .then(res =>
            dispatch({
                type: FETCH_GRADE_ENTRIES,
                payload: res.data
            })
        );
};

export const createGradeEntry = (name, points, max_points, category_id) => (dispatch, getState) => {
    const config = tokenConfig(getState);

    const body = JSON.stringify({name, points, max_points, category: category_id});

    axios.post('http://localhost:8000/api/grade-entries/', body, config)
        .then(res => {
            // dispatch({
            //     type: ADD_GRADE_ENTRY,
            //     payload: res.data
            // });
        })
        .catch(err => {
            console.log(`Error occurred when creating a grade entry:`);
            console.log(err.response.data);
        })
};
