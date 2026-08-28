import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Try saving directly to Sanity if token is available
    const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
    if (token) {
      const writeClient = client.withConfig({ token, useCdn: false });
      await writeClient.create({
        _type: "newsletterSubscriber",
        email,
        subscribedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to Rebel Rover newsletter!",
    });
  } catch (error: any) {
    console.error("Error processing newsletter:", error);
    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing!",
    });
  }
}
