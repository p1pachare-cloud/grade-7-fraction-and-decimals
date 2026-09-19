# Product Requirements Document (PRD)
## Fractions and Decimals | Grade 7 Math
### Intellia SG | Global Grade 7 Mathematics Curriculum

---

## 1. Executive Summary & Product Vision

This document defines the product requirements for **"Global Cyber-Grid Architects — Fractions and Decimals"**, an interactive, gamified, simulation-based lesson module for **Grade 7 students (age 12–13)**. The module covers converting between fractions and decimals, comparing and ordering rational numbers, arithmetic operations ($+, -, \times, \div$), terminating vs. recurring decimals, rounding & significant figures, and real-world engineering word problems.

The module is built as a standalone **React 18 / Vite** application designed to strictly mirror the visual language, UX structure, and glassmorphic interaction patterns of `https://equal-tau.vercel.app/` and repository `https://github.com/dsamyak/equal`.

---

## 2. Global Curriculum Cross-Mapping

| Curriculum Standard | Code / Reference | Learning Objective Focus |
|---------------------|------------------|--------------------------|
| **Common Core (US)** | 7.NS.A.2, 7.NS.A.3 | Convert rational numbers to decimals using long division; know terminating vs. recurring; apply all operations. |
| **Singapore Math** | Secondary 1 G3 / Primary equivalent | Fractions and decimals operations, recurring decimal notation ($0.\bar{3}$), rounding to 3 sig figs, real-world application. |
| **UK KS3 Curriculum** | KS3 Mathematics Year 7-8 | Order positive/negative fractions & decimals, convert recurring decimals, round to decimal places & significant figures. |
| **Australian Curriculum** | AC9M7N03, AC9M7N04 | Compare/order rational numbers, multiply/divide fractions & decimals, solve financial/rate problems. |
| **CBSE / ICSE (India)** | Class 7 Chapter 2 | Fractions and Decimals: multiplication/division, fraction-decimal conversions, word problems. |

---

## 3. Concrete → Pictorial → Abstract (CPA) Progression

1. **Concrete**: Interactive number line splitters, decimal place-value grid shading, and fraction bar balancers.
2. **Pictorial**: Dual-scale number lines comparing fractions to infinite repeating decimals ($1/3 \leftrightarrow 0.333...$), area models for fraction multiplication, and decimal placement diagrams.
3. **Abstract**: Long division conversion algorithms, bar notation ($0.\bar{3}$), fraction division via reciprocal multiplication, and precision rounding to specified significant figures.

---

## 4. Mature Story-World Themes (Age 12–13 Target Tone)

- **Selected Theme: Global Cyber-Grid Architects**: Junior systems engineers optimizing bandwidth allocation, server fraction loads, and decimal signal latency across major global data hubs (Tokyo, London, NYC, Dubai, Rio).
- **Tone**: Sophisticated futuristic glassmorphism, telemetry dashboards, and real-world engineering challenges.

---

## 5. The 6-Phase Learner Journey

```
INTRO → WONDER → STORY → SIMULATE → PLAY → REFLECT
```

1. **INTRO**: Cyber-Grid system briefing & global telemetry dashboard overview.
2. **WONDER**: Hook — *"Why does 1/3 equal 0.333... forever, while 1/4 terminates cleanly at 0.25?"* Interactive decimal splitter.
3. **STORY**: Global Cyber-Grid Architects narrative panels (Aisha in Dubai, Liam in London, Yuki in Tokyo).
4. **SIMULATE**: 3 playable simulation stations:
   - Station A: *Fraction-Decimal Converter & Terminating/Recurring Detector*.
   - Station B: *Operations & Reciprocal Matrix*.
   - Station C: *Rounding & Significant Figures Calibrator*.
5. **PLAY**: IntelliPlay™ 10-World Cyber League with procedural question generation, fire streaks, and Boss Milestones.
6. **REFLECT**: Engineering reflection log, confidence index, and global architect certificate.
