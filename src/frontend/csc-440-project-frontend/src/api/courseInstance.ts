import {Category, CourseInstance, GradeEntry, Semester} from './types';
import {getCategoryGradeEntries, LetterGrade, letterGradeScoreRange} from './gradeEntry';
import {getCourseInstanceCategories} from './category';

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

/**
 * Common statistics for collections of grades.
 */
export interface CommonGradeStats {
    // Letter grade assigned to score
    letterGrade: LetterGrade;
    // Points, max points, and score for graded items
    points: number;
    maxPoints: number;
    score: number;
    // Minimum/maximum scores for letter grade range
    minScoreRange: number;
    maxScoreRange: number;
}

// GRADE ENTRY STATS

/**
 * Grade entry statistics.
 */
export interface GradeEntryStats extends CommonGradeStats {

}

// CATEGORY STATS

/**
 * Grade statistics for a category.
 */
export interface CategoryStats extends CommonGradeStats {
    gradeEntryStats: GradeEntryStats[];
    // Max points in a particular group (category or course instance) and the score based on those points
    groupMaxPoints?: number;
    groupScore?: number;
    // Weight of category
    weight: number;
}

// COURSE INSTANCE STATS

/**
 * Grade statistics for a course instance.
 */
export interface CourseInstanceStats extends CommonGradeStats {
    categoryStats: CategoryStats[];
    // Max points in a particular group (category or course instance) and the score based on those points
    groupMaxPoints?: number;
    groupScore?: number;
}

/**
 * Grade statistics for a semester.
 */
export interface SemesterStats extends CommonGradeStats {
    courseInstanceStats: CourseInstanceStats[];
    // GPA for the semester based on scores in courses
    gpa: number;
}

// RAW GRADE ENTRIES

/**
 * Raw grade entry information needed for scoring.
 */
export interface RawGradeEntry {
    points: number;
    maxPoints: number;
}

// RAW CATEGORIES

/**
 * Raw category information needed for scoring.
 */
export interface RawCategory {
    gradeEntries: RawGradeEntry[];
    // Max points obtainable in category
    maxPoints?: number;
    // Weight of category
    weight?: number;
}

// RAW COURSE INSTANCES

/**
 * Raw course instance information needed for scoring.
 */
export interface RawCourseInstance {
    categories: RawCategory[];
    // Max points obtainable in course instance
    maxPoints?: number;
    // Minimum scores for grades
    minA: number;
    minB: number;
    minC: number;
    minD: number;
}

/**
 * Raw semester information needed for scoring.
 */
export interface RawSemester {
    courseInstances: RawCourseInstance[];
}

export const semesterStats = (semester: RawSemester): SemesterStats => {
    const courseInstanceStats = semester.courseInstances.map(courseInstance => getCourseInstanceStats(courseInstance));

    // Calculate GPA
    let totalGpa = 0;
    for (const courseInstance of courseInstanceStats) {
        totalGpa
    }
};

/**
 * Get grade statistics for a course instance.
 */
export const getCourseInstanceStats = (courseInstance: RawCourseInstance): CourseInstanceStats => {
    // Calculate grade for each category
    const categoryStats = courseInstance.categories.map(category => {
        let weight;
        if (
            category.weight === undefined
            && category.maxPoints !== undefined
            && courseInstance.maxPoints !== undefined) {
            // If weight based, calculate weight from category max points and course instance max points.
            weight = category.maxPoints / courseInstance.maxPoints;
        } else if (category.weight !== undefined) {
            // Else, just use category weight
            weight = category.weight;
        } else {
            throw Error('Raw Category data is malformed.');
        }

        return getCategoryStats(
            category,
            weight,
            courseInstance.minA,
            courseInstance.minB,
            courseInstance.minC,
            courseInstance.minD
        )
    });

    // Calculate grade for entire course instance
    let points = 0, maxPoints = 0, score = 0;
    for (const category of categoryStats) {
        points += category.points;
        maxPoints += category.maxPoints;
        score += category.score * category.weight;
    }
    const gradeAndRange = letterGradeScoreRange(
        score,
        courseInstance.minA,
        courseInstance.minB,
        courseInstance.minC,
        courseInstance.minD,
        0.00,
        1.00
    );

    return {
        categoryStats,
        ...gradeAndRange,
        groupMaxPoints: courseInstance.maxPoints,
        groupScore: courseInstance.maxPoints !== undefined ? points / courseInstance.maxPoints : undefined,
        points,
        maxPoints,
        score,
    };
};


