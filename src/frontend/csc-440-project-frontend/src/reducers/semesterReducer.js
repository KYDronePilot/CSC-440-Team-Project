import {APPEND_SEMESTER, DELETE_SEMESTER, FETCH_SEMESTERS, SET_ACTIVE_SEMESTER} from '../actions/types';
import {appendInstance, objectify, removeInstance} from '../utils/objectification_utils';
import produce from 'immer';

const initialState = {
    semesters: {},
    // activeSemesterID: -1
};

export default (state = initialState, action) => produce(state, draft => {
    switch (action.type) {
        case FETCH_SEMESTERS:
            draft.semesters = objectify(action.payload);
            break;
        case APPEND_SEMESTER:
            appendInstance(draft.semesters, action.payload);
            break;
        case DELETE_SEMESTER:
            removeInstance(draft.semesters, action.payload);
            break;
        default:
            break;
    }
});