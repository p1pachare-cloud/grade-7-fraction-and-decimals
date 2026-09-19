# Technical Requirements Document (TRD)
## Fractions and Decimals | Grade 7 Math
### Intellia | Global Grade 7 Mathematics Curriculum

---

## 1. Technical Overview & Tech Stack

This document specifies the architecture, data models, audio engine, procedural math logic, and deployment config for **"Global Cyber-Grid Architects — Fractions and Decimals"**.

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **UI Framework** | React 18 / Vite + TypeScript | High performance, modular component architecture |
| **Styling** | Vanilla CSS + Tailwind Utility Classes | Glassmorphism aesthetic matching `equal-tau.vercel.app` |
| **Icons & SVGs** | Lucide React + Custom Inline SVGs | High-resolution interactive visualizers |
| **Animations** | Framer Motion + CSS Keyframes | 60fps responsive micro-animations |
| **State Management** | `useReducer` + Context API + `localStorage` | Single-page state with 24-hour persistence |
| **Audio Engine** | 3-Tier Hybrid Engine | Pre-gen ElevenLabs MP3s → Dynamic ElevenLabs API → Web Speech API fallback |

---

## 2. Three-Tier Audio Pipeline Architecture

```
[UI Text Requested]
       │
       ▼
 1. audioMap Check? ──────► (YES) ──► Play Pre-generated MP3 Asset
       │ (NO)
       ▼
 2. ElevenLabs API Key? ──► (YES) ──► Fetch Dynamic Speech (Alice ID: Xb7hH8MSUJpSbSDYk0k2)
       │ (NO)
       ▼
 3. Web Speech API ───────► (Fallback) ──► Browser SpeechSynthesis Synthesis
```

- **Voice**: Alice (`Xb7hH8MSUJpSbSDYk0k2`), `eleven_multilingual_v2`
- **Rule**: Only paragraph text and questions are narrated — titles/headings are never narrated.

---

## 3. Procedural Question Generation Engine

Questions are dynamically synthesized using parameterized mathematical templates to ensure 0% repetition across sessions:

```typescript
export function generateProceduralQuestion(worldId: number, difficulty: number): Question {
  const num = Math.floor(Math.random() * 12) + 1;
  const den = [2, 3, 4, 5, 8, 10, 16, 20, 25, 50][Math.floor(Math.random() * 10)];
  const exactDecimal = num / den;
  const isTerminating = isTerminatingDecimal(den);

  return {
    id: `PROC_${Date.now()}_${Math.random()}`,
    world: worldId,
    difficulty,
    questionText: `Convert the fraction ${num}/${den} to a decimal. Is it terminating or recurring?`,
    correctAnswer: `${exactDecimal} (${isTerminating ? 'Terminating' : 'Recurring'})`,
    options: generateDistractors(exactDecimal, isTerminating),
    explanation: `${num} divided by ${den} equals ${exactDecimal}. Because denominator factors are ${getPrimeFactors(den)}, it is ${isTerminating ? 'terminating' : 'recurring'}.`
  };
}
```

---

## 4. Vercel Deployment Configuration

`vercel.json` file for single-command production deployment:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
