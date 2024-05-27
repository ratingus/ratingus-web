import jwt from "jsonwebtoken";
import {
  NextAuthOptions,
  Session as NextAuthSession,
  User as NextAuthUser,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "process";

import { authService, UserLogin } from "@/entity/Auth";
import api, { extractTokenFromSetCookie } from "@/shared/api/axios";

// Расширение типа User
interface CustomUser extends NextAuthUser {
  id: string;
  role: string;
  school: string;
  surname: string;
  name: string;
  patronymic: string;
  accessToken: string;
}

// Расширение типа JWT
interface CustomJWT extends jwt.JwtPayload {
  id: string;
  role: string;
  school: string;
  surname: string;
  name: string;
  patronymic: string;
  accessToken: string;
}

// Расширение типа Session
interface CustomSession extends NextAuthSession {
  user: CustomUser;
  accessToken: string;
}

const providers = [
  CredentialsProvider({
    type: "credentials",
    name: "Login and password",
    credentials: {
      login: { label: "Логин", type: "text", placeholder: "Логин" },
      password: { label: "Пароль", type: "password" },
    },
    authorize: async (credentials, req) => {
      if (!credentials) {
        throw new Error("No credentials provided");
      }

      try {
        const response = await authService.login(credentials as UserLogin);

        const setCookie = response.headers["set-cookie"];
        if (setCookie) {
          const token = extractTokenFromSetCookie(setCookie);
          console.log("Extracted token:", token);

          if (token) {
            api.defaults.headers["Authorization"] = `Bearer ${token}`;
            const decodedToken = jwt.verify(
              token as string,
              Buffer.from(env.NEXTAUTH_SECRET || "", "base64"),
              {
                algorithms: ["HS512"],
              },
            ) as CustomJWT;

            return {
              id: decodedToken.id,
              role: decodedToken.role,
              school: decodedToken.school,
              surname: decodedToken.surname,
              name: decodedToken.name,
              patronymic: decodedToken.patronymic,
              accessToken: token,
            } as CustomUser;
          }
        }
        throw new Error("Token is invalid");
      } catch (error) {
        console.error("Failed to login:", error);
        throw new Error("Something went wrong during login");
      }
    },
  }),
];

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  providers,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        const customToken = token as CustomJWT;
        customToken.id = customUser.id;
        customToken.role = customUser.role;
        customToken.school = customUser.school;
        customToken.surname = customUser.surname;
        customToken.name = customUser.name;
        customToken.patronymic = customUser.patronymic;
        customToken.accessToken = customUser.accessToken;
        return customToken;
      }
      return token;
    },
    async session({ session, token }) {
      const customJWT = token as CustomJWT;
      const customSession = session as CustomSession;
      customSession.user = {
        id: customJWT.id,
        role: customJWT.role,
        school: customJWT.school,
        surname: customJWT.surname,
        name: customJWT.name,
        patronymic: customJWT.patronymic,
        accessToken: customJWT.accessToken,
      } as CustomUser;
      customSession.accessToken = customJWT.accessToken;
      api.defaults.headers["Authorization"] =
        `Bearer ${customSession.accessToken}`;
      console.log("session!!!");
      console.log(api.defaults.headers["Authorization"]);
      return customSession;
    },
  },
};
