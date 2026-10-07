export type CharacterExpression =
  | 'happy'
  | 'shy'
  | 'blushing'
  | 'shocked'
  | 'confused'
  | 'angry-but-cute'
  | 'laughing'
  | 'embarrassed'
  | 'excited';

export interface AnswerChoice {
  id: string;
  text: string;
  subtext?: string;
  pandaExpression: CharacterExpression;
  duckReaction: string;
  duckExpression: CharacterExpression;
  scores: {
    cute: number;     // 1 to 10
    chaos: number;    // 1 to 10
    softness: number; // 1 to 10
    teasing: number;  // 1 to 10
  };
}

export interface Question {
  id: number;
  questionNumber: number;
  duckQuestion: string;
  duckPromptMood: CharacterExpression;
  choices: AnswerChoice[];
}

export interface QuizScores {
  cuteScore: number;
  loveLevel: number;
  chaosLevel: number;
  softnessLevel: number;
  teasingLevel: number;
}

export interface CoupleProfile {
  title: string;
  tagline: string;
  summary: string;
  duckMessage: string;
  badge: string;
  colorScheme: string;
}
