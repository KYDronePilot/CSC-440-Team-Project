import {combineReducers} from 'redux';
import semesterReducer from './semesterReducer';
import courseInstanceReducer from './courseInstanceReducer';
import gradeEntryReducer from './gradeEntryReducer';
import categoryReducer from './categoryReducer';
import auth from './auth';
import courseReducer from './courseReducer';
import commonReducer from './commonReducer';

export default combineReducers({
    semester: semesterReducer,
    courseInstance: courseInstanceReducer,
    gradeEntry: gradeEntryReducer,
    category: categoryReducer,
    auth,
    course: courseReducer,
    common: commonReducer
});
