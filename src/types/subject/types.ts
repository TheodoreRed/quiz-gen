import { ObjectId } from "mongodb";

export interface Subject {
  _id?: string;
  name: string;
  userId: string;
  description?: string;
  createdTs?: string;
}

export interface SubjectWithObjectId extends Omit<Subject, "_id"> {
  _id: ObjectId;
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
