import {FETCH_COURSE_INSTANCES} from '../actions/types';
import {objectify} from '../utils/objectification_utils';

const initialRootState = {
    courseInstances: {}
};

export default function (state = initialRootState, action) {
    switch (action.type) {
        case FETCH_COURSE_INSTANCES:
            return {
                ...state,
                courseInstances: objectify(action.payload)
            };
        default:
            return state;
    }
}