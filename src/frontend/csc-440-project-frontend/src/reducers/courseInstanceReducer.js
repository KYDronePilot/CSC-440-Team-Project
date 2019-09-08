import {FETCH_COURSE_INSTANCES} from '../actions/types';

const initialState = {
    items: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_COURSE_INSTANCES:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}