import SoftGlow from "@/components/admin/ui/SoftGlow";
import { AuthProvider } from "@/context/AuthProvider";
import { requireAdmin } from "@/lib/server/admin/session";

// Single-task pages (KYB, invite manager, add station). Each page renders its
// own FocusedHeader because the header's actions and progress differ per page.
export default async function AdminFocusedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <AuthProvider initialUser={user}>
      <div className="relative isolate flex min-h-dvh flex-col bg-[#F8F9FB]">
        <SoftGlow className="opacity-40" />
        {children}
      </div>
    </AuthProvider>
  );
}
