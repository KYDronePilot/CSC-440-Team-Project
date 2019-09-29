import {DATA_LOADED} from '../actions/types';
import produce from 'immer';

const initialState = {
    dataLoaded: false
};

export default (state = initialState, action) => produce(state, draft => {
    switch (action.type) {
        case DATA_LOADED:
            draft.dataLoaded = true;
            break;
        default:
            return draft;
    }
});