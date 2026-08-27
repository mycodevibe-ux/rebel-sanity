import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const src = path.join(process.cwd(), "design", "logo1.png");
    const dest = path.join(process.cwd(), "public", "images", "logo1.png");
    fs.copyFileSync(src, dest);
    return NextResponse.json({ success: true, message: "logo1.png copied successfully!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
