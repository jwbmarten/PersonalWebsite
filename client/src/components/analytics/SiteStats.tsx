import { useEffect, useMemo, useState } from "react";
import { BasicCard, CardContent } from "../layout/BasicCard"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";

// --- Types matching backend responses ---
interface Summary {
  totalVisits: number;
  uniqueVisitors: number;
  countries: number;
  sinceDays: number;
}

interface TrafficPoint { date: string; visits: number }
interface TopPage { path: string; hits: number }
interface TopRef { domain: string; hits: number }
interface RecentVisit { ts: string; country?: string | null; path?: string | null; referrer?: string | null; ipHash?: string | null }

// --- Small fetch helper ---
async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
}

export default function StatsDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [traffic, setTraffic] = useState<TrafficPoint[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [topRefs, setTopRefs] = useState<TopRef[]>([]);
  const [recent, setRecent] = useState<RecentVisit[]>([]);
  const [days, setDays] = useState(14);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true; setLoading(true); setError(null);
    Promise.all([
      getJSON<Summary>(`/api/stats/summary`),
      getJSON<TrafficPoint[]>(`/api/stats/traffic-by-day?days=${days}`),
      getJSON<TopPage[]>(`/api/stats/top-pages?limit=${limit}`),
      getJSON<TopRef[]>(`/api/stats/top-referrers?limit=${limit}`),
      getJSON<RecentVisit[]>(`/api/stats/recent?limit=20`),
    ])
      .then(([s, t, p, r, rec]) => { if (!alive) return; setSummary(s); setTraffic(t); setTopPages(p); setTopRefs(r); setRecent(rec); })
      .catch(e => { if (!alive) return; setError(e.message || String(e)); })
      .finally(() => { if (!alive) return; setLoading(false); });
    return () => { alive = false };
  }, [days, limit]);

  const topPagesFmt = useMemo(() => topPages.map(d => ({ ...d, path: d.path || "/" })), [topPages]);
  const topRefsFmt = useMemo(() => topRefs.map(d => ({ ...d, domain: d.domain || "(direct / none)" })), [topRefs]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Site Analytics</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <BasicCard className="rounded-2xl shadow bg-[rgb(35,39,47)]">
          <CardContent className="p-4">
            <div className="text-sm opacity-70">Total visits (last {summary?.sinceDays ?? days} days)</div>
            <div className="text-3xl font-semibold">{summary?.totalVisits ?? "—"}</div>
          </CardContent>
        </BasicCard>
        <BasicCard className="rounded-2xl shadow bg-[rgb(35,39,47)]">
          <CardContent className="p-4">
            <div className="text-sm opacity-70">Unique visitors</div>
            <div className="text-3xl font-semibold">{summary?.uniqueVisitors ?? "—"}</div>
          </CardContent>
        </BasicCard>
        <BasicCard className="rounded-2xl shadow bg-[rgb(35,39,47)]">
          <CardContent className="p-4">
            <div className="text-sm opacity-70">Countries</div>
            <div className="text-3xl font-semibold">{summary?.countries ?? "—"}</div>
          </CardContent>
        </BasicCard>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm">Days: 
          <select className="ml-2 border rounded px-2 py-1" value={days} onChange={e => setDays(Number(e.target.value))}>
            <option value={7}>7</option>
            <option value={14}>14</option>
            <option value={30}>30</option>
            <option value={90}>90</option>
          </select>
        </label>
        <label className="text-sm">Top limit: 
          <select className="ml-2 border rounded px-2 py-1" value={limit} onChange={e => setLimit(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>
        {loading && <span className="text-sm">Loading…</span>}
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>

      {/* Traffic over time */}
      <BasicCard className="rounded-2xl shadow bg-[rgb(35,39,47)]">
        <CardContent className="p-4">
          <div className="text-lg font-medium mb-2">Visits per day</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={traffic} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="visits" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </BasicCard>

      {/* Top pages & referrers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BasicCard className="rounded-2xl shadow bg-[rgb(35,39,47)]">
          <CardContent className="p-4">
            <div className="text-lg font-medium mb-2">Top pages</div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPagesFmt} layout="vertical" margin={{ left: 40, right: 8, top: 8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="path" width={180} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="hits" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </BasicCard>

        <BasicCard className="rounded-2xl shadow bg-[rgb(35,39,47)]">
          <CardContent className="p-4">
            <div className="text-lg font-medium mb-2">Top referrers</div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topRefsFmt} layout="vertical" margin={{ left: 40, right: 8, top: 8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="domain" width={180} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="hits" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </BasicCard>
      </div>

      {/* Recent visits table */}
      <BasicCard className="rounded-2xl shadow bg-[rgb(35,39,47)]">
        <CardContent className="p-4">
          <div className="text-lg font-medium mb-2">Recent visits</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="py-2 pr-3">Time</th>
                  <th className="py-2 pr-3">Country</th>
                  <th className="py-2 pr-3">Path</th>
                  <th className="py-2 pr-3">Referrer</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2 pr-3 whitespace-nowrap">{new Date(r.ts).toLocaleString()}</td>
                    <td className="py-2 pr-3">{r.country ?? "—"}</td>
                    <td className="py-2 pr-3 truncate max-w-[260px]" title={r.path ?? undefined}>{r.path ?? "—"}</td>
                    <td className="py-2 pr-3 truncate max-w-[260px]" title={r.referrer ?? undefined}>{r.referrer ?? "(direct / none)"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </BasicCard>
    </div>
  );
}
