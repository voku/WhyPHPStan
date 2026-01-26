import React from 'react';

export type SimulationStage = 'idle' | 'design' | 'build' | 'runtime' | 'complete';

export interface SimulationState {
  seatbelts: boolean; // Tests
  airbags: boolean;   // Native Types
  sensors: boolean;   // Static Analysis
}

export type OutcomeType = 'prevented' | 'caught_build' | 'caught_runtime' | 'crashed' | 'safe';

export interface ScenarioOutcome {
  type: OutcomeType;
  stage: SimulationStage;
  title: string;
  message: string;
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  codeSnippet: string;
  busStory: {
    setup: string;
    hazard: string;
  };
  // Logic for what happens given the active protections
  getOutcome: (state: SimulationState) => ScenarioOutcome;
}

export enum HazardType {
  NONE = 'NONE',
  RUNTIME_CRITICAL = 'RUNTIME_CRITICAL',
  ARCHITECTURAL = 'ARCHITECTURAL',
  TYPE_MISMATCH = 'TYPE_MISMATCH',
  SECURITY_HOLE = 'SECURITY_HOLE',
  LOGIC_FLAW = 'LOGIC_FLAW',
}

export interface BlogSection {
  id: string;
  title: string;
  hazard: HazardType;
  hazardDescription?: string;
  content: React.ReactNode;
}

export interface SimulationLog {
  sectionId?: string;
  outcome: 'crashed' | 'mitigated' | 'prevented';
  message: string;
}
