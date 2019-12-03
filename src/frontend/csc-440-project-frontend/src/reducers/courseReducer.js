import {CLEAR_COURSES, FETCH_COURSES} from '../actions/types';
import {objectify} from '../utils/objectification_utils';

const initialRootState = {
    courses: {ids: []}
};

export default function (state = initialRootState, action) {
    switch (action.type) {
        case FETCH_COURSES:
            return {
                ...state,
                courses: objectify(action.payload)
            };
        case CLEAR_COURSES:
            return {
                ...state,
                courses: {ids: []}
            };
        default:
            return state;
    }
}
