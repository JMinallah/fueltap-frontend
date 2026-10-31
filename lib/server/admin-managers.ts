"use server";

import { authenticatedApiRequest } from "@/lib/helpers/fetch/authenticatedApiRequest";

export type ManagerStatus =
  | "active"
  | "suspended"
  | "pending"
  | "cancelled";

export type Manager = {
  id: string;
  name: string;
  email: string;
  phone: string;
  stationId?: string;
  stationName?: string;
  status: ManagerStatus;
  invitedAt: string;
};

export async function getManagers() {
  return authenticatedApiRequest<void, { managers: Manager[] }>(
    "/api/v1/admin/managers",
    "GET",
  );
}

export async function inviteManager(data: {
  name: string;
  email: string;
  phone: string;
  stationId: string;
}) {
  return authenticatedApiRequest<typeof data, { message: string }>(
    "/api/v1/admin/managers/invite",
    "POST",
    data,
  );
}

export async function resendManagerInvite(managerId: string) {
  return authenticatedApiRequest<void, { message: string }>(
    `/api/v1/admin/managers/${managerId}/resend-invite`,
    "POST",
  );
}

export async function cancelManagerInvite(managerId: string) {
  return authenticatedApiRequest<void, { message: string }>(
    `/api/v1/admin/managers/${managerId}/cancel-invite`,
    "DELETE",
  );
}

export async function suspendManager(managerId: string) {
  return authenticatedApiRequest<void, { message: string; blocked?: boolean }>(
    `/api/v1/admin/managers/${managerId}/suspend`,
    "PATCH",
  );
}

export async function reactivateManager(data: {
  managerId: string;
  newStationId?: string;
}) {
  return authenticatedApiRequest<typeof data, { message: string }>(
    `/api/v1/admin/managers/${data.managerId}/reactivate`,
    "PATCH",
    data,
  );
}

export async function deleteManager(managerId: string) {
  return authenticatedApiRequest<void, { message: string; blocked?: boolean; reason?: string }>(
    `/api/v1/admin/managers/${managerId}`,
    "DELETE",
  );
}
