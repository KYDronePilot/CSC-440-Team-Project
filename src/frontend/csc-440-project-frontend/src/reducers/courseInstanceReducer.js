import {FETCH_COURSE_INSTANCES, GRADE_ENTRY_FORM_CREATE_MODE} from '../actions/types';

const initialRootState = {
    courseInstances: [],
    activeCourseInstance: {}
};

export default function (state = initialRootState, action) {
    switch (action.type) {
        case FETCH_COURSE_INSTANCES:
            return {
                ...state,
                courseInstances: action.payload
            };
        default:
            return state;
    }
}