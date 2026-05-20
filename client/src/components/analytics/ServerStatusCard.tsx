import { JSX, useEffect, useState } from "react";
import { pingApi } from "../../lib/api";

interface ServerStatusCardProps {
  uptimeDays?: number | null;
  uptimeHours?: number | null;
  uptimeMinutes?: number | null;
  externalRefresh?: boolean;
}

export default function ServerStatusCard({
  uptimeDays: externalUptimeDays,
  uptimeHours: externalUptimeHours,
  uptimeMinutes: externalUptimeMinutes,
  externalRefresh = false,
}: ServerStatusCardProps): JSX.Element {
  const [status, setStatus] = useState<"ONLINE" | "DOWN">("DOWN");
  const [uptimeDays, setUptimeDays] = useState<number | null>(externalUptimeDays ?? null);
  const [uptimeHours, setUptimeHours] = useState<number | null>(externalUptimeHours ?? null);
  const [uptimeMinutes, setUptimeMinutes] = useState<number | null>(externalUptimeMinutes ?? null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const { ok } = await pingApi();
      if (cancelled) return;
      setStatus(ok ? "ONLINE" : "DOWN");
    }

    check();
    const id = setInterval(check, 30000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  // Only fetch uptime if not receiving it as a prop
  useEffect(() => {
    // If uptime data is provided externally, don't fetch
    if (externalRefresh && externalUptimeDays !== undefined) {
      setUptimeDays(externalUptimeDays ?? null);
      setUptimeHours(externalUptimeHours ?? null);
      setUptimeMinutes(externalUptimeMinutes ?? null);
      return;
    }

    let cancelled = false;

    async function getUptime() {
      try {
        const res = await fetch("/api/uptime");
        if (!res.ok) throw new Error("Failed to fetch uptime");
        const data = await res.json();
        if (!cancelled) {
          setUptimeDays(data.uptimeDays);
          setUptimeHours(data.uptimeHours);
          setUptimeMinutes(data.uptimeMinutes ?? 0);
        }
      } catch (err) {
        console.error("Uptime fetch failed", err);
      }
    }

    getUptime();
    const id = setInterval(getUptime, 30_000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [externalRefresh, externalUptimeDays, externalUptimeHours, externalUptimeMinutes]);

  const isOk = String(status).toUpperCase() === "ONLINE";

  return (
    <div className="w-full px-6 py-2 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
      {/* Status indicator dot */}
      <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${isOk ? 'bg-[#5bb25b] shadow-lg shadow-green-500/50' : 'bg-red-500 shadow-lg shadow-red-500/50'}`} />

      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 self-center p-3 rounded-lg" style={{ backgroundColor: 'rgba(91, 178, 91, 0.15)' }}>
          <img src="/icons/storage.svg" alt="Server" className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-1">Server Status</p>
          <p className={`text-2xl font-mono font-bold mb-2 ${isOk ? 'text-[#5bb25b]' : 'text-red-400'}`}>
            {status}
          </p>
          <p className="text-xs text-gray-300 font-mono">
            Uptime: {uptimeDays ?? "—"} days, {uptimeHours ?? "—"} hours, {uptimeMinutes ?? "—"} mins
          </p>
        </div>
      </div>
    </div>
  );
}