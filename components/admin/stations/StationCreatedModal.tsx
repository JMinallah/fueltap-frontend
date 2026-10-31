"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Station } from "@/lib/server/admin-stations";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogPopup,
} from "@/components/animate-ui/components/base/alert-dialog";
import Link from "next/link";

interface Props {
  station: Station;
  onClose: () => void;
}

export default function StationCreatedModal({ station, onClose }: Props) {
  return (
    <AlertDialog open onOpenChange={(open) => !open && onClose()}>
      <AlertDialogPopup className="w-full max-w-md rounded-2xl p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="text-green-600" size={36} />
          </div>
        </div>

        <AlertDialogTitle className="mb-1 text-lg font-semibold text-neutral-900">
          Station Created Successfully
        </AlertDialogTitle>

        <p className="mb-2 text-sm text-neutra-700">
          <strong>{station.name}</strong> has been added to your network.
        </p>

        <div className="mb-6 rounded-xl bg-gray-50 p-3 text-left text-sm">
          <p className="mb-1 text-neutra-700">
            <span className="font-medium text-neutral-900">Address:</span>{" "}
            {station.address}, {station.city}, {station.state}
          </p>
          {station.managerName && (
            <p className="text-neutra-700">
              <span className="font-medium text-neutral-900">Manager:</span>{" "}
              {station.managerName}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="full"
            className="basis-1/2 border-primary text-primary"
            onClick={onClose}
          >
            Add Another
          </Button>
          <Button variant="secondary" size="full" className="basis-1/2 text-white" asChild>
            <Link href="/admin/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
