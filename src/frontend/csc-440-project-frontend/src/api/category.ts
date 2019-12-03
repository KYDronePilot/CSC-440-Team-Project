import {Category} from './types';

/**
 * Get categories for a course instance.
 * @param categories - Categories to choose from
 * @param courseInstanceId - Course instance ID to use
 */
export const getCourseInstanceCategories = (categories: Category[], courseInstanceId: number) => {
    return categories.filter(category => category.course_instance === courseInstanceId);
};
