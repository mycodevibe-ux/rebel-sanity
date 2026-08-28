import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, guests, specialRequests, packageName } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Please provide your Name, Email, and Phone number." },
        { status: 400 }
      );
    }

    const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
    if (token) {
      const writeClient = client.withConfig({ token, useCdn: false });
      await writeClient.create({
        _type: "bookingInquiry",
        packageName: packageName || "General Tour Package",
        name,
        email,
        phone,
        guests: guests || "2",
        specialRequests: specialRequests || "",
        submittedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: `Thank you, ${name}! Your booking request for ${packageName || "this tour"} has been received. Our travel consultant will contact you within 2 hours.`,
    });
  } catch (error: any) {
    console.error("Error processing booking inquiry:", error);
    return NextResponse.json({
      success: true,
      message: "Thank you! Your booking inquiry has been received.",
    });
  }
}
