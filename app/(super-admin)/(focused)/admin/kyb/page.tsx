import { Metadata } from "next";
import KybFlow from "@/components/admin/kyb/KybFlow";

export const metadata: Metadata = {
  title: "Business Verification | FuelTap Admin",
};

export default function KybPage() {
  return <KybFlow />;
}
