import { AuthFormHeader, AuthPanel } from "@/components/admin/auth/AuthShell";

// Split-screen layout for super admin login, invite sign-up and password reset.
export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-dvh w-full bg-[#F8F9FB]">
      <div className="flex w-full justify-center px-4 py-10 md:w-1/2 md:py-25">
        <div className="w-full max-w-110">
          <AuthFormHeader />
          <div className="mt-12">{children}</div>
        </div>
      </div>
      <AuthPanel />
    </main>
  );
}
