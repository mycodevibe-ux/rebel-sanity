import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const srcDir = path.join(process.cwd(), "design");
    const destDir = path.join(process.cwd(), "public", "images");

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const files = fs.readdirSync(srcDir);
    const copiedFiles: string[] = [];

    for (const file of files) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      const stat = fs.statSync(srcFile);

      if (stat.isFile()) {
        fs.copyFileSync(srcFile, destFile);
        copiedFiles.push(file);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully copied ${copiedFiles.length} assets from design/ to public/images/`,
      files: copiedFiles,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
