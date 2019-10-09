import {DATA_LOADED, DATA_NOT_LOADED} from '../actions/types';
import produce from 'immer';

const initialState = {
    dataLoaded: false
};

export default (state = initialState, action) => produce(state, draft => {
    switch (action.type) {
        case DATA_LOADED:
            draft.dataLoaded = true;
            break;
        case DATA_NOT_LOADED:
            draft.dataLoaded = false;
            break;
        default:
            return draft;
    }
});