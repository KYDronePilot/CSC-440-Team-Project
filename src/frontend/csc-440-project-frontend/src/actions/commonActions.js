import {DATA_LOADED, DATA_NOT_LOADED} from './types';

export const setDataLoaded = () => dispatch =>  {
    dispatch({
        type: DATA_LOADED
    });
};

export const setDataNotLoaded = () => dispatch =>  {
    dispatch({
        type: DATA_NOT_LOADED
    });
};
