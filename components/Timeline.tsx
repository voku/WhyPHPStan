import React from 'react';
import { SimulationStage } from '../types';
import { Monitor, Hammer, Server, Zap } from 'lucide-react';

interface Props {
  currentStage: SimulationStage;
}

export const Timeline: React.FC<Props> = ({ currentStage }) => {
  const stages = [
    { id: 'design', label: 'Design (IDE)', icon: Monitor },
    { id: 'build', label: 'Build (CI)', icon: Hammer },
    { id: 'runtime', label: 'Production', icon: Server },
  ];

  const getStageStatus = (stageId: string) => {
    if (currentStage === 'idle') return 'pending';
    if (currentStage === 'complete') return 'completed';
    
    const stageOrder = ['design', 'build', 'runtime'];
    const currentIndex = stageOrder.indexOf(currentStage);
    const stageIndex = stageOrder.indexOf(stageId);

    if (currentStage === stageId) return 'active';
    if (currentIndex > stageIndex) return 'completed';
    return 'pending';
  };

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-20">
      <div className="max-w-5xl mx-auto flex items-center justify-between relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-10 right-10 h-1 bg-slate-800 -z-0" />
        <div 
           className="absolute top-1/2 left-10 h-1 bg-emerald-500 transition-all duration-1000 -z-0" 
           style={{ 
             width: currentStage === 'idle' ? '0%' : 
                    currentStage === 'design' ? '15%' :
                    currentStage === 'build' ? '50%' :
                    currentStage === 'runtime' ? '85%' : '100%'
           }}
        />

        {stages.map((stage) => {
          const status = getStageStatus(stage.id);
          const Icon = stage.icon;
          
          let circleClass = "bg-slate-800 border-slate-600 text-slate-500";
          if (status === 'active') circleClass = "bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] scale-110";
          if (status === 'completed') circleClass = "bg-emerald-600 border-emerald-400 text-white";

          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${circleClass}`}>
                <Icon size={18} />
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${status === 'active' ? 'text-white' : 'text-slate-500'}`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
