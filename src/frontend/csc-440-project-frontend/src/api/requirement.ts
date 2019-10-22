import axios, {AxiosRequestConfig} from 'axios';
import {RequirementStructureNode} from './types';

/**
 * Fetch requirement structure for a concentration.
 * @param concentrationId - ID of concentration
 */
export async function loadRequirementStructure(concentrationId: number) {
    const config: AxiosRequestConfig = {
        params: {
            concentration: concentrationId
        }
    };

    // TODO: Fix this. Shouldn't be using pk/URL option, should be query param
    return axios.get<RequirementStructureNode>(`http://localhost:8000/api/requirement-structure/${concentrationId}/`, config)
        .then(res => res.data)
        .catch(err => console.log('Error occurred while fetching requirement structure'));
}