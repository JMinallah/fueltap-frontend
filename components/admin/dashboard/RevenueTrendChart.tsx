"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { month: string; value: number }[];
}

export default function RevenueTrendChart({ data }: Props) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-xs border border-gray-100">
      <h3 className="mb-4 text-sm font-semibold text-neutral-800">Revenue Trend</h3>
      {data.length === 0 ? (
        <div className="flex h-40 items-center justify-center text-sm text-neutra-700">
          No revenue data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4e71e8"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
