import {combineReducers} from 'redux';
import semesterReducer from './semesterReducer';

export default combineReducers({
    semesters: semesterReducer
});
