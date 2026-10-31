import { Metadata } from "next";
import { getManagers } from "@/lib/server/admin-managers";
import { getStations } from "@/lib/server/admin-stations";
import ManagersList from "@/components/admin/managers/ManagersList";

export const metadata: Metadata = { title: "Managers | FuelTap Admin" };

export default async function ManagersPage() {
  const [managersResult, stationsResult] = await Promise.allSettled([
    getManagers(),
    getStations(),
  ]);

  const managers =
    managersResult.status === "fulfilled" && managersResult.value.success
      ? managersResult.value.data?.managers ?? []
      : [];

  const stations =
    stationsResult.status === "fulfilled" && stationsResult.value.success
      ? stationsResult.value.data?.stations ?? []
      : [];

  return <ManagersList initialManagers={managers} stations={stations} />;
}
