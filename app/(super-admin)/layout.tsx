import AdminToaster from "@/components/admin/ui/AdminToaster";

// Wraps every /admin page. The super admin designs use Plus Jakarta Sans
// throughout and their own toast style.
export default function SuperAdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-pjs flex min-h-dvh flex-1 flex-col">
      {children}
      <AdminToaster />
    </div>
  );
}
