import {DATA_LOADED} from './types';

export const setDataLoaded = () => dispatch =>  {
    dispatch({
        type: DATA_LOADED
    });
};
