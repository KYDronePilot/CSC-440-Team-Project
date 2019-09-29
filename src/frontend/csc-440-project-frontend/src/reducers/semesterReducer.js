import {FETCH_SEMESTERS, SET_ACTIVE_SEMESTER} from '../actions/types';
import {objectify} from '../actions/utils';

const initialState = {
    semesters: {},
    // activeSemesterID: -1
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SEMESTERS:
            return {
                ...state,
                semesters: objectify(action.payload)
            };
        // case SET_ACTIVE_SEMESTER:
        //     return {
        //         ...state,
        //         activeSemesterID: action.payload.id
        //     };
        default:
            return state;
    }
}