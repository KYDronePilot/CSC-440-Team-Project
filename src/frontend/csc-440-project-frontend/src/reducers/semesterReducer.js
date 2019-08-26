import {FETCH_SEMESTERS, NEW_SEMESTER} from '../actions/types';

const initialState = {
    semesters: [],
    newSemester: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SEMESTERS:
            return {
                ...state,
                semesters: action.payload
            };

        default:
            return state;
    }
}