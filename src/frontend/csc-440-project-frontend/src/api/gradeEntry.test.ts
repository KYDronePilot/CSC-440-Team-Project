import {
    GRADE_A,
    GRADE_B,
    GRADE_C,
    GRADE_D,
    GRADE_F,
    GradeEntryPoints,
    gradeEntryStatistics,
    letterGradeScoreRange
} from './gradeEntry';

const A = 0.90;
const B = 0.80;
const C = 0.70;
const D = 0.60;
const minScore = 0;
const maxScore = 1.00;

describe('letterGradeScoreRange', () => {
    describe('given simple scores', () => {
        it('should identify 95 as an A', () => {
            expect(letterGradeScoreRange(0.95, A, B, C, D, minScore, maxScore)).toEqual({
                letterGrade: GRADE_A,
                minScoreRange: A,
                maxScoreRange: maxScore
            });
        });

        it('should identify 85 as a B', () => {
            expect(letterGradeScoreRange(0.85, A, B, C, D, minScore, maxScore)).toEqual({
                letterGrade: GRADE_B,
                minScoreRange: B,
                maxScoreRange: A
            });
        });

        it('should identify 75 as a C', () => {
            expect(letterGradeScoreRange(0.75, A, B, C, D, minScore, maxScore)).toEqual({
                letterGrade: GRADE_C,
                minScoreRange: C,
                maxScoreRange: B
            });
        });

        it('should identify 65 as a D', () => {
            expect(letterGradeScoreRange(0.65, A, B, C, D, minScore, maxScore)).toEqual({
                letterGrade: GRADE_D,
                minScoreRange: D,
                maxScoreRange: C
            });
        });

        it('should identify 55 as an F', () => {
            expect(letterGradeScoreRange(0.55, A, B, C, D, minScore, maxScore)).toEqual({
                letterGrade: GRADE_F,
                minScoreRange: 0,
                maxScoreRange: D
            });
        });
    });

    describe('given boundary scores', () => {
        it('should identify 105 as an A', () => {
            expect(letterGradeScoreRange(1.05, A, B, C, D, minScore, maxScore)).toEqual({
                letterGrade: GRADE_A,
                minScoreRange: A,
                maxScoreRange: maxScore
            });
        });

        it('should identify 90 as an A', () => {
            expect(letterGradeScoreRange(0.90, A, B, C, D, minScore, maxScore)).toEqual({
                letterGrade: GRADE_A,
                minScoreRange: A,
                maxScoreRange: maxScore
            });
        });

        it('should identify 89.99 as a B', () => {
            expect(letterGradeScoreRange(0.8999, A, B, C, D, minScore, maxScore)).toEqual({
                letterGrade: GRADE_B,
                minScoreRange: B,
                maxScoreRange: A
            });
        });

        it('should identify a beyond terrible score as an F', () => {
            expect(letterGradeScoreRange(-0.10, A, B, C, D, minScore, maxScore)).toEqual({
                letterGrade: GRADE_F,
                minScoreRange: minScore,
                maxScoreRange: D
            });
        });
    });
});

describe('gradeEntryStatistics', () => {
    const gradeEntries: GradeEntryPoints[] = [
        {
            points: 85,
            maxPoints: 100
        },
        {
            points: 9,
            maxPoints: 10
        }
    ];

    describe('given normal input', () => {
        it('should properly handle some grade entries', () => {
            expect(gradeEntryStatistics(gradeEntries, A, B, C, D))
                .toEqual({
                    letterGrade: GRADE_B,
                    minScoreRange: B,
                    maxScoreRange: A,
                    points: 94,
                    maxPoints: 110,
                    score: 94 / 110
                });
        });

        it('should properly handle no grade entries', () => {
            expect(gradeEntryStatistics([], A, B, C, D)).toBeNull()
        });
    });
});
