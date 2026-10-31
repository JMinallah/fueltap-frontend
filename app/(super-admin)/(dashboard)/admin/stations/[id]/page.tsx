import { Metadata } from "next";
import { notFound } from "next/navigation";
import StationDetail from "@/components/admin/stations/StationDetail";
import { getManagers } from "@/lib/server/admin/managers";
import { getStation, getStationOrders } from "@/lib/server/admin/stations";

export const metadata: Metadata = { title: "Station | FuelTap Admin" };

export default async function StationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [station, orders, managers] = await Promise.all([
    getStation(id),
    getStationOrders(id),
    getManagers(),
  ]);

  if (!station.success) notFound();

  return (
    <StationDetail
      station={station.data}
      orders={orders.success ? orders.data : []}
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
