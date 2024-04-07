import { env } from "process";
import Credentials from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers/index";

import { authService, UserLogin } from "@/entity/Auth";
import { NextAuthOptions } from "next-auth";

const providers: Provider[] = [
  Credentials({
    name: "Login and password",
    credentials: {
      login: { label: "Логин", type: "text", placeholder: "Логин" },
      password: { label: "Пароль", type: "password" },
    },
    // Здесь отправляем запрос на сервер для авторизации пользователя по логину и паролю и возвращаем jwt из которого потом будем парсить данные пользователя
    async authorize(credentials) {
      try {
        const { jwt: token } = await authService.login(
          credentials as UserLogin,
        );
        console.log("TOKENING!");
        console.log(token);

        if (token) {
          return {
            id: "0",
            name: "John Doe",
            email: "test@test.ru",
          };
        }
        throw new Error("token invalid");
      } catch (error) {
        console.error("Failed to login:", error);
        throw new Error("something went wrong");
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
    // @ts-ignore
    async signIn({ user, account }) {
      console.log(user);
      console.log(account);
      if (account && user) {
        return true;
      } else {
        // TODO : Add unauthorized page
        return "/unauthorized";
      }
    },
    // @ts-ignore
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    // @ts-ignore
    async session({ session, token }) {
      // if (token) {
      //     session.user = token.user;
      //     session.error = token.error;
      //     session.accessToken = token.accessToken;
      // }
      return session;
    },
    // @ts-ignore
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.accessToken;
        token.user = user;
        return token;
      }

      return token;
    },
  },
};
