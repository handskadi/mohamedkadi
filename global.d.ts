// global.d.ts
import { MongoClient } from "mongodb";

declare global {
  // Allows global._mongoClientPromise to be recognized by TypeScript
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export {};
