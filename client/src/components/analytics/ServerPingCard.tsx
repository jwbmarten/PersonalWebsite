import { JSX, useEffect, useState } from "react";
import { pingApi } from "../../lib/api";

const MAX_REASONABLE_RTT_MS = 1000;

export default function ServerPingCard(): JSX.Element {
 const [rtt, setRtt] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | null = null;

    async function singlePing(): Promise<number | null> {
      const startedAt = performance.now();

      try {
        const { ok, rttMs } = await pingApi();
        const elapsed = performance.now() - startedAt;

        if (!ok || rttMs > MAX_REASONABLE_RTT_MS || elapsed > MAX_REASONABLE_RTT_MS) {
          return null;
        }

        return rttMs;
      } catch (e) {
        console.error("ServerPingCard ping error:", e);
        return null;
      }
    }

    async function check() {
      if (
        cancelled ||
        document.visibilityState !== "visible" ||
        !document.hasFocus()
      ) {
        return;
      }

      // Warm-up attempt; ignore result
      await singlePing();

      const results: number[] = [];

      for (let i = 0; i < 3; i++) {
        if (cancelled) return;

        const result = await singlePing();

        if (result !== null) {
          results.push(result);
        }

        await new Promise((resolve) => setTimeout(resolve, 150));
      }

      if (cancelled || results.length === 0) return;

      setRtt(Math.round(Math.min(...results)));
    }

    function scheduleCheck(delayMs: number) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(check, delayMs);
    }

    function handleVisibilityOrFocusChange() {
      if (document.visibilityState === "visible" && document.hasFocus()) {
        setRtt(null);
        scheduleCheck(250);
      }
    }

    check();

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible" && document.hasFocus()) {
        check();
      }
    }, 30000);

    document.addEventListener("visibilitychange", handleVisibilityOrFocusChange);
    window.addEventListener("focus", handleVisibilityOrFocusChange);

    return () => {
      cancelled = true;
      clearInterval(intervalId);

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      document.removeEventListener("visibilitychange", handleVisibilityOrFocusChange);
      window.removeEventListener("focus", handleVisibilityOrFocusChange);
    };
  }, []);

  return (
    <div className="w-full px-6 py-2 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md shadow-lg ring-1 ring-white/20 border border-white/10">
      <div className="flex gap-4 items-center">
        {/* Icon */}
        <div className="flex-shrink-0 p-3 rounded-lg border-1 border-purple-400/30 shadow-md shadow-black/20" style={{ backgroundColor: 'rgba(141, 100, 211, 0.15)' }}>
          <img src="/icons/rtt.svg" alt="Latency" className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-1">Connection Latency</p>
          <p className="text-2xl font-mono font-bold mb-2 text-[#8d64d3]" style={{ textShadow: "0 2px 3px rgba(20, 20, 20, 0.75)" }}>
            {rtt !== null ? `${rtt} ms` : "connecting..."}
          </p>
          <p className="text-xs text-gray-300 font-mono">
            Approximate <a href="https://en.wikipedia.org/wiki/Round-trip_delay" className="text-[#fdd262]">RTT</a> to RPi server
          </p>
        </div>
      </div>
    </div>
  );
}
