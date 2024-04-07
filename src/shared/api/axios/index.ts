import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXTAUTH_BACKEND_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;