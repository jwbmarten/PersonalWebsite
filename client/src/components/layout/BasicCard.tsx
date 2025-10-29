import type { ReactNode } from "react";

export function BasicCard({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-2xl shadow ${className}`}>{children}</div>;
}

export function CardContent({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={className}>{children}</div>;
}
