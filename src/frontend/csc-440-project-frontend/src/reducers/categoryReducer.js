import {FETCH_CATEGORIES} from '../actions/types';
import {objectify} from '../actions/utils';

const initialState = {
    categories: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {
                ...state,
                categories: objectify(action.payload)
            };
        default:
            return state;
    }
}