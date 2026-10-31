import { Metadata } from "next";
import AdminLoginForm from "@/components/admin/auth/AdminLoginForm";

export const metadata: Metadata = {
  title: "Login | FuelTap Admin",
};

export default function Page() {
  return <AdminLoginForm />;
}
