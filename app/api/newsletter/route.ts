import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
  }

  try {
    const { error } = await supabase.from("newsletter_subscribers").insert([{ email }]);

    if (error) {
      console.error("Supabase Error:", error.message);

      // ✅ Detect duplicate error (PostgreSQL error code 23505)
      if (error.code === "23505") {
        return NextResponse.json({ success: false, error: "Already subscribed" }, { status: 409 });
      }

      return NextResponse.json({ success: false, error: "Insert failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter Error:", err);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
