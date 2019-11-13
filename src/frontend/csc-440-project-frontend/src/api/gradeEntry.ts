import {Category, GradeEntry} from './types';
import {getCourseInstanceCategories} from './category';


/**
 * Get grade entries for a category ID.
 */
export const getCategoryGradeEntries = (gradeEntries: GradeEntry[], categoryId: number) => {
    return gradeEntries.filter(gradeEntry => gradeEntry.category === categoryId);
};


export const getCourseInstanceGradeEntries = (
    gradeEntries: GradeEntry[],
    categories: Category[],
    courseInstanceId: number
) => {
    const selectedCategories = getCourseInstanceCategories(categories, courseInstanceId);
    return selectedCategories.reduce<GradeEntry[]>((allGradeEntries, category) => (
        allGradeEntries.concat(getCategoryGradeEntries(gradeEntries, category.id))
    ), []);
};
