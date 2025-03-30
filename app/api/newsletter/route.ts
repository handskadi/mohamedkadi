import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb' // adjust path if needed

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ success: false, message: 'Invalid email' }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
    const collection = db.collection('subscribers')

    const existing = await collection.findOne({ email })
    if (existing) {
      return NextResponse.json({ success: false, message: 'Already subscribed.' })
    }

    await collection.insertOne({ email, subscribedAt: new Date() })

    return NextResponse.json({ success: true, message: 'Subscription successful!' })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 })
  }
}
