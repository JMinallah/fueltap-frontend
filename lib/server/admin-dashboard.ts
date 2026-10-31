"use server";

import { authenticatedApiRequest } from "@/lib/helpers/fetch/authenticatedApiRequest";

export type DashboardMetrics = {
  totalRevenue: number;
  totalOrders: number;
  totalStations: number;
  totalManagers: number;
  revenueTrend: { month: string; value: number }[];
  ordersTrend: { month: string; value: number }[];
  topStations: { name: string; metric: number }[];
  lowestStations: { name: string; metric: number }[];
};

export async function getDashboardMetrics() {
  return authenticatedApiRequest<void, DashboardMetrics>(
    "/api/v1/admin/dashboard/metrics",
    "GET",
  );
}

export async function getAdminSetupStatus() {
  return authenticatedApiRequest<
    void,
    {
      kybSubmitted: boolean;
      hasManager: boolean;
      hasStation: boolean;
      companyId?: string;
    }
  >("/api/v1/admin/setup-status", "GET");
}
