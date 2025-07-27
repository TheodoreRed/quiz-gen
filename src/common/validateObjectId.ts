import { ObjectId } from "mongodb";

export function parseObjectId(id: string): ObjectId | null {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}
