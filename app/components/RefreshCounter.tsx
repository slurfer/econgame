"use client";
import { useEffect, useState } from "react";
import { refreshInterval } from "@/config/config.json";
import { getMsUntilNextRefresh } from "@/util/timeTools";

export default function RefreshCounter() {
  const [mounted, setMounted] = useState(false); // track client mount
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setMounted(true); // now we are on the client
    setTimeLeft(getMsUntilNextRefresh());

    const interval = setInterval(() => {
      setTimeLeft(getMsUntilNextRefresh());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null; // do not render anything on server

  const minutes = Math.floor(timeLeft / 60_000);
  const seconds = Math.floor((timeLeft % 60_000) / 1000);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = 1 - timeLeft / refreshInterval;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center mt-4">
      <svg width="100" height="100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#3b82f6"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
        <text
          x="50"
          y="55"
          textAnchor="middle"
          className="text-sm fill-gray-700"
        >
          {minutes}:{seconds.toString().padStart(2, "0")}
        </text>
      </svg>
      <div className="text-gray-500 text-xs mt-1">Next refresh</div>
    </div>
  );
}
