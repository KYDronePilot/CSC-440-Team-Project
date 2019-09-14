import {FETCH_COURSE_INSTANCES} from './types';

export const fetchCourseInstances = () => dispatch =>  {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(courseInstances =>
            dispatch({
                type: FETCH_COURSE_INSTANCES,
                payload: courseInstances
            })
        );
};
