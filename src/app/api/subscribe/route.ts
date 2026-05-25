// src/app/api/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend"; // ← NEW
import type { SubscribeRequest, SubscribeResponse } from "@/types";
import { pdfGuides } from "@/lib/pdfData"; // ← NEW

const resend = new Resend(process.env.RESEND_API_KEY!); // ← NEW

export async function POST(req: NextRequest) {
  const body = (await req.json()) as SubscribeRequest;
  const { firstName, email, tagId, tagName, slug } = body; // ← slug added

  // Basic validation
  if (!firstName || !email || !tagId || !slug) {
    return NextResponse.json<SubscribeResponse>(
      { success: false, message: "Missing required fields." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json<SubscribeResponse>(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.KIT_API_KEY;
  const apiBase = process.env.KIT_API_BASE_URL ?? "https://api.convertkit.com";

  if (!apiKey) {
    console.error("KIT_API_KEY is not set.");
    return NextResponse.json<SubscribeResponse>(
      { success: false, message: "Server configuration error. Please try again later." },
      { status: 500 }
    );
  }

  // Find the guide (for the email)
  const guide = pdfGuides.find((g) => g.slug === slug);
  if (!guide) {
    return NextResponse.json<SubscribeResponse>(
      { success: false, message: "Invalid guide requested." },
      { status: 400 }
    );
  }

  try {
    // 1. Subscribe the user in Kit (exactly as before)
    const kitRes = await fetch(`${apiBase}/v3/tags/${tagId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        api_key: apiKey,
        first_name: firstName,
        email,
        tags: [tagName],
      }),
    });

    if (!kitRes.ok) {
      const errorBody = await kitRes.text();
      console.error("Kit API error:", kitRes.status, errorBody);
      return NextResponse.json<SubscribeResponse>(
        {
          success: false,
          message: "Could not subscribe. Please check your email and try again.",
        },
        { status: 502 }
      );
    }

    // 2. Send the PDF email via Resend
    // Only runs if Kit succeeded
    const { error: emailError } = await resend.emails.send({
      from: "Hammad Hassan <onboarding@resend.dev>", // ← MUST be a verified domain in Resend
      to: [email],
      subject: `Your free guide: ${guide.title}`,
      html: `
        <p>Hi ${firstName || "there"} 👋</p>
        <p>Thank you for requesting <strong>${guide.title}</strong>.</p>
        <p>Here's your download link:</p>
        <p>
          <a href="${guide.downloadlink}" 
             style="display:inline-block;padding:12px 24px;background:#4f46e5;color:white;text-decoration:none;border-radius:8px;">
            📥 Download Your Guide
          </a>
        </p>
        <p>If you have any questions, just reply to this email.</p>
        <p>Happy learning!<br>– Hammad Hassan</p>
      `,
    });

    if (emailError) {
      console.error("Resend email failed:", emailError);
      // The user was already added to Kit, so we still return success,
      // but you could log this and manually resend later if needed.
    }

    return NextResponse.json<SubscribeResponse>({
      success: true,
      message: "You're in! Check your inbox — your free guide is on its way. 🎉",
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json<SubscribeResponse>(
      { success: false, message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}