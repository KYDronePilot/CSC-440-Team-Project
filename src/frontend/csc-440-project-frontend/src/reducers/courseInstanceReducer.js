import {FETCH_COURSE_INSTANCES, GRADE_ENTRY_FORM_CREATE_MODE, SET_ACTIVE_COURSE_INSTANCE} from '../actions/types';
import {objectify} from '../actions/utils';

const initialRootState = {
    courseInstances: {},
    // activeCourseInstanceID: -1
};

export default function (state = initialRootState, action) {
    switch (action.type) {
        case FETCH_COURSE_INSTANCES:
            return {
                ...state,
                courseInstances: objectify(action.payload)
            };
        // case SET_ACTIVE_COURSE_INSTANCE:
        //     return {
        //         ...state,
        //         activeCourseInstanceID: action.payload.id
        //     };
        default:
            return state;
    }
}