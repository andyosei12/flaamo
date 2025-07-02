import { NextResponse } from "next/server";
import { Resend } from "resend"; // npm install resend

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email)
    return NextResponse.json({ error: "Email required" }, { status: 400 });

  // send notification to founder
  await resend.emails.send({
    from: "flaamo@resend.dev",
    to: "nanaosei2089@gmail.com",
    subject: "New Waitlist Signup",
    html: `<p>${email} just joined the Flaamo waitlist</p>`,
  });

  return NextResponse.json({ success: true });
}
