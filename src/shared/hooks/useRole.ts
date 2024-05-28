import { useSession } from "next-auth/react";

import { RoleEnum } from "@/entity/User/model";

export type UserRole = RoleEnum | "loading" | "unauthenticated";
export const useRole = (): UserRole => {
  const { data: user, status } = useSession();

  if (status === "loading") {
    return "loading";
  }

  if (status === "unauthenticated" || !user) {
    return "unauthenticated";
  }

  return user.role;
};
