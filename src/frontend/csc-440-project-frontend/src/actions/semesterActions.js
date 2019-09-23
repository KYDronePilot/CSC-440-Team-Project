import {FETCH_SEMESTERS, GET_SEMESTERS} from '../actions/types';
import {tokenConfig} from './auth';
import axios from 'axios';

export const fetchSemesters = () => (dispatch, getState) => {
    axios.get('http://localhost:8000/api/semesters/', tokenConfig(getState))
        .then(res => {
            console.log(res);
            dispatch({
                type: FETCH_SEMESTERS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(`Error while fetching semesters: ${err}`);
        });
};
