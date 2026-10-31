import { Metadata } from "next";
import AdminConfirmPassword from "@/components/admin/auth/AdminConfirmPassword";

export const metadata: Metadata = {
  title: "Create Password | FuelTap Admin",
};

export default function Page() {
  return <AdminConfirmPassword />;
}
