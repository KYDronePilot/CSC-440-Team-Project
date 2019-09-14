import axios from 'axios';
import {FETCH_GRADE_ENTRIES} from './types';

export const fetchGradeEntries = () => dispatch =>  {
    axios.get('http://localhost:8000/api/grade-entries/')
        .then(res => res.data)
        .then(gradeEntries =>
            dispatch({
                type: FETCH_GRADE_ENTRIES,
                payload: gradeEntries
            })
        );
};
