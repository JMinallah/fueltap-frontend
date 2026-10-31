"use client";

import { InventoryItem } from "@/lib/server/admin-inventory";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  "In Stock": "bg-green-100 text-green-700",
  "Low Stock": "bg-yellow-100 text-yellow-700",
  "Out of Stock": "bg-red-100 text-red-600",
};

const fuelTypeBadge: Record<string, string> = {
  Petrol: "bg-blue-100 text-blue-700",
  Diesel: "bg-orange-100 text-orange-700",
  "Cooking Gas": "bg-purple-100 text-purple-700",
};

interface Props {
  inventory: InventoryItem[];
}

export default function InventoryTable({ inventory }: Props) {
  if (inventory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary-50">
          <Package className="text-primary" size={28} />
        </div>
        <div>
          <h2 className="font-pjs text-xl font-semibold text-neutral-900 mb-2">
            No Inventory Data Yet
          </h2>
          <p className="text-sm text-neutra-700 max-w-xs">
            Inventory will appear here once your stations are set up and receiving fuel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-pjs mb-6 text-2xl font-semibold">Inventory</h1>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-xs border border-gray-100">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-neutra-700 bg-gray-50">
              <th className="px-4 py-3 font-medium">Station Name</th>
              <th className="px-4 py-3 font-medium">Fuel Type</th>
              <th className="px-4 py-3 font-medium">Volume (Litres)</th>
              <th className="px-4 py-3 font-medium">Last Updated</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-neutral-900">{item.stationName}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      fuelTypeBadge[item.fuelType] ?? "bg-gray-100 text-gray-600",
                    )}
                  >
                    {item.fuelType}
                  </span>
                </td>
                <td className="px-4 py-3 tabular-nums text-neutra-700">
                  {item.volumeLitres.toLocaleString()} L
                </td>
                <td className="px-4 py-3 text-neutra-700">
                  {new Date(item.lastUpdated).toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      statusStyle[item.status] ?? "bg-gray-100 text-gray-600",
                    )}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
