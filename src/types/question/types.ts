export interface Question {
  _id?: string;
  question: string;
  options: string[];
  subjectId: string;
  correctCount: number;
  wrongCount: number;
}
