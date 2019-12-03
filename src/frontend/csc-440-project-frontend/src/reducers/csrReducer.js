import {CLEAR_CSRS, FETCH_CSRS} from '../actions/types';
import {objectify} from '../utils/objectification_utils';
import produce from 'immer';

const initialState = {
    csrs: {ids: []}
};

export default (state = initialState, action) => produce(state, draft => {
    switch (action.type) {
        case FETCH_CSRS:
            draft.csrs = objectify(action.payload);
            break;
        case CLEAR_CSRS:
            draft.csrs = {ids: []};
            break;
        default:
            break;
    }
});
