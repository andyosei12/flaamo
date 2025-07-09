import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import BottomNav from "@/components/dashboard/bottom-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ProtectedRoute>
    //   <div className="flex min-h-screen bg-background text-foreground">
    //     <Sidebar />

    //     <div className="flex flex-col flex-1 min-w-0 max-h-screen overflow-hidden">
    //       {/* Sticky Topbar */}
    //       <header className="sticky top-0 z-30 w-full bg-background border-b">
    //         <Topbar />
    //       </header>

    //       {/* Scrollable Content */}
    //       <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
    //         {children}
    //       </main>
    //     </div>
    //   </div>
    // </ProtectedRoute>

    <ProtectedRoute>
      <div className="flex min-h-screen flex-col md:flex-row bg-background text-foreground">
        <Sidebar />

        <div className="flex-1 flex flex-col pb-14 md:pb-0">
          {" "}
          {/* Room for mobile nav */}
          <Topbar />
          <main className="flex-1 p-4">{children}</main>
          <BottomNav />
        </div>
      </div>
    </ProtectedRoute>
  );
}
