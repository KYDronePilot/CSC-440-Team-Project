import {Category, CourseInstance, GradeEntry} from './types';
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
 * Point based grade statistics for a category.
 */
export interface PointCategoryStats extends CommonGradeStats {
    gradeEntryStats: GradeEntryStats[];
    // Max points in a particular group (category or course instance) and the score based on those points
    groupMaxPoints: number;
    groupScore: number;
}

/**
 * Weight based grade statistics for a category.
 */
export interface WeightCategoryStats extends CommonGradeStats {
    gradeEntryStats: GradeEntryStats[];
    // Weight of category
    weight: number;
}

// COURSE INSTANCE STATS

/**
 * Point based grade statistics for a course instance.
 */
export interface PointCourseInstanceStats extends CommonGradeStats {
    categoryStats: PointCategoryStats[];
    // Max points in a particular group (category or course instance) and the score based on those points
    groupMaxPoints: number;
    groupScore: number;
}

/**
 * Weight based grade statistics for a course instance.
 */
export interface WeightCourseInstanceStats extends CommonGradeStats {
    categoryStats: WeightCategoryStats[];
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
 * Raw point based category information needed for scoring.
 */
export interface RawPointCategory {
    gradeEntries: RawGradeEntry[];
    // Max points obtainable in category
    maxPoints: number;
}

/**
 * Raw weight based category information needed for scoring.
 */
export interface RawWeightCategory {
    gradeEntries: RawGradeEntry[];
    // Weight of category
    weight: number;
}

// RAW COURSE INSTANCES

/**
 * Raw point based course instance information needed for scoring.
 */
export interface RawPointCourseInstance {
    categories: RawPointCategory[];
    // Max points obtainable in course instance
    maxPoints: number;
    // Minimum scores for grades
    minA: number;
    minB: number;
    minC: number;
    minD: number;
}

/**
 * Raw weight based course instance information needed for scoring.
 */
export interface RawWeightCourseInstance {
    categories: RawWeightCategory[];
    // Minimum scores for grades
    minA: number;
    minB: number;
    minC: number;
    minD: number;
}

/**
 * Get point based grade statistics for a course instance.
 */
export const pointCourseInstanceStats = (courseInstance: RawPointCourseInstance): PointCourseInstanceStats => {
    // Calculate grade for each category
    const categoryStats = courseInstance.categories.map(category => getPointCategoryStats(
        category,
        courseInstance.minA,
        courseInstance.minB,
        courseInstance.minC,
        courseInstance.minD
    ));

    // Calculate grade for entire course instance
    let points = 0, maxPoints = 0;
    for (const category of categoryStats) {
        points += category.points;
        maxPoints += category.maxPoints;
    }
    const score = points / maxPoints;
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
        groupScore: points / courseInstance.maxPoints,
        points,
        maxPoints,
        score
    };
};

/**
 * Get weight based grade statistics for a course instance.
 */
export const weightCourseInstanceStats = (courseInstance: RawWeightCourseInstance): WeightCourseInstanceStats => {
    // Calculate grade for each category
    const categoryStats = courseInstance.categories.map(category => getWeightCategoryStats(
        category,
        category.weight,
        courseInstance.minA,
        courseInstance.minB,
        courseInstance.minC,
        courseInstance.minD
    ));

    // Calculate grade for entire course instance
    let points = 0, maxPoints = 0;
    for (const category of categoryStats) {
        points += category.points;
        maxPoints += category.maxPoints;
    }
    const score = points / maxPoints;
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
        points,
        maxPoints,
        score
    };
};


/**
 * Get grade statistics for a category.
 * @private
 */
const _categoryStats = (
    category: RawWeightCategory | RawPointCategory,
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
 * Get point based grade statistics for a category.
 */
export const getPointCategoryStats = (
    category: RawPointCategory,
    minA: number,
    minB: number,
    minC: number,
    minD: number
): PointCategoryStats => {
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
        groupScore: stats.points / category.maxPoints
    };
};

/**
 * Get weight based grade statistics for a category.
 */
export const getWeightCategoryStats = (
    category: RawWeightCategory,
    weight: number,
    minA: number,
    minB: number,
    minC: number,
    minD: number
): WeightCategoryStats => {
    const stats = _categoryStats(
        category,
        minA,
        minB,
        minC,
        minD
    );

    return {
        ...stats,
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
 * Generate a raw point based course instance structure for doing grade calculations.
 */
export const generateRawPointCourseInstanceStructure = (
    courseInstance: CourseInstance,
    categories: Category[],
    gradeEntries: GradeEntry[]
): RawPointCourseInstance => {
    if (courseInstance.max_points === undefined || courseInstance.max_points === null)
        throw Error('Course instance must be point based.');

    const categoryStructures = getCourseInstanceCategories(categories, courseInstance.id)
        .map(category => generateRawPointCategoryStructure(category, gradeEntries));
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
 * Generate a raw weight based course instance structure for doing grade calculations.
 */
export const generateRawWeightCourseInstanceStructure = (
    courseInstance: CourseInstance,
    categories: Category[],
    gradeEntries: GradeEntry[]
): RawWeightCourseInstance => {
    const categoryStructures = getCourseInstanceCategories(categories, courseInstance.id)
        .map(category => generateRawWeightCategoryStructure(category, gradeEntries));
    return {
        categories: categoryStructures,
        minA: courseInstance.min_a,
        minB: courseInstance.min_b,
        minC: courseInstance.min_c,
        minD: courseInstance.min_d
    };
};

const _generateRawCategoryStructure = (
    category: Category,
    gradeEntries: GradeEntry[]
) => {
    return getCategoryGradeEntries(gradeEntries, category.id)
        .map(gradeEntry => extractRawGradeEntryData(gradeEntry));
};

/**
 * Generate a raw point based category structure for doing grade calculations.
 */
export const generateRawPointCategoryStructure = (
    category: Category,
    gradeEntries: GradeEntry[]
): RawPointCategory => {
    if (category.max_points === undefined || category.max_points === null)
        throw Error('Category must be point based.');
    return {
        gradeEntries: _generateRawCategoryStructure(category, gradeEntries),
        maxPoints: category.max_points
    };
};

/**
 * Generate a raw weight based category structure for doing grade calculations.
 */
export const generateRawWeightCategoryStructure = (
    category: Category,
    gradeEntries: GradeEntry[]
): RawWeightCategory => {
    if (category.weight === undefined || category.weight === null)
        throw Error('Category must be weight based.');
    return {
        gradeEntries: _generateRawCategoryStructure(category, gradeEntries),
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
