import { Metadata } from "next";
import { getStations } from "@/lib/server/admin-stations";
import { getManagers } from "@/lib/server/admin-managers";
import StationsList from "@/components/admin/stations/StationsList";

export const metadata: Metadata = { title: "Stations | FuelTap Admin" };

export default async function StationsPage() {
  const [stationsResult, managersResult] = await Promise.allSettled([
    getStations(),
    getManagers(),
  ]);

  const stations =
    stationsResult.status === "fulfilled" && stationsResult.value.success
      ? stationsResult.value.data?.stations ?? []
      : [];

  const managers =
    managersResult.status === "fulfilled" && managersResult.value.success
      ? managersResult.value.data?.managers ?? []
      : [];

  return <StationsList initialStations={stations} managers={managers} />;
}
