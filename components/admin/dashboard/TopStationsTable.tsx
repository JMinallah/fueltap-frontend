"use client";

import { formatCurrency } from "@/lib/helpers/help";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  stations: { name: string; metric: number }[];
  isLowest?: boolean;
}

export default function TopStationsTable({ title, stations, isLowest = false }: Props) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-xs border border-gray-100">
      <h3 className="mb-4 text-sm font-semibold text-neutral-800">{title}</h3>
      {stations.length === 0 ? (
        <div className="flex h-24 items-center justify-center text-sm text-neutra-700">
          No station data yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-neutra-700">
                <th className="pb-2 font-medium">#</th>
                <th className="pb-2 font-medium">Station</th>
                <th className="pb-2 font-medium text-right">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((station, i) => (
                <tr
                  key={station.name}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="py-2.5 pr-3 text-neutra-700">{i + 1}</td>
                  <td className="py-2.5 font-medium text-neutral-900 truncate max-w-[140px]">
                    {station.name}
                  </td>
                  <td
                    className={cn(
                      "py-2.5 text-right font-medium",
                      isLowest ? "text-red-500" : "text-green-600",
                    )}
                  >
                    {formatCurrency(station.metric)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
