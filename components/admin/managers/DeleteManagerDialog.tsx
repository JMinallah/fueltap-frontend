"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Manager } from "@/lib/server/admin-managers";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogPopup,
} from "@/components/animate-ui/components/base/alert-dialog";

/** Three variants from Figma:
 *  "blocked"   — manager's station has outstanding orders
 *  "assigned"  — manager is still assigned to a station (needs confirmation)
 *  "free"      — manager is not assigned to any station (needs confirmation)
 */
type DeleteVariant = "blocked" | "assigned" | "free";

interface Props {
  manager: Manager;
  variant: DeleteVariant;
  onConfirm: () => void;
  onClose: () => void;
}

const COPY: Record<DeleteVariant, { title: string; body: (name: string) => string; confirmLabel?: string }> = {
  blocked: {
    title: "You can't delete this manager now",
    body: (name) =>
      `${name}'s station has outstanding orders. Please resolve all orders before deleting this manager.`,
  },
  assigned: {
    title: "Delete this manager?",
    body: (name) =>
      `${name} is still assigned to a station. Deleting them will leave the station unassigned.`,
    confirmLabel: "Delete",
  },
  free: {
    title: "Delete Manager?",
    body: (name) =>
      `Are you sure you want to permanently delete ${name}? This action cannot be undone.`,
    confirmLabel: "Delete",
  },
};

export default function DeleteManagerDialog({ manager, variant, onConfirm, onClose }: Props) {
  const copy = COPY[variant];

  return (
    <AlertDialog open onOpenChange={(open) => !open && onClose()}>
      <AlertDialogPopup className="w-full max-w-md rounded-2xl p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="text-red-600" size={26} />
          </div>
        </div>
        <AlertDialogTitle className="mb-2 text-lg font-semibold text-neutral-900">
          {copy.title}
        </AlertDialogTitle>
        <p className="mb-6 text-sm text-neutra-700">{copy.body(manager.name)}</p>

        {variant === "blocked" ? (
          <Button size="full" onClick={onClose}>Got it</Button>
        ) : (
          <div className="flex gap-3">
            <Button variant="outline" size="full" className="basis-1/2 border-primary text-primary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="full"
              className="basis-1/2 bg-red-500 text-white hover:bg-red-600"
              onClick={onConfirm}
            >
              {copy.confirmLabel}
            </Button>
          </div>
        )}
      </AlertDialogPopup>
    </AlertDialog>
  );
}
