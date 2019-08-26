import {FETCH_SEMESTERS, NEW_SEMESTER} from '../actions/types';

export const fetchSemesters = () => dispatch =>  {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(semesters =>
                dispatch({
                    type: FETCH_SEMESTERS,
                    payload: semesters
                })
            );
};
