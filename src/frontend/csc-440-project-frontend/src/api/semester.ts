import moment from 'moment';
import {Season} from '../components/SemesterListItem';
import {Semester} from './types';

export const NO_GPA = -1;

/**
 * Format a GPA value.
 * @param gpa - GPA to format
 */
export const formatGpa = (gpa: number) => {
    // Use placeholder if no GPA
    if (gpa === NO_GPA)
        return '...';
    return gpa.toFixed(1);
};

/**
 * Get the current date and season
 */
export const getCurrentYear = () => {
    return moment().year();
};

export const FALL = 'fall';
export const WINTER = 'winter';
export const SPRING = 'spring';
export const SUMMER = 'summer';
const SEASON_LABELS = {
    [FALL]: 'Fall',
    [WINTER]: 'Winter',
    [SPRING]: 'Spring',
    [SUMMER]: 'Summer'
};

/**
 * Format the season and year for a semester.
 * @param season - Semester season
 * @param year - Semester year
 */
export const formatYearSeason = (season: Season, year: number) => {
    return `${SEASON_LABELS[season]}, ${year}`;
};

/**
 * String representation of semester.
 * @param semester - Semester to represent
 * @return String representation
 */
export function semesterToString(semester: Semester) {
    return formatYearSeason(semester.season, semester.year);
}

/**
 * Get the current school season (approximation).
 */
export const getCurrentSchoolSeason = (): Season => {
    const day = moment().dayOfYear();

    // Approximate semester by day of year.
    if (day >= 15 && day < 135)
        return SPRING;
    if (day >= 135 && day < 227)
        return SUMMER;
    if (day >= 227 && day < 349)
        return FALL;
    return WINTER;
};

/**
 * Search for a semester by a year and season.
 */
export const searchSemesters = (season: Season, year: number, semesters: Semester[]) => {
    semesters = semesters.filter(semester => semester.season === season && semester.year === year);

    // Null if no matching semesters
    if (semesters.length === 0)
        return null;
    // Error if more than 1
    if (semesters.length > 1)
        throw Error('More than one identical semester.');
    return semesters[0];
};
