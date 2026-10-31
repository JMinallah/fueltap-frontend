import AdminHeader from "@/components/admin/AdminHeader";
import { AuthProvider, User } from "@/context/AuthProvider";
import { getUserProfile } from "@/lib/server/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialUser: User | null = null;

  const result = await getUserProfile();

  if (result.success && result.data?.user) {
    initialUser = result.data.user;
  }

  if (!initialUser) {
    redirect("/admin/login");
  }

  const isAdmin =
    initialUser!.account.role.includes("super-admin") ||
    initialUser!.account.role.includes("supplier");

  if (!isAdmin) {
    redirect("/user/dashboard");
  }

  return (
    <AuthProvider initialUser={initialUser}>
      <div className="relative isolate min-h-dvh bg-neutral-400">
        {/* Background gradient */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 0%, rgba(78,113,232,0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <AdminHeader />

        <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 md:px-8">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
