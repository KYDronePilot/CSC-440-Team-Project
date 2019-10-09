import {fetchSemesters} from './semesterActions';
import {fetchCourses} from './courseActions';
import {fetchCourseInstances} from './courseInstanceActions';
import {fetchGradeEntries} from './gradeEntryActions';
import {fetchCategories} from './categoryActions';
import {fetchCSRs} from './csrActions';

export function loadData() {
    return Promise.all([
        fetchSemesters(),
        fetchCourses(),
        fetchCourseInstances(),
        fetchGradeEntries(),
        fetchCategories(),
        fetchCSRs()
    ]);
}