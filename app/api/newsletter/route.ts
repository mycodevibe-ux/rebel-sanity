import { NextRequest, NextResponse } from "next/server";
import { leadsStore } from "@/lib/leadsStore";
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

    const newSubscriber = {
      id: `sub-${Date.now()}`,
      email: email.trim(),
      createdAt: new Date().toISOString(),
    };

    leadsStore.newsletters.unshift(newSubscriber);

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
          _type: "newsletterSubscriber",
          email: email.trim(),
          subscribedAt: new Date().toISOString(),
        });
      } catch (sanityErr) {
        console.warn("Sanity newsletter write skipped:", sanityErr);
      }
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

export async function GET() {
  return NextResponse.json({
    success: true,
    subscribers: leadsStore.newsletters,
  });
}
