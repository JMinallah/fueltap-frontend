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
  onConfirm: () => void;
  onClose: () => void;
}

export default function ResendInviteDialog({ manager, onConfirm, onClose }: Props) {
  return (
    <AlertDialog open onOpenChange={(open) => !open && onClose()}>
      <AlertDialogPopup className="w-full max-w-md rounded-2xl p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-blue-100">
            <AlertTriangle className="text-blue-600" size={26} />
          </div>
        </div>
        <AlertDialogTitle className="mb-2 text-lg font-semibold text-neutral-900">
          Resend invitation?
        </AlertDialogTitle>
        <p className="mb-6 text-sm text-neutra-700">
          Send a new invite email to <strong>{manager.name}</strong> at{" "}
          <strong>{manager.email}</strong>?
        </p>
        <div className="flex gap-3">
          <Button variant="outline" size="full" className="basis-1/2 border-primary text-primary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="secondary" size="full" className="basis-1/2 text-white" onClick={onConfirm}>
            Resend
          </Button>
        </div>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
