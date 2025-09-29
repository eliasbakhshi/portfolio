import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { name, email, message, recaptchaToken } = await req.json();

    // Validate input
    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string" || !name.trim() || !email.trim() || !message.trim()) {
        return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ ok: false, error: "Invalid email format" }, { status: 400 });
    }

    // Verify reCAPTCHA token
    const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            secret: process.env.GOOGLE_RECAPTCHA_SECRET_KEY || "",
            response: recaptchaToken,
        }),
    });

    const recaptchaResult = await recaptchaResponse.json();
    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
        return NextResponse.json({ ok: false, error: "Failed reCAPTCHA verification" }, { status: 400 });
    }

    // Send email
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_APP_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: `Elias Bakhshi  <${process.env.GMAIL_APP_USER}>`,
        to: process.env.GMAIL_APP_USER,
        subject: `Coffee from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ ok: true });
}
