export interface Feedback {
  taskResponse: string;
  coherenceCohesion: string;
  lexicalResource: string;
  grammaticalRangeAccuracy: string;
  overallComment: string;
}

export interface EvaluationResult {
  bandScore: number;
  feedback: Feedback;
  modelAnswer: string;
  improvedVersion: string;
}

export enum AppState {
  IDLE,
  EVALUATING,
  SUCCESS,
  ERROR
}