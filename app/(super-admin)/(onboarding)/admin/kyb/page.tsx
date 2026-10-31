import { Metadata } from "next";
import CorporateIdentityForm from "@/components/admin/kyb/CorporateIdentityForm";

export const metadata: Metadata = {
  title: "Business Verification | FuelTap Admin",
};

export default function KybPage() {
  return <CorporateIdentityForm />;
}
