import { Metadata } from "next";
import { getStations } from "@/lib/server/admin-stations";
import InviteManagerForm from "@/components/admin/managers/InviteManagerForm";

export const metadata: Metadata = { title: "Invite Manager | FuelTap Admin" };

export default async function InviteManagerPage() {
  const result = await getStations();
  const stations = result.success ? result.data?.stations ?? [] : [];
  return <InviteManagerForm stations={stations} />;
}
