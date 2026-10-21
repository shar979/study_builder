# SmartQuizzer Builder — AZ-900 Practice Platform

> An interactive, AI-driven practice and learning platform tailored for the **Microsoft Azure Fundamentals (AZ-900)** certification exam.

![Tech](https://img.shields.io/badge/React-18-blue) ![TS](https://img.shields.io/badge/TypeScript-5.5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06b6d4) ![Vite](https://img.shields.io/badge/Vite-7-646cff)

---

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Curriculum Alignment](#curriculum-alignment)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [How It Works](#how-it-works)
8. [Engagement & Gamification](#engagement--gamification)
9. [Data Persistence](#data-persistence)
10. [Theme System](#theme-system)
11. [Roadmap](#roadmap)

---

## Overview

**SmartQuizzer Builder** is a single-page web application that helps learners prepare for the Microsoft AZ-900 exam through instant-feedback quizzes, real-world explanations, flashcards, and gamified progress tracking.

The app ships with an embedded dataset of practice questions covering all three official AZ-900 domains, so it works **out of the box** with no backend setup required.

---

## Key Features

### Core Learning Engine

- **Instant feedback** — Explanations appear the moment you submit an answer, not at the end of the quiz.
- **Dual explanations** — Every question explains:
  - ✅ *Why the correct answer is right* (with real-world Azure context)
  - ❌ *Why each incorrect option is wrong* (clearing up common misconceptions)
- **Microsoft Learn references** — Each question links directly to the relevant Microsoft Learn documentation path.
- **Difficulty levels** — Questions are tagged `foundation`, `intermediate`, or `advanced`.

### Quiz Modes

| Mode | Description |
|------|-------------|
| **Domain Practice** | Drill into a specific AZ-900 domain with shuffled questions. |
| **Full Practice Exam** | A randomized 15-question simulation across all three domains. |
| **Flashcards** | Flip-through card mode for quick review, filterable by domain. |

### User Interface

- Modern, responsive design optimized for **desktop, tablet, and mobile**.
- **Dark / Light mode** toggle with seamless CSS variable transitions.
- Sticky navbar with real-time stats: Overall Accuracy, Completed Questions, Current Streak, Domain Mastery.
- Clean card-based layouts with a consistent 8px spacing system.

---

## Curriculum Alignment

All quiz topics are mapped directly to the official **Microsoft Learn AZ-900 Skills Outline**:

### Domain 1 — Describe Cloud Concepts (25–30%)

| Subtopic | Weight |
|----------|--------|
| Public, Private & Hybrid cloud | 30% |
| Shared responsibility model | 25% |
| Consumption-based & pricing models | 25% |
| CapEx vs. OpEx | 20% |

### Domain 2 — Describe Azure Architecture and Services (35–40%)

| Subtopic | Weight |
|----------|--------|
| Regions & availability zones | 20% |
| Compute services (VMs, AKS, Functions) | 25% |
| Storage services & redundancy | 25% |
| Networking (VNet, Load Balancer) | 15% |
| Identity, governance & Entra ID | 15% |

### Domain 3 — Describe Azure Management and Governance (30–35%)

| Subtopic | Weight |
|----------|--------|
| Cost management & pricing calculator | 25% |
| Policy, RBAC & Blueprints | 25% |
| Monitor, Log Analytics & alerts | 25% |
| Portal, CLI, PowerShell & ARM | 25% |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript 5.5 |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 3.4 (custom theme, dark mode) |
| Icons | lucide-react |
| Animations | canvas-confetti + custom CSS keyframes |
| Fonts | Inter (UI) + JetBrains Mono (code) |
| Persistence | Browser LocalStorage |

---

## Project Structure

```
src/
├── App.tsx                     # Main orchestrator — view routing, state, theme
├── main.tsx                    # React entry point
├── index.css                   # Global styles + CSS variables for theming
├── types.ts                    # Shared TypeScript types
│
├── data/
│   ├── domains.ts              # AZ-900 domain + subtopic definitions
│   └── questions.ts            # Embedded question dataset (33 questions)
│
├── lib/
│   ├── storage.ts              # LocalStorage, stats computation, mastery logic
│   ├── confetti.ts             # Confetti burst utilities
│   └── icons.ts                # Domain icon resolver
│
└── components/
    ├── Navbar.tsx              # Sticky nav with live stats + theme toggle
    ├── Dashboard.tsx           # Home screen — domain cards + stat overview
    ├── QuizView.tsx            # Quiz runner — progress bar + question flow
    ├── QuestionCard.tsx        # Single question + answer options + feedback
    ├── ResultsScreen.tsx       # Post-quiz results + radar chart + review
    ├── ScoreChart.tsx          # SVG radar chart across 3 domains
    ├── Flashcards.tsx          # 3D flip-card review mode
    ├── ProgressBar.tsx         # Reusable animated progress bar
    └── MasteryToast.tsx        # Badge unlock notification
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (runs automatically in Bolt)
npm run dev

# Build for production
npm run build

# Type-check the project
npm run typecheck
```

No environment variables or backend configuration are required — the app is fully self-contained.

---

## How It Works

### Quiz Flow

1. **Select a mode** from the dashboard — a specific domain or the full practice exam.
2. Questions are **shuffled** so each run is a fresh experience.
3. For each question:
   - Select an answer option (A, B, C, D).
   - Click **Submit** to lock in your choice.
   - Instant feedback appears: green pulse for correct, red shake for incorrect.
   - Read the dual explanation, then click **Next**.
4. After the last question, the **Results screen** shows your score, a domain radar chart, and a question-by-question review.

### Feedback Component

Each feedback panel includes:

- A banner with correct/incorrect state and animation.
- **"Why the correct answer is right"** — real-world Azure context.
- **"Why the other options are wrong"** — bullet list addressing each distractor.
- A clickable **Microsoft Learn reference** card linking to the official documentation.
- A lightbulb tip about re-attempting the question.

---

## Engagement & Gamification

| Feature | Trigger |
|---------|---------|
| 🔥 **Streak counter** | Increments on each correct answer; resets on wrong. Shown in navbar + quiz header. |
| 🎉 **Confetti burst** | Fires on correct answers (small) and quiz completion (full burst). |
| 🏆 **Mastery badges** | Unlocked at 80%+ accuracy with 5+ questions answered in a domain. Toast notification + confetti. |
| 📊 **Radar chart** | Live SVG visualization of accuracy across all 3 domains. |
| 🃏 **Flashcard mode** | 3D card-flip animation for quick review sessions. |
| ✨ **Micro-interactions** | Hover lifts on domain cards, animated progress fills, pop-in icons, shake-on-error. |

### Visual FX

- **Correct answer**: emerald green pulse animation + checkmark pop-in.
- **Incorrect answer**: soft crimson shake on the selected option.
- **Progress dots**: green (correct), red (incorrect), blue (current), gray (upcoming).
- **Mastery toast**: slides up from bottom with domain-colored border.

---

## Data Persistence

All learner progress is auto-saved to **LocalStorage** — no account or backend needed.

| Stored Data | Key |
|-------------|-----|
| Answer history | `smartquizzer.progress.v1` |
| Current & best streak | `smartquizzer.progress.v1` |
| Mastered domain IDs | `smartquizzer.progress.v1` |
| Reviewed flashcards | `smartquizzer.progress.v1` |
| Theme preference | `smartquizzer.theme.v1` |

A **Reset all progress** button is available in the dashboard footer (requires confirmation).

### Mastery Logic

A domain is marked **mastered** when:
- ≥ 5 questions answered in that domain, **and**
- Accuracy ≥ 80%

Once earned, mastery badges persist across sessions.

---

## Theme System

The app uses **CSS custom properties** (defined in `src/index.css`) that swap between light and dark palettes:

```css
:root {
  --bg-base: 248 250 252;
  --text-strong: 15 23 42;
  --accent: 47 135 245;
  /* ... */
}

.dark {
  --bg-base: 9 13 24;
  --text-strong: 241 245 249;
  /* ... */
}
```

- Toggle via the sun/moon button in the navbar.
- Remembers your choice across sessions.
- Falls back to your OS preference on first visit.
- All transitions animate smoothly over 300ms.

---

## Roadmap

Potential future enhancements:

- **Question bank expansion** — grow to 100+ questions per domain.
- **Timed exam mode** — simulate the real AZ-900 time constraint.
- **Adaptive difficulty** — surface harder questions as accuracy improves.
- **Weak-area targeting** — auto-generate quizzes from your lowest-scoring subtopics.
- **Export progress** — download stats as JSON or share a summary card.
- **Supabase sync** — optional cloud backup of progress across devices.

---

*Built for the Microsoft Azure Fundamentals (AZ-900) certification · 33 questions across 3 domains*
