import {FETCH_COURSES} from '../actions/types';
import {objectify} from '../actions/utils';

const initialRootState = {
    courses: {}
};

export default function (state = initialRootState, action) {
    switch (action.type) {
        case FETCH_COURSES:
            return {
                ...state,
                courses: objectify(action.payload)
            };
        default:
            return state;
    }
}