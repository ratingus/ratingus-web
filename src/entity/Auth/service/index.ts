import { LOGIN_PATH, LOGOUT_PATH, REGISTER_PATH } from "../constants";
import { UserLogin } from "../types";

import api from "@/shared/api/axios";

const authService = {
  login: async (credentials: UserLogin) => {
    return await api.post(LOGIN_PATH, credentials);
  },

  logout: async () => {
    await api.post(LOGOUT_PATH);
  },

  register: async (credentials: UserLogin) => {
    await api.post(REGISTER_PATH, credentials);
  },
};

export default authService;
