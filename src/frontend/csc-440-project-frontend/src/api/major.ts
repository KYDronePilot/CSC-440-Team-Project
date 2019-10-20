import {Major} from './types';
import axios, {AxiosRequestConfig} from 'axios';
import {OptionsType, OptionTypeBase} from 'react-select/src/types';

interface MajorResponse extends Array<Major> {
}

export interface MajorOption extends OptionTypeBase {
    label: string;
    value: Major;
}

/**
 * Get string representation of major.
 * @param major - Major to get representation for
 * @return String representation
 */
export function majorToString(major: Major): string {
    return `${major.name}`;
}

/**
 * Wrapped major loader for async select input.
 * @param params - Optional query parameters
 */
export const loadMajors = (params: object) => (inputValue: string, callback: CallableFunction) => {
    const config: AxiosRequestConfig = {
        params: {
            search: inputValue,
            ...params
        }
    };

    axios.get<MajorResponse>('http://localhost:8000/api/majors/', config)
        .then(res => {
            const options: OptionsType<MajorOption> = res.data.map(major => ({
                label: majorToString(major),
                value: major
            }));
            callback(options);
        })
        .catch(err => console.log('Error while loading majors'));
};