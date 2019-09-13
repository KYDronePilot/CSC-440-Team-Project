import {FETCH_GRADE_ENTRIES} from '../actions/types';

const initialState = {
    items: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_GRADE_ENTRIES:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}