import jwt from "jsonwebtoken";
import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "process";

import { authService, UserLogin } from "@/entity/Auth";
import { getFioByUser } from "@/entity/User/helpers";
import { RoleEnum } from "@/entity/User/model";
import api, { extractTokenFromSetCookie } from "@/shared/api/axios";

declare module "next-auth" {
  interface User {
    id: string;
    role: RoleEnum;
    surname: string;
    name: string;
    patronymic: string;
    fio: string;
    accessToken: string;
    userRoleId?: number;
    school?: string;
    classId?: number;
    className?: string;
  }
  interface Session extends User {
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: RoleEnum;
    surname: string;
    name: string;
    fio: string;
    patronymic: string;
    accessToken: string;
    userRoleId?: number;
    school?: string;
    classId?: number;
    className?: string;
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
    authorize: async (credentials) => {
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
              ...decodedToken,
              fio: getFioByUser({
                surname: decodedToken.surname,
                name: decodedToken.name,
                patronymic: decodedToken.patronymic,
              }),
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
        return {
          ...user,
          fio: getFioByUser({
            surname: user.surname,
            name: user.name,
            patronymic: user.patronymic,
          }),
        };
      }
      return token;
    },
    async session({ token }) {
      api.defaults.headers["Authorization"] = `Bearer ${token.accessToken}`;
      console.log("session!!!");
      console.log(api.defaults.headers["Authorization"]);
      return token as unknown as Session;
    },
  },
};
