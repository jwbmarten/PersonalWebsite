import { JSX, useEffect, useState } from "react";
import { pingApi } from "../../lib/api";

export default function ServerPingCard(): JSX.Element {
  const [rtt, setRtt] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const { ok, rttMs } = await pingApi();
        if (cancelled) return;
        if (ok) setRtt(Math.round(rttMs));
      } catch (e) {
        console.error("ServerPingCard check error:", e);
      }
    }

    check(); // run immediately
    const id = setInterval(check, 30000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  return (
    <div className="w-full px-6 py-2 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
      <div className="flex gap-4 items-center">
        {/* Icon */}
        <div className="flex-shrink-0 p-3 rounded-lg" style={{ backgroundColor: 'rgba(141, 100, 211, 0.15)' }}>
          <img src="/icons/rtt.svg" alt="Latency" className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-1">Round Trip Time</p>
          <p className="text-2xl font-mono font-bold mb-2 text-[#8d64d3]">
            {rtt !== null ? `${rtt} ms` : "loading..."}
          </p>
          <p className="text-xs text-gray-300 font-mono">
            Your latency to RPi server
          </p>
        </div>
      </div>
    </div>
  );
}
