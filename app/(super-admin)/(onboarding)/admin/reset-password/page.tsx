import { Metadata } from "next";
import { Suspense } from "react";
import AdminResetPassword from "@/components/admin/auth/AdminResetPassword";

export const metadata: Metadata = {
  title: "Reset Password | FuelTap Admin",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminResetPassword />
    </Suspense>
  );
}
