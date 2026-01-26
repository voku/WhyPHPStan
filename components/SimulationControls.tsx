import React from 'react';
import { SimulationState } from '../types';
import { ShieldAlert, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  state: SimulationState;
  onToggle: (key: keyof SimulationState) => void;
  isSimulating: boolean;
}

export const SimulationControls: React.FC<Props> = ({ state, onToggle, isSimulating }) => {
  const Toggle = ({ 
    active, 
    label, 
    id, 
    icon: Icon,
    description,
    onToggle 
  }: { 
    active: boolean; 
    label: string; 
    id: keyof SimulationState; 
    icon: React.ElementType;
    description: string;
    onToggle: () => void;
  }) => (
    <button
      onClick={onToggle}
      disabled={isSimulating}
      className={`
        relative group flex flex-col items-start w-full p-4 rounded-xl border transition-all duration-300 text-left
        ${active 
          ? 'bg-slate-800 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
          : 'bg-slate-900 border-slate-700 opacity-60 hover:opacity-100'
        }
        ${isSimulating ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:scale-[1.02]'}
      `}
    >
      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
            <Icon size={20} />
          </div>
          <span className={`font-bold text-base ${active ? 'text-white' : 'text-slate-400'}`}>{label}</span>
        </div>
        <div className={`
          w-10 h-5 rounded-full p-1 transition-colors duration-300
          ${active ? 'bg-emerald-500' : 'bg-slate-700'}
        `}>
          <div className={`
            w-3 h-3 rounded-full bg-white shadow-sm transform transition-transform duration-300
            ${active ? 'translate-x-5' : 'translate-x-0'}
          `} />
        </div>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </button>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <Toggle 
        id="seatbelts" 
        label="Seatbelts" 
        active={state.seatbelts} 
        onToggle={() => onToggle('seatbelts')}
        icon={ShieldCheck}
        description="Tests protect you when the crash happens."
      />
      <Toggle 
        id="airbags" 
        label="Airbags" 
        active={state.airbags} 
        onToggle={() => onToggle('airbags')}
        icon={Zap}
        description="Native types reduce impact severity at runtime."
      />
      <Toggle 
        id="sensors" 
        label="Sensors" 
        active={state.sensors} 
        onToggle={() => onToggle('sensors')}
        icon={ShieldAlert}
        description="Static analysis prevents the crash path entirely."
      />
    </div>
  );
};