import { Metadata } from "next";
import AddStationForm from "@/components/admin/stations/AddStationForm";
import { getManagers } from "@/lib/server/admin/managers";

export const metadata: Metadata = { title: "Add Station | FuelTap Admin" };

export default async function NewStationPage() {
  const result = await getManagers();
  // Suspended managers can't be assigned to a station.
  const managers = result.success
    ? result.data
        .filter((m) => m.status !== "inactive")
        .map((m) => ({ id: m.id, name: m.name }))
    : [];

  return <AddStationForm managers={managers} />;
}
