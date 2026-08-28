import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/env";

interface CommentItem {
  id: string;
  postSlug: string;
  postTitle?: string;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
}

declare global {
  var __commentsStore: CommentItem[] | undefined;
}

if (!global.__commentsStore) {
  global.__commentsStore = [
    {
      id: "comm-1",
      postSlug: "travel-stories-for-now-and-the-future",
      postTitle: "Travel Stories For Now and the Future",
      name: "Sophia Miller",
      email: "sophia@example.com",
      comment: "Incredible guide! The tips on eco-friendly packing and local homestays made my recent trip to Bali so meaningful.",
      createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    },
    {
      id: "comm-2",
      postSlug: "9-popular-travel-destinations-on-sale",
      postTitle: "9 Popular Travel Destinations on Sale in 2024",
      name: "David Chen",
      email: "david.chen@example.com",
      comment: "Booked the Swiss Alps tour package through this guide. Everything was seamless from hotel transfers to scenic trains!",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
  ];
}

const commentsStore = global.__commentsStore;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const filtered = commentsStore.filter((c) => c.postSlug === slug);
    return NextResponse.json({ success: true, comments: filtered });
  }

  return NextResponse.json({ success: true, comments: commentsStore });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postSlug, postTitle, name, email, comment } = body;

    if (!name || !email || !comment || !postSlug) {
      return NextResponse.json(
        { success: false, error: "Please provide your Name, Email, and Comment." },
        { status: 400 }
      );
    }

    const newComment: CommentItem = {
      id: `comm-${Date.now()}`,
      postSlug,
      postTitle: postTitle || "Blog Article",
      name,
      email,
      comment,
      createdAt: new Date().toISOString(),
    };

    commentsStore.unshift(newComment);

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
          _type: "blogComment",
          postSlug,
          postTitle: postTitle || "Blog Article",
          name,
          email,
          comment,
          status: "Approved",
          createdAt: new Date().toISOString(),
        });
      } catch (sanityErr) {
        console.warn("Sanity comment write skipped:", sanityErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your comment has been posted successfully!",
      comment: newComment,
    });
  } catch (error: any) {
    console.error("Error processing blog comment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit comment." },
      { status: 500 }
    );
  }
}
