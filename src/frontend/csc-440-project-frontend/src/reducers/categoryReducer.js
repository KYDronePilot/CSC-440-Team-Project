import {FETCH_CATEGORIES} from '../actions/types';

const initialState = {
    activeCategories: [],
    activeCategory: {id: 1, name: '5 Assignments'}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {
                ...state,
                activeCategory: action.payload[0]
            };
        default:
            return state;
    }
}