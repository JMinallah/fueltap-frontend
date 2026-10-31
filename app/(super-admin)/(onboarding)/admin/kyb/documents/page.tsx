import { Metadata } from "next";
import DocumentUploadForm from "@/components/admin/kyb/DocumentUploadForm";

export const metadata: Metadata = {
  title: "Corporate Documents | FuelTap Admin",
};

export default function KybDocumentsPage() {
  return <DocumentUploadForm />;
}
