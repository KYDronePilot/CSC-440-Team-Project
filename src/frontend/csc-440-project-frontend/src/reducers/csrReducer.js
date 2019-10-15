import {
    APPEND_CATEGORY,
    CATEGORY_FORM_UPDATE_STATE,
    DELETE_CATEGORY,
    FETCH_CATEGORIES, FETCH_CSRS,
    REPLACE_CATEGORY
} from '../actions/types';
import {appendInstance, objectify, removeInstance, replaceInstance} from '../utils/objectification_utils';
import produce from 'immer';

const initialState = {
    csrs: {}
};

export default (state = initialState, action) => produce(state, draft => {
    switch (action.type) {
        case FETCH_CSRS:
            draft.csrs = objectify(action.payload);
            break;
        // case CATEGORY_FORM_UPDATE_STATE:
        //     draft.form = {
        //         ...draft.form,
        //         ...action.payload
        //     };
        //     break;
        // case APPEND_CATEGORY:
        //     appendInstance(draft.categories, action.payload);
        //     break;
        // case REPLACE_CATEGORY:
        //     replaceInstance(draft.categories, action.payload);
        //     break;
        // case DELETE_CATEGORY:
        //     removeInstance(draft.categories, action.payload);
        //     break;
        default:
            break;
    }
});
