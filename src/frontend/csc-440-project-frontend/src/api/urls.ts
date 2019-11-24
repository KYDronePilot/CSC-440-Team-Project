// All API URLs

// Base API URL
export const API_BASE_URL = '/api/';

// Base auth API URL
export const AUTH_BASE_URL = `${API_BASE_URL}auth/`;

// Basic REST API URLs with CRUD operators
export const GRADE_ENTRIES_URL = `${API_BASE_URL}grade-entries/`;
export const SEMESTERS_URL = `${API_BASE_URL}semesters/`;
export const COURSE_INSTANCES_URL = `${API_BASE_URL}course-instances/`;
export const CATEGORY_SCORE_REQUIREMENTS_URL = `${API_BASE_URL}category-score-requirements/`;
export const CATEGORIES_URL = `${API_BASE_URL}categories/`;
export const COURSES_URL = `${API_BASE_URL}courses/`;
export const COLLEGES_URL = `${API_BASE_URL}colleges/`;
export const MAJORS_URL = `${API_BASE_URL}majors/`;
export const CONCENTRATIONS_URL = `${API_BASE_URL}concentrations/`;

// Specialized API URLs
export const COURSE_INSTANCE_SEARCH_URL = `${API_BASE_URL}course-instance-search/`;
export const REQUIREMENT_STRUCTURE_URL = `${API_BASE_URL}requirement-structure/`;

// Auth API URLs
// TODO: Can the trailing slash be added to these?
export const LOGIN_URL = `${AUTH_BASE_URL}login`;
export const USER_URL = `${AUTH_BASE_URL}user`;
export const REGISTER_URL = `${AUTH_BASE_URL}register`;
export const LOGOUT_URL = `${AUTH_BASE_URL}logout/`;