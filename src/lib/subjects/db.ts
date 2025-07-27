import { Subject } from "@/types/subject/types";
import { getDb } from "../auth/mongo/getMongoClient";
import { WithId } from "mongodb";

type SubjectDoc = WithId<Subject>;

/**
 * Converts raw MongoDB subject into a plain object
 */
function normalizeSubject(doc: SubjectDoc): Subject {
  return {
    _id: doc._id.toString(),
    name: doc.name,
    userId: doc.userId,
    description: doc.description,
    createdTs: doc.createdTs,
  };
}

/**
 * Fetches all subjects associated with a given user ID.
 * @param userId The ID of the user
 * @returns Array of Subject documents
 */
export async function getSubjectsByUserId(userId: string): Promise<Subject[]> {
  const db = await getDb();
  const raw = await db
    .collection<Subject>("subjects")
    .find({ userId })
    .toArray();

  return raw.map(normalizeSubject);
}
