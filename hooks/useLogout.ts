import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/logout");
  };

  return handleLogout;
};
