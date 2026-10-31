import { Metadata } from "next";
import InviteManagerForm from "@/components/admin/managers/InviteManagerForm";

export const metadata: Metadata = { title: "Invite Manager | FuelTap Admin" };

export default function InviteManagerPage() {
  return <InviteManagerForm />;
}
