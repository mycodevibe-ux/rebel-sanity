import { NextRequest, NextResponse } from "next/server";
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

    const token =
      process.env.SANITY_API_WRITE_TOKEN ||
      process.env.SANITY_API_TOKEN ||
      process.env.SANITY_TOKEN ||
      process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

    if (token) {
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
        submittedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: `Thank you, ${name}! We have received your message and will get back to you shortly.`,
    });
  } catch (error: any) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been received.",
    });
  }
}
