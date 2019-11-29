import {Category, GradeEntry} from './types';
import {getCourseInstanceCategories} from './category';


// Letter grade constants
export const GRADE_A = 'A';
export const GRADE_B = 'B';
export const GRADE_C = 'C';
export const GRADE_D = 'D';
export const GRADE_F = 'F';

export type LetterGrade = typeof GRADE_A | typeof GRADE_B | typeof GRADE_C | typeof GRADE_D | typeof GRADE_F;

/**
 * Get grade entries for a category ID.
 */
export const getCategoryGradeEntries = (gradeEntries: GradeEntry[], categoryId: number) => {
    return gradeEntries.filter(gradeEntry => gradeEntry.category === categoryId);
};

/**
 * Format the score of a grade item.
 * @param score - Decimal score to format
 * @param decimals - Number of decimal places to round to
 * @return Formatted score
 */
export const formatScore = (score: number, decimals: number = 1) => {
    return `${(score * 100).toFixed(decimals)}%`;
};

/**
 * Get all grade entries for a course instance.
 * @param gradeEntries - Possible grade entries to search through
 * @param categories - Possible course instance categories to search through
 * @param courseInstanceId - ID of the course instance
 */
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

interface LetterGradeScoreRange {
    letterGrade: LetterGrade;
    // Min/max of score range of assigned letter grade
    minScoreRange: number;
    maxScoreRange: number;
}

/**
 * Statistics about a set of grade entries.
 */
export interface GradeEntryStatistics extends LetterGradeScoreRange {
    points: number;
    maxPoints: number;
    score: number;
}

export interface GradeEntryPoints {
    points: number;
    maxPoints: number;
}

/**
 * Calculate a score's letter grade and score range.
 * @param score - Score to grade
 * @param minA - Minimum score/points to get an A
 * @param minB - Minimum score/points to get a B
 * @param minC - Minimum score/points to get a C
 * @param minD - Minimum score/points to get a D
 * @param minScore - Minimum possible score/points
 * @param maxScore - Maximum possible score/points
 * @return Score's letter grade and score range
 */
export const letterGradeScoreRange = (
    score: number,
    minA: number,
    minB: number,
    minC: number,
    minD: number,
    minScore: number,
    maxScore: number
): LetterGradeScoreRange => {
    let min, max, letterGrade: LetterGrade;

    // Determine letter grade and min/max score range
    if (score >= minA) {
        min = minA;
        max = maxScore;
        letterGrade = GRADE_A;
    } else if (score >= minB) {
        min = minB;
        max = minA;
        letterGrade = GRADE_B;
    } else if (score >= minC) {
        min = minC;
        max = minB;
        letterGrade = GRADE_C;
    } else if (score >= minD) {
        min = minD;
        max = minC;
        letterGrade = GRADE_D;
    } else {
        min = minScore;
        max = minD;
        letterGrade = GRADE_F;
    }

    return {
        letterGrade,
        minScoreRange: min,
        maxScoreRange: max
    }
};

/**
 * Calculate grade entry statistics for a set of grade entries.
 * @param gradeEntries - Grade entries to use in calculations
 * @param minA - Minimum score to get an A
 * @param minB - Minimum score to get a B
 * @param minC - Minimum score to get a C
 * @param minD - Minimum score to get a D
 */
export const gradeEntryStatistics = (
    gradeEntries: GradeEntryPoints[],
    minA: number = 0.9,
    minB: number = 0.8,
    minC: number = 0.7,
    minD: number = 0.6
): GradeEntryStatistics | null => {
    if (gradeEntries.length === 0)
        return null;

    let points = 0;
    let maxPoints = 0;

    // Add up the points and max points
    for (const gradeEntry of gradeEntries) {
        points += gradeEntry.points;
        maxPoints += gradeEntry.maxPoints;
    }

    const gradeAndScoreRange = letterGradeScoreRange(
        points / maxPoints,
        minA,
        minB,
        minC,
        minD,
        0.00,
        1.00
    );

    return {
        ...gradeAndScoreRange,
        points,
        maxPoints,
        score: points / maxPoints
    }
};

/**
 * Get bootstrap color class for a letter grade.
 * @param letterGrade - Letter grade
 * @return Color class for letter grade
 */
export const getLetterGradeColorClass = (letterGrade: LetterGrade) => {
    switch (letterGrade) {
        case GRADE_A:
            return 'success';
        case GRADE_B:
        case GRADE_C:
            return 'warning';
        default:
            return 'danger';
    }
};

/**
 * Get hex color for a letter grade.
 * @param letterGrade - Letter grade
 * @return Hex color for letter grade
 */
export const getLetterGradeColor = (letterGrade: LetterGrade) => {
    switch (letterGrade) {
        case GRADE_A:
            return '#5CB85C';
        case GRADE_B:
        case GRADE_C:
            return '#F0AD4E';
        default:
            return '#D9534F';
    }
};

export const GRADE_POINT_MAP = {
    GRADE_A: 4.0,
    GRADE_B: 3.0,
    GRADE_C: 2.0,
    GRADE_D: 1.0,
    GRADE_F: 0.0
};
