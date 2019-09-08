import {combineReducers} from 'redux';
import semesterReducer from './semesterReducer';
import courseInstanceReducer from './courseInstanceReducer';

export default combineReducers({
    semesters: semesterReducer,
    courseInstances: courseInstanceReducer
});
