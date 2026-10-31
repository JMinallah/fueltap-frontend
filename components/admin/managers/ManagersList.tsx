"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, MoreVertical, Users } from "lucide-react";
import {
  Manager,
  ManagerStatus,
  resendManagerInvite,
  cancelManagerInvite,
  suspendManager,
  reactivateManager,
  deleteManager,
} from "@/lib/server/admin-managers";
import { Station } from "@/lib/server/admin-stations";
import { toast } from "@/components/ui/toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ResendInviteDialog from "./ResendInviteDialog";
import CancelInviteDialog from "./CancelInviteDialog";
import SuspendManagerDialog from "./SuspendManagerDialog";
import ReactivateManagerDialog from "./ReactivateManagerDialog";
import DeleteManagerDialog from "./DeleteManagerDialog";

type DialogType =
  | { kind: "resend"; manager: Manager }
  | { kind: "cancel"; manager: Manager }
  | { kind: "suspend"; manager: Manager; blocked: boolean }
  | { kind: "reactivate"; manager: Manager; stationTaken: boolean }
  | { kind: "delete"; manager: Manager; variant: "blocked" | "assigned" | "free" }
  | null;

interface Props {
  initialManagers: Manager[];
  stations: Station[];
}

const statusStyle: Record<ManagerStatus, string> = {
  active: "bg-green-100 text-green-700",
  suspended: "bg-orange-100 text-orange-700",
  pending: "bg-blue-100 text-blue-700",
  cancelled: "bg-gray-100 text-gray-600",
};

const statusLabel: Record<ManagerStatus, string> = {
  active: "Active",
  suspended: "Suspended",
  pending: "Pending",
  cancelled: "Cancelled",
};

