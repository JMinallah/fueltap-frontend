import { Metadata } from "next";
import { getManagers } from "@/lib/server/admin-managers";
import AddStationForm from "@/components/admin/stations/AddStationForm";

export const metadata: Metadata = { title: "Add Station | FuelTap Admin" };

export default async function NewStationPage() {
  const result = await getManagers();
  const managers =
    result.success ? result.data?.managers ?? [] : [];

  return <AddStationForm managers={managers} />;
}
