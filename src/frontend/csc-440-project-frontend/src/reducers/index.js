import {combineReducers} from 'redux';
import semesterReducer from './semesterReducer';
import courseInstanceReducer from './courseInstanceReducer';
import gradeEntryReducer from './gradeEntryReducer';

export default combineReducers({
    semesters: semesterReducer,
    courseInstances: courseInstanceReducer,
    gradeEntries: gradeEntryReducer
});
