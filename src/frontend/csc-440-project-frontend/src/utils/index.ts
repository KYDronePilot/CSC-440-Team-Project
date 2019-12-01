export function objectIsEmpty<T extends object>(obj: T): boolean {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export const zip = (arrays: any[][]) => {
    return arrays[0].map((_, c) => arrays.map(array => array[c]));
};