export default function ManagersList({ initialManagers, stations }: Props) {
  const [managers, setManagers] = useState<Manager[]>(initialManagers);
  const [dialog, setDialog] = useState<DialogType>(null);

  const closeDialog = () => setDialog(null);

  async function handleResend(manager: Manager) {
    const r = await resendManagerInvite(manager.id);
    if (r.success) toast.add({ title: "Invite resent", type: "success" });
    else toast.add({ title: "Failed to resend", type: "error" });
    closeDialog();
  }

  async function handleCancelInvite(manager: Manager) {
    const r = await cancelManagerInvite(manager.id);
    if (r.success) {
      setManagers((prev) => prev.filter((m) => m.id !== manager.id));
      toast.add({ title: "Invite cancelled", type: "success" });
    } else {
      toast.add({ title: "Failed to cancel", type: "error" });
    }
    closeDialog();
  }

  async function handleSuspend(manager: Manager) {
    const r = await suspendManager(manager.id);
    if (r.data?.blocked) {
      setDialog({ kind: "suspend", manager, blocked: true });
      return;
    }
    if (r.success) {
      setManagers((prev) =>
        prev.map((m) => (m.id === manager.id ? { ...m, status: "suspended" } : m)),
      );
      toast.add({ title: "Manager suspended", type: "success" });
    }
    closeDialog();
  }

  async function handleReactivate(manager: Manager, newStationId?: string) {
    const r = await reactivateManager({ managerId: manager.id, newStationId });
    if (r.success) {
      setManagers((prev) =>
        prev.map((m) => (m.id === manager.id ? { ...m, status: "active" } : m)),
      );
      toast.add({ title: "Manager reactivated", type: "success" });
    } else {
      toast.add({ title: "Failed to reactivate", type: "error" });
    }
    closeDialog();
  }

  async function handleDelete(manager: Manager) {
    const r = await deleteManager(manager.id);
    if (r.data?.blocked) {
      const reason = r.data.reason;
      const variant =
        reason === "outstanding_orders"
          ? "blocked"
          : manager.stationId
            ? "assigned"
            : "free";
      setDialog({ kind: "delete", manager, variant });
      return;
    }
    if (r.success) {
      setManagers((prev) => prev.filter((m) => m.id !== manager.id));
      toast.add({ title: "Manager deleted", type: "success" });
    }
    closeDialog();
  }

  if (managers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary-50">
          <Users className="text-primary" size={28} />
        </div>
        <div>
          <h2 className="font-pjs text-xl font-semibold text-neutral-900 mb-2">No Managers Yet</h2>
          <p className="text-sm text-neutra-700 max-w-xs">
            Invite a manager to run your stations and handle fuel delivery.
          </p>
        </div>
        <Button variant="secondary" size="pill" className="text-white" asChild>
          <Link href="/admin/managers/invite">
            <Plus size={16} />
            Invite Manager
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-pjs text-2xl font-semibold">Managers</h1>
        <Button variant="secondary" size="pill" className="text-white" asChild>
          <Link href="/admin/managers/invite">
            <Plus size={16} />
            Invite Manager
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-xs border border-gray-100">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-neutra-700 bg-gray-50">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Station</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr
                key={manager.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-neutral-900">{manager.name}</td>
                <td className="px-4 py-3 text-neutra-700">{manager.email}</td>
                <td className="px-4 py-3 text-neutra-700">{manager.phone}</td>
                <td className="px-4 py-3 text-neutra-700">
                  {manager.stationName ?? <span className="text-gray-400">Unassigned</span>}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      statusStyle[manager.status],
                    )}
                  >
                    {statusLabel[manager.status]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer p-1 rounded hover:bg-gray-100">
                      <MoreVertical size={16} className="text-neutra-700" />
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-44 p-1">
                      {manager.status === "pending" && (
                        <>
                          <button
                            className="flex w-full items-center rounded px-3 py-2 text-sm hover:bg-gray-100"
                            onClick={() => setDialog({ kind: "resend", manager })}
                          >
                            Resend Invite
                          </button>
                          <button
                            className="flex w-full items-center rounded px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            onClick={() => setDialog({ kind: "cancel", manager })}
                          >
                            Cancel Invite
                          </button>
                        </>
                      )}
                      {manager.status === "active" && (
                        <button
                          className="flex w-full items-center rounded px-3 py-2 text-sm text-orange-600 hover:bg-orange-50"
                          onClick={() => setDialog({ kind: "suspend", manager, blocked: false })}
                        >
                          Suspend
                        </button>
                      )}
                      {manager.status === "suspended" && (
                        <button
                          className="flex w-full items-center rounded px-3 py-2 text-sm text-green-700 hover:bg-green-50"
                          onClick={() =>
                            setDialog({ kind: "reactivate", manager, stationTaken: false })
                          }
                        >
                          Reactivate
                        </button>
                      )}
                      <button
                        className="flex w-full items-center rounded px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        onClick={() =>
                          setDialog({
                            kind: "delete",
                            manager,
                            variant: manager.stationId ? "assigned" : "free",
                          })
                        }
                      >
                        Delete
                      </button>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Dialogs ───────────────────────────────────────── */}
      {dialog?.kind === "resend" && (
        <ResendInviteDialog
          manager={dialog.manager}
          onConfirm={() => handleResend(dialog.manager)}
          onClose={closeDialog}
        />
      )}
      {dialog?.kind === "cancel" && (
        <CancelInviteDialog
          manager={dialog.manager}
          onConfirm={() => handleCancelInvite(dialog.manager)}
          onClose={closeDialog}
        />
      )}
      {dialog?.kind === "suspend" && (
        <SuspendManagerDialog
          manager={dialog.manager}
          blocked={dialog.blocked}
          onConfirm={() => handleSuspend(dialog.manager)}
          onClose={closeDialog}
        />
      )}
      {dialog?.kind === "reactivate" && (
        <ReactivateManagerDialog
          manager={dialog.manager}
          stations={stations}
          stationTaken={dialog.stationTaken}
          onConfirm={(newStationId) => handleReactivate(dialog.manager, newStationId)}
          onClose={closeDialog}
        />
      )}
      {dialog?.kind === "delete" && (
        <DeleteManagerDialog
          manager={dialog.manager}
          variant={dialog.variant}
          onConfirm={() => handleDelete(dialog.manager)}
          onClose={closeDialog}
        />
      )}
    </>
  );
}
