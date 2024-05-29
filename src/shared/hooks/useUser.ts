import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export const useUser = () => {
  const router = useRouter();
  const { data, status } = useSession();
  if (data === null) {
    router.push("/login");
  }
  const user = data as Session;
  return {
    ...user,
    status,
  };
};
