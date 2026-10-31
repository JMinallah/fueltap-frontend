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

export default function CancelInviteDialog({ manager, onConfirm, onClose }: Props) {
  return (
    <AlertDialog open onOpenChange={(open) => !open && onClose()}>
      <AlertDialogPopup className="w-full max-w-md rounded-2xl p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-yellow-100">
            <AlertTriangle className="text-yellow-600" size={26} />
          </div>
        </div>
        <AlertDialogTitle className="mb-2 text-lg font-semibold text-neutral-900">
          Cancel invitation?
        </AlertDialogTitle>
        <p className="mb-6 text-sm text-neutra-700">
          Are you sure you want to cancel the invitation sent to{" "}
          <strong>{manager.name}</strong>? They won&apos;t be able to use the invite link.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" size="full" className="basis-1/2 border-primary text-primary" onClick={onClose}>
            Keep Invite
          </Button>
          <Button variant="destructive" size="full" className="basis-1/2 bg-red-500 text-white hover:bg-red-600" onClick={onConfirm}>
            Cancel Invite
          </Button>
        </div>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
