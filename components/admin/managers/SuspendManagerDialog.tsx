"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Manager } from "@/lib/server/admin-managers";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogPopup,
} from "@/components/animate-ui/components/base/alert-dialog";

interface Props {
  manager: Manager;
  blocked: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function SuspendManagerDialog({ manager, blocked, onConfirm, onClose }: Props) {
  return (
    <AlertDialog open onOpenChange={(open) => !open && onClose()}>
      <AlertDialogPopup className="w-full max-w-md rounded-2xl p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-yellow-100">
            <AlertTriangle className="text-yellow-600" size={26} />
          </div>
        </div>
        <AlertDialogTitle className="mb-2 text-lg font-semibold text-neutral-900">
          {blocked
            ? `You can't suspend this manager now`
            : `Suspend manager?`}
        </AlertDialogTitle>
        <p className="mb-6 text-sm text-neutra-700">
          {blocked
            ? `${manager.name}'s station has outstanding orders. Please resolve them before suspending.`
            : `Are you sure you want to suspend ${manager.name}? They will lose access to their station dashboard.`}
        </p>
        {blocked ? (
          <Button size="full" onClick={onClose}>Got it</Button>
        ) : (
          <div className="flex gap-3">
            <Button variant="outline" size="full" className="basis-1/2 border-primary text-primary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" size="full" className="basis-1/2 bg-red-500 text-white hover:bg-red-600" onClick={onConfirm}>
              Suspend
            </Button>
          </div>
        )}
      </AlertDialogPopup>
    </AlertDialog>
  );
}
