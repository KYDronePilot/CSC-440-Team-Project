import {Season} from '../components/SemesterListItem';

type POINT_BASED = 'point_based';
type WEIGHT_BASED = 'weight_based';

type FALL = 'fall';
type WINTER = 'winter';
type SPRING = 'spring';
type SUMMER = 'summer';

declare global {
    interface ArrayConstructor {
        isArray(arg: ReadonlyArray<any> | any): arg is ReadonlyArray<any>
    }
}

export interface GenericDjangoRestObject {
    id: number;
    notes: string | null;
    last_updated: string;
}

export interface CourseInstance extends GenericDjangoRestObject {
    grading_strategy: POINT_BASED | WEIGHT_BASED;
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

export interface Course extends GenericDjangoRestObject {
    code: string;
    name: string;
    credit_hours: number;
    is_deprecated: boolean;
    requirements: number[];
    is_gen_ed: boolean;
}

export interface Semester extends GenericDjangoRestObject {
    year: number;
    season: Season;
    colleges: number[]
}

export interface Category extends GenericDjangoRestObject {
    name: string;
    weight?: number;
    max_points?: number;
    course_instance: number;
    category_score_requirements: number[];
}

export interface CategoryScoreRequirement extends GenericDjangoRestObject {
    min_a: number;
    min_b: number;
    min_c: number;
    min_d: number;
    course_instance: number;
}

export interface GradeEntry extends GenericDjangoRestObject {
    name: string;
    points: number;
    max_points: number;
    student: number;
    category: number;
}

export interface College extends GenericDjangoRestObject {
    name: string;
    location: string;
}

export interface Major extends GenericDjangoRestObject {
    name: string;
    college: number;
}

export interface Concentration extends GenericDjangoRestObject {
    name: string;
    major: number;
}

export interface RequirementStructureCourse {
    code: string;
    credit_hours: number;
    fulfilled: boolean;
    name: string;
}

export interface RequirementStructureNode {
    courses: RequirementStructureCourse[];
    fulfilled: boolean;
    name: string;
    sub_requirements: RequirementStructureNode[];
}
