import React from 'react';
import { BlogSection, HazardType } from '../types';

export const BLOG_CONTENT: BlogSection[] = [
  {
    id: 'intro',
    title: 'Introduction: Errors Belong to Developers',
    hazard: HazardType.NONE,
    content: (
      <>
        <p className="mb-4">
          Let’s start with something simple and uncomfortable: <strong>If an error happens at runtime, a user sees it.</strong>
        </p>
        <p className="mb-4">
          I don’t care how good your monitoring is, how fast your rollback pipeline runs, or how often you say “it shouldn’t happen”. Runtime errors are already too late. They are failures that escaped development and reached production.
        </p>
        <p>
          That’s the entire motivation for static analysis. Not theory. Not fashion. Damage control.
        </p>
      </>
    )
  },
  {
    id: 'reality-possibility',
    title: 'Reality vs. Possibility',
    hazard: HazardType.RUNTIME_CRITICAL,
    hazardDescription: 'Attempting to access property on null value.',
    content: (
      <>
        <p className="mb-4">
          PHP is excellent at telling you when something actually breaks: calling a method that doesn’t exist, passing a string where an int is required, or accessing a property on null.
        </p>
        <p className="mb-4">
          That’s <strong>runtime reality</strong>. But PHP is deliberately permissive before that point.
        </p>
        <p>
          Tools like PHPStan operate earlier: when code is written, reviewed, and understood. PHP tells you what happened. Static analysis tells you what should never have been possible.
        </p>
      </>
    )
  },
  {
    id: 'architecture',
    title: 'Shaping Architecture',
    hazard: HazardType.ARCHITECTURAL,
    hazardDescription: 'Ambiguous array structure passed to core function.',
    content: (
      <>
        <p className="mb-4">
          A high PHPStan level is not about “more errors”. It’s an architectural pressure system.
        </p>
        <p className="mb-4">
          It pushes you to stop passing anonymous arrays around, stop encoding meaning in strings, and stop hiding invariants in comments.
        </p>
        <p>
          Once types are precise, IDE autocompletion becomes frighteningly good. That’s not cosmetic DX. That’s speed and confidence.
        </p>
      </>
    )
  },
  {
    id: 'contracts',
    title: 'The Missing Layer',
    hazard: HazardType.TYPE_MISMATCH,
    hazardDescription: 'String "64" passed to integer parameter.',
    content: (
      <>
        <p className="mb-4">
          “I let PHP enforce contracts.” Good. You should. But nothing stops you from enforcing contracts at runtime AND enforcing them at design time.
        </p>
        <p>
          Static analysis often nudges you toward better PHP: stricter parameter types, explicit return types, and real interfaces.
        </p>
        <p>
          It doesn't weaken PHP's guarantees; it narrows the space in which PHP ever has to complain.
        </p>
      </>
    )
  },
  {
    id: 'dx',
    title: 'DX: Feedback Loops',
    hazard: HazardType.NONE,
    content: (
      <>
        <p className="mb-4">
          If I pass 64 to a function requiring <code>int&lt;1, 32&gt;</code>, I want that error immediately. In my IDE.
        </p>
        <p className="mb-4">
          Not after running tests. Not after CI fails.
        </p>
        <p>
          Static analysis is the only tool that gives you semantic errors at typing speed.
        </p>
      </>
    )
  },
  {
    id: 'security',
    title: 'Security: literal-string',
    hazard: HazardType.SECURITY_HOLE,
    hazardDescription: 'Potential SQL Injection via concatenated user input.',
    content: (
      <>
        <p className="mb-4">
          Consider <code>@param literal-string $sql</code>. This single constraint blocks user input, blocks temporary hacks, and blocks accidental concatenation.
        </p>
        <p>
          Does it solve all security? No. Does it eliminate dumb, expensive errors early? Absolutely.
        </p>
      </>
    )
  },
  {
    id: 'docs',
    title: 'Documentation That Cannot Lie',
    hazard: HazardType.NONE,
    content: (
      <>
        <p className="mb-4">
          Traditional documentation rots. Static PHPDoc does not.
        </p>
        <p className="mb-4">
          When you define <code>@return Generator&lt;int, User&gt;</code>, the build fails if reality diverges.
        </p>
        <p>
          The IDE knows the key is int. The IDE knows the user is User. Refactors are safe.
        </p>
      </>
    )
  },
  {
    id: 'logic',
    title: 'Logic Bugs Still Exist',
    hazard: HazardType.LOGIC_FLAW,
    hazardDescription: 'Business logic error: Discount applied twice.',
    content: (
      <>
        <p className="mb-4">
          Static analysis does not prevent logic bugs. Nothing does — except thinking.
        </p>
        <p className="mb-4">
          But it removes type bugs, shape bugs, and nullability bugs. Those are noise.
        </p>
        <p>
          I prefer to spend my brainpower on logic and design, not on mistakes a machine can detect instantly.
        </p>
      </>
    )
  },
  {
    id: 'conclusion',
    title: 'Conclusion',
    hazard: HazardType.NONE,
    content: (
      <>
        <p className="mb-4">
          PHP enforces reality. Static analysis enforces possibility.
        </p>
        <p className="mb-4">
          Two layers are better than one. Logic bugs still require thinking, but type bugs are optional.
        </p>
        <p className="text-xl font-bold text-emerald-400">
          I prefer optional bugs to be… not present.
        </p>
      </>
    )
  }
];