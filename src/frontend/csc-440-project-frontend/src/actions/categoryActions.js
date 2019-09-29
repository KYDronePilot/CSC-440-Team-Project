import axios from 'axios';
import {FETCH_CATEGORIES} from './types';
import {tokenConfig} from './auth';

export const fetchCategories = () => (dispatch, getState) =>  {
    return axios.get('http://localhost:8000/api/categories/', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: FETCH_CATEGORIES,
                payload: res.data
            })
        );
};
