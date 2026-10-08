import React, { useState, useEffect } from 'react';
import { QUESTIONS, calculateQuizResults } from './data/quizData';
import { AnswerChoice, CharacterExpression, QuizScores, CoupleProfile } from './types';
import { DuckCharacter } from './components/DuckCharacter';
import { PandaCharacter } from './components/PandaCharacter';
import { CoupleCelebrationScene } from './components/CoupleCelebrationScene';
import { ConfettiEffect } from './components/ConfettiEffect';
import { ReviewModal } from './components/ReviewModal';
import { soundEffects } from './utils/soundEffects';
import { theRoseBGM } from './utils/theRoseAudio';
import {
  Heart,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Share2,
  Check,
  ArrowRight,
  Flame,
  Laugh,
  Eye,
  MessageSquareHeart
} from 'lucide-react';

type GameState = 'welcome' | 'quiz' | 'suspense' | 'result';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerChoice[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<AnswerChoice | null>(null);

  // Expression overrides during reaction
  const [currentDuckMood, setCurrentDuckMood] = useState<CharacterExpression>('confused');
  const [currentPandaMood, setCurrentPandaMood] = useState<CharacterExpression>('happy');

  // Results cache
  const [finalScores, setFinalScores] = useState<QuizScores | null>(null);
  const [finalProfile, setFinalProfile] = useState<CoupleProfile | null>(null);

  // Modals & UI states
  const [showReview, setShowReview] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [suspenseProgress, setSuspenseProgress] = useState<number>(0);

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  // Sync sound manager
  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundEffects.enabled = next;
    theRoseBGM.setMuted(!next);
    if (next) soundEffects.playPop();
  };

  // Start the quiz
  const handleStartQuiz = () => {
    soundEffects.playCuteQuack();
    theRoseBGM.play();
    theRoseBGM.setMuted(!soundOn);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setSelectedChoice(null);
    setCurrentDuckMood(QUESTIONS[0].duckPromptMood);
    setCurrentPandaMood('happy');
    setGameState('quiz');
  };

  // When Panda picks an answer
  const handleSelectChoice = (choice: AnswerChoice) => {
    if (selectedChoice) return; // Prevent double taps during reaction

    setSelectedChoice(choice);
    setCurrentPandaMood(choice.pandaExpression);
    setCurrentDuckMood(choice.duckExpression);
    soundEffects.playPop();
  };

  // Advance to next question or start suspense
  const handleNextQuestion = () => {
    if (!selectedChoice) return;

    soundEffects.playChime();
    const updatedAnswers = [...answers, selectedChoice];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex + 1 < QUESTIONS.length) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      setSelectedChoice(null);
      setCurrentDuckMood(QUESTIONS[nextIdx].duckPromptMood);
      setCurrentPandaMood('happy');
    } else {
      // Completed all 8 questions! Transition to suspense
      const result = calculateQuizResults(updatedAnswers);
      setFinalScores(result.scores);
      setFinalProfile(result.profile);
      setGameState('suspense');
      setSuspenseProgress(0);
    }
  };

  // Suspense timer animation
  useEffect(() => {
    if (gameState === 'suspense') {
      soundEffects.playChime();
      const interval = setInterval(() => {
        setSuspenseProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setGameState('result');
            soundEffects.playCelebration();
            return 100;
          }
          return prev + 25;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [gameState]);

  // Restart Quiz
  const handleRestart = () => {
    soundEffects.playPop();
    setGameState('welcome');
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setSelectedChoice(null);
    setFinalScores(null);
    setFinalProfile(null);
  };

  // Copy couple report
  const handleCopyReport = () => {
    if (!finalProfile || !finalScores) return;
    const text = `🐼❤️🦆 PANDA & VAATHU: HOW CUTE ARE WE?
Title: "${finalProfile.title}" (${finalProfile.badge})
❤️ Cute Score: ${finalScores.cuteScore}%
💖 Love Level: ${finalScores.loveLevel}%
😂 Chaos Level: ${finalScores.chaosLevel}%
🥹 Softness Level: ${finalScores.softnessLevel}%
👀 Teasing Level: ${finalScores.teasingLevel}%

Verdict: ${finalProfile.summary}
Vaathu's Message: "${finalProfile.duckMessage}"
Take the quiz: ${window.location.href}`;

    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    soundEffects.playPop();
    setTimeout(() => setCopiedToast(false), 3000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#1a0b2e] via-[#2e1065] to-[#140727] text-purple-100 flex flex-col relative overflow-x-hidden">
      {/* Background ambient glowing particles & stars */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl animate-pulse-soft delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />

        {/* Floating background decorative hearts */}
        <div className="absolute top-24 left-[15%] text-purple-400/20 text-3xl animate-float-slow">💜</div>
        <div className="absolute top-48 right-[18%] text-pink-400/20 text-2xl animate-float-reverse">✨</div>
        <div className="absolute bottom-32 left-[12%] text-violet-400/20 text-4xl animate-float-slow delay-200">🌸</div>
        <div className="absolute bottom-48 right-[14%] text-purple-400/20 text-3xl animate-float-reverse delay-300">💕</div>
      </div>

      {/* Confetti on result */}
      {gameState === 'result' && <ConfettiEffect durationMs={7000} />}

      {/* Top Navigation Bar */}
      <header className="relative z-20 w-full max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-purple-900/80 border border-purple-500/30 flex items-center justify-center shadow-lg shadow-purple-950/40">
            <span className="text-xl">🐼</span>
          </div>
          <span className="text-pink-400 font-bold text-sm sm:text-base">❤️</span>
          <div className="w-10 h-10 rounded-2xl bg-purple-900/80 border border-purple-500/30 flex items-center justify-center shadow-lg shadow-purple-950/40">
            <span className="text-xl">🦆</span>
          </div>
          <div className="ml-1">
            <h1 className="font-bubble text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              Panda &amp; Vaathu
            </h1>
            <p className="text-[10px] sm:text-xs text-purple-300 font-medium -mt-0.5">
              How Cute Are We?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {gameState === 'quiz' && (
            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 text-purple-300 border border-purple-600/30 transition-all text-xs flex items-center gap-1"
              title="Restart Quiz"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restart</span>
            </button>
          )}

          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 text-purple-200 border border-purple-600/30 transition-all shadow-md"
            title={soundOn ? 'Mute Sounds' : 'Unmute Sounds'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-pink-300" /> : <VolumeX className="w-4 h-4 text-purple-400" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-3 sm:py-6 max-w-4xl mx-auto w-full">
        {/* ========================================================
            SCREEN 1: WELCOME SCREEN
        ======================================================== */}
        {gameState === 'welcome' && (
          <div className="w-full max-w-2xl text-center space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/70 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-spin" />
              <span>The Cutest Couple Conversation Game</span>
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-current animate-pulse" />
            </div>

            {/* Character Stage: Panda and Vaathu floating gently in perfect sync */}
            <div className="relative flex items-center justify-center gap-4 sm:gap-8 py-2">
              <div className="relative animate-float-slow">
                <PandaCharacter size="lg" expression="happy" />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-purple-200 text-purple-950 font-bold text-[11px] shadow">
                  Panda 🐼
                </span>
              </div>

              {/* Heart in between */}
              <div className="flex flex-col items-center justify-center animate-pulse-soft">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-400 text-2xl shadow-lg shadow-pink-500/20">
                  ❤️
                </div>
                <span className="text-[11px] text-pink-300 font-bold mt-1">Duo</span>
              </div>

              <div className="relative animate-float-slow">
                <DuckCharacter size="lg" expression="happy" isSpeaking={false} />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-500/90 text-amber-950 font-bold text-[11px] shadow">
                  Vaathu 🦆
                </span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="font-bubble text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-200 tracking-tight drop-shadow-sm">
                Panda &amp; Vaathu
              </h1>
              <p className="text-base sm:text-xl text-purple-200/90 font-medium max-w-lg mx-auto leading-relaxed">
                &ldquo;Let&apos;s see how cute, chaotic, and compatible we really are&hellip;&rdquo;
              </p>
            </div>

            {/* Feature pill highlights */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto pt-2">
              <div className="bg-purple-950/50 border border-purple-500/20 rounded-2xl p-2.5 sm:p-3 text-center">
                <span className="text-xl">🐣</span>
                <p className="text-xs font-bold text-purple-200 mt-1">10 Silly Questions</p>
                <p className="text-[10px] text-purple-300/70">Vaathu interviews Panda</p>
              </div>
              <div className="bg-purple-950/50 border border-purple-500/20 rounded-2xl p-2.5 sm:p-3 text-center">
                <span className="text-xl">💬</span>
                <p className="text-xs font-bold text-purple-200 mt-1">Funny Reactions</p>
                <p className="text-[10px] text-purple-300/70">Real-time quips</p>
              </div>
              <div className="bg-purple-950/50 border border-purple-500/20 rounded-2xl p-2.5 sm:p-3 text-center">
                <span className="text-xl">🏆</span>
                <p className="text-xs font-bold text-purple-200 mt-1">Cute Report</p>
                <p className="text-[10px] text-purple-300/70">Chaos &amp; softness score</p>
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-2">
              <button
                onClick={handleStartQuiz}
                className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bubble text-lg sm:text-2xl font-bold shadow-2xl shadow-pink-500/40 hover:shadow-pink-500/60 hover:scale-105 active:scale-95 transition-all duration-300 border border-pink-400/30 cursor-pointer"
              >
                <span>Start Our Little Quiz ❤️</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN 2: QUIZ CONVERSATION SCREEN
        ======================================================== */}
        {gameState === 'quiz' && currentQuestion && (
          <div className="w-full max-w-2xl flex flex-col space-y-4 sm:space-y-6">
            {/* Elegant Cute Progress Header */}
            <div className="bg-purple-950/60 backdrop-blur-md border border-purple-500/30 rounded-2xl p-3 sm:p-4 shadow-xl">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
                <div className="flex items-center gap-1.5 text-purple-200">
                  <span className="text-base">🦆</span>
                  <span>Question {currentQuestion.questionNumber} of 10</span>
                </div>
                <div className="flex items-center gap-1 text-pink-300">
                  <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
                  <span>{Math.round((currentQuestion.questionNumber / 10) * 100)}% cute</span>
                </div>
              </div>

              {/* Progress Bar with glowing purple/pink fill */}
              <div className="relative h-3 w-full bg-purple-900/80 rounded-full overflow-hidden p-0.5 border border-purple-700/50">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400 rounded-full transition-all duration-500 shadow-md shadow-pink-500/50"
                  style={{ width: `${(currentQuestion.questionNumber / 10) * 100}%` }}
                />
              </div>
            </div>

            {/* Conversation Stage: Duck on Left, Panda on Right */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* Duck Column (The Inquisitive Interviewer) */}
              <div className="md:col-span-5 flex flex-row md:flex-col items-center md:items-center justify-center gap-3 bg-purple-950/40 border border-purple-500/20 rounded-2xl p-3 sm:p-4">
                <DuckCharacter
                  size="md"
                  expression={currentDuckMood}
                  isSpeaking={!selectedChoice}
                />
                <div className="text-left md:text-center">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold border border-amber-400/30">
                    🦆 Vaathu asks:
                  </div>
                  <p className="text-xs text-purple-300 font-medium mt-1">
                    Mood: <span className="text-pink-300 capitalize">{currentDuckMood.replace('-', ' ')}</span>
                  </p>
                </div>
              </div>

              {/* VS / Heart Connector */}
              <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-purple-800/60 border border-purple-500/40 flex items-center justify-center text-pink-400 shadow-inner">
                  <Heart className="w-5 h-5 fill-current animate-pulse" />
                </div>
              </div>

              {/* Panda Column (The Beloved Partner Answering) */}
              <div className="md:col-span-5 flex flex-row-reverse md:flex-col items-center md:items-center justify-center gap-3 bg-purple-950/40 border border-purple-500/20 rounded-2xl p-3 sm:p-4">
                <PandaCharacter
                  size="md"
                  expression={currentPandaMood}
                  isAnswering={!!selectedChoice}
                />
                <div className="text-right md:text-center">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-300/20 text-purple-200 text-[11px] font-bold border border-purple-300/30">
                    🐼 Panda responds:
                  </div>
                  <p className="text-xs text-purple-300 font-medium mt-1">
                    Mood: <span className="text-pink-300 capitalize">{currentPandaMood.replace('-', ' ')}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* DUCK'S QUESTION SPEECH BUBBLE */}
            <div className="relative bg-gradient-to-r from-purple-900/80 to-[#2c0e5a] border-2 border-purple-400/40 rounded-3xl p-4 sm:p-5 shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0 text-base">
                  🦆
                </div>
                <div>
                  <h2 className="font-bubble text-base sm:text-xl font-bold text-white leading-snug">
                    &ldquo;{currentQuestion.duckQuestion}&rdquo;
                  </h2>
                  <p className="text-xs text-purple-300/80 mt-1 font-medium">
                    Panda, choose your honest answer below:
                  </p>
                </div>
              </div>
            </div>

            {/* ANSWER CHOICES LIST */}
            <div className="space-y-2.5">
              {currentQuestion.choices.map((choice) => {
                const isSelected = selectedChoice?.id === choice.id;
                const isDisabled = selectedChoice !== null && !isSelected;

                return (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(choice)}
                    disabled={selectedChoice !== null}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-600/90 to-purple-600/90 text-white border-pink-400 scale-[1.01] shadow-lg shadow-pink-500/30 ring-2 ring-pink-300'
                        : isDisabled
                        ? 'bg-purple-950/30 text-purple-400/50 border-purple-900/40 cursor-not-allowed opacity-50'
                        : 'bg-purple-950/60 hover:bg-purple-900/70 text-purple-100 hover:text-white border-purple-500/30 hover:border-purple-400/60 shadow-md hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected
                            ? 'bg-white text-purple-900'
                            : 'bg-purple-900/80 text-purple-300 border border-purple-600/40'
                        }`}
                      >
                        {choice.id.slice(-1).toUpperCase()}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold leading-relaxed">
                        {choice.text}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-white text-pink-600 flex items-center justify-center shrink-0 ml-2 shadow">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* REACTION SPEECH BUBBLE (Appears immediately after Panda answers) */}
            {selectedChoice && (
              <div className="relative bg-gradient-to-br from-amber-500/20 via-pink-500/20 to-purple-500/20 border-2 border-pink-400/50 rounded-3xl p-4 sm:p-5 shadow-2xl animate-fadeIn space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-amber-400/30 border border-amber-300 flex items-center justify-center shrink-0 text-xl shadow-md">
                    🦆
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bubble text-sm font-bold text-amber-300">
                        Vaathu&apos;s Reaction:
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/30 text-pink-200 border border-pink-400/40 font-semibold">
                        {currentDuckMood.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-white italic leading-relaxed">
                      &ldquo;{selectedChoice.duckReaction}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="group px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bubble text-sm sm:text-base font-bold shadow-lg shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-pink-300/40"
                  >
                    <span>
                      {currentQuestionIndex + 1 < QUESTIONS.length
                        ? 'Next Question'
                        : 'See Our Results! ✨'}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            SCREEN 3: SUSPENSE ANIMATION SCREEN
        ======================================================== */}
        {gameState === 'suspense' && (
          <div className="w-full max-w-md text-center py-12 space-y-6 animate-fadeIn">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-purple-600/30 border-2 border-pink-400/40 flex items-center justify-center animate-ping absolute" />
              <div className="w-24 h-24 rounded-full bg-purple-900/90 border border-purple-400/50 flex items-center justify-center text-4xl shadow-2xl">
                ⏳
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-bubble text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-200">
                And the results are&hellip;
              </h2>
              <p className="text-sm text-purple-300 font-medium">
                Vaathu is tallying the cute and chaotic points!
              </p>
            </div>

            {/* Suspense meter */}
            <div className="w-full bg-purple-950/80 rounded-full h-3 p-0.5 border border-purple-500/40 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-400 to-amber-300 rounded-full transition-all duration-300 shadow-lg shadow-pink-500/50"
                style={{ width: `${suspenseProgress}%` }}
              />
            </div>
            <p className="text-xs text-purple-300/70 font-semibold italic">
              Generating your official couple certificate...
            </p>
          </div>
        )}

        {/* ========================================================
            SCREEN 4: FINAL RESULT & COUPLE REPORT
        ======================================================== */}
        {gameState === 'result' && finalProfile && finalScores && (
          <div className="w-full max-w-2xl space-y-6 animate-fadeIn pb-10">
            {/* Top Confetti & Certificate Banner */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs sm:text-sm font-bold shadow-md">
                <Sparkles className="w-4 h-4 text-pink-300 animate-spin" />
                <span>Official Couple Report Completed!</span>
                <Heart className="w-4 h-4 fill-current text-pink-400" />
              </div>
              <h1 className="font-bubble text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-100 to-amber-200 tracking-tight">
                {finalProfile.title}
              </h1>
              <p className="text-xs sm:text-sm text-purple-200 font-medium">
                &ldquo;{finalProfile.tagline}&rdquo;
              </p>
            </div>

            {/* BIG CUTE SCORE DISPLAY */}
            <div className="relative bg-gradient-to-br from-purple-900/80 via-[#3b126d] to-purple-950/90 border-2 border-purple-400/40 rounded-3xl p-6 text-center shadow-2xl">
              <div className="absolute top-4 right-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-800/80 border border-purple-500/40 text-purple-200">
                  {finalProfile.badge}
                </span>
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-pink-300">
                Official Compatibility Verdict
              </span>

              {/* Heart Score Reveal */}
              <div className="my-3 flex items-center justify-center gap-3">
                <Heart className="w-10 h-10 sm:w-14 sm:h-14 text-pink-400 fill-current animate-bounce-gentle" />
                <span className="font-bubble text-5xl sm:text-7xl font-extrabold text-white tracking-tight drop-shadow-md">
                  {finalScores.cuteScore}%
                </span>
                <span className="font-bubble text-2xl sm:text-4xl font-bold text-pink-300 -ml-1">
                  CUTE
                </span>
              </div>

              {/* Dynamic Summary */}
              <p className="text-sm sm:text-base text-purple-100 font-semibold max-w-lg mx-auto leading-relaxed mt-2 bg-purple-950/50 p-3.5 rounded-2xl border border-purple-500/20">
                {finalProfile.summary}
              </p>

              {/* Additional Metric Percentage Bars */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 text-left">
                {/* Love Level */}
                <div className="bg-purple-950/60 p-3 rounded-2xl border border-purple-500/20">
                  <div className="flex items-center justify-between text-xs font-bold text-pink-300 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      Love Level
                    </span>
                    <span>{finalScores.loveLevel}%</span>
                  </div>
                  <div className="h-2 w-full bg-purple-900/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
                      style={{ width: `${finalScores.loveLevel}%` }}
                    />
                  </div>
                </div>

                {/* Chaos Level */}
                <div className="bg-purple-950/60 p-3 rounded-2xl border border-purple-500/20">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      Chaos Level
                    </span>
                    <span>{finalScores.chaosLevel}%</span>
                  </div>
                  <div className="h-2 w-full bg-purple-900/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                      style={{ width: `${finalScores.chaosLevel}%` }}
                    />
                  </div>
                </div>

                {/* Softness Level */}
                <div className="bg-purple-950/60 p-3 rounded-2xl border border-purple-500/20">
                  <div className="flex items-center justify-between text-xs font-bold text-purple-300 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Laugh className="w-3.5 h-3.5" />
                      Softness Level
                    </span>
                    <span>{finalScores.softnessLevel}%</span>
                  </div>
                  <div className="h-2 w-full bg-purple-900/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                      style={{ width: `${finalScores.softnessLevel}%` }}
                    />
                  </div>
                </div>

                {/* Teasing Level */}
                <div className="bg-purple-950/60 p-3 rounded-2xl border border-purple-500/20">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-300 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      Teasing Level
                    </span>
                    <span>{finalScores.teasingLevel}%</span>
                  </div>
                  <div className="h-2 w-full bg-purple-900/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-400 to-violet-400 rounded-full"
                      style={{ width: `${finalScores.teasingLevel}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* FINAL CHARACTER SCENE (Duck & Panda together with animations!) */}
            <div className="bg-purple-950/60 backdrop-blur-md border border-purple-500/30 rounded-3xl p-5 shadow-2xl">
              <CoupleCelebrationScene />
            </div>

            {/* VAATHU'S MESSAGE TO PANDA CARD */}
            <div className="bg-gradient-to-br from-amber-500/15 via-purple-900/40 to-pink-500/20 border-2 border-amber-400/30 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
              <div className="flex items-start gap-4">
                <DuckCharacter size="sm" expression="blushing" className="shrink-0 -mt-2" />
                <div className="flex-1">
                  <h3 className="font-bubble text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2">
                    <span>Vaathu&apos;s Message to Panda:</span>
                    <Heart className="w-4 h-4 fill-current text-pink-400 inline" />
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-purple-100 italic leading-relaxed mt-1">
                    &ldquo;{finalProfile.duckMessage}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bubble text-base font-bold shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again 🔄</span>
              </button>

              <button
                onClick={handleCopyReport}
                className="px-6 py-3.5 rounded-2xl bg-purple-900/80 hover:bg-purple-800 text-purple-100 font-bubble text-base font-bold border border-purple-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                {copiedToast ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-pink-300" />
                    <span>Copy Couple Report 📋</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setShowReview(true);
                }}
                className="px-5 py-3.5 rounded-2xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 font-bubble text-base font-bold border border-purple-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageSquareHeart className="w-4 h-4" />
                <span>Review Quiz Answers 💬</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Review Dialog Modal */}
      {showReview && (
        <ReviewModal
          questions={QUESTIONS}
          userAnswers={answers}
          onClose={() => setShowReview(false)}
        />
      )}

      {/* Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-[11px] text-purple-400/80 border-t border-purple-900/40">
        <p className="flex items-center justify-center gap-1.5 font-medium">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 fill-current text-pink-400 inline" />
          <span>for Panda &amp; Vaathu &bull; No pandas or vaathus were harmed during interrogation</span>
        </p>
      </footer>
    </div>
  );
}
