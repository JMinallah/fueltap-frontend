import { Metadata } from "next";
import StationsList from "@/components/admin/stations/StationsList";
import { getManagers } from "@/lib/server/admin/managers";
import { getStations } from "@/lib/server/admin/stations";

export const metadata: Metadata = { title: "Stations | FuelTap Admin" };

export default async function StationsPage() {
  const [stations, managers] = await Promise.all([getStations(), getManagers()]);

  return (
    <StationsList
      stations={stations.success ? stations.data : []}
      managers={
        managers.success
          ? managers.data
              .filter((m) => m.status !== "inactive")
              .map((m) => ({ id: m.id, name: m.name }))
          : []
      }
    />
  );
}
