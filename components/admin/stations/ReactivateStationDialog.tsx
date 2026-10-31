"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Station } from "@/lib/server/admin-stations";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogPopup,
} from "@/components/animate-ui/components/base/alert-dialog";

interface Props {
  station: Station;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ReactivateStationDialog({ station, onConfirm, onClose }: Props) {
  return (
    <AlertDialog open onOpenChange={(open) => !open && onClose()}>
      <AlertDialogPopup className="w-full max-w-md rounded-2xl p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="text-green-600" size={28} />
          </div>
        </div>

        <AlertDialogTitle className="mb-2 text-lg font-semibold text-neutral-900">
          Reactivate this station?
        </AlertDialogTitle>

        <p className="mb-6 text-sm text-neutra-700">
          Are you sure you want to reactivate &quot;{station.name}&quot;? It will become available
          to customers again.
        </p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="full"
            className="basis-1/2 border-primary text-primary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            size="full"
            className="basis-1/2 text-white"
            onClick={onConfirm}
          >
            Reactivate
          </Button>
        </div>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
