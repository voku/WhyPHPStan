import React from 'react';
import { SimulationStage, OutcomeType } from '../types';
import { Terminal, Code, AlertCircle, Check, Shield } from 'lucide-react';

interface Props {
  codeSnippet: string;
  stage: SimulationStage;
  outcome: OutcomeType;
  logMessage: string;
  sensorsActive: boolean;
}

export const Console: React.FC<Props> = ({ codeSnippet, stage, outcome, logMessage, sensorsActive }) => {
  
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl overflow-hidden border border-slate-800 shadow-2xl font-mono text-sm">
      {/* Tab Bar */}
      <div className="flex items-center bg-[#252526] border-b border-[#333]">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500 text-white">
          <Code size={14} className="text-blue-400" />
          <span>index.php</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 text-slate-400">
          <Terminal size={14} />
          <span>Output</span>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 flex-1 overflow-y-auto relative">
        <pre className="text-slate-300">
          <code>{codeSnippet}</code>
        </pre>
        
        {/* Static Analysis Squiggles */}
        {sensorsActive && stage !== 'idle' && (
           <div className="absolute top-12 left-4 right-4 h-4 border-b-2 border-dotted border-red-500 opacity-60 pointer-events-none" />
        )}
      </div>

      {/* Output / Terminal Area */}
      <div className="h-40 bg-[#0f0f0f] border-t border-[#333] p-3 overflow-y-auto">
         {stage === 'idle' && (
            <div className="text-slate-500 flex items-center gap-2">
               <span className="animate-pulse">_</span> Waiting for compilation...
            </div>
         )}
         
         {stage !== 'idle' && (
            <div className="flex flex-col gap-2 animate-fade-in-up">
               {/* Design Phase Logs */}
               {(stage === 'design' || stage === 'build' || stage === 'runtime' || stage === 'complete') && sensorsActive && (
                  <div className="text-emerald-400 flex items-start gap-2">
                     <Shield size={14} className="mt-1 shrink-0" />
                     <span>[PHPStan] {logMessage}</span>
                  </div>
               )}

               {/* Build Phase Logs */}
               {(stage === 'build' || stage === 'runtime' || stage === 'complete') && outcome === 'caught_build' && (
                  <div className="text-rose-400 flex items-start gap-2">
                     <AlertCircle size={14} className="mt-1 shrink-0" />
                     <span>[PHPUnit] FAIL: {logMessage}</span>
                  </div>
               )}
               {(stage === 'build' || stage === 'runtime' || stage === 'complete') && outcome !== 'caught_build' && outcome !== 'prevented' && (
                  <div className="text-slate-400 flex items-start gap-2">
                     <Check size={14} className="mt-1 shrink-0" />
                     <span>[PHPUnit] Tests passed (no logic coverage)</span>
                  </div>
               )}

               {/* Runtime Logs */}
               {(stage === 'runtime' || stage === 'complete') && outcome === 'crashed' && (
                  <div className="text-red-500 bg-red-500/10 p-2 rounded border border-red-500/20 flex items-start gap-2">
                     <AlertCircle size={14} className="mt-1 shrink-0" />
                     <span>FATAL ERROR: {logMessage}</span>
                  </div>
               )}
               {(stage === 'runtime' || stage === 'complete') && outcome === 'caught_runtime' && (
                  <div className="text-amber-400 bg-amber-500/10 p-2 rounded border border-amber-500/20 flex items-start gap-2">
                     <AlertCircle size={14} className="mt-1 shrink-0" />
                     <span>TypeError: {logMessage}</span>
                  </div>
               )}
               {(stage === 'runtime' || stage === 'complete') && (outcome === 'safe' || outcome === 'prevented') && (
                  <div className="text-emerald-500 flex items-start gap-2">
                     <Check size={14} className="mt-1 shrink-0" />
                     <span>App running normally. User happy.</span>
                  </div>
               )}
            </div>
         )}
      </div>
    </div>
  );
};
