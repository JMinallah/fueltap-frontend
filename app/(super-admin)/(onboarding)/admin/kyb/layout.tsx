import { getUserProfile } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import { AuthProvider, User } from "@/context/AuthProvider";

// KYB requires the user to be logged in (registered + email verified)
// but doesn't need full KYB to be completed yet.
export default async function KybLayout({
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

  return <AuthProvider initialUser={initialUser}>{children}</AuthProvider>;
}
