import {combineReducers} from 'redux';
import semesterReducer from './semesterReducer';
import courseInstanceReducer from './courseInstanceReducer';
import gradeEntryReducer from './gradeEntryReducer';
import auth from './auth';

export default combineReducers({
    semesters: semesterReducer,
    courseInstances: courseInstanceReducer,
    gradeEntries: gradeEntryReducer,
    auth
});
