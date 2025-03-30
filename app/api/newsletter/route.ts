import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string
const client = new MongoClient(uri)
const dbName = 'newsletterDB'
const collectionName = 'subscribers'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, message: 'Invalid email.' }, { status: 400 })
    }

    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    const exists = await collection.findOne({ email })

    if (exists) {
      return NextResponse.json({ success: false, message: 'Email already subscribed.' }, { status: 409 })
    }

    await collection.insertOne({ email, subscribedAt: new Date() })
    return NextResponse.json({ success: true, message: 'Subscribed successfully!' })
  } catch (error) {
    console.error('Newsletter Error:', error)
    return NextResponse.json({ success: false, message: 'Server error. Please try again.' }, { status: 500 })
  }
}
