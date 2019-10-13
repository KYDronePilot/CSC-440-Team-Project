type POINT_BASED = 'point_based';
type WEIGHT_BASED = 'weight_based';

type FALL = 'fall';
type WINTER = 'winter';
type SPRING = 'spring';
type SUMMER = 'summer';

export interface CourseInstance {
    grading_strategy: 'point_based' | 'weight_based';
    min_a: number;
    min_b: number;
    min_c: number;
    min_d: number;
    max_points?: number;
    section: number;
    course: number;
    semester: number;
    students: number[];
}

export interface Course {
    code: string;
    name: string;
    credit_hours: number;
    is_deprecated: boolean;
    requirements: number[];
    is_gen_ed: boolean;
}

export interface Semester {
    year: number;
    season: FALL | WINTER | SPRING | SUMMER;
    colleges: number[]
}
