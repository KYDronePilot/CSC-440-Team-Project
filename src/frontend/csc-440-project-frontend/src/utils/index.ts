import {func} from 'prop-types';
import {toKeys} from '../views/LoginView';

export function objectIsEmpty<T extends object>(obj: T): boolean {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export const zip = (arrays: any[][]) => {
    return arrays[0].map((_, c) => arrays.map(array => array[c]));
};

/**
 * Gets field errors (if any) from Django API requests.
 * @param
 */
export function getDjangoFieldErrors<F extends string | number | symbol>(
    error: any,
    fields: {[key in F]: any}
    ): Partial<{[key in F]: string}> | null {
    if (!error || !error.response || !error.response.data)
        return null;
    const fieldNames = toKeys(fields);

    const obj: any = {};
    for (const field of fieldNames) {
        if (error.response.data[field] !== undefined)
            obj[field] = error.response.data[field];

    }
    return obj;
}
