import {CourseInstance} from './types';

// Grading strategies
export const POINT_BASED_GRADING = 'point_based';
export const WEIGHT_BASED_GRADING = 'weight_based';

export type GradingStrategies = typeof POINT_BASED_GRADING | typeof WEIGHT_BASED_GRADING;

/**
 * Get the course instances for a particular semester.
 */
export const getSemesterCourseInstances = (courseInstances: CourseInstance[], semesterId: number) => {
    return courseInstances.filter(courseInstance => courseInstance.semester === semesterId);
};
