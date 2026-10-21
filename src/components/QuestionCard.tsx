import { useState } from 'react';
import { Check, X, BookOpen, ExternalLink, Lightbulb, RotateCcw, ChevronRight } from 'lucide-react';
import type { Question } from '@/types';
import { DOMAIN_MAP } from '@/data/domains';

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  onAnswer: (selectedIndex: number, correct: boolean) => void;
  onNext: () => void;
  isLast: boolean;
}

export default function QuestionCard({
  question,
  index,
  total,
  onAnswer,
  onNext,
  isLast,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const domain = DOMAIN_MAP[question.domainId];
  const isCorrect = submitted && selected === question.correctIndex;

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
    onAnswer(selected, selected === question.correctIndex);
  }

  function handleNext() {
    setSelected(null);
    setSubmitted(false);
    onNext();
  }

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="animate-fade-in">
      {/* Meta row */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className="chip text-white"
          style={{ backgroundColor: domain.color }}
        >
          {domain.shortName}
        </span>
        <span className="chip bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {question.difficulty}
        </span>
        <span className="ml-auto text-sm font-medium text-muted">
          Question {index + 1} of {total}
        </span>
      </div>

      {/* Prompt */}
      <h2 className="text-xl font-bold leading-snug text-strong sm:text-2xl">
        {question.prompt}
      </h2>

      {/* Options */}
      <div className="mt-5 grid gap-3">
        {question.options.map((opt, i) => {
          const isSel = selected === i;
          const isAnswer = i === question.correctIndex;
          let stateClass = 'border-slate-200 hover:border-azure-400 hover:bg-azure-50 dark:border-slate-700 dark:hover:bg-slate-800/60';
          if (submitted) {
            if (isAnswer) {
              stateClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10';
            } else if (isSel) {
              stateClass = 'border-red-500 bg-red-50 dark:bg-red-500/10 animate-shake-error';
            } else {
              stateClass = 'border-slate-200 opacity-60 dark:border-slate-700';
            }
          } else if (isSel) {
            stateClass = 'border-azure-500 bg-azure-50 dark:bg-azure-500/10';
          }

          return (
            <button
              key={i}
              disabled={submitted}
              onClick={() => setSelected(i)}
              className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200 ${stateClass} ${
                submitted ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  submitted && isAnswer
                    ? 'bg-emerald-500 text-white'
                    : submitted && isSel
                      ? 'bg-red-500 text-white'
                      : isSel
                        ? 'bg-azure-500 text-white'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                }`}
              >
                {submitted && isAnswer ? (
                  <Check size={16} />
                ) : submitted && isSel ? (
                  <X size={16} />
                ) : (
                  letters[i]
                )}
              </span>
              <span className="text-sm font-medium text-strong sm:text-base">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Action row */}
      {!submitted ? (
        <button
          className="btn-primary mt-6 w-full sm:w-auto"
          disabled={selected === null}
          onClick={handleSubmit}
          style={selected === null ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
        >
          Submit Answer
        </button>
      ) : (
        <>
          <FeedbackPanel question={question} correct={!!isCorrect} selectedIndex={selected} />
          <button
            className="btn-primary mt-6 w-full sm:w-auto"
            onClick={handleNext}
          >
            {isLast ? 'See Results' : 'Next Question'}
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}

function FeedbackPanel({
  question,
  correct,
  selectedIndex,
}: {
  question: Question;
  correct: boolean;
  selectedIndex: number | null;
}) {
  const learnUrl = `https://learn.microsoft.com${question.learnRef}`;
  return (
    <div
      className={`mt-6 animate-slide-up overflow-hidden rounded-2xl border-l-4 ${
        correct
          ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-500/5'
          : 'border-red-500 bg-red-50/60 dark:bg-red-500/5'
      }`}
    >
      {/* Banner */}
      <div
        className={`flex items-center gap-3 px-5 py-4 ${
          correct ? 'animate-pulse-success' : ''
        }`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${
            correct ? 'bg-emerald-500 animate-pop' : 'bg-red-500'
          }`}
        >
          {correct ? <Check size={22} /> : <X size={22} />}
        </div>
        <div>
          <p className={`text-lg font-bold ${correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
            {correct ? 'Correct!' : 'Not quite.'}
          </p>
          <p className="text-sm text-muted">
            {correct
              ? 'Nice work — here is why that is right.'
              : `You selected ${selectedIndex !== null ? ['A', 'B', 'C', 'D', 'E'][selectedIndex] : '—'}. Here is the breakdown.`}
          </p>
        </div>
      </div>

      {/* Explanations */}
      <div className="space-y-4 px-5 pb-5">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
            <Check size={15} /> Why the correct answer is right
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-strong">
            <span className="font-semibold">{
              question.options[question.correctIndex].slice(0, 70)
            }: </span>
            {question.whyCorrect}
          </p>
        </div>

        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400">
            <X size={15} /> Why the other options are wrong
          </p>
          <ul className="mt-1.5 space-y-2">
            {question.whyWrong.map((w, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-strong">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Learn ref */}
        <a
          href={learnUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 rounded-xl border border-azure-300 bg-azure-50 px-4 py-3 text-sm font-medium text-azure-700 transition-colors hover:bg-azure-100 dark:border-azure-500/30 dark:bg-azure-500/10 dark:text-azure-300 dark:hover:bg-azure-500/20"
        >
          <BookOpen size={16} />
          <span className="flex-1">
            <span className="block text-xs text-muted">Microsoft Learn reference</span>
            <span className="font-semibold">{question.learnTitle}</span>
          </span>
          <ExternalLink size={14} className="opacity-60 transition-opacity group-hover:opacity-100" />
        </a>

        <p className="flex items-center gap-1.5 text-xs text-muted">
          <Lightbulb size={13} className="text-amber-500" />
          <span>
            <RotateCcw size={11} className="mr-1 inline" />
            Re-attempt this question later by restarting the domain — your progress is saved.
          </span>
        </p>
      </div>
    </div>
  );
}
