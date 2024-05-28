import jwt from "jsonwebtoken";
import { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "process";

import { authService, UserLogin } from "@/entity/Auth";
import { RoleEnum } from "@/entity/User/model";
import api, { extractTokenFromSetCookie } from "@/shared/api/axios";

declare module "next-auth" {
  interface User {
    id: string;
    role: RoleEnum;
    school: string;
    surname: string;
    name: string;
    patronymic: string;
    accessToken: string;
  }
  interface Session {
    user: User;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: RoleEnum;
    school: string;
    surname: string;
    name: string;
    patronymic: string;
    accessToken: string;
  }
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
            ) as JWT;

            return {
              id: decodedToken.id,
              role: decodedToken.role,
              school: decodedToken.school,
              surname: decodedToken.surname,
              name: decodedToken.name,
              patronymic: decodedToken.patronymic,
              accessToken: token,
            } as User;
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
        token.id = user.id;
        token.role = user.role;
        token.school = user.school;
        token.surname = user.surname;
        token.name = user.name;
        token.patronymic = user.patronymic;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        role: token.role,
        school: token.school,
        surname: token.surname,
        name: token.name,
        patronymic: token.patronymic,
        accessToken: token.accessToken,
      };
      session.accessToken = token.accessToken;
      api.defaults.headers["Authorization"] = `Bearer ${session.accessToken}`;
      console.log("session!!!");
      console.log(api.defaults.headers["Authorization"]);
      return session;
    },
  },
};
