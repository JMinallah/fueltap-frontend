import { Metadata } from "next";
import { getDashboardMetrics, getAdminSetupStatus } from "@/lib/server/admin-dashboard";
import AdminDashboard from "@/components/admin/dashboard/AdminDashboard";

export const metadata: Metadata = {
  title: "Dashboard | FuelTap Admin",
};

export default async function AdminDashboardPage() {
  const [metricsResult, setupResult] = await Promise.allSettled([
    getDashboardMetrics(),
    getAdminSetupStatus(),
  ]);

  const metrics =
    metricsResult.status === "fulfilled" && metricsResult.value.success
      ? metricsResult.value.data
      : null;

  const setup =
    setupResult.status === "fulfilled" && setupResult.value.success
      ? setupResult.value.data
      : { kybSubmitted: false, hasManager: false, hasStation: false };

  return (
    <AdminDashboard
      metrics={metrics ?? null}
      setup={setup ?? { kybSubmitted: false, hasManager: false, hasStation: false }}
    />
  );
}
