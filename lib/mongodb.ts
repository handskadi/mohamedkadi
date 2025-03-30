import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI!
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> // 👈 Fix TS issue
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

if (process.env.NODE_ENV === 'development') {
  // In dev, reuse the global client across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In prod, just create once
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
