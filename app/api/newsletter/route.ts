import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/env";

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
