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
    describe.each`
        score     | grade      | minRange    | maxRange
        ${0.95}   | ${GRADE_A} | ${A}        | ${maxScore}
        ${0.85}   | ${GRADE_B} | ${B}        | ${A}
        ${0.75}   | ${GRADE_C} | ${C}        | ${B}
        ${0.65}   | ${GRADE_D} | ${D}        | ${C}
        ${0.55}   | ${GRADE_F} | ${0}        | ${D}
        ${1.05}   | ${GRADE_A} | ${A}        | ${maxScore}
        ${0.90}   | ${GRADE_A} | ${A}        | ${maxScore}
        ${0.8999} | ${GRADE_B} | ${B}        | ${A}
        ${-0.10}  | ${GRADE_F} | ${minScore} | ${D}
    `('given decimal score of $score', ({score, grade, minRange, maxRange}) => {
        it(`should identify it as a(n) ${grade}`, () => {
            expect(letterGradeScoreRange(score, A, B, C, D, minScore, maxScore)).toEqual({
                letterGrade: grade,
                minScoreRange: minRange,
                maxScoreRange: maxRange
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
