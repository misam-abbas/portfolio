import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { env } from "@/lib/env";
import { contactSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import ContactEmail from "@/emails/contact-email";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
    const { success } = await checkRateLimit(`contact:${ip}`);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Honeypot field — if filled, silently succeed without sending anything.
    if (parsed.data.honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL_TO || !env.CONTACT_EMAIL_FROM) {
      console.error(
        "Contact form submitted but RESEND_API_KEY / CONTACT_EMAIL_TO / CONTACT_EMAIL_FROM is not configured."
      );
      return NextResponse.json(
        { error: "Email service is not configured yet." },
        { status: 503 }
      );
    }

    const resend = new Resend(env.RESEND_API_KEY);
    const { name, email, subject, message } = parsed.data;

    const html = await render(
      ContactEmail({ name, email, subject, message })
    );

    const { error } = await resend.emails.send({
      from: env.CONTACT_EMAIL_FROM,
      to: env.CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
