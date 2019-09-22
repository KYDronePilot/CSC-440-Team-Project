import {FETCH_COURSE_INSTANCES, FETCH_GRADE_ENTRIES} from './types';
import {tokenConfig} from './auth';
import axios from 'axios';

// export const fetchCourseInstances = () => dispatch =>  {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//         .then(res => res.json())
//         .then(courseInstances =>
//             dispatch({
//                 type: FETCH_COURSE_INSTANCES,
//                 payload: courseInstances
//             })
//         );
// };

export const fetchCourseInstances = category_id => (dispatch, getState) =>  {
    // const config = tokenConfig(getState);
    // config.params = {
    //     category_id
    // };

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
