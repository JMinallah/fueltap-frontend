"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogPopup,
} from "@/components/animate-ui/components/base/alert-dialog";
import Link from "next/link";

interface Props {
  onClose: () => void;
  onInviteAnother: () => void;
}

export default function InviteSentModal({ onClose, onInviteAnother }: Props) {
  return (
    <AlertDialog open onOpenChange={(open) => !open && onClose()}>
      <AlertDialogPopup className="w-full max-w-md rounded-2xl p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="text-green-600" size={36} />
          </div>
        </div>

        <AlertDialogTitle className="mb-2 text-lg font-semibold text-neutral-900">
          Invitation Sent Successfully!
        </AlertDialogTitle>

        <p className="mb-6 text-sm text-neutra-700">
          The manager will receive an email with instructions to set up their account.
        </p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="full"
            className="basis-1/2 border-primary text-primary"
            onClick={onInviteAnother}
          >
            Invite Another
          </Button>
          <Button variant="secondary" size="full" className="basis-1/2 text-white" asChild>
            <Link href="/admin/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
