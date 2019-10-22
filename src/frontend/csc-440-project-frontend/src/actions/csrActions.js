import axios from 'axios';
import {tokenConfig} from './auth';
import {FETCH_CSRS} from './types';

/**
 * Get a name for a CSR.
 * @param csr {Object} - The CSR
 * @param categories {Array} - Categories to which it applies
 * @return {string} Name of requirement
 */
export function csrName(csr, categories) {
    const a = (csr.min_a * 100).toFixed(1);
    const b = (csr.min_b * 100).toFixed(1);
    return `A = ${a}%, B = ${b}%, ... - ${categories.length} categories`;
}

export const fetchCSRs = () => (dispatch, getState) => {
    return axios.get('http://localhost:8000/api/category-score-requirements/', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: FETCH_CSRS,
                payload: res.data
            })
        )
        .catch(err => console.log('Failed to fetch category score requirements'));
};
