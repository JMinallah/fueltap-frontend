"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Manager } from "@/lib/server/admin-managers";
import { Station } from "@/lib/server/admin-stations";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogPopup,
} from "@/components/animate-ui/components/base/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  manager: Manager;
  stations: Station[];
  /** true if the manager's previous station is already assigned to another manager */
  stationTaken: boolean;
  onConfirm: (newStationId?: string) => void;
  onClose: () => void;
}

export default function ReactivateManagerDialog({
  manager,
  stations,
  stationTaken,
  onConfirm,
  onClose,
}: Props) {
  const [selectedStation, setSelectedStation] = useState("");
  const availableStations = stations.filter((s) => s.status === "active");

  return (
    <AlertDialog open onOpenChange={(open) => !open && onClose()}>
      <AlertDialogPopup className="w-full max-w-md rounded-2xl p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="text-green-600" size={26} />
          </div>
        </div>
        <AlertDialogTitle className="mb-2 text-lg font-semibold text-neutral-900">
          Reactivate Manager?
        </AlertDialogTitle>

        {stationTaken ? (
          <>
            <p className="mb-4 text-sm text-neutra-700">
              <strong>{manager.name}</strong>&apos;s previous station has been assigned to another
              manager. Please assign a new station.
            </p>
            <Select value={selectedStation} onValueChange={setSelectedStation}>
              <SelectTrigger className="mb-4 h-10 w-full rounded-lg border border-neutra-500">
                <SelectValue placeholder="Select a station" />
              </SelectTrigger>
              <SelectContent>
                {availableStations.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name} — {s.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-3">
              <Button variant="outline" size="full" className="basis-1/2 border-primary text-primary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="secondary"
                size="full"
                className="basis-1/2 text-white"
                disabled={!selectedStation}
                onClick={() => onConfirm(selectedStation)}
              >
                Reactivate
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="mb-6 text-sm text-neutra-700">
              <strong>{manager.name}</strong> will be reactivated and reassigned to their previous
              station.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="full" className="basis-1/2 border-primary text-primary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="secondary" size="full" className="basis-1/2 text-white" onClick={() => onConfirm()}>
                Reactivate
              </Button>
            </div>
          </>
        )}
      </AlertDialogPopup>
    </AlertDialog>
  );
}
