import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useLogout";

const LogoutButton = () => {
  const logout = useLogout();

  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-destructive hover:bg-muted rounded-md transition-all"
    >
      <LogOut size={16} />
      Logout
    </button>
  );
};

export default LogoutButton;
