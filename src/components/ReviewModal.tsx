import React from 'react';
import { Question, AnswerChoice } from '../types';
import { X, MessageSquareHeart } from 'lucide-react';
import { DuckCharacter } from './DuckCharacter';
import { PandaCharacter } from './PandaCharacter';

interface ReviewModalProps {
  questions: Question[];
  userAnswers: AnswerChoice[];
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  questions,
  userAnswers,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-gradient-to-b from-[#2e1065] to-[#1e1035] rounded-3xl border border-purple-500/40 shadow-2xl flex flex-col overflow-hidden text-purple-100">
        {/* Header */}
        <div className="p-5 border-b border-purple-500/30 flex items-center justify-between bg-purple-900/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-300">
              <MessageSquareHeart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bubble text-lg font-bold text-white">Our Complete Quiz Dialogue</h3>
              <p className="text-xs text-purple-300">All 8 questions &amp; Duck&apos;s reactions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-purple-800/60 hover:bg-purple-700 text-purple-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {questions.map((q, idx) => {
            const answer = userAnswers[idx];
            return (
              <div
                key={q.id}
                className="bg-purple-950/60 border border-purple-500/20 rounded-2xl p-4 space-y-3"
              >
                {/* Question */}
                <div className="flex items-start gap-3">
                  <DuckCharacter size="sm" expression={q.duckPromptMood} className="shrink-0 -mt-2" />
                  <div className="flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full inline-block mb-1">
                      Question {idx + 1}
                    </span>
                    <p className="text-sm font-semibold text-purple-100">
                      &ldquo;{q.duckQuestion}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Panda Answer */}
                {answer && (
                  <div className="flex items-start gap-3 pl-4 border-l-2 border-pink-500/30 ml-4">
                    <div className="flex-1 bg-purple-900/40 rounded-xl p-3 border border-pink-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-pink-300">🐼 Panda answered:</span>
                      </div>
                      <p className="text-sm text-pink-100 font-medium">
                        {answer.text}
                      </p>
                    </div>
                    <PandaCharacter size="sm" expression={answer.pandaExpression} className="shrink-0 -mt-2" />
                  </div>
                )}

                {/* Duck Reaction */}
                {answer && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-xs text-amber-200 flex items-center gap-2">
                    <span className="text-base">🦆</span>
                    <span className="font-semibold text-amber-300">Duck:</span>
                    <span className="italic">&ldquo;{answer.duckReaction}&rdquo;</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-purple-500/30 bg-purple-900/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all shadow-md"
          >
            Close Summary
          </button>
        </div>
      </div>
    </div>
  );
};
