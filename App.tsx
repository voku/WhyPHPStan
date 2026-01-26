import React, { useState, useEffect } from 'react';
import { SimulationControls } from './components/SimulationControls';
import { Timeline } from './components/Timeline';
import { Visualizer } from './components/Visualizer';
import { Console } from './components/Console';
import { SCENARIOS } from './data/scenarios';
import { SimulationState, SimulationStage, Scenario, ScenarioOutcome } from './types';
import { Play, RotateCcw, ChevronRight, ChevronLeft, Activity, Info } from 'lucide-react';

const App: React.FC = () => {
  // Navigation State
  const [started, setStarted] = useState(false);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

  // Simulation State
  const [config, setConfig] = useState<SimulationState>({
    seatbelts: true,
    airbags: true,
    sensors: false,
  });
  const [stage, setStage] = useState<SimulationStage>('idle');
  const [outcome, setOutcome] = useState<ScenarioOutcome | null>(null);

  const scenario: Scenario = SCENARIOS[currentScenarioIndex];

  // Simulation Logic Loop
  useEffect(() => {
    if (stage === 'idle' || stage === 'complete') return;

    const timer = setTimeout(() => {
      // Logic flow: Design -> Build -> Runtime
      if (stage === 'design') {
        const result = scenario.getOutcome(config);
        if (result.stage === 'design') { // Caught in design
          setOutcome(result);
          setStage('complete');
        } else {
          setStage('build');
        }
      } 
      else if (stage === 'build') {
        const result = scenario.getOutcome(config);
        if (result.stage === 'build') { // Caught in build
          setOutcome(result);
          setStage('complete');
        } else {
          setStage('runtime');
        }
      } 
      else if (stage === 'runtime') {
        const result = scenario.getOutcome(config);
        setOutcome(result);
        setStage('complete');
      }
    }, 1500); // 1.5s per stage for visual pacing

    return () => clearTimeout(timer);
  }, [stage, config, scenario]);

  const startSimulation = () => {
    setOutcome(null);
    setStage('design');
  };

  const resetSimulation = () => {
    setStage('idle');
    setOutcome(null);
  };

  const nextScenario = () => {
    if (currentScenarioIndex < SCENARIOS.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      resetSimulation();
    }
  };

  const prevScenario = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(prev => prev - 1);
      resetSimulation();
    }
  };

  const toggleConfig = (key: keyof SimulationState) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
    resetSimulation(); // Reset if they change settings mid-run
  };

  // Landing Page
  if (!started) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-8 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-[#0f172a] to-black">
        <Activity size={64} className="text-emerald-500 mb-6" />
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
          THE CRASH THAT <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">NEVER HAPPENS</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Software errors are inevitable. When you catch them is a choice. <br/>
          Explore how <strong>Tests</strong>, <strong>Types</strong>, and <strong>Static Analysis</strong> 
          act as your code's Seatbelts, Airbags, and Sensors.
        </p>
        <button 
          onClick={() => setStarted(true)}
          className="group relative px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-lg font-bold rounded-full transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] hover:-translate-y-1"
        >
          Start Simulation
          <ChevronRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
        <a
          href="https://github.com/voku/WhyPHPStan"
          className="mt-6 text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
          target="_blank"
          rel="noreferrer"
        >
          Contribute on GitHub →
        </a>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col font-sans">
      
      {/* Top Bar: Timeline */}
      <Timeline currentStage={stage} />

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Visuals & Controls (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Header Area */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-500 text-sm font-mono mb-1 uppercase tracking-widest">
                <span>Scenario {currentScenarioIndex + 1}/{SCENARIOS.length}</span>
              </div>
              <h2 className="text-3xl font-bold text-white">{scenario.title}</h2>
              <p className="text-slate-400 text-lg">{scenario.subtitle}</p>
            </div>
            
            <div className="flex gap-2">
              <button onClick={prevScenario} disabled={currentScenarioIndex === 0} className="p-2 rounded-full hover:bg-slate-800 disabled:opacity-30 transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextScenario} disabled={currentScenarioIndex === SCENARIOS.length - 1} className="p-2 rounded-full hover:bg-slate-800 disabled:opacity-30 transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Visualizer */}
          <Visualizer 
            stage={stage} 
            outcome={outcome?.type || 'safe'} 
            stoppedAt={outcome?.stage}
            hazardTitle={scenario.busStory.hazard} 
          />

          {/* Controls */}
          <div className="bg-[#162032] p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-300 flex items-center gap-2">
                <Info size={16} /> Safety Systems
              </h3>
              {stage === 'idle' || stage === 'complete' ? (
                <button 
                  onClick={stage === 'complete' ? resetSimulation : startSimulation}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${stage === 'complete' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40'}`}
                >
                  {stage === 'complete' ? <><RotateCcw size={18} /> Reset</> : <><Play size={18} /> Run</>}
                </button>
              ) : (
                <div className="px-6 py-2 text-slate-400 font-mono animate-pulse">Running Simulation...</div>
              )}
            </div>
            <SimulationControls state={config} onToggle={toggleConfig} isSimulating={stage !== 'idle' && stage !== 'complete'} />
          </div>

          {/* Story/Description */}
          <div className="prose prose-invert max-w-none text-slate-400 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <p className="lead">{scenario.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm mt-4">
               <div>
                  <strong className="text-slate-300 block mb-1">Scenario Setup</strong>
                  {scenario.busStory.setup}
               </div>
               <div>
                  <strong className="text-rose-400 block mb-1">Hazard</strong>
                  {scenario.busStory.hazard}
               </div>
            </div>
          </div>

        </div>

        {/* Right Column: Console & Feedback (5 cols) */}
        <div className="lg:col-span-5 h-[600px] lg:h-auto sticky top-24">
           <Console 
             codeSnippet={scenario.codeSnippet}
             stage={stage}
             outcome={outcome?.type || 'safe'}
             logMessage={outcome?.message || ''}
             sensorsActive={config.sensors}
           />
        </div>

      </main>
      <footer className="border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <span>Share improvements, ideas, or fixes with the community.</span>
          <a
            href="https://github.com/voku/WhyPHPStan"
            className="text-emerald-300 hover:text-emerald-200 transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            Contribute on GitHub →
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
