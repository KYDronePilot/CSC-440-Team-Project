import {Major} from './types';
import axios, {AxiosRequestConfig} from 'axios';
import {OptionsType, OptionTypeBase} from 'react-select/src/types';
import {MAJORS_URL} from './urls';

interface MajorResponse extends Array<Major> {
}

export interface MajorOption extends OptionTypeBase {
    label: string;
    value: Major;
}
export type MajorOptions = OptionsType<MajorOption>;

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
export const loadMajors = (params: object) => (inputValue: string, callback: ((options: MajorOptions) => void)) => {
    const config: AxiosRequestConfig = {
        params: {
            search: inputValue,
            ...params
        }
    };

    axios.get<MajorResponse>(MAJORS_URL, config)
        .then(res => {
            const options: MajorOptions = res.data.map(major => ({
                label: majorToString(major),
                value: major
            }));
            callback(options);
        })
        .catch(err => console.log('Error while loading majors'));
};