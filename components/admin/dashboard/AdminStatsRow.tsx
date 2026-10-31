"use client";

import { formatCurrency } from "@/lib/helpers/help";
import { DashboardMetrics } from "@/lib/server/admin-dashboard";
import { TrendingUp, ShoppingCart, Zap, Users } from "lucide-react";

interface Props {
  metrics: DashboardMetrics | null;
}

const statCards = (metrics: DashboardMetrics | null) => [
  {
    label: "Total Revenue",
    value: formatCurrency(metrics?.totalRevenue ?? 0),
    icon: TrendingUp,
    color: "text-primary bg-primary-50",
  },
  {
    label: "Total Orders",
    value: (metrics?.totalOrders ?? 0).toLocaleString(),
    icon: ShoppingCart,
    color: "text-secondary-500 bg-secondary-50",
  },
  {
    label: "Total Stations",
    value: (metrics?.totalStations ?? 0).toLocaleString(),
    icon: Zap,
    color: "text-green-600 bg-green-50",
  },
  {
    label: "Total Managers",
    value: (metrics?.totalManagers ?? 0).toLocaleString(),
    icon: Users,
    color: "text-purple-600 bg-purple-50",
  },
];

export default function AdminStatsRow({ metrics }: Props) {
  const cards = statCards(metrics);
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl bg-white p-4 shadow-xs border border-gray-100 flex flex-col gap-3"
        >
          <div className={`size-10 rounded-xl flex items-center justify-center ${card.color}`}>
            <card.icon size={20} />
          </div>
          <div>
            <p className="text-xs text-neutra-1000 mb-0.5">{card.label}</p>
            <p className="text-lg font-semibold text-neutral-900 truncate">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
