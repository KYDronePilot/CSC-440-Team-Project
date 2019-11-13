import {CourseInstance} from './types';

/**
 * Get the course instances for a particular semester.
 */
export const getSemesterCourseInstances = (courseInstances: CourseInstance[], semesterId: number) => {
    return courseInstances.filter(courseInstance => courseInstance.semester === semesterId);
};
