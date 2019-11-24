import {Concentration} from './types';
import axios, {AxiosRequestConfig} from 'axios';
import {OptionsType, OptionTypeBase} from 'react-select/src/types';
import {CONCENTRATIONS_URL} from './urls';

interface ConcentrationResponse extends Array<Concentration> {
}

export interface ConcentrationOption extends OptionTypeBase {
    label: string;
    value: Concentration;
}
export type ConcentrationOptions = OptionsType<ConcentrationOption>;

/**
 * Get string representation of concentration.
 * @param concentration - Concentration to get representation for
 * @return String representation
 */
export function concentrationToString(concentration: Concentration): string {
    return `${concentration.name}`;
}

/**
 * Wrapped concentration loader for async select input.
 * @param params - Optional query parameters
 */
export const loadConcentrations = (params: object) => (
    inputValue: string, callback: ((options: ConcentrationOptions) => void)) => {
    const config: AxiosRequestConfig = {
        params: {
            ...params,
            search: inputValue
        }
    };

    axios.get<ConcentrationResponse>(CONCENTRATIONS_URL, config)
        .then(res => {
            const options: ConcentrationOptions = res.data.map(concentration => ({
                label: concentrationToString(concentration),
                value: concentration
            }));
            callback(options);
        })
        .catch(err => console.log('Error while loading concentrations'));
};