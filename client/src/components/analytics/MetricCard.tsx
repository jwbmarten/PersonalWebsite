import { JSX } from "react";

interface MetricCardProps {
  label: string;
  value: number | null;
  unit: string;
  icon?: string;
}

export default function MetricCard({
  label,
  value,
  unit,
  icon,
}: MetricCardProps): JSX.Element {
  const displayValue = value !== null ? value.toFixed(1) : "—";

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
      <div className="flex items-start gap-3 mb-3">
        {icon && (
          <img src={icon} alt={label} className="w-6 h-6 opacity-70 flex-shrink-0" />
        )}
        <div className="text-sm text-gray-300 opacity-80">{label}</div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold text-white">{displayValue}</span>
        <span className="text-lg text-gray-400">{unit}</span>
      </div>
    </div>
  );
}
