import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { name, email, message } = await req.json();
    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string" ||
        !name.trim() ||
        !email.trim() ||
        !message.trim()
    ) {
        return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ ok: false, error: "Invalid email format" }, { status: 400 });
    }


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_APP_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: email,
        to: process.env.GMAIL_APP_USER,
        subject: `Coffee from ${name}`,
        text: message,
    });

    return NextResponse.json({ ok: true });
}
