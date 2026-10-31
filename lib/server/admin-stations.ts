"use server";

import { authenticatedApiRequest } from "@/lib/helpers/fetch/authenticatedApiRequest";

export type StationStatus = "active" | "deactivated";

export type Station = {
  id: string;
  name: string;
  address: string;
  state: string;
  city: string;
  managerId?: string;
  managerName?: string;
  latitude?: number;
  longitude?: number;
  status: StationStatus;
  createdAt: string;
};

export async function getStations() {
  return authenticatedApiRequest<void, { stations: Station[] }>(
    "/api/v1/admin/stations",
    "GET",
  );
}

export async function createStation(data: {
  name: string;
  address: string;
  state: string;
  city: string;
  managerId?: string;
  latitude?: number;
  longitude?: number;
}) {
  return authenticatedApiRequest<typeof data, { station: Station }>(
    "/api/v1/admin/stations",
    "POST",
    data,
  );
}

export async function deactivateStation(stationId: string) {
  return authenticatedApiRequest<void, { message: string; blocked?: boolean }>(
    `/api/v1/admin/stations/${stationId}/deactivate`,
    "PATCH",
  );
}

export async function reactivateStation(stationId: string) {
  return authenticatedApiRequest<void, { message: string }>(
    `/api/v1/admin/stations/${stationId}/reactivate`,
    "PATCH",
  );
}
