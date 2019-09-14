import axios from 'axios';
import {FETCH_GRADE_ENTRIES} from './types';
import {tokenConfig} from './auth';

export const fetchGradeEntries = () => (dispatch, getState) =>  {
    axios.get('http://localhost:8000/api/grade-entries/', tokenConfig(getState))
        .then(res => res.data)
        .then(gradeEntries =>
            dispatch({
                type: FETCH_GRADE_ENTRIES,
                payload: gradeEntries
            })
        );
};
