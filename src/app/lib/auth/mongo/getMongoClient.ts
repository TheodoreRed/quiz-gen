import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;

if (!uri) throw new Error("Missing MONGODB_URI");
if (!dbName) throw new Error("Missing MONGODB_DB");

let cachedDb: Db;

declare global {
  var _mongoClient: MongoClient | undefined;
  var _mongoDb: Db | undefined;
}

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
    await global._mongoClient.connect();
    global._mongoDb = global._mongoClient.db(dbName);
  }

  cachedDb = global._mongoDb!;
  return cachedDb;
}
