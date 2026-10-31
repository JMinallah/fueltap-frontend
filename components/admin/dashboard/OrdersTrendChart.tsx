"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { month: string; value: number }[];
}

export default function OrdersTrendChart({ data }: Props) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-xs border border-gray-100">
      <h3 className="mb-4 text-sm font-semibold text-neutral-800">Orders Trend</h3>
      {data.length === 0 ? (
        <div className="flex h-40 items-center justify-center text-sm text-neutra-700">
          No orders data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#4e71e8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
