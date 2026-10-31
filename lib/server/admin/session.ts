import "server-only";

import type { User } from "@/context/AuthProvider";
import { getUserProfile } from "@/lib/server/auth";
import { redirect } from "next/navigation";

const ADMIN_ROLES = ["super-admin", "supplier"];

// Returns the signed-in super admin, or redirects: to the admin login when
// there's no session, and to the customer dashboard for non-admin accounts.
export async function requireAdmin(): Promise<User> {
  const result = await getUserProfile();
  const user = result.success ? result.data?.user : undefined;

  if (!user) redirect("/admin/login");

  const roles = user.account?.role ?? [];
  if (!roles.some((role) => ADMIN_ROLES.includes(role))) {
    redirect("/user/dashboard");
  }

  return user;
}
