import axios, {AxiosRequestConfig} from 'axios';
import {College} from './types';

interface CollegeResponse extends Array<College> {
}

export interface CollegeOption {
    label: string;
    value: College;
}

/**
 * Get string representation of college.
 * @param college - College to get representation for
 * @return String representation of college
 */
export function collegeToString(college: College): string {
    return `${college.name} - ${college.location}`;
}

/**
 * Load college options for an async select input.
 * @param inputValue - Search value to filter options by
 * @param callback - Async callback for new options
 */
export function loadColleges(inputValue: string, callback: CallableFunction) {
    const config: AxiosRequestConfig = {
        params: {
            search: inputValue
        }
    };

    axios.get<CollegeResponse>('http://localhost:8000/api/colleges/', config)
        .then(res => {
            const options: Array<CollegeOption> = res.data.map(college => ({
                label: collegeToString(college),
                value: college
            }));
            callback(options);
        })
        .catch(err => console.log('Error while loading colleges'));
}