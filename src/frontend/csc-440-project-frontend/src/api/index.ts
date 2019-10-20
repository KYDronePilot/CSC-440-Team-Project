import axios from 'axios';
import store from '../store';

axios.interceptors.request.use(config => {
    const token = store.getState().auth.token;
    config.headers = {
        'Content-Type': 'application/json',
        ...config.headers
    };

    // Add token if available
    if (token)
        config.headers.Authorization = `Token ${token}`;

    return config;
});