/**
 * Get grade statistics for a category.
 * @private
 */
const _categoryStats = (
    category: RawCategory,
    minA: number,
    minB: number,
    minC: number,
    minD: number
) => {
    // Calculate grade for each grade entry
    const gradeEntryStats = category.gradeEntries.map(gradeEntry => getGradeEntryStats(
        gradeEntry,
        minA,
        minB,
        minC,
        minD
    ));

    // Calculate grade for entire category
    let points = 0, maxPoints = 0;
    for (const gradeEntry of gradeEntryStats) {
        points += gradeEntry.points;
        maxPoints += gradeEntry.maxPoints;
    }
    const score = points / maxPoints;
    const gradeAndRange = letterGradeScoreRange(
        score,
        minA,
        minB,
        minC,
        minD,
        0.00,
        1.00
    );

    return {
        gradeEntryStats,
        ...gradeAndRange,
        points,
        maxPoints,
        score
    };
};

/**
 * Get grade statistics for a category.
 */
export const getCategoryStats = (
    category: RawCategory,
    weight: number,
    minA: number,
    minB: number,
    minC: number,
    minD: number
): CategoryStats => {
    const stats = _categoryStats(
        category,
        minA,
        minB,
        minC,
        minD
    );

    return {
        ...stats,
        groupMaxPoints: category.maxPoints,
        groupScore: category.maxPoints !== undefined ? stats.points / category.maxPoints : undefined,
        weight
    };
};

/**
 * Get grade statistics for a grade entry.
 */
export const getGradeEntryStats = (
    gradeEntry: RawGradeEntry,
    minA: number,
    minB: number,
    minC: number,
    minD: number
): GradeEntryStats => {
    const score = gradeEntry.points / gradeEntry.maxPoints;
    const gradeAndRange = letterGradeScoreRange(
        score,
        minA,
        minB,
        minC,
        minD,
        0.00,
        1.00
    );

    return {
        ...gradeAndRange,
        points: gradeEntry.points,
        maxPoints: gradeEntry.maxPoints,
        score
    };
};

/**
 * Generate a raw semester structure for doing grade calculations.
 * @param semester - The semester instance
 * @param courseInstances - All possible course instances to search through
 * @param categories - All possible categories to search through
 * @param gradeEntries - All possible grade entries to search through
 */
export const generateRawSemesterStructure = (
    semester: Semester,
    courseInstances: CourseInstance[],
    categories: Category[],
    gradeEntries: GradeEntry[]
): RawSemester => {
    const courseInstanceStructures = getSemesterCourseInstances(courseInstances, semester.id)
        .map(courseInstance => generateRawCourseInstanceStructure(courseInstance, categories, gradeEntries));

    return {
        courseInstances: courseInstanceStructures
    };
};

/**
 * Generate a raw course instance structure for doing grade calculations.
 */
export const generateRawCourseInstanceStructure = (
    courseInstance: CourseInstance,
    categories: Category[],
    gradeEntries: GradeEntry[]
): RawCourseInstance => {
    const categoryStructures = getCourseInstanceCategories(categories, courseInstance.id)
        .map(category => generateRawCategoryStructure(category, gradeEntries));
    return {
        categories: categoryStructures,
        maxPoints: courseInstance.max_points,
        minA: courseInstance.min_a,
        minB: courseInstance.min_b,
        minC: courseInstance.min_c,
        minD: courseInstance.min_d
    };
};

/**
 * Generate a raw category structure for doing grade calculations.
 */
export const generateRawCategoryStructure = (
    category: Category,
    gradeEntries: GradeEntry[]
): RawCategory => {
    return {
        gradeEntries: getCategoryGradeEntries(gradeEntries, category.id)
            .map(gradeEntry => extractRawGradeEntryData(gradeEntry)),
        maxPoints: category.max_points,
        weight: category.weight
    };
};

/**
 * Extract raw data from a grade entry.
 */
export const extractRawGradeEntryData = (
    gradeEntry: GradeEntry
): RawGradeEntry => {
    return {
        points: gradeEntry.points,
        maxPoints: gradeEntry.max_points
    }
};
