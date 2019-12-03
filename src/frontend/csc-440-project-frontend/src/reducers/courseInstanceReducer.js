import {CLEAR_COURSE_INSTANCES, FETCH_COURSE_INSTANCES} from '../actions/types';
import {objectify} from '../utils/objectification_utils';

const initialRootState = {
    courseInstances: {ids: []}
};

export default function (state = initialRootState, action) {
    switch (action.type) {
        case FETCH_COURSE_INSTANCES:
            return {
                ...state,
                courseInstances: objectify(action.payload)
            };
        case CLEAR_COURSE_INSTANCES:
            return {
                ...state,
                courseInstances: {ids: []}
            };
        default:
            return state;
    }
}
