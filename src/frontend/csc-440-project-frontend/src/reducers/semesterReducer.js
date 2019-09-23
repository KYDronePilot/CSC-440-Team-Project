import {FETCH_SEMESTERS} from '../actions/types';
import {objectify} from '../actions/utils';

const initialState = {
    semesters: {},
    activeSemester: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SEMESTERS:
            return {
                ...state,
                semesters: objectify(action.payload)
            };
        default:
            return state;
    }
}