"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, MoreVertical, Zap } from "lucide-react";
import { Station, deactivateStation, reactivateStation } from "@/lib/server/admin-stations";
import { toast } from "@/components/ui/toast";

import DeactivateStationDialog from "./DeactivateStationDialog";
import ReactivateStationDialog from "./ReactivateStationDialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Props {
  initialStations: Station[];
  managers?: Manager[];
}

const statusStyle: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  deactivated: "bg-red-100 text-red-600",
};

export default function StationsList({ initialStations, managers }: Props) {
  const [stations, setStations] = useState<Station[]>(initialStations);
  const [deactivateTarget, setDeactivateTarget] = useState<Station | null>(null);
  const [reactivateTarget, setReactivateTarget] = useState<Station | null>(null);
  const [blockedMessage, setBlockedMessage] = useState<string | null>(null);

  async function handleDeactivate(station: Station) {
    const result = await deactivateStation(station.id);
    if (result.data?.blocked) {
      setBlockedMessage("You can't deactivate this station now — it has outstanding orders.");
      setDeactivateTarget(station);
      return;
    }
    if (result.success) {
      setStations((prev) =>
        prev.map((s) => (s.id === station.id ? { ...s, status: "deactivated" } : s)),
      );
      toast.add({ title: "Station deactivated", type: "success" });
    }
    setDeactivateTarget(null);
  }

  async function handleReactivate(station: Station) {
    const result = await reactivateStation(station.id);
    if (result.success) {
      setStations((prev) =>
        prev.map((s) => (s.id === station.id ? { ...s, status: "active" } : s)),
      );
      toast.add({ title: "Station reactivated", type: "success" });
    }
    setReactivateTarget(null);
  }

  if (stations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary-50">
          <Zap className="text-primary" size={28} />
        </div>
        <div>
          <h2 className="font-pjs text-xl font-semibold text-neutral-900 mb-2">
            No Stations Yet
          </h2>
          <p className="text-sm text-neutra-700 max-w-xs">
            Add your first fuel station to start managing orders and inventory.
          </p>
        </div>
        <Button variant="secondary" size="pill" className="text-white" asChild>
          <Link href="/admin/stations/new">
            <Plus size={16} />
            Add New Station
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-pjs text-2xl font-semibold">Stations</h1>
        <Button variant="secondary" size="pill" className="text-white" asChild>
          <Link href="/admin/stations/new">
            <Plus size={16} />
            Add New Station
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-xs border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-neutra-700 bg-gray-50">
              <th className="px-4 py-3 font-medium">Station Name</th>
              <th className="px-4 py-3 font-medium">Address</th>
              <th className="px-4 py-3 font-medium">Manager</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station) => (
              <tr
                key={station.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-neutral-900">{station.name}</td>
                <td className="px-4 py-3 text-neutra-700 max-w-[200px] truncate">
                  {station.address}, {station.city}, {station.state}
                </td>
                <td className="px-4 py-3 text-neutra-700">
                  {station.managerName ?? <span className="text-gray-400">Unassigned</span>}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                      statusStyle[station.status] ?? "bg-gray-100 text-gray-600",
                    )}
                  >
                    {station.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer p-1 rounded hover:bg-gray-100">
                      <MoreVertical size={16} className="text-neutra-700" />
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-44 p-1">
                      {station.status === "active" ? (
                        <button
                          className="flex w-full items-center rounded px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          onClick={() => setDeactivateTarget(station)}
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          className="flex w-full items-center rounded px-3 py-2 text-sm text-green-700 hover:bg-green-50"
                          onClick={() => setReactivateTarget(station)}
                        >
                          Reactivate
                        </button>
                      )}
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialogs */}
      {deactivateTarget && (
        <DeactivateStationDialog
          station={deactivateTarget}
          blocked={Boolean(blockedMessage)}
          blockedMessage={blockedMessage ?? ""}
          onConfirm={() => handleDeactivate(deactivateTarget)}
          onClose={() => { setDeactivateTarget(null); setBlockedMessage(null); }}
        />
      )}
      {reactivateTarget && (
        <ReactivateStationDialog
          station={reactivateTarget}
          onConfirm={() => handleReactivate(reactivateTarget)}
          onClose={() => setReactivateTarget(null)}
        />
      )}
    </>
  );
}
