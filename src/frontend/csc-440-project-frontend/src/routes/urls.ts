// Definition of all internal URLs of the application

export const ROOT_URL = '/';

export const SEMESTER_URL = `${ROOT_URL}semester/`;
export const SEMESTER_URL_DEF = `${SEMESTER_URL}:semesterId`;
export const COURSE_URL = `${ROOT_URL}course/`;
export const COURSE_URL_DEF = `${COURSE_URL}:courseId`;
export const CONCENTRATION_PROGRESS_URL = `${ROOT_URL}concentration-progress/`;
export const CONCENTRATION_PROGRESS_URL_DEF = CONCENTRATION_PROGRESS_URL;
export const REGISTER_URL = `${ROOT_URL}register/`;
export const REGISTER_URL_DEF = REGISTER_URL;
export const LOGIN_URL = `${ROOT_URL}login/`;
export const LOGIN_URL_DEF = LOGIN_URL;


/**
 * URLs for the grade tracking application
 */
export const GRADE_TRACKER_URLS = {
    [ROOT_URL]: null,
    [SEMESTER_URL]: null,
    [COURSE_URL]: null
};

export const isGradeTrackingURL: (arg0: string) => boolean = url => {
    if (url === ROOT_URL)
        return true;
    if (url.match(new RegExp(`${SEMESTER_URL}[0-9]+`)))
        return true;
    if (url.match(new RegExp(`${COURSE_URL}[0-9]+`)))
        return true;
    return false;
};
