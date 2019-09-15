import {combineReducers} from 'redux';
import semesterReducer from './semesterReducer';
import courseInstanceReducer from './courseInstanceReducer';
import gradeEntryReducer from './gradeEntryReducer';
import categoryReducer from './categoryReducer';
import auth from './auth';

export default combineReducers({
    semesters: semesterReducer,
    courseInstances: courseInstanceReducer,
    gradeEntry: gradeEntryReducer,
    category: categoryReducer,
    auth
});
