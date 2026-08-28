import { NextRequest, NextResponse } from "next/server";
import { leadsStore } from "@/lib/leadsStore";
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/env";

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

    const newBooking = {
      id: `book-${Date.now()}`,
      packageName: packageName || "General Tour Package",
      name,
      email,
      phone,
      guests: guests || "2",
      specialRequests: specialRequests || "",
      createdAt: new Date().toISOString(),
    };

    leadsStore.bookings.unshift(newBooking);

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
          _type: "bookingInquiry",
          packageName: packageName || "General Tour Package",
          name,
          email,
          phone,
          guests: guests || "2",
          specialRequests: specialRequests || "",
          submittedAt: new Date().toISOString(),
        });
      } catch (sanityErr) {
        console.warn("Sanity booking write skipped:", sanityErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Thank you, ${name}! Your booking request for ${packageName || "this tour"} has been received. Our travel consultant will contact you within 2 hours.`,
      booking: newBooking,
    });
  } catch (error: any) {
    console.error("Error processing booking inquiry:", error);
    return NextResponse.json({
      success: true,
      message: "Thank you! Your booking inquiry has been received.",
    });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    bookings: leadsStore.bookings,
  });
}
