import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function JoinGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
