import Sidebar from "@/components/ui/Sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Fetch the session on the server
  const session = await getServerSession();

  // 2. Authorization Check: If no session, redirect to login
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Persistent Sidebar with Logout Functionality */}
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Header with Dynamic Admin Info */}
        <header className="h-16 border-b bg-white flex items-center px-8 sticky top-0 z-10">
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                Admin Session
              </span>
              <span className="text-sm text-slate-500 italic">
                {session.user?.email}
              </span>
            </div>
            {/* Avatar showing first letter of email */}
            <div className="h-9 w-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold uppercase">
              {session.user?.email?.[0] || "A"}
            </div>
          </div>
        </header>
        
        <div className="max-w-7xl mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}