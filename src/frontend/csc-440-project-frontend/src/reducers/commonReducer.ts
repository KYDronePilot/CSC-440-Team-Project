import {DATA_LOADED, DATA_NOT_LOADED, FORCE_DATA_RELOAD, FORCE_DATA_RELOAD_RESET} from '../actions/types';
import produce from 'immer';

interface CommonState {
    dataLoaded: boolean;
    forceDataReload: boolean;
}

const initialState: CommonState = {
    dataLoaded: false,
    forceDataReload: false
};

export default (state = initialState, action: any) => produce(state, draft => {
    switch (action.type) {
        case DATA_LOADED:
            draft.dataLoaded = true;
            break;
        case DATA_NOT_LOADED:
            draft.dataLoaded = false;
            break;
        case FORCE_DATA_RELOAD:
            draft.forceDataReload = true;
            break;
        case FORCE_DATA_RELOAD_RESET:
            draft.forceDataReload = false;
            break;
        default:
            return draft;
    }
});