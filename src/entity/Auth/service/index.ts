import api from '@/shared/api/axios';

import {LOGIN_PATH, LOGOUT_PATH, REGISTER_PATH} from '../constants';
import {UserLogin} from "../types";

const authService = {
    login: async (credentials: UserLogin) => {
        const response = await api.post(LOGIN_PATH, credentials);
        return response.data;
    },

    logout: async () => {
        const response = await api.post(LOGOUT_PATH);
        return response.data;
    },

    register: async (credentials: UserLogin) => {
        const response = await api.post(REGISTER_PATH, credentials);
        return response.data;
    },
};

export default authService;