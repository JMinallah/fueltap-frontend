import { Metadata } from "next";
import { Suspense } from "react";
import AdminRegisterForm from "@/components/admin/auth/AdminRegisterForm";

export const metadata: Metadata = {
  title: "Create Account | FuelTap Admin",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AdminRegisterForm />
    </Suspense>
  );
}
