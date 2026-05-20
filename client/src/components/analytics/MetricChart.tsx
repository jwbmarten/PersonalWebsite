import { JSX } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface MetricChartProps {
  data: Array<{ [key: string]: any }>;
  dataKey: string;
  color: string;
  label: string;
  icon?: string;
}

const formatTimeLabel = (dateTimeStr: string) => {
  try {
    const date = new Date(dateTimeStr);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  } catch {
    return dateTimeStr;
  }
};

export default function MetricChart({
  data,
  dataKey,
  color,
  label,
  icon,
}: MetricChartProps): JSX.Element {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <img src={icon} alt={label} className="w-6 h-6 opacity-70 flex-shrink-0" />
        )}
        <h3 className="text-lg font-medium text-white">{label}</h3>
      </div>

      {/* Chart */}
      {data.length > 0 ? (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="timestamp"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                tickFormatter={formatTimeLabel}
              />
              <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
                labelFormatter={(label) => formatTimeLabel(label)}
                formatter={(value) => [
                  typeof value === "number" ? value.toFixed(1) : "—",
                  label,
                ]}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 w-full flex items-center justify-center text-gray-400">
          Collecting data…
        </div>
      )}
    </div>
  );
}
