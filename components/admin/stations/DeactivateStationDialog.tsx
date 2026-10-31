"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Station } from "@/lib/server/admin-stations";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogPopup,
} from "@/components/animate-ui/components/base/alert-dialog";

interface Props {
  station: Station;
  blocked: boolean;
  blockedMessage: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeactivateStationDialog({
  station,
  blocked,
  blockedMessage,
  onConfirm,
  onClose,
}: Props) {
  return (
    <AlertDialog open onOpenChange={(open) => !open && onClose()}>
      <AlertDialogPopup className="w-full max-w-md rounded-2xl p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-yellow-100">
            <AlertTriangle className="text-yellow-600" size={28} />
          </div>
        </div>

        <AlertDialogTitle className="mb-2 text-lg font-semibold text-neutral-900">
          {blocked ? "You can't deactivate this station now" : "Deactivate this station?"}
        </AlertDialogTitle>

        <p className="mb-6 text-sm text-neutra-700">
          {blocked
            ? blockedMessage
            : `Are you sure you want to deactivate "${station.name}"? Customers will no longer be able to place orders at this station.`}
        </p>

        {blocked ? (
          <Button size="full" onClick={onClose} className="text-md-medium">
            Got it
          </Button>
        ) : (
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
              variant="destructive"
              size="full"
              className="basis-1/2 bg-red-500 text-white hover:bg-red-600"
              onClick={onConfirm}
            >
              Deactivate
            </Button>
          </div>
        )}
      </AlertDialogPopup>
    </AlertDialog>
  );
}
