import AdminHeader from "@/components/admin/AdminHeader";
import SoftGlow from "@/components/admin/ui/SoftGlow";
import { AuthProvider } from "@/context/AuthProvider";
import { requireAdmin } from "@/lib/server/admin/session";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <AuthProvider initialUser={user}>
      <div className="relative isolate min-h-dvh bg-[#F8F9FB]">
        <SoftGlow className="opacity-40" />
        <AdminHeader />
        <main className="container pt-8 pb-16 md:pt-30">{children}</main>
      </div>
    </AuthProvider>
  );
}
