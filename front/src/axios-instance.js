import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Optionally add interceptors for requests or responses here
axiosInstance.interceptors.request.use(
    config => {
        const userString = localStorage.getItem('user') || '{}'; 
        const user = JSON.parse(userString);
        const accessToken = user.accessToken; 

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
