import React, { useEffect, useRef } from 'react';
import { SimulationLog } from '../types';
import { Terminal, AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';

interface Props {
  logs: SimulationLog[];
}

export const EventLog: React.FC<Props> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (logs.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
        <Terminal size={48} />
        <p className="font-mono text-sm">System Ready. Awaiting Simulation...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3 font-mono text-sm h-full">
      {logs.map((log, idx) => {
        let icon = <CheckCircle size={16} className="text-emerald-500" />;
        let styles = "border-emerald-500/20 bg-emerald-500/5 text-emerald-200";

        if (log.outcome === 'crashed') {
          icon = <XCircle size={16} className="text-rose-500" />;
          styles = "border-rose-500/20 bg-rose-500/5 text-rose-200";
        } else if (log.outcome === 'mitigated') {
          icon = <AlertTriangle size={16} className="text-amber-500" />;
          styles = "border-amber-500/20 bg-amber-500/5 text-amber-200";
        } else if (log.outcome === 'prevented') {
          icon = <Shield size={16} className="text-blue-400" />;
          styles = "border-blue-500/20 bg-blue-500/5 text-blue-200";
        }

        return (
          <div key={`${log.sectionId}-${idx}`} className={`flex items-start gap-3 p-3 rounded border-l-2 ${styles} animate-fade-in-up`}>
            <div className="mt-0.5 shrink-0">{icon}</div>
            <div>
              <span className="font-bold opacity-50 text-xs uppercase tracking-wider block mb-1">
                {log.outcome.toUpperCase()}
              </span>
              <span>{log.message}</span>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};