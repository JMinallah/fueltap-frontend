import { Metadata } from "next";
import AdminInviteForm, {
  InvalidInvite,
} from "@/components/admin/auth/AdminInviteForm";
import { getInvite } from "@/lib/server/admin/auth";

export const metadata: Metadata = {
  title: "Create Account | FuelTap Admin",
};

// Super admins join through an invitation link: /admin/register?token=…
export default async function AdminRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const invite = await getInvite(token ?? null);

  if (!invite.success) return <InvalidInvite message={invite.message} />;
  return <AdminInviteForm invite={invite.data} />;
}
