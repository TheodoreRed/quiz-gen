import { SubjectId } from "../subject/types";

export interface Question {
  _id?: string;
  question: string;
  options: string[];
  subjectId: SubjectId;
  correctCount: number;
  wrongCount: number;
}
