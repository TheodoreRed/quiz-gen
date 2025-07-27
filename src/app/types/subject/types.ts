export type SubjectId = string;

export interface Subject {
  _id?: SubjectId;
  name: string;
  userId: string;
  description?: string;
  createdTs?: string; // ISO date string
}

export interface CreateSubjectBody {
  userId: string;
  name: string;
  description?: string;
}

export interface UpdateSubjectBody {
  _id: string;
  name: string;
  description?: string;
}

export interface UpdateSubjectBodyServer
  extends Omit<UpdateSubjectBody, "_id"> {
  _id: SubjectId;
}
