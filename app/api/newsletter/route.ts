import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI!
const dbName = process.env.MONGODB_DB!

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ success: false, message: 'Invalid email' }, { status: 400 })
  }

  try {
    const client = await MongoClient.connect(uri)
    const db = client.db(dbName)
    const collection = db.collection('subscribers')

    // Prevent duplicate subscriptions
    const existing = await collection.findOne({ email })
    if (existing) {
      return NextResponse.json({ success: false, message: 'You are already subscribed.' })
    }

    // Insert new subscriber
    await collection.insertOne({ email, subscribedAt: new Date() })
    return NextResponse.json({ success: true, message: 'Subscription successful!' })
  } catch (error) {
    console.error('MongoDB Error:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
