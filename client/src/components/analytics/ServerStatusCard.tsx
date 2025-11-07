import { JSX, useEffect, useState } from "react";
import { pingApi } from "../../lib/api";


export default function ServerStatusCard(): JSX.Element {

  const [status, setStatus] = useState<"OK" | "DOWN">("DOWN");
  const [rtt, setRtt] = useState<number | null>(null);
  const [uptimeDays, setUptimeDays] = useState<number | null>(null);
  const [uptimeHours, setUptimeHours] = useState<number | null>(null);

    useEffect(() => {
      let cancelled = false;
  
      async function check() {
        const { ok, rttMs } = await pingApi();
        if (cancelled) return;
        setStatus(ok ? "OK" : "DOWN");
        setRtt(Math.round(rttMs));
      }
  
      check();                              // run once on mount
      const id = setInterval(check, 30000); // then every 30s
      return () => { cancelled = true; clearInterval(id); };
    }, []);

    const isOk = String(status).toUpperCase() === "OK";
  
  useEffect(() => {
    let cancelled = false;
  
    async function getUptime() {
      try {
        const res = await fetch("/api/uptime");
        if (!res.ok) throw new Error("Failed to fetch uptime");
        const data = await res.json();
        if (!cancelled) {
          setUptimeDays(data.uptimeDays);
          setUptimeHours(data.uptimeHours);
        }
      } catch (err) {
        console.error("Uptime fetch failed", err);
      }
    }
  
    getUptime();
    const id = setInterval(getUptime, 60_000); // refresh every 1 min
  
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);
  
    return (
    <div className=" flex flex-col w-full md:w-auto justify-between items-center m-10 p-2 text-xs font-mono text-white font-[500] rounded-xl backdrop-blur-xs shadow-lg ring-2 ring-black ">
        <span>
        Spring Server Status:{" "}
        <span
            className={
            `font-semibold ` +
            (isOk
                ? 'text-green-400 [text-shadow:0_0_8px_rgba(74,222,128,.55)]'
                : 'text-red-400 [text-shadow:0_0_8px_rgba(248,113,113,.55)]')
            }
        >
            "{status}"
        </span>    
        </span>

        <span>{rtt != null && `Server ping: ${rtt} ms`}</span>

        <span>Current Server Uptime: {uptimeDays} days, {uptimeHours} hours</span>
    </div>
    )
}