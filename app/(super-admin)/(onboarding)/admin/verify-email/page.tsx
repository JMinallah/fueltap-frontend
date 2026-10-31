import { Metadata } from "next";
import { Suspense } from "react";
import AdminVerifyEmail from "@/components/admin/auth/AdminVerifyEmail";

export const metadata: Metadata = {
  title: "Verify Email | FuelTap Admin",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminVerifyEmail />
    </Suspense>
  );
}
