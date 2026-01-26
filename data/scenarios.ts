import { Scenario, SimulationState, ScenarioOutcome } from '../types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'null-check',
    title: 'Reality vs Possibility',
    subtitle: 'The Null Pointer Hazard',
    description: 'PHP allows nulls to flow until they explode. Static analysis tracks them before they exist.',
    codeSnippet: `function getPrice(?Product $product) {
  // Danger: $product might be null!
  return $product->getPrice(); 
}`,
    busStory: {
      setup: 'Bus approaching an intersection with broken lights.',
      hazard: 'Invisible vehicle (Null) crossing the path.',
    },
    getOutcome: (state: SimulationState): ScenarioOutcome => {
      if (state.sensors) {
        return {
          type: 'prevented',
          stage: 'design',
          title: 'IDE Error Detected',
          message: 'Cannot call method "getPrice" on null|Product. Fix required before save.'
        };
      }
      if (state.seatbelts) {
        return {
          type: 'caught_build',
          stage: 'build',
          title: 'Test Suite Failed',
          message: 'CI/CD Pipeline halted. Test "PriceCalculation" failed with fatal error.'
        };
      }
      if (state.airbags) {
        return {
          type: 'caught_runtime',
          stage: 'runtime',
          title: 'Fatal Error (Airbags)',
          message: 'Call to a member function getPrice() on null. App crashed, but safely logged.'
        };
      }
      return {
        type: 'crashed',
        stage: 'runtime',
        title: 'System Crash',
        message: 'Uncaught Error: Call to a member function getPrice() on null.'
      };
    }
  },
  {
    id: 'architecture',
    title: 'Shaping Architecture',
    subtitle: 'The Mystery Payload',
    description: 'Passing unstructured arrays hides dependencies. Types enforce clear contracts.',
    codeSnippet: `function processUser(array $data) {
  // What is in $data? Who knows?
  save($data['email'], $data['role']);
}`,
    busStory: {
      setup: 'Cargo loading zone with unmarked containers.',
      hazard: 'Container missing "role" attribute loaded onto bus.',
    },
    getOutcome: (state: SimulationState): ScenarioOutcome => {
      if (state.sensors) {
        return {
          type: 'prevented',
          stage: 'design',
          title: 'Shape Mismatch',
          message: 'Offset "role" on array is not guaranteed to exist. Suggestion: Use a DTO.'
        };
      }
      // Arrays in PHP are loose; Native types (Airbags) don't stop 'array' type unless strictly typed keys are accessed
      if (state.seatbelts) {
        return {
          type: 'caught_build',
          stage: 'build',
          title: 'Integration Test Failed',
          message: 'Test case with missing keys caused undefined index warning.'
        };
      }
      return {
        type: 'crashed',
        stage: 'runtime',
        title: 'Logic Failure',
        message: 'Undefined array key "role". User created with invalid permissions.'
      };
    }
  },
  {
    id: 'contracts',
    title: 'The Contract Layer',
    subtitle: 'Integer Range Violation',
    description: 'Native types check "int", but Logic needs "int<1, 100>".',
    codeSnippet: `/** @param int<1, 100> $limit */
function paginate(int $limit) { ... }

// Caller passes 500
paginate(500);`,
    busStory: {
      setup: 'Highway speed limit zone (Max 100).',
      hazard: 'Bus attempting to travel at 500mph.',
    },
    getOutcome: (state: SimulationState): ScenarioOutcome => {
      if (state.sensors) {
        return {
          type: 'prevented',
          stage: 'design',
          title: 'Range Violation',
          message: 'Argument 1 of paginate expects int<1, 100>, 500 given.'
        };
      }
      // Native types (Airbags) see 500 as an int, so they don't deploy.
      if (state.seatbelts) {
        return {
          type: 'caught_build',
          stage: 'build',
          title: 'Functional Test Failed',
          message: 'Pagination logic returned empty set or error for out-of-bounds limit.'
        };
      }
      return {
        type: 'crashed',
        stage: 'runtime',
        title: 'Performance Degradation',
        message: 'System attempted to load 500 records, causing memory exhaustion.'
      };
    }
  },
  {
    id: 'security',
    title: 'Security Guards',
    subtitle: 'SQL Injection Risk',
    description: 'Literal types prevent tainted user input from ever reaching the database.',
    codeSnippet: `/** @param literal-string $query */
function query(string $q) { ... }

// User input passed directly
query($_GET['search']);`,
    busStory: {
      setup: 'Checkpoint requiring official ID cards.',
      hazard: 'Passenger with handwritten ID (User Input) trying to pass.',
    },
    getOutcome: (state: SimulationState): ScenarioOutcome => {
      if (state.sensors) {
        return {
          type: 'prevented',
          stage: 'build', // Stopped at Build/CI
          title: 'CI Security Gate',
          message: 'Static Analysis Security Audit failed. Tainted input flow detected.'
        };
      }
      // Seatbelts (Tests) might miss security edge cases unless specifically penned.
      // We'll assume a standard test suite misses a specific injection vector.
      return {
        type: 'crashed',
        stage: 'runtime',
        title: 'Security Breach',
        message: 'SQL Injection successful. Database compromised.'
      };
    }
  }
];
