import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    await client.connect();
    const db = client.db('newsletterUser');
    const collection = db.collection('newsletterUser');

    const existing = await collection.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'Already subscribed!' });
    }

    await collection.insertOne({ email, subscribedAt: new Date() });

    return NextResponse.json({ success: true, message: 'Subscription successful!' });
  } catch (err) {
    console.error('Newsletter Error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
