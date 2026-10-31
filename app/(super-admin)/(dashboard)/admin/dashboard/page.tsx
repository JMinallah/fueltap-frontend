import { Metadata } from "next";
import AdminDashboard from "@/components/admin/dashboard/AdminDashboard";
import {
  getCompany,
  getDashboardMetrics,
  getSetupStatus,
} from "@/lib/server/admin/dashboard";
import { getStations } from "@/lib/server/admin/stations";

export const metadata: Metadata = {
  title: "Dashboard | FuelTap Admin",
};

export default async function AdminDashboardPage() {
  const [company, setup, metrics, stations] = await Promise.all([
    getCompany(),
    getSetupStatus(),
    getDashboardMetrics(),
    getStations(),
  ]);

  return (
    <AdminDashboard
      companyName={company.success ? company.data.name : "Your company"}
      setup={
        setup.success
          ? setup.data
          : {
              kybSubmitted: false,
              hasManager: false,
              hasStation: false,
              completionShown: false,
            }
      }
      metrics={metrics.success ? metrics.data : null}
      stations={
        stations.success
          ? stations.data.map((s) => ({ id: s.id, name: s.name }))
          : []
      }
    />
  );
}
