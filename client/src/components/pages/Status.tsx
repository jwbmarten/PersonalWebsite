import { JSX, useEffect, useState, useRef } from "react";
import ServerStatusCard from "../analytics/ServerStatusCard";
import ServerPingCard from "../analytics/ServerPingCard";
import MetricCard from "../analytics/MetricCard";
import MetricChart from "../analytics/MetricChart";
import NavBar from "../layout/NavBar";
import PiPic from "../../assets/RPI_Physical.png"

interface SystemMetricSample {
  timestamp: string;
  cpuTempCelsius: number;
  cpuUsagePercent: number;
  memoryUsagePercent: number;
}

interface UptimeData {
  uptimeDays: number;
  uptimeHours: number;
  uptimeMinutes: number;
}

export default function Status(): JSX.Element {
  const [current, setCurrent] = useState<SystemMetricSample | null>(null);
  const [history, setHistory] = useState<SystemMetricSample[]>([]);
  const [uptime, setUptime] = useState<UptimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchMetrics = async () => {
    try {
      setError(null);
      const [currentRes, historyRes, uptimeRes] = await Promise.all([
        fetch("/api/system/current"),
        fetch("/api/system/history"),
        fetch("/api/uptime"),
      ]);

      if (!currentRes.ok || !historyRes.ok || !uptimeRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const currentData = await currentRes.json();
      const historyData = await historyRes.json();
      const uptimeData = await uptimeRes.json();

      setCurrent(currentData);
      setHistory(historyData);
      setUptime(uptimeData);
      setLoading(false);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setError(message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately
    fetchMetrics();

    // Set up 30-second refresh
    refreshIntervalRef.current = setInterval(() => {
      fetchMetrics();
    }, 30_000);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  // Check if we have enough data (at least 2 samples)
  const hasEnoughData = history.length >= 2;

  return (
    <div className="w-full py-12 mt-20 lg:mt-32">
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
          <NavBar />
        </div>
      {/* Header */}
      <div className="w-full mx-auto max-w-[1200px] px-6 mb-8 text-center">
        <h1 className="text-4xl lg:text-5xl font-spartan font-bold text-[#fdd262] mb-2">
          System Status
        </h1>
        <p className="text-sm text-gray-400">
          Raspberry Pi metrics · Updates every 30 seconds
        </p>
      </div>

      {/* Main Content Grid - Server Cards (left) + Pi Card (right) */}
      <div className="w-full mx-auto max-w-[1200px] px-6 mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Left Column: Server Status + Ping Cards */}
        <div className="space-y-4">
          {/* Server Status Card */}
          <ServerStatusCard 
            uptimeDays={uptime?.uptimeDays ?? null}
            uptimeHours={uptime?.uptimeHours ?? null}
            uptimeMinutes={uptime?.uptimeMinutes ?? null}
            externalRefresh={true}
          />
          
          {/* Server Ping Card */}
          <ServerPingCard />
        </div>

        {/* Right Column: Raspberry Pi Info Card */}
        <div className="lg:col-span-2 w-full px-6 py-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
          <h3 className="text-lg font-spartan font-bold text-white">Raspberry Pi</h3>
          
          {/* Horizontal layout: Image left, specs right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 items-center">
            {/* Pi Image - Left side (no background container) */}
            <div className="flex justify-center lg:justify-start">
              <img 
                src={PiPic}
                alt="Raspberry Pi 4" 
                className="w-70 lg:w-100 h-60 lg:h-58 object-contain"
              />
            </div>

            {/* Stats Grid - Right side */}
            <div className="space-y-3 text-sm">
              {/* Model */}
              <div className="flex items-center gap-3">
                <img 
                  src="/icons/model.svg"
                  alt="Model"
                  className="w-6 h-6 flex-shrink-0"
                />
                <p className="text-gray-400">Model</p>
                <p className="text-white ml-auto">Raspberry Pi 5</p>
              </div>

              {/* CPU */}
              <div className="flex items-center gap-3">
                <img 
                  src="/icons/cpu.svg"
                  alt="CPU"
                  className="w-6 h-6 flex-shrink-0"
                />
                <p className="text-gray-400">CPU</p>
                <p className="text-white ml-auto">2.4GHz quad-core</p>
              </div>

              {/* Memory */}
              <div className="flex items-center gap-3">
                <img 
                  src="/icons/memory.svg"
                  alt="Memory"
                  className="w-6 h-6 flex-shrink-0"
                />
                <p className="text-gray-400">Memory</p>
                <p className="text-white ml-auto">4GB LPDDR4</p>
              </div>

              {/* Storage */}
              <div className="flex items-center gap-3">
                <img 
                  src="/icons/store.svg"
                  alt="Storage"
                  className="w-6 h-6 flex-shrink-0"
                />
                <p className="text-gray-400">Storage</p>
                <p className="text-white ml-auto">128GB MicroSD Card</p>
              </div>

              {/* OS */}
              <div className="flex items-center gap-3">
                <img 
                  src="/icons/OS.svg"
                  alt="Operating System"
                  className="w-6 h-6 flex-shrink-0"
                />
                <p className="text-gray-400">OS</p>
                <p className="text-white ml-auto">Raspberry Pi OS</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="w-full mx-auto max-w-[1200px] px-6 mb-8">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
            Error fetching metrics: {error}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="w-full mx-auto max-w-[1200px] px-6 mb-8">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-gray-400">
            Loading metrics…
          </div>
        </div>
      )}

      {/* Metric Cards Row - CPU Temp, CPU Usage, Memory Usage */}
      <div className="w-full mx-auto max-w-[1200px] px-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* CPU Temperature */}
          <MetricCard
            label="CPU Temperature"
            value={current?.cpuTempCelsius ?? null}
            unit="°C"
            icon="/icons/temp.svg"
          />

          {/* CPU Usage */}
          <MetricCard
            label="CPU Usage"
            value={current?.cpuUsagePercent ?? null}
            unit="%"
            icon="/icons/cpu_color.svg"
          />

          {/* Memory Usage */}
          <MetricCard
            label="Memory Usage"
            value={current?.memoryUsagePercent ?? null}
            unit="%"
            icon="/icons/memory_color.svg"
          />
        </div>
      </div>

      {/* Charts - 3 column layout */}
      <div className="w-full mx-auto max-w-[1200px] px-6">
        {hasEnoughData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* CPU Temperature Chart */}
            <MetricChart
              data={history}
              dataKey="cpuTempCelsius"
              color="#f97373"
              label="CPU Temperature"
              icon="/icons/temp.svg"
            />

            {/* CPU Usage Chart */}
            <MetricChart
              data={history}
              dataKey="cpuUsagePercent"
              color="#60a5fa"
              label="CPU Usage"
              icon="/icons/cpu_color.svg"
            />

            {/* Memory Usage Chart */}
            <MetricChart
              data={history}
              dataKey="memoryUsagePercent"
              color="#fdd262"
              label="Memory Usage"
              icon="/icons/memory_color.svg"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10 h-96 flex items-center justify-center text-gray-400"
              >
                Collecting data…
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
