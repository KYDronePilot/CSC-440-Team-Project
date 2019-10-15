import {DATA_LOADED, DATA_NOT_LOADED, FORCE_DATA_RELOAD, FORCE_DATA_RELOAD_RESET} from './types';

export const setDataLoaded = () => dispatch => {
    dispatch({
        type: DATA_LOADED
    });
};

export const setDataNotLoaded = () => dispatch => {
    dispatch({
        type: DATA_NOT_LOADED
    });
};

export const forceDataReload = () => dispatch => {
    dispatch({
        type: FORCE_DATA_RELOAD
    });
};

export const forceDataReloadReset = () => dispatch => {
    dispatch({
        type: FORCE_DATA_RELOAD_RESET
    });
};
