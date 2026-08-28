import { NextRequest, NextResponse } from "next/server";
import { leadsStore } from "@/lib/leadsStore";
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/env";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, phone } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields (Name, Email, Message)." },
        { status: 400 }
      );
    }

    const newLead = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject: subject || "General Inquiry",
      phone: phone || "Not provided",
      message,
      createdAt: new Date().toISOString(),
    };

    // 1. Store in instant server lead store
    leadsStore.contacts.unshift(newLead);

    // 2. Save into Sanity Cloud Database
    const token =
      process.env.SANITY_API_WRITE_TOKEN ||
      process.env.SANITY_API_TOKEN ||
      process.env.SANITY_TOKEN ||
      process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

    if (token) {
      try {
        const writeClient = createClient({
          projectId,
          dataset,
          apiVersion,
          token,
          useCdn: false,
        });

        await writeClient.create({
          _type: "contactInquiry",
          name,
          email,
          subject: subject || "General Inquiry",
          phone: phone || "Not provided",
          message,
          status: "New",
          submittedAt: new Date().toISOString(),
        });
      } catch (sanityErr) {
        console.warn("Sanity write skipped (token issue):", sanityErr);
      }
    }

    // 3. Optional Admin Email Dispatch (if RESEND_API_KEY is configured)
    const resendKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "mangesh@turbosoft.uk";

    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Rebel Rover Alerts <onboarding@resend.dev>",
            to: [adminEmail],
            subject: `🔔 New Contact Inquiry: ${subject || "Website Lead"} from ${name}`,
            html: `
              <h2>New Contact Message Received!</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p style="background: #f4f4f4; padding: 12px; border-radius: 8px;">${message}</p>
            `,
          }),
        });
      } catch (emailErr) {
        console.warn("Email alert dispatch skipped:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Thank you, ${name}! Your message has been received successfully.`,
      lead: newLead,
    });
  } catch (error: any) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been received.",
    });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    contacts: leadsStore.contacts,
  });
}
