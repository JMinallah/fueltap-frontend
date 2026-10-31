"use client";

import { DashboardMetrics } from "@/lib/server/admin-dashboard";
import AdminSetupChecklist from "./AdminSetupChecklist";
import AdminStatsRow from "./AdminStatsRow";
import RevenueTrendChart from "./RevenueTrendChart";
import OrdersTrendChart from "./OrdersTrendChart";
import TopStationsTable from "./TopStationsTable";
import { useAuth } from "@/context/AuthProvider";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";

interface Props {
  metrics: DashboardMetrics | null;
  setup: {
    kybSubmitted: boolean;
    hasManager: boolean;
    hasStation: boolean;
    companyId?: string;
  };
}

export default function AdminDashboard({ metrics, setup }: Props) {
  const { user } = useAuth();
  const { timeOfDay } = useTimeOfDay();
  const firstName = user?.profile.fullName?.split(" ")[0];

  // State A: Account created but setup not complete
  const isNewUser = !setup.kybSubmitted || !setup.hasManager || !setup.hasStation;

  return (
    <>
      <section>
        <h1 className="font-pjs mb-1 text-2xl font-semibold md:text-3xl">
          Good {timeOfDay || "day"} {firstName},
        </h1>
        <p className="text-accent mb-4 text-[18px] lg:text-2xl">
          Welcome to your dashboard
        </p>
      </section>

      {isNewUser ? (
        <AdminSetupChecklist
          kybSubmitted={setup.kybSubmitted}
          hasManager={setup.hasManager}
          hasStation={setup.hasStation}
          companyId={setup.companyId}
        />
      ) : (
        <div className="flex flex-col gap-6">
          <AdminStatsRow metrics={metrics} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RevenueTrendChart data={metrics?.revenueTrend ?? []} />
            <OrdersTrendChart data={metrics?.ordersTrend ?? []} />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TopStationsTable
              title="Top Performing Stations"
              stations={metrics?.topStations ?? []}
            />
            <TopStationsTable
              title="Lowest Performing Stations"
              stations={metrics?.lowestStations ?? []}
              isLowest
            />
          </div>
        </div>
      )}
    </>
  );
}
