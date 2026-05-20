import { useEffect, useMemo, useState } from "react";
import { BasicCard, CardContent } from "../layout/BasicCard"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell } from "recharts";

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
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true; setLoading(true); setError(null);
    Promise.all([
      getJSON<Summary>(`/api/stats/summary`),
      getJSON<TrafficPoint[]>(`/api/stats/traffic-by-day?days=${days}`),
      getJSON<TopPage[]>(`/api/stats/top-pages?limit=${limit}`),
      getJSON<TopRef[]>(`/api/stats/top-referrers?limit=${limit}`),
      getJSON<RecentVisit[]>(`/api/stats/recent?limit=5`),
    ])
      .then(([s, t, p, r, rec]) => { if (!alive) return; setSummary(s); setTraffic(t); setTopPages(p); setTopRefs(r); setRecent(rec); })
      .catch(e => { if (!alive) return; setError(e.message || String(e)); })
      .finally(() => { if (!alive) return; setLoading(false); });
    return () => { alive = false };
  }, [days]);

  const topPagesFmt = useMemo(() => topPages.filter(d => !d.path?.startsWith('/music_art')).map(d => ({ ...d, path: d.path || "/" })), [topPages]);
  const topRefsFmt = useMemo(() => topRefs.map(d => ({ ...d, domain: d.domain || "(direct / none)" })), [topRefs]);

  const barColors = ["#bb4957", "#60a5fa", "#D7AC80", "#ABBE86", "#9F8DBD", "#fdd262" ];
  const short = (s: string, n = 28) => (s?.length > n ? s.slice(0, n - 1) + "…" : s);
  
  const formatDateLabel = (dateStr: string) => {
    try {
      const date = new Date(dateStr + "T00:00:00Z");
      const month = date.toLocaleString("en-US", { month: "short" });
      const day = date.getDate();
      return `${month} ${day}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pt-15 px-3 sm:px-6 lg:px-4">
      {/* Header */}
      <div className="w-full mx-auto max-w-[1200px] px-6 mb-8 text-center">
        <h1 className="text-4xl lg:text-5xl font-spartan font-bold text-[#fdd262] mb-2">
          Site Analytics
        </h1>
        <p className="text-sm text-gray-400">
          Website traffic and visitor insights
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
        <BasicCard className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <img src="/icons/totalVisits.svg" alt="Total visits" className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="text-sm opacity-70 text-gray-300 font-arvo">Total visits (last {summary?.sinceDays ?? days} days)</div>
              <div className="text-3xl font-semibold text-white">{summary?.totalVisits ?? "—"}</div>
            </div>
          </CardContent>
        </BasicCard>
        <BasicCard className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <img src="/icons/unique.svg" alt="Unique visitors" className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="text-sm opacity-70 text-gray-300 font-arvo">Unique visitors</div>
              <div className="text-3xl font-semibold text-white">{summary?.uniqueVisitors ?? "—"}</div>
            </div>
          </CardContent>
        </BasicCard>
        <BasicCard className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <img src="/icons/countries.svg" alt="Countries" className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="text-sm opacity-70 text-gray-300 font-arvo">Countries</div>
              <div className="text-3xl font-semibold text-white">{summary?.countries ?? "—"}</div>
            </div>
          </CardContent>
        </BasicCard>
      </div>

      {/* Controls */}
      <div className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10 py-4 px-4 w-fit mt-8 mb-6">
        <label className="text-sm text-white flex items-center gap-2">
          <img src="/icons/calendar.svg" alt="Calendar" className="w-4 h-4" />
          Days: 
          <select className="ml-2 border rounded px-2 py-1 border-white" value={days} onChange={e => setDays(Number(e.target.value))}>
            <option className="text-black" value={7}>7</option>
            <option className="text-black" value={14}>14</option>
            <option className="text-black" value={30}>30</option>
            <option className="text-black" value={90}>90</option>
          </select>
        </label>
        {loading && <span className="text-sm">Loading…</span>}
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>

      {/* Traffic over time */}
      <div>

      
      <BasicCard className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10 mb-5">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <img src="/icons/visits.svg" alt="Visits" className="w-8 h-8 opacity-70 flex-shrink-0" />
            <div className=" text-lg font-xl text-white font-arvo">Visits per day</div>
          </div>
          <div className="h-64 w-full mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={traffic} margin={{ left: 0, right: 8, top: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={formatDateLabel} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="visits" fill="#8d64d3" stroke="#8d64d3" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </BasicCard>

      {/* Top pages & referrers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <BasicCard className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <img src="/icons/topPages.svg" alt="Top Pages" className="w-8 h-8 opacity-70 flex-shrink-0" />
              <div className=" text-lg font-medium text-white font-arvo">Top pages</div>
            </div>
            <div className="h-64 w-full mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPagesFmt} layout="vertical" margin={{ left: 0, right: 8, top: 8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="path" width={100} tick={{ fontSize: 12, fill: "#ffffff" }} tickFormatter={(v: string) => short(v, 24)} />
                  <Tooltip />
                  <Bar dataKey="hits">
                    {topPagesFmt.map((entry, index) => (
                      <Cell
                        key={entry.path ?? index}
                        fill={barColors[index % barColors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </BasicCard>

        <BasicCard className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <img src="/icons/link.svg" alt="Top Referrers" className="w-8 h-8 opacity-70 flex-shrink-0" />
              <div className=" text-lg font-medium text-white font-arvo">Top referrers</div>
            </div>
            <div className="h-64 w-full mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topRefsFmt} layout="vertical" margin={{ left: 0, right: 8, top: 8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="domain" width={100} tick={{ fontSize: 12, fill: "#ffffff" }} tickFormatter={(v: string) => short(v, 26)} />
                  <Tooltip />
                  <Bar dataKey="hits">
                    {topPagesFmt.map((entry, index) => (
                      <Cell
                        key={entry.path ?? index}
                        fill={barColors[index % barColors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </BasicCard>
      </div>

      {/* Recent visits table */}
      <BasicCard className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10 mt-5">
        <CardContent className="p-4">
          <div className="text-lg font-medium mb-2 text-white font-arvo">Recent visits</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="py-2 pr-3 text-white">Time</th>
                  <th className="py-2 pr-3 text-white">Country</th>
                  <th className="py-2 pr-3 text-white">Path</th>
                  <th className="py-2 pr-3 text-white">Referrer</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2 pr-3 whitespace-nowrap text-white">{new Date(r.ts).toLocaleString()}</td>
                    <td className="py-2 pr-3 text-white">{r.country ?? "—"}</td>
                    <td className="py-2 pr-3 truncate max-w-[260px] text-white" title={r.path ?? undefined}>{r.path ?? "—"}</td>
                    <td className="py-2 pr-3 truncate max-w-[260px] text-white" title={r.referrer ?? undefined}>{r.referrer ?? "(direct / none)"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </BasicCard>
    </div>
    </div>
  );
}
