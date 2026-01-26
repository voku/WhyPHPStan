import React, { useEffect, useState } from 'react';
import { SimulationStage, OutcomeType } from '../types';

interface Props {
  stage: SimulationStage;
  outcome: OutcomeType;
  hazardTitle: string;
  stoppedAt?: SimulationStage;
}

export const Visualizer: React.FC<Props> = ({ stage, outcome, hazardTitle, stoppedAt }) => {
  const [carPosition, setCarPosition] = useState(0); // 0 to 100
  const [hazardVisible, setHazardVisible] = useState(true);

  useEffect(() => {
    if (stage === 'idle') {
      setCarPosition(0);
      setHazardVisible(true);
    } else if (stage === 'design') {
      setCarPosition(15);
      if (outcome === 'prevented') {
        setTimeout(() => setHazardVisible(false), 500); // Hazard cleared in design
      }
    } else if (stage === 'build') {
      setCarPosition(50);
      if (outcome === 'caught_build' || (outcome === 'prevented' && stoppedAt === 'build')) {
        setTimeout(() => setHazardVisible(false), 500); // Hazard cleared in build
      }
    } else if (stage === 'runtime') {
      setCarPosition(85);
    } else if (stage === 'complete') {
       if (outcome === 'safe') {
         setCarPosition(100);
       } else {
         // Stop the bus where the error was caught!
         if (stoppedAt === 'design') setCarPosition(15);
         else if (stoppedAt === 'build') setCarPosition(50);
         else setCarPosition(85); // runtime/crash
       }
    }
  }, [stage, outcome, stoppedAt]);

  // Determine car color based on state
  const getCarColor = () => {
    if (stage === 'complete') {
        if (outcome === 'crashed') return '#ef4444'; // Red
        if (outcome === 'caught_runtime') return '#f59e0b'; // Amber
        // Prevented/Caught early = Green (Safe Stop)
        return '#10b981'; 
    }
    return '#3b82f6'; // Blue default
  };

  // Determine body animations (tilt, recoil, etc)
  const getCarBodyStyle = () => {
    let transform = 'translate(0, 0) rotate(0deg)';
    
    if (stage === 'complete') {
      if (stoppedAt === 'build' || outcome === 'caught_build') {
        // Braking dip (front down)
        transform = 'rotate(3deg) translateY(1px)';
      } else if (stoppedAt === 'design' && outcome === 'prevented') {
        // Gentle stop / "Fixed"
        transform = 'scale(1.05)';
      } else if (outcome === 'caught_runtime') {
        // Impact recoil
        transform = 'translateX(-10px) scaleX(0.9)';
      } else if (outcome === 'crashed') {
        // Crash tilt
        transform = 'rotate(-5deg)';
      }
    }
    
    return { 
      transform, 
      transformOrigin: 'center bottom',
      transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' 
    };
  };

  return (
    <div className="w-full aspect-[16/9] bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center group">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />
      
      {/* Road */}
      <div className="absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 bg-slate-900 border-y border-slate-700 flex items-center">
         {/* Lane markings */}
         <div className="w-full h-0 border-t border-dashed border-slate-700 opacity-50"></div>
      </div>

      {/* Hazard Obstacle */}
      <div 
        className={`absolute top-1/2 right-24 -translate-y-1/2 transition-all duration-500 flex flex-col items-center gap-2
          ${hazardVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
        `}
      >
        <div className="w-16 h-16 bg-rose-900/50 border-2 border-rose-500 rounded-lg flex items-center justify-center animate-pulse">
          <span className="text-2xl">⚠️</span>
        </div>
        <span className="text-xs font-mono text-rose-400 bg-rose-950/80 px-2 py-1 rounded border border-rose-900 shadow-lg">
           {hazardTitle}
        </span>
      </div>

      {/* The Car Container (Position) */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out z-10"
        style={{ left: `${carPosition}%`, transform: `translate(-50%, -50%)` }}
      >
         {/* Sensor Scan Effect (Design Phase) */}
         {outcome === 'prevented' && stoppedAt === 'design' && stage === 'design' && (
             <>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-emerald-500/10 rounded-full animate-ping" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-emerald-500/50 rounded-full animate-pulse" />
             </>
         )}

         {/* The Car Body (Animation) */}
         <div className="relative" style={getCarBodyStyle()}>
            
            {/* Headlights (Off if crashed) */}
            {stage !== 'idle' && outcome !== 'crashed' && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-32 h-24 bg-gradient-to-r from-yellow-100/20 to-transparent" 
                     style={{ clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 60%)' }} />
            )}

            {/* Car SVG */}
            <svg width="100" height="50" viewBox="0 0 100 50" className="drop-shadow-2xl">
               <path d="M10,25 L20,10 L70,10 L90,25 L95,25 L95,35 L90,35 L90,45 L75,45 L75,35 L25,35 L25,45 L10,45 L10,35 L5,35 L5,25 Z" 
                     fill={getCarColor()} stroke="white" strokeWidth="2" />
               
               <circle cx="20" cy="40" r="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
               <circle cx="80" cy="40" r="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
               
               <path d="M70,12 L85,25 L70,25 Z" fill="#93c5fd" opacity="0.8" />
            </svg>

            {/* Brake Lights (Active during 'caught_build' or 'prevented' stop) */}
            {stage === 'complete' && (stoppedAt === 'build' || stoppedAt === 'design') && (
               <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-6 bg-red-600 blur-[2px] shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
            )}

            {/* Impact indicator (Crash) */}
            {stage === 'complete' && outcome === 'crashed' && (
               <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-16 h-16 bg-rose-500 rounded-full animate-ping opacity-75" />
            )}
            
            {/* Airbag indicator (Runtime catch) */}
            {stage === 'complete' && outcome === 'caught_runtime' && (
               <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-10 h-10 bg-white/90 rounded-full border-2 border-amber-500 flex items-center justify-center shadow-lg animate-[bounce_1s_infinite]">
                 <span className="text-[10px] font-bold text-amber-600">AIR</span>
               </div>
            )}
         </div>

         {/* Label */}
         <div className="text-center mt-2 transition-opacity duration-300" style={{ opacity: stage === 'complete' && outcome === 'crashed' ? 0.5 : 1 }}>
            <span className="text-[10px] font-mono text-white bg-slate-800/80 px-2 py-0.5 rounded border border-slate-600 backdrop-blur-sm">
               DEV-BUS-1
            </span>
         </div>
      </div>

    </div>
  );
};
